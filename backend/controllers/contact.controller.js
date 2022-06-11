//for generation et cryp the password 
const bcrypt = require("bcrypt");
var generator = require('generate-password');
const Contact = require('../models/contact');

const nodemailer = require("nodemailer");
const Societe = require("../models/societe");

// const contactPrivilege = require('../models/contact_privilege');

exports.createcontact = (req, res, next) => {
    const idUser = req.userData.id;
   
 
  var password = generator.generate({
    length: 10,
    numbers: true
  });
 console.log(password);
  
 bcrypt.hash(password,10).then(hash=>{
  console.log("we save contact", req.body,idUser );
       const contact = new Contact({
          clt_nom: req.body.nom,
          clt_prenom: req.body.prenom,
          clt_fonction :req.body.fonction,
          clt_address:req.body.adress,
          clt_active:1,
          clt_date_inscription: req.body.dateInscreption,
          clt_mobile: req.body.telephone,
          clt_email: req.body.email,
          clt_password: hash,
          usr_id: idUser,
          societe_id:req.body.idSociete,
        });

        contact.save()
          .then(result => {
            console.log("we save contact");
            //Invalid login: 451 4.7.0 Temporary server error. Please try again later. PRX2  
            //this erreur apard in case when i put it here when i got it out it s work
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
         
           
           res.status(201).json({
            message: 'Account created successfully !.',
           
          })
        
        }).catch(err => {
          res.status(500).json({
            error: err,
            message: 'contactname or Email already in use !',
          });
        });

       

     })
        
    
  };


// get contacts 
exports.getAllcontacts = (req, res, next) => {
 console.log("Get all contacts controller")
 
  Contact.findAll({attributes: ['clt_id', 'clt_nom', 'clt_prenom', 'clt_fonction','clt_mobile', 'clt_address','clt_date_inscription','clt_email'],
  include:[
    {
      model:Societe,attributes:['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix']}
  ],
  where: {clt_active: 1}})
    .then((contacts) => {
      //console.log(contacts[0].clt_email);
      res.status(200).json({
        message: 'contacts !',
        contacts: contacts.map(contact => {
          return {
            id:contact.clt_id,
            nom: contact.clt_nom,
            prenom: contact.clt_prenom,
            fonction: contact.clt_fonction,
            dateInscreption: contact.clt_date_inscription,
            adress: contact.clt_address,
            telephone: contact.clt_mobile,
            email: contact.clt_email,
            raisonSocial: contact.societe.raison_social,
            
            societe:{
                id:contact.societe.societe_id,
                raisonSocial: contact.societe.raison_social,
                adresse :contact.societe.adresse,
                mail:contact.societe.mail,
                telephone:contact.societe.telephone,
                description: contact.societe.description,
                fixe: contact.societe.fix,
            }
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

//

exports.Updatecontact = (req, res, next) => {
  const contactId = req.params.id;
  const idUser = req.userData.id;
 console.log("we are here" , contactId)
  Contact.findOne({  attributes: ['clt_id', 'clt_nom', 'clt_prenom', 'clt_fonction','clt_mobile', 'clt_address','clt_date_inscription','clt_email','societe_id'], where:{clt_id:contactId}}

   ).then(contact => {
    if (!contact) {
      return res.status(401).json({
        message: 'contact does not exist !'
      });
    }else{
        contact.update({
          clt_nom: req.body.nom,
          clt_prenom: req.body.prenom,
          clt_fonction :req.body.fonction,
          clt_address:req.body.adress,
          clt_active:1,
          clt_date_inscription: req.body.dateInscreption,
          clt_mobile: req.body.telephone,
          clt_email: req.body.email,
          societe_id:req.body.societe,
          usr_id: idUser,
         
      }) .then(result => {
        res.status(201).json({
          message: 'contact Update  !',
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



//desactiver contact 

exports.Desactivercontact = (req, res, next) => {
  const contactId = req.params.id;
  const idUser = req.userData.id;
 console.log("we are here" , contactId)
  Contact.findOne({ attributes: ['clt_id', 'clt_nom', 'clt_prenom', 'clt_fonction','clt_mobile', 'clt_address','clt_date_inscription','clt_email'],
    where:{clt_id:contactId}}

   ).then(contact => {
    if (!contact) {
      return res.status(401).json({
        message: 'contact does not exist !'
      });
    }else{
        contact.update({
          
          clt_active:0,
          usr_id: idUser,
      }) .then(result => {
        res.status(201).json({
          message: 'contact Desactivat  !',
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
