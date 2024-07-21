const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const dbString = process.env.CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASS
);
mongoose.connect(dbString).then(() => console.log("connected to db!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`listening on port ${port}!`)
);
