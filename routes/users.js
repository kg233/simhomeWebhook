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
    let response = {
      fulfillment_text: `display name: ${req.body.intent.displayName}`,
    };
    return res.json(response);
  }
});

module.exports = router;
