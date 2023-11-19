const express = require("express");
const Rent = require("../models/rent");
const Car = require("../models/car");
const Return = require("../models/returncar");
const router = express.Router();


router.post("/returncar", async (req, res) => {
    const returnCar = new Return({returnnumber:req.body.returnnumber, rentnumber:req.body.rentnumber, returndate: req.body.returndate});
    returnCar.save();
    await Car.findOneAndUpdate(
      {platenumber: req.body.platenumber },
      {state: true}
    );
    await Rent.findOneAndUpdate(
      {rentnumber: req.body.rentnumber},
      {status: false}
    );
    res.json({ message: "Retorno registrada con exito", rentnumber:req.body.returnnumber });
    
  });

  module.exports = router;
