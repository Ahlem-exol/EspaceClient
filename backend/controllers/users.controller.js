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
    

        user.save()
          .then(result => {
        
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