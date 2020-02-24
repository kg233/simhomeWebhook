//getTop3.js
//get the total energy usage for this month as well as the top 3 energy consuming devices

const urlMaker = require('../utils/urlMaker');
const axios = require('axios');

async function getTop3(start) {
  let top = 3;
  let period = getDatePeriod();
  let monthlyTotal;
  let devices;

  try {
    const { startDate, endDate } = period;
    const { data } = await axios.get(
      urlMaker(process.env.getTotalDistribution, [
        'StartDate=' + startDate,
        'EndDate=' + endDate,
      ])
    );

    monthlyTotal = data.total;

    devices = data.data;
    devices.sort((a, b) => {
      a.kWh - b.kWh;
    });
  } catch (err) {
    console.log(err);
    return 'error occured, please try again later';
  }

  let sentence = `You have used ${monthlyTotal} kilowatt hours of energy, `;

  if (devices.length < 3) {
    top = devices.length;
    sentence += 'here are all the device usage for this month: ';
  } else {
    sentence += 'here are the top 3 energy consuming device for this month: ';
  }

  for (let i = 0; i < top; i++) {
    sentence += `${devices[i].name} used ${devices[i].kWh} kilowatt hours\n`;
  }

  return sentence;
}

function getDatePeriod() {
  let now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  let endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return { startDate, endDate };
}

module.exports = getTop3;
