const axios = require("axios");

const getGeoJson = async (origin, destination) => {
  try {
    const data = await axios.get(
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getGeoJson };
