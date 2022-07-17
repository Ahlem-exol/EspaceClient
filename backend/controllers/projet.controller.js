const Projet = require('../models/projet');
const nodemailer = require("nodemailer");
const Societe = require("../models/societe");
const Lot = require('../models/lot');
const Article = require('../models/article');
const sequelize = require('../utils/database');
exports.createProjet = (req, res, next) => {
const idUser = req.userData.id;
const projet = new Projet({
    titre: req.body.titre,
    duree: req.body.duree,
    description :req.body.description,
    localisation:req.body.localisation,
    perRealise :0,
    perNonReal:100,
    active:1,
    montent:0,
    dateDemarage: req.body.dateDemarage,
    dateFin: req.body.dateFin,
    usr_id: idUser,
    societe_id:req.body.societe_id,
});
projet.save()
.then(result => {
  res.status(201).json({
    message: 'project created successfully !.',
  })
}).catch(err => {
  res.status(500).json({
    error: err,
    message: 'Projet is already in use !',
    });
  });
  };

// get Projets 
exports.getAllProjets = (req, res, next) => {
  Projet.findAll({attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','montent',
  'dateFin','societe_id', `perRealise`, `perNonReal`],
  where: {active: 1},
  include:[
      {
         model:Lot,
         on: {
          col1: sequelize.where(sequelize.col("Projet.prj_id"), "=", sequelize.col("lots.prj_id")),
            },
          attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `prj_id`, `active`,'etat'],
        
          where: {active: 1},
          include:[   
      { 
        model:Article,
        on: {
          col2: sequelize.where(sequelize.col("lots.lot_id"), "=", sequelize.col("lots->articles.lot_id")),
            },
        attributes: [`id_art`,`quantite`, `prixUnitaire`, `quantitRealise`, `lot_id`],
        // get col montent d'artciel
        //get montent realise de l'artciel d'un lot  
        where: {active: 1},
      
    }
          ]
      },


  ],
})
    .then((projets) => {
      res.status(200).json({
        message: 'lots !!!',
        projets: projets.map(projet => {
          return {
            id: projet.prj_id,
            titre: projet.titre,
            duree: projet.duree,
            description: projet.description,
            localisation: projet.localisation,
       
            perRealise: 0,
            perNonReal: 0,
            
            dateDemarage: projet.dateDemarage,
            dateFin: projet.dateFin,
            montent:0,
            societe_id:  projet.societe_id,
      
         }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

//get project by id the id apartir of the id of client we get all the information of the project apartire de id Project existe in the client infiromation 
//i will get project by id  manyly
// when i do the user privilage 
// i will log with the client session and get the id from the cleint idpprojet 

exports.getProjet = (req, res, next) => {
// i get the id of the projet from the infoamtion of the societer
   Projet.findOne({attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','montent','dateFin','societe_id', `perRealise`, `perNonReal`],
   include:[
     {
       model:Societe,attributes:['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix']}
   ],
   where: {prj_id:1}})
     .then((projet) => {
       res.status(200).json({
         message: 'Projets !',
         projet:{
              id: projet.prj_id,
              titre: projet.titre,
              duree: projet.duree,
              description: projet.description,
              localisation: projet.localisation,
               perRealise: projet.perRealise,
               perNonReal: projet.perNonReal,
              dateDemarage: projet.dateDemarage,
              dateFin: projet.dateFin,
              montent:projet.montent,
              societe_id:  projet.societe_id,
              raisonSocial: projet.societe.raison_social, 
         },
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
  Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','montent', `usr_id`, `societe_id`, `perRealise`, `perNonReal`],
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
            // perRealise:req.body.perRealise,
            // perNonReal:req.body.perNonReal,
            // montent:req.body.montent,
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
  Projet.findOne({ attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','montent' ,`usr_id`, `societe_id`, `perRealise`, `perNonReal`],
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
