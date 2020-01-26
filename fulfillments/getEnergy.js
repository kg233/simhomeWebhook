const axios = require('axios');

const threeDays = 259200000; //if <= three days, we return each individual

async function getEnergy(param) {
  let deviceId = null;

  deviceId = await getId(param.deviceName);
  energyStr = await fetchEnergy(param.deviceName, deviceId, param.datePeriod);

  return energyStr;
}

function getId(name) {
  return axios
    .get(process.env.deviceLink)
    .then(result => {
      let deviceIds = result.data
        .filter(elem => {
          return elem.device_name != null;
        })
        .map(elem => {
          return {
            device_id: elem.device_id,
            device_name: elem.device_name.toLowerCase(),
          };
        });
      let id = deviceIds.filter(elem => elem.device_name == name)[0].device_id;
      return id;
    })
    .catch(error => {
      console.log('getting device id failed');
      return 'getting device id failed, you can try again';
    });
}

function fetchEnergy(deviceName, id, period) {
  //NOT DONE, what about user not specifying a device?

  return axios
    .get(
      `http://pluto.calit2.uci.edu:8081/v1/energy/usage?DeviceID=${id}&StartDate=${period.startDate}&EndDate=${period.endDate}`
    )
    .then(response => {
      //console.log('here', response.data);
      if (
        Date.parse(period.endDate) - Date.parse(period.startDate) <=
        threeDays
      ) {
        let groups = {};
        response.data.data.forEach(use => {
          let d = new Date(use.energy_timestamp);
          let date = d.getDate();
          groups[date] = groups[date] || 0;
          groups[date] += use.energy_value;
        });
        //console.log(groups);

        let sentence = `Energy use for ${deviceName}: `;
        for (var key in groups) {
          sentence += `on the ${key}th you used ${groups[key]} units of energy; `;
        }
        sentence += `total energy used is ${response.data.kWh} kWh`;
        return sentence;
      } else {
        return `the total energy cost for ${deviceName} is ${response.data.kWh} kwh`;
      }
    })
    .catch(err => {
      console.log(err);
      return 'failed to get energy data, please try again';
    });
}

module.exports = getEnergy;
