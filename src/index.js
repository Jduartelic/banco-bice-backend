const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const config = require("./config/");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.PORT);

app.listen(process.env.PORT, () => console.log("listening on port 3030!"));

app.get("/", async (req, res) => {
  const response = await fetch(config.API_URL + "/last");
  const json = await response.json();
  res.send(json);
});
