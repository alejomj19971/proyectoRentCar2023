const express = require("express");
const Users = require("../models/users");
const router = express.Router();


router.post("/registrar", async (req, res) => {
    let message = "";
    let error = false;
    await Users.findOne({ username: req.body.username })
      .then((username) => {
        if (username === null) {
          const user = new Users(req.body);
          user.save();
          message = "Usuario registrado exitosamente...";
          error = false;
          res.json({ message: message, error: error });
        } else {
          message = "El nombre usuario ya existe. Inténtelo con otro";
          error = true;
          res.json({ message: message, error: error });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.patch("/restablecercontrasena",async (req, res) => {
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

  router.put("/updatecar", async (req, res) => {
    await Car.findOneAndUpdate(
      { platenumber: req.body.platenumber },
      {
        brand: req.body.brand,
        state: req.body.state,
        dailyvalue: req.body.dailyvalue,
      }
    ).then((car) => {
      if (car) {
        res.json({ message: "Vehiculo Actualizado con exito" });
      } else {
        res.json({ message: "numero de placa no valido, por favor verifique" });
      }
    });
  });

  router.delete("/deletecar", async (req, res) => {
    await Car.findOneAndDelete({ platenumber: req.body.platenumber }).then(
      (car) => {
        if (car) {
          res.json({ message: "Vehiculo borrado con exito" });
        } else {
          res.json({ message: "numero de placa no valido, por favor verifique" });
        }
      }
    );
  });

  
  router.post("/login", async (req, res) => {
    await Users.findOne({ username: req.body.username,password:req.body.password }).then((usuario) => {
      if (usuario!=null) {
        res.json(usuario);
      } else {
        res.json({ message: "Usuario o contraseña invalidos" });
      }
    });
  });


  
module.exports = router;
