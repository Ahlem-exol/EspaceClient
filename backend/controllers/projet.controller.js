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
          required: false,
        attributes: [`lot_id`, `titre`, `prj_id`, `active`],
        where: {active: 1 },
        include:[   
    { 
      //[sequelize.fn('sum', sequelize.col(montentArticle)), 'montentDeProjet'],
      model:Article,
      on: {
        col2: sequelize.where(sequelize.col("lots.lot_id"), "=", sequelize.col("lots->articles.lot_id")),
          },
          required: false,
      attributes: [[sequelize.fn('sum',  sequelize.literal('quantite * prixUnitaire')), 'montentDeProjet'],[sequelize.fn('sum',  sequelize.literal('quantitRealise * prixUnitaire')), 'montentDeProjetRealise'],`id_art`,`quantite`, `prixUnitaire`, `quantitRealise`, `lot_id`],
      group: ['lot_id'],
      where: {active: 1},     
    } 
      ]
    },
],
group: ['prj_id'],
})
    .then((projets) => {
      // afficher  montent 
      //afficher montent realise 
     

      res.status(200).json({
        
        message: 'projects  !!!',
        projets: projets.map(projet => {
          montent = 0;
          montentRealise=0;
           projet.lots.map(lot => {
            lot.articles.map(article=>{
              montent= article.dataValues.montentDeProjet;
              montentRealise= article.dataValues.montentDeProjetRealise;
            })
          })
         console.log("the montant de projet ", montent , "le montent realise est", montentRealise)
          return {
            id: projet.prj_id,
            titre: projet.titre,
            duree: projet.duree,
            description: projet.description,
            localisation: projet.localisation,
       
            perRealise: montentRealise,
            perNonReal: 0,
            
            dateDemarage: projet.dateDemarage,
            dateFin: projet.dateFin,
            montent:montent,
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
  console.log("getProjet")
  const ProjetId = req.params.id;
// i get the id of the projet from the infoamtion of the societer
   Projet.findOne({attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','montent','dateFin','societe_id', `perRealise`, `perNonReal`],
   include:[
     {
       model:Societe,attributes:['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix']}
   ],
   where: {prj_id:ProjetId}})
     .then((projet) => {
       res.status(200).json({
         message: 'Projets !',
         projet:{
              id: projet.prj_id,
              titre: projet.titre,
              duree: projet.duree,
              dateDemarage: projet.dateDemarage,
              dateFin: projet.dateFin,
           
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
