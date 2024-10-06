const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const axios = require("axios");

app.use(cors());

//template call (http://localhost:3000/api?origin=New York&destination=Los Angeles)

app.use("/api", require("./routes/directionRoute"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
