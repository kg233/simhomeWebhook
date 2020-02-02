//return a list of device names

const axios = require('axios');

async function getDevices() {
  try {
    let { data } = axios.get(process.env.deviceLink);

    return data.map(item => {
      return item.device_name;
    });
  } catch (err) {
    console.log(err);
    return 'error occurred, please try again.';
  }
}

module.exports = getDevices;
