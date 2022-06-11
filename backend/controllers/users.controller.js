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
 console.log("Get all users controller")
 
  User.findAll({attributes: ['usr_id', 'usr_nom', 'usr_prenom', 'usr_fonction','usr_mobile', 'usr_address','usr_date_inscription','usr_email'],
  where: {usr_active: 1}})
    .then((users) => {
      //console.log(users[0].usr_email);
      res.status(200).json({
        message: 'Users !',
        users: users.map(user => {
          return {
            id:user.usr_id,
            nom: user.usr_nom,
            prenom: user.usr_prenom,
            fonction: user.usr_fonction,
            dateInscreption: user.usr_date_inscription,
            adress: user.usr_address,
            telephone: user.usr_mobile,
            email: user.usr_email,
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

//

exports.UpdateUser = (req, res, next) => {
  const userId = req.params.id;
 console.log("we are here" , userId)
  User.findOne({   where:{usr_id:userId}}

   ).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'User does not exist !'
      });
    }else{
        user.update({
          usr_nom: req.body.nom,
          usr_prenom: req.body.prenom,
          usr_fonction :req.body.fonction,
          usr_address:req.body.adress,
          usr_active:1,
          usr_date_inscription: req.body.dateInscreption,
          usr_mobile: req.body.telephone,
          usr_email: req.body.email,
          privilege_id:1,
          societe_id:1,
         
      }) .then(result => {
        res.status(201).json({
          message: 'User Update  !',
          result: result,
        });
      }).catch(err => {
        res.status(500).json({
          error: err,
        });
      });
    }
  })
};



//desactiver user 

exports.DesactiverUser = (req, res, next) => {
  const userId = req.params.id;
 console.log("we are here" , userId)
  User.findOne({   where:{usr_id:userId}}

   ).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'User does not exist !'
      });
    }else{
        user.update({
          
          usr_active:0,
      }) .then(result => {
        res.status(201).json({
          message: 'User Desactivat  !',
          result: result,
        });
      }).catch(err => {
        res.status(500).json({
          error: err,
        });
      });
    }
  })
};
