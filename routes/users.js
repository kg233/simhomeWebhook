require('dotenv').config();

var express = require('express');
var router = express.Router();

const makeRes = require('../utils/makeRes');
const getEnergy = require('../fulfillments/getEnergy');
const getMonthly = require('../fulfillments/getMonthly');

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

      break;
  }
});

module.exports = router;
