var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  if (req.body.intent.displayName === 'Default Welcome Intent') {
    let response = {
      fulfillment_text: 'hello world',
    };
    return res.json(response);
  } else {
    let r = `display name: ${req.body.intent.displayName}`;
    let response = {
      fulfillment_messages: [{ text: { text: [r] } }],
    };
    return res.json(response);
  }
});

module.exports = router;
