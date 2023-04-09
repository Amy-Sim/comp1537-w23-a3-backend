const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const unicornModel = require("./models/unicorn");

app.post("/search", async (req, res) => {
  //   console.log(req.body);
  if (req.body.type === "nameSearch") {
    var selectionArgument = {};
    if (req.body.name)
      selectionArgument = {
        name: req.body.name,
      };
    var projectionArgument = {};
    if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === false
    ) {
      projectionArgument = { name: 1, weight: 1, _id: 1, loves: 1 };
    }  else {
      // Todo 1
    }
    const result = await unicornModel.find(
      selectionArgument,
      projectionArgument
    );
    res.json(result);
  } else if (req.body.type === "weightSearch") {
    const { minweight, maxweight, projectionFilters } = req.body;
    const weightQuery = {
      weight: {
        $gt: parseFloat(minweight),
        $lt: parseFloat(maxweight),
      },
    };
    const projectionQuery = {};
    if (projectionFilters.name) {
      projectionQuery.name = 1;
    }
    if (projectionFilters.weight) {
      projectionQuery.weight = 1;
    }
    if (projectionFilters.weight) {
      projectionQuery.loves = 1;
    } else {
      // Todo 2
    }
    const result = await unicornModel.find(weightQuery, projectionQuery);
    res.json(result);
  } else if (req.body.type === "foodSearch") {
    const favoriteFood = req.body.favoriteFood;

    const lovesQuery = { $and: [] };
    for (let food in favoriteFood) {
      if (favoriteFood[food]) {
        lovesQuery["$and"].push({ loves: food });
      }
    }

    const projectionArgument = { name: 1, weight: 1, loves: 1, _id: 0 };

    const result = await unicornModel.find(lovesQuery, projectionArgument);

    res.json(result);
  } else {
    res.status(400).send("Invalid search type.");
  }
});

module.exports = app;
