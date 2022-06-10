//for generation et cryp the password 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user');


exports.userLogin = (req, res, next) => {


    let fetchedUser;
    User.findOne({ where: {usr_email: req.body.email} })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: 'User does not exist !'
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, fetchedUser.usr_password);
      }).then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Incorrect Password !"
          });
        }
        User.findByPk(fetchedUser.usr_id)
        .then(fetchedUser => {
          const token = jwt.sign(
            {email: fetchedUser.email, id: fetchedUser.usr_id, nom: fetchedUser.usr_nom, prenom:fetchedUser.usr_prenom},
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            email: fetchedUser.usr_email,

            id: fetchedUser.usr_id, // should send the whole user !!
            nom: fetchedUser.usr_nom,
            prenom:fetchedUser.usr_prenom,
            token: token,
            expiresIn: 3600
          });
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Authentification failed !",
          error: err
        });
      });
  };
  