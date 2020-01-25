var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);

  if (req.body.intent.displayName === 'Default Welcome Intent') {
    let response = {
      fulfillment_text: 'Hello! Ask me about your house energy consumption!',
    };
    return res.send(response);
  } else {
    let r = `display name: ${req.body.intent.displayName}`;
    let response = {
      fulfillmentText: r,
      fulfillmentMessages: [{ text: { text: ['rich response hehe'] } }],
    };
    return res.send(response);
  }
});

module.exports = router;
