require('dotenv').config();

var express = require('express');
var router = express.Router();

const makeRes = require('../utils/makeRes');
const getEnergy = require('../fulfillments/getEnergy');
const getMonthly = require('../fulfillments/getMonthly');
const getTop3FromN = require('../fulfillments/getTop3');
const getDevices = require('../fulfillments/getDevices');

router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body));

  let intent = req.body.queryResult.intent.displayName;
  let platform = req.body.originalDetectIntentRequest.source;
  console.log('intent: ' + intent);
  switch (intent) {
    case 'Default Welcome Intent':
      let resString = 'Hello!, ask me about energy datas!';
      let response = makeRes(resString, platform);
      res.send(response);
      break;
    case 'get-energy':
      getEnergy(req.body.queryResult.parameters).then(resString => {
        let response = makeRes(resString, platform);

        console.log('sending: ' + JSON.stringify(response));
        res.send(response);
      });
      break;
    case 'get-monthly-total':
      getMonthly().then(result => {
        let response = makeRes(result);

        console.log('sending: ' + JSON.stringify(response));
        res.send(response);
      });

    case 'get-top-3':
      getTop3FromN(0).then(resString => {
        let response = makeRes(resString, platform);

        console.log('sending: ' + response);
        res.send(response);
      });
      break;

    case 'ask-devices':
      //get the list of devices from api, store them in context to be extracted later
      let deviceList = getDevices();
      if (typeof deviceList === 'string') {
        let response = makeRes(
          'error occurred trying to get devices, please try again',
          platform
        );

        console.log('sending: ' + response);
        res.send(response);
        break;
      }
      let response = makeRes(
        `you have ${deviceList.length} device${
          deviceList.length == 1 ? '' : 's'
        }, would you like to hear the name${
          deviceList.length == 1 ? '' : 's'
        }?`,
        platform
      );
      console.log('sending: ' + response);
      res.send(response);
      break;

    // response.outputContexts = response.outPutContexts
    //   ? response.outPutContexts
    //   : [];
    // response.outputContexts.push()
  }
});

module.exports = router;
