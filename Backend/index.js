const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const axios = require("axios");

app.use(cors());

//template call (http://localhost:3000/api?origin=New York&destination=Los Angeles)
app.get("/api", async (req, res) => {
  const origin = req.query.origin;
  const destination = req.query.destination;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

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

  const originData = await getCoordinates(origin);
  const destinationData = await getCoordinates(destination);

  if (!originData || !destinationData) {
    return res.status(500).json({ error: "Error fetching coordinates" });
  }

  const getGeoJson = async (origin, destination) => {
    try {
      const data = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=full&geometries=geojson`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const geoJson = await getGeoJson(
    [originData.data[0].lat, originData.data[0].lon],
    [destinationData.data[0].lat, destinationData.data[0].lon]
  );

  if (!geoJson) {
    return res.status(500).json({ error: "Error fetching route" });
  }

  return res.json({
    origin: originData.data,
    destination: destinationData.data,
    route: geoJson.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
