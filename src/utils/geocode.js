const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiZ3JheXNvbjkzIiwiYSI6ImNsMHpqM3Z5eTBxaTMzam8xM2ZtanBiZTgifQ.hD6w6dGXBctWPmWQzH8AGQ`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location. Please try another serach", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
