var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);

  res.send({ fulfillmentText: 'hello world' });

  // if (req.body.intent.displayName === 'Default Welcome Intent') {
  //   let response = {
  //     fulfillment_text: 'hello world',
  //   };
  //   return res.send(response);
  // } else {
  //   let r = `display name: ${req.body.intent.displayName}`;
  //   let response = {
  //     fulfillment_messages: [{ text: { text: [r] } }],
  //   };
  //   return res.send(response);
  // }
});

module.exports = router;
