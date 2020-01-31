const axios = require('axios');

async function getTop3FromN(start) {
  let period = getDatePeriod();
  let keyList;
  let idNameMap;
  let energyData = {};

  try {
    idNameMap = await getIDNameMapping();

    console.log('querying all devices for energy usage');
    for (let key in idNameMap) {
      let c = await queryCost(key, period);
      energyData[key] = c;
    }
    console.log('DONE');
    keyList = Object.keys(energyData);
    keyList.sort((a, b) => energyData[b] - energyData[a]);
  } catch (err) {
    console.log(err);
    return 'error occured, please try again later';
  }
  let sentence = '';
  for (let i = start; i < keyList.length || i < start + 3; i++) {
    sentence += `${idNameMap[keyList[i]]} used ${energyData[keyList[i]]} kwh\n`;
  }

  return sentence;
}

function getDatePeriod() {
  let now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  let endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return { startDate, endDate };
}

async function getIDNameMapping() {
  result = await axios.get(process.env.deviceLink);

  return result.data
    .filter(elem => {
      return elem.device_name != null;
    })
    .map(elem => {
      return {
        device_id: elem.device_id,
        device_name: elem.device_name.toLowerCase(),
      };
    })
    .reduce((total, current) => {
      total[current.device_id] = current.device_name;
      return total;
    }, {});
}

async function queryCost(id, period) {
  return await axios.get(
    `http://pluto.calit2.uci.edu:8081/v1/energy/usage?DeviceID=${id}&StartDate=${period.startDate}&EndDate=${period.endDate}`
  );
}

module.exports = getTop3FromN;
