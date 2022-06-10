//for generation et cryp the password 
const bcrypt = require("bcrypt");
var generator = require('generate-password');
const User = require('../models/user');

const nodemailer = require("nodemailer");

// const UserPrivilege = require('../models/user_privilege');

exports.createUser = (req, res, next) => {
 
  let transporter = nodemailer.createTransport({
    host: 'mail.alrim.dz',
    port: '25',
    secure: false,
    auth: { 
      user:"bsn-dz@alrim.dz",
      pass:"caster2500"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  var password = generator.generate({
    length: 10,
    numbers: true
  });
 console.log(password);
  
 bcrypt.hash(password,10).then(hash=>{
  
       const user = new User({
          usr_nom: req.body.nom,
          usr_prenom: req.body.prenom,
          usr_fonction :req.body.fonction,
          usr_address:req.body.adress,
          usr_active:1,
          usr_date_inscription: req.body.dateInscreption,
          usr_mobile: req.body.telephone,
          usr_email: req.body.email,
          usr_password: hash,
          privilege_id:1,
          societe_id:1,
        });

        user.save()
          .then(result => {
            //Invalid login: 451 4.7.0 Temporary server error. Please try again later. PRX2  
            //this erreur apard in case when i put it here when i got it out it s work
            const options ={
              from:"bsn-dz@alrim.dz",
              to:"chelliahlem98@gmail.com",
              subject:"Compte user ",
              text:"wit's support technique \n voter nom d'utilisateur : "+req.body.email +"\n voter password : " +password, 
            };
            transporter.sendMail(options, function(err,info){
              if(err){
                console.log(err);
                return;
              }
              console.log("Sent:  "+info.response);
            });
          });   
           res.status(201).json({
            message: 'Account created successfully !.',
           
          }).catch(err => {
          res.status(500).json({
            error: err,
            message: 'Username or Email already in use !',
          });
        });
     })
        
    
  };


// get users 

exports.getAllUsers = (req, res, next) => {
  User.findAll({attributes: ['user_id', 'usr_nom', 'usr_prenom', 'usr_pseudo', 'usr_email']})
    .then((users) => {
      //console.log(users[0].usr_email);
      res.status(200).json({
        message: 'Users !',
        users: users.map(user => {
          return {
            id: user.user_id,
            nom: user.usr_nom,
            prenom: user.usr_prenom,
            pseudo: user.usr_pseudo,
            email: user.usr_email,
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};
