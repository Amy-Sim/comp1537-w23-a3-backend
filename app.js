const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const unicornModel = require('./models/unicorns')

app.post("/search", async (req, res) => {
//   console.log(req.body);
  if (req.body.type === "nameSearch") {
    
    var selectionArgument = {}
    if (req.body.name)
      selectionArgument = {
        name: req.body.name,
      };
     var projectionArgument = {}
    if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === false
    ) {
      projectionArgument = { name: 1, _id: 0 };
    } else {
      // Todo
    }
    const result = await unicornModel.find(selectionArgument, projectionArgument);

    res.json(result);
  } else if (req.body.type === "weightSearch") {
    //Todo
  } else if (req.body.type === "foodSearch") {
    //Todo
  }
});

module.exports = app;
