const express = require("express");
const Users = require("../models/car");
const router = express.Router();


router.post("/crearcar", async (req, res) => {
    await Car.findOne({ platenumber: req.body.platenumber })
      .then((cars) => {
        if (cars === null) {
          const carro = new Car(req.body);
          carro.save();
          res.json({ message: "Vehiculo registrado con exito" });
        } else {
          res.json({
            message: "El vehiculo ya existe. Intenta con una placa nueva",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/listarcar", async (req, res) => {
    await Car.find().then((carros) => {
      console.log(carros);
      if (carros.length > 0) {
        res.json(carros);
      } else {
        res.json({ message: "No existen registros" });
      }
    });
  });

router.patch("/restablecercontrasena", async (req, res) => {
    await Users.findOneAndUpdate(
        { username: req.body.username, reservword: req.body.reservword },
        { password: req.body.password }
      ).then((user) => {
        if (user) {
          res.json({ message: "contraseña actualizada con exito" });
        } else {
          res.json({
            message: "usuario o palabra reservada no valido, por favor verifique",
          });
        }
      });
});

module.exports = router;
