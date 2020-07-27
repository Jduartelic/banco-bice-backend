require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const InfoDetailIndexMarketplace = require("./api/InfoDetailIndexMarketplace/api");

app.listen(process.env.PORT, () => {});

app.get("/last", InfoDetailIndexMarketplace.getDetailsInfoLast);

app.post("/info", InfoDetailIndexMarketplace.getDetailsInfoValues);
