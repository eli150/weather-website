const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9e3e5bd0176443ea6a79b01ae548657c&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("unable to find location. Please try another serach", undefined);
    } else {
      callback(undefined, {
        temp: response.body.current.temperature,
        feelsLike: response.body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
