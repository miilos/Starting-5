const express = require("express");
const cors = require("cors");
const lineupRouter = require("./routes/lineupRouter");
const errorController = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api", lineupRouter);

app.use(errorController);

module.exports = app;
