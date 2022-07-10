const Projet = require('../models/projet');
const nodemailer = require("nodemailer");
const Societe = require("../models/societe");

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
 console.log("Get all Projets controller")
  Projet.findAll({attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','montent','dateFin','societe_id', `perRealise`, `perNonReal`],
  include:[
    {
      model:Societe,attributes:['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix']}
  ],
  where: {active: 1}})
    .then((projets) => {
      // pour calculer
      montentProjet = 0;
      montentProjetRealise =0;
      percentageRealise =0;
      percentgaeNonRealise =100;  
     projets.map(projet => {
      Lot.findAll({attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, `prj_id`, `active`,'etat'],
      where: {active: 1} && {prj_id:projet.prj_id}})
        .then((lots) => {
         // calculer 
          montentLot=0;
          montentRealise=0;
          percentage=0;
          percentageRealise=0;
          percentageNonRealise=0;
          lots.map(lot => {
           //Get all the article pour calcuer le montentde lot et montent realise 
           Article.findAll({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
           `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
           where: {active: 1} && {lot_id:lot.lot_id}})
            .then((Articles) => {   
             Articles: Articles.map(Article => {
                // i sould Calculer la comme
                montentLot = montentLot+(Article.prixUnitaire*Article.quantite);
                montentRealise = montentRealise+(Article.prixUnitaire*Article.quantitRealise);
              })
            })
          }),
          console.log("montant de lot ",montentLot);
          console.log("montnt realise d'un lot ",montentRealise)
          // Calculer le percentage realise and notRealiser
          montentProjet = montentProjet +montentLot;
          montentProjetRealise =montentProjetRealise +montentRealise;
        })
     }),
     console.log("montant de projet ",montentProjet);
     console.log("montnt realise d'un projet ",montentProjetRealise)
//caluler percentage
percentageRealise = montentProjetRealise /montentProjet*100 ;
percentgaeNonRealise=100-percentgaeNonRealise; 
      res.status(200).json({
        message: 'Projets !',
        projets: projets.map(projet => {
          return {
             id: projet.prj_id,
             titre: projet.titre,
             duree: projet.duree,
             description: projet.description,
             localisation: projet.localisation,

             perRealise: percentageRealise,
             perNonReal: percentgaeNonRealise,
             
             dateDemarage: projet.dateDemarage,
             dateFin: projet.dateFin,
             montent:montentProjet,
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
