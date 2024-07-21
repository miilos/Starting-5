const Lineup = require("../models/lineupModel");
const catchAsync = require("../util/catchAsync");

exports.createLineup = catchAsync(async (req, res, next) => {
  const lineup = await Lineup.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      lineup,
    },
  });
});

exports.getAllLineups = catchAsync(async (req, res, next) => {
  const lineups = await Lineup.find().select("-_id");

  res.status(200).json({
    status: "success",
    results: lineups.length,
    data: {
      lineups,
    },
  });
});

exports.getLineupsByUser = catchAsync(async (req, res, next) => {
  const lineups = await Lineup.find({ createdBy: req.params.user }).select(
    "-_id"
  );

  res.status(200).json({
    status: "success",
    results: lineups.length,
    data: {
      lineups,
    },
  });
});

exports.getLineupsByName = catchAsync(async (req, res, next) => {
  const lineups = await Lineup.find({
    name: { $regex: req.params.name, $options: "i" },
  }).select("-_id");

  res.status(200).json({
    status: "success",
    results: lineups.length,
    data: {
      lineups,
    },
  });
});
