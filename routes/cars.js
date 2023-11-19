const express = require("express");
const Car = require("../models/car");
const router = express.Router();


router.post("/crearcar",async (req, res) => {
  let message = "";
  let error = false;
    await Car.findOne({ platenumber: req.body.platenumber })
      .then((cars) => {
        if (cars === null) {
          const carro = new Car(req.body);
          carro.save();
          error=false;
          res.json({ message: "Vehiculo registrado con exito" ,error:error});
        } else {
          error=true
          res.json({
            message: "El vehiculo ya existe. Intenta con una placa nueva",
            error:error
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/listarcar",async (req, res) => {
    await Car.find().then((carros) => {
      console.log(carros);
      if (carros.length > 0) {
        res.json(carros);
      } else {
        res.json({ message: "No existen registros" });
      }
    });
  });



module.exports = router;
