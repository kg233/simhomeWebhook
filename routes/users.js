require('dotenv').config();

var express = require('express');
var router = express.Router();

const makeRes = require('../utils/makeRes');
const getEnergy = require('../fulfillments/getEnergy');
const getMonthly = require('../fulfillments/getMonthly');
const getTop3 = require('../fulfillments/getTop3');
const getDevices = require('../fulfillments/getDevices');

router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body));

  let intent = req.body.queryResult.intent.displayName;
  let platform = req.body.originalDetectIntentRequest.source;
  console.log('intent: ' + intent);
  if (intent === 'Default Welcome Intent') {
    let resString = 'Hello!, ask me about energy datas!';
    let response = makeRes(resString, platform);
    res.send(response);
  } else if (intent === 'get-energy') {
    getEnergy(req.body.queryResult.parameters).then(resString => {
      let response = makeRes(resString, platform);

      console.log('sending: ' + JSON.stringify(response));
      res.send(response);
    });
  } else if (intent === 'get-monthly-total') {
    getMonthly().then(result => {
      let response = makeRes(result, platform);

      console.log('sending: ' + JSON.stringify(response));
      res.send(response);
    });

  } else if (intent === 'get-top-3' || intent === 'get-monthly-total-yes') {

    getTop3().then(resString => {
      let response = makeRes(resString, platform);

      console.log('sending: ' + response);
      res.send(response);
    });
  } else if (intent === 'ask-devices') {
    //return the number of devices user has, then follow up intent to read each devices' name
    //get the list of devices from api, store them in context to be extracted later
    getDevices().then(deviceList => {
      if (typeof deviceList === 'string') {
        let response = makeRes(
          'error occurred trying to get devices, please try again',
          platform
        );

        console.log('sending: ' + response);
        res.send(response);
      } else {
        let response = makeRes(
          `you have ${deviceList.length} device${
            deviceList.length == 1 ? '' : 's'
          }, would you like to hear the name${
            deviceList.length == 1 ? '' : 's'
          }?`,
          platform
        );
        response.outputContexts.push(req.body.queryResult.outputContexts[0]);
        response.outputContexts[0].parameters = { list: deviceList };
        console.log('sending: ' + JSON.stringify(response));
        res.send(response);
      }
    });
  } else if (intent === 'ask-devices - yes') {
    let arr =
      req.body.queryResult.outputContexts[
        req.body.queryResult.outputContexts.length - 2
      ].parameters.list;
    console.log(arr);
    let strRes = 'Here are the list of devices: \n';
    arr.forEach(ele => {
      strRes += ele + ', ';
    });

    let response = makeRes(strRes, platform);

    console.log('sending: ' + JSON.stringify(response));
    res.send(response);
  }
});

module.exports = router;
