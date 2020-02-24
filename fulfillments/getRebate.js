//get rebate for each device ID in array

const urlMaker = require('../utils/urlMaker');
const axios = require('axios');

async function getRebate(arr) {
  let result = '';
  console.log('here');

  try {
    for (let dev of arr) {
      result += `Rebate suggestions for ${dev.name}, `;
      let data = await axios.get(
        urlMaker(process.env.getRebateByDevice, [`id=${dev.id}`])
      );
      console.log(data);
      for (let rebate of data.data) {
        result += `${rebate.name}, ${rebate.url}, \n`;
      }
    }
    return result;
  } catch (err) {
    console.log(err);
    return 'error occured, please try again';
  }
}

module.exports = getRebate;
