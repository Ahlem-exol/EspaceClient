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

  const options ={
    from:"bsn-dz@alrim.dz",
    to:"chelliahlem98@gmail.com",
    subject:"sending email with node js §",
    text:"wow! that's simple"
  };
  transporter.sendMail(options, function(err,info){
    if(err){
      console.log(err);
      return;
    }
    console.log("Sent:  "+info.response);
  });
    //  bcrypt.hash(password,10).then(hash=>{
   

    //    const user = new User({
    //       usr_nom: req.body.nom,
    //       usr_prenom: req.body.prenom,
    //       usr_fonction :req.body.fonction,
    //       usr_address:req.body.adress,
    //       usr_active:1,
    //       usr_date_inscription: req.body.dateInscreption,
    //       usr_mobile: req.body.telephone,
    //       usr_email: req.body.email,
    //       usr_password: hash,
    //       privilege_id:1,
    //       societe_id:1,
    //     });
    //          user.save()
    //       .then(result => {

        
    //       });   
    //        res.status(201).json({
    //         message: 'Account created successfully ! \n Please wait for the admin\'s approval.',
           
    //       });
    //  })
    //     .catch(err => {
    //       res.status(500).json({
    //         error: err,
    //         message: 'Username or Email already in use !',
    //       });
    //     });
    
  };