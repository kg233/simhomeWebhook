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
  let session = req.body.session;
  console.log('intent: ' + intent);
  if (intent === 'Default Welcome Intent') {
    let resString = 'Hello!, ask me about energy datas!';
    let response = makeRes(resString, platform);
    res.send(response);
  } else if (intent === 'get-energy') {
    ////////////////////////////////////////Basic energy audit
    getEnergy(req.body.queryResult.parameters).then(resString => {
      let response = makeRes(resString, platform);

      console.log('sending: ' + JSON.stringify(response));
      res.send(response);
    });
  } else if (intent === 'get-monthly-total') {
    ////////////////////////////////////////get monthly total
    getMonthly().then(result => {
      let response = makeRes(result, platform);

      console.log('sending: ' + JSON.stringify(response));
      res.send(response);
    });
  } else if (intent === 'get-top-3' || intent === 'want-top-3-yes') {
    ////////////////////////////////////////top 3 for this month
    getTop3().then(({ sentence, outList }) => {
      let response = makeRes(sentence, platform);

      console.log('sending: ' + response);
      res.send(response);
    });
  } else if (intent === 'ask-devices') {
    ////////////////////////////////////////get device counts
    getDevices().then(deviceList => {
      if (typeof deviceList === 'string') {
        let response = makeRes(
          'error occurred trying to get devices, please try again',
          platform
        );

        console.log('sending: ' + response);
        res.send(response);
      } else {
        let outContext = {
          name: session + '/contexts/deviceList',
          lifespanCount: 2,
          parameters: { list: deviceList },
        };

        let response = makeRes(
          `you have ${deviceList.length} device${
            deviceList.length == 1 ? '' : 's'
          }, would you like to hear the name${
            deviceList.length == 1 ? '' : 's'
          }?`,
          platform,
          [outContext]
        );
        console.log('sending: ' + JSON.stringify(response));
        res.send(response);
      }
    });
  } else if (intent === 'ask-devices - yes') {
    //////////////////////////////////////// get device names
    let arr = [];
    for (let context of req.body.queryResult.outputContexts) {
      if (context.name.endsWith('devicelist')) {
        arr = context.parameters.list;
      }
    }

    console.log(arr);
    let strRes = 'Here are the list of devices: \n';
    arr.forEach(ele => {
      strRes += ele + ', ';
    });

    let response = makeRes(strRes, platform);

    console.log('sending: ' + JSON.stringify(response));
    res.send(response);
  } else if (intent === 'rebate-yes') {
    //////////////////////////////////////// get rebates, get the wanted id from output context
    console.log(req.body);
  }
});

module.exports = router;
