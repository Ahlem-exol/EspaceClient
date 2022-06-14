const Projet = require('../models/projet');
const nodemailer = require("nodemailer");
const Societe = require("../models/societe");

// const ProjetPrivilege = require('../models/Projet_privilege');

exports.createProjet = (req, res, next) => {
  console.log(typeof(req.body.dateFin), req.userData);
    const idUser = req.userData.id;
       const projet = new Projet({
         titre: req.body.titre,
         duree: req.body.duree,
         description :req.body.description,
         localisation:req.body.localisation,
         active:1,
         dateDemarage: req.body.dateDemarage,
         dateFin: req.body.dateFin,
         usr_id: idUser,
         societe_id:req.body.societe_id,
        });

        projet.save()
          .then(result => {
            console.log("we save projet");
          
           res.status(201).json({
            message: 'Account created successfully !.',
          })
        
        }).catch(err => {
          res.status(500).json({
            error: err,
            message: 'Projetn already in use !',
          });
        });
  };

// get Projets 
exports.getAllProjets = (req, res, next) => {
 console.log("Get all Projets controller")
 
  Projet.findAll({attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','societe_id'],
  include:[
    {
      model:Societe,attributes:['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix']}
  ],
  where: {active: 1}})
    .then((projets) => {

      res.status(200).json({
        message: 'Projets !',
        projets: projets.map(projet => {
          return {

             id: projet.prj_id,
             titre: projet.titre,
             duree: projet.duree,
             description: projet.description,
             localisation: projet.localisation,
             dateDemarage: projet.dateDemarage,
             dateFin: projet.dateFin,
             societe_id:  projet.societe_id,
             raisonSocial: projet.societe.raison_social,
            
            societe:{
                id:projet.societe.societe_id,
                raisonSocial: projet.societe.raison_social,
                adresse :projet.societe.adresse,
                mail:projet.societe.mail,
                telephone:projet.societe.telephone,
                description: projet.societe.description,
                fixe: projet.societe.fix,
            }
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

//Update 
exports.UpdateProjet = (req, res, next) => {
  const ProjetId = req.params.id;
  const idUser = req.userData.id;
 console.log("we are here" , ProjetId)
  Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin', `usr_id`, `societe_id`],
   where:{prj_id:ProjetId}}

   ).then(Projet => {
    if (!Projet) {
      return res.status(401).json({
        message: 'Projet does not exist !'
      });
    }else{
        Projet.update({
            titre: req.body.titre,
            duree: req.body.duree,
            description :req.body.description,
            localisation:req.body.localisation,
           
            dateDemarage: req.body.dateDemarage,
            dateFin: req.body.dateFin,
            usr_id: idUser,
            societe_id:req.body.societe,

        
         
      }) .then(result => {
        res.status(201).json({
          message: 'Projet Update  !',
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

//desactiver Projet 
exports.DesactiverProjet = (req, res, next) => {
  const ProjetId = req.params.id;
  const idUser = req.userData.id;
 console.log("we are here" , ProjetId)
  Projet.findOne({ attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin', `usr_id`, `societe_id`],
    where:{prj_id:ProjetId}}

   ).then(Projet => {
    if (!Projet) {
      return res.status(401).json({
        message: 'Projet does not exist !'
      });
    }else{
        Projet.update({
          
          active:0,
          usr_id: idUser,
      }) .then(result => {
        res.status(201).json({
          message: 'Projet Desactivat  !',
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
