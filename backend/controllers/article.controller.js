const Article = require('../models/article');
const Lotstat = require('../models/lotstat');
const Lot = require('../models/lot');
const { Op } = require("sequelize");


exports.createArticle = (req, res, next) => {
const LotId = req.body.lot_id;
const idUser = req.userData.id;
       const article = new Article({
        designation: req.body.designation,
        unite: req.body.unite,
        quantite :req.body.quantite,
         active:1,
         prixUnitaire:req.body.prixUnitaire,
         montant: req.body.montant,
         quantitRealise :req.body.quantitRealise,
         perReal:0,
         perNonReal:100,
         datedebut :req.body.datedebut,
         dateFin :req.body.dateFin,
         usr_id: idUser,
         lot_id:req.body.LotId,
        });
        article.save()
          .then(res => {         
           res.status(201).json({
            message: 'Account created successfully !.',
          })        
        }).catch(err => {
          res.status(500).json({
            error: err,
            message: 'lotn already in use !',
          });
        });
  };

// get lots 
exports.getAllArticles = (req, res, next) => {
  Article.findAll({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
   `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
  include:[
    {
      model:Lot,attributes:[`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, `prj_id`, `active`,'etat']}
  ],
  where: {active: 1}})
    .then((Articles) => {
      res.status(200).json({
        message: 'Articles !',
        Articles: Articles.map(Article => {
          return {
             id: Article.id_art,
             designation: Article.designation,
             unite: Article.unite,
             quantite: Article.quantite,
             prixUnitaire: Article.prixUnitaire,
             montant:Article.montant,
             quantitRealise:Article.quantitRealise,
             perReal:Article.perReal, 
             perNonReal:Article.perNonReal,
             datedebut:Article.datedebut,
             dateFin:Article.dateFin,
             lot_id:  Article.lot_id,
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};


//Update 
exports.UpdateArticle = (req, res, next) => {
  const ArticleId = req.params.id;
  const idUser = req.userData.id;
    Article.findOne({attributes:  [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
    `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
        where:{id_art:ArticleId}
      }
     ).then(article => {
      if (!article) {
        return res.status(401).json({
          message: 'article does not exist !'
        });
      }else{
        article.update({
          designation: req.body.designation,
          unite: req.body.unite,
          quantite: req.body.quantite,
          prixUnitaire: req.body.prixUnitaire,
          montant:req.body.montant,
          quantitRealise:Artreq.bodyicle.quantitRealise,
          perReal:req.body.perReal, 
          perNonReal:req.body.perNonReal,
          datedebut:req.body.datedebut,
          dateFin:req.body.dateFin,
          usr_id: idUser,  
        }) .then(result => {
          res.status(201).json({
            message: 'Article Update  !',
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

//desactiver lot 
exports.Desactiverlot = (req, res, next) => {
  const articleId = req.params.id;
  const idUser = req.userData.id;
  Article.findOne({ attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
  `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
    where:{id_art:articleId}}

   ).then(article => {
    if (!article) {
      return res.status(401).json({
        message: 'article does not exist !'
      });
    }else{
        article.update({
          
          active:0,
          usr_id: idUser,
      }) .then(result => {
        res.status(201).json({
          message: 'article Desactivat  !',
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

//update letat d'avencement d'un Lot
//only change the idlot by id article
exports.UpdateStatLot = (req, res, next) => {

  const idUser = req.userData.id;
  const lotStat = new Lotstat({
      dateUpdate: req.body.dateUpdate,
      Percentage: req.body.percentage,
       usr_id: idUser,
       id_art:req.body.id_art,
  });

  const idArticle = req.body.id;
      lotStat.save()
        .then(result => {
        //update la valuer et calculé at the same time in the lot
        //get lot by id 
        Lot.findOne({attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, `prj_id`, `active`,'etat'],
         where:{lot_id:idlot}}
         ).then(lot => {
          if (!lot) {
            return res.status(401).json({
              message: 'lot does not exist !'
            });
          }else{
              // calcule les date
                 nonrealise = 100- req.body.percentage;
                 realsieCalculer = (req.body.percentage*lot.percentage)/100;
                 nonralisecalculer = lot.percentage - realsieCalculer;
              lot.update({
                percentageRealise:req.body.percentage,
                percentageNonRealise:nonrealise, 
                percentageRealiseCalcule:realsieCalculer,
                percentageNonRealiseCalcule:nonralisecalculer,           
            }) .then(result => {
            //update project valeur 
            const ProjetId = lot.prj_id;
            Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','montent', `usr_id`, `societe_id`, `perRealise`, `perNonReal`],
             where:{prj_id:ProjetId}}
            
             ).then(Projet => {
              if (!Projet) {
                return res.status(401).json({
                  message: 'Projet does not exist !'
                });
              }else{
                // get the montant de projet 
            // calculer le percentage de lot apartire de leur prix et le prix global de projet 
                perRealise1 = Projet.perRealise +lot.percentageRealiseCalcule;
                perNonRealise1 = Projet.perNonReal - perRealise1;
                Projet.update({
                 
                   perRealise:perRealise1,
                   perNonReal:perNonRealise1,
          
      
        
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
            



              res.status(201).json({
                message: 'lot Update  !',
                result: result,
              });
            }).catch(err => {
              res.status(500).json({
                error: err,
              });
            });
          }
        })
   


        // and update it in the projet 
         res.status(201).json({
          message: 'lot update created successfully !.',
        })
      
      }).catch(err => {
        res.status(500).json({
          error: err,
          message: 'lot stat already existe !',
        });
      });
};  

exports.getAlllotStats = (req, res, next) => {
  const lotId = req.params.id;
  Lotstat.findAll({attributes: [`idStat`, `dateUpdate`, `Percentage`, `lot_id`, `usr_id`],
  include:[
    {
      model:Lot,attributes:[`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `prj_id`, `active`,'etat']}
  ],
  where: {lot_id: lotId}})
    .then((lotstats) => {
      res.status(200).json({
        message: 'lots !',
        lotstats: lotstats.map(lotstat => {
          return {
             id: lotstat.idStat,
             dateUpdate: lotstat.dateUpdate,
             percentage: lotstat.Percentage,
             lot_id:  lotstat.lot_id,
             lotTitre: lotstat.lot.titre,
          
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};