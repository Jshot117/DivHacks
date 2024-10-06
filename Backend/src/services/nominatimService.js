const axios = require("axios");

const getCoordinates = async (location) => {
  return await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`,
    {
      headers: {
        "User-Agent": "DivHacks/1.0 ",
      },
    }
  );
};

module.exports = { getCoordinates };
