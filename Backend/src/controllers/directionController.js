const { getCoordinates } = require("../services/nominatimService");
const { getGeoJson } = require("../services/osmService");

// Regular expression to match coordinates in the format of "latitude,longitude"
const coordinateRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;

const getRoute = async (req, res) => {
  const origin = req.query.origin;
  const destination = req.query.destination;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  let originData = origin;
  let destinationData = destination;

  if (!coordinateRegex.test(origin)) {
    originData = await getCoordinates(origin);
    destinationData = await getCoordinates(destination);

    if (!originData || !destinationData) {
      return res.status(500).json({ error: "Error fetching coordinates" });
    }
  }

  const geoJson = await getGeoJson(
    [originData.data[0].lat, originData.data[0].lon],
    [destinationData.data[0].lat, destinationData.data[0].lon]
  );

  if (!geoJson) {
    return res.status(500).json({ error: "Error fetching route" });
  }

  return {
    origin: originData.data,
    destination: destinationData.data,
    route: geoJson.data,
  };
};

module.exports = { getRoute };
