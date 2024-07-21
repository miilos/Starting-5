const mongoose = require("mongoose");

const lineupSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "No lineup name specified!"],
  },
  lineup: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length === 5;
      },
      message: "Incomplete lineup!",
    },
  },
  createdBy: {
    type: String,
    required: [true, "No username specified!"],
  },
});

const Lineup = mongoose.model("Lineup", lineupSchema);

module.exports = Lineup;
