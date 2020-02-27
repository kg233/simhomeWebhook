//getMonthly.js
//use api to get the monthly total energy usage and return it in a readable string
//will further prompt the user to get the top 3 usage using getTop3.js
const monthPeriod = require('../utils/monthPeriod');
const roundKWh = require('../utils/roundKWh');

const axios = require('axios');

async function getMonthly() {

  //default to current month
  let {startDate, endDate} = monthPeriod();

  console.log(JSON.stringify(startDate), JSON.stringify(endDate));
  try {
    let res = await axios.get(
      `${process.env.getTotalURL}?StartDate=${startDate}&EndDate=${endDate}`
    );

    if (res.data < 0.00000001) {
      return `you used no energy this month yet.`;
    }

    return `current total energy use for this month  is ${roundKWh(
      res.data
    )} kilowatt hours. Would you like to know what are the top 3 energy consuming devices?`;
  } catch (err) {
    console.log(err);
    return `unable to get this month total, please try again`;
  }
}

module.exports = getMonthly;
