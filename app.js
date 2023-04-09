const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());

const unicornSchema = new mongoose.Schema({});
const unicornModel = mongoose.model("unicorns", unicornSchema);

app.post("/search", async (req, res) => {
  console.log(req.body);
  if (req.body.type === "nameSearch") {
    const name = req.body.name;
    const result = await unicornModel.find({ name: name });
    res.json(result);
  } else if (req.body.type === "weightSearch") {
    const minWeight = req.body.minWeight;
    const maxWeight = req.body.maxWeight;
    const result = await unicornModel.find({
      weight: { $gte: minWeight, $lte: maxWeight },
    });

    res.json(result);
  } else if (req.body.type === "foodSearch") {
    const foods = req.body.foods;
    const result = await unicornModel.find({
      loves: { $all: foods },
    });

    res.json(result);
  }
});

module.exports = app;
