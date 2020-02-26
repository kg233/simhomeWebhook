//getMonthly.js
//use api to get the monthly total energy usage and return it in a readable string
//will further prompt the user to get the top 3 usage using getTop3.js
const monthPeriod = require('../utils/monthPeriod');
const roundKWh = require('../utils/roundKWh');

const axios = require('axios');

async function getMonthly(param) {

  var Specific_time = 0;
  let {startDate, endDate} = monthPeriod();
  Specific_time = "this month";

  // // check whether input monthperiod
  if(param.datePeriod !== ''){
    startDate = param.datePeriod.startDate;
    endDate = param.datePeriod.endDate;
    Specific_time = "Specified Period";
  }


  //default to current month
  console.log(JSON.stringify(startDate), JSON.stringify(endDate));
  try {
    let res = await axios.get(
      `${process.env.getTotalURL}?StartDate=${startDate}&EndDate=${endDate}`
    );

    if (res.data < 0.00000001) {
      return `you used no energy ${Specific_time} yet.`;
    }

    return `current total energy use for ${Specific_time}  is ${roundKWh(
      res.data
    )} kilowatt hours. Would you like to know what are the top 3 energy consuming devices?`;
  } catch (err) {
    console.log(err);
    return `unable to get ${Specific_time} total, please try again`;
  }
}

module.exports = getMonthly;
