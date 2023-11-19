const express = require("express");
const Rent = require("../models/rent")
const router = express.Router();

router.post("/rentarcar", async (req, res) => {
    const renta = new Rent(req.body);
    renta.save();
    await Car.findOneAndUpdate(
      { platenumber: req.body.platenumber },
      { state: false }
    );
    res.json({ message: "Renta registrada con exito", rentnumber:req.body.rentnumber });
    
  });
  
  router.get("/listarentnumber", async (req, res) => {
      await Rent.find({ status: true })
      .then((rentas) => {
        if (rentas.length > 0) {
          res.json(rentas);
        } else {
          res.json({ message: "No existen vehiculos rentados" });
        }
      });
    });

    module.exports = router;