//return a list of device names

const axios = require('axios');

async function getDevices() {
  try {
    let { data } = await axios.get(process.env.deviceLink);

    return data
      .filter(item => {
        return item.device_name != null;
      })
      .map(item => {
        return item.device_name;
      });
  } catch (err) {
    console.log(err);
    return 'error occurred, please try again.';
  }
}

module.exports = getDevices;
