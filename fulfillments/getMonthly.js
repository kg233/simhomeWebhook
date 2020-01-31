//use api to get the monthly total energy usage and return it in a readable string
const monthPeriod = require('../utils/monthPeriod');
const axios = require('axios');

async function getMonthly() {
  let { startDate, endDate } = monthPeriod();
  console.log(JSON.stringify(startDate), JSON.stringify(endDate));
  try {
    let res = await axios.get(
      `${process.env.getTotalURL}?StartDate=${startDate}&EndDate=${endDate}`
    );

    return `current total energy use for this month billing period is ${res.data}`;
  } catch (err) {
    console.log(err);
    return 'unable to get monthly total, please try again';
  }
}

module.exports = getMonthly;
