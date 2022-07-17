const Article = require('../models/article');
const Lotstat = require('../models/lotstat');
const Lot = require('../models/lot');
const Projet = require('../models/projet');
const { lt } = require('date-fns/locale');

exports.createArticle = (req, res, next) => {
const LotId = req.body.lot_id;
const idUser = req.userData.id;
const montantCalcule  = req.body.quantite * req.body.prixUnitaire;
const article = new Article({
  designation: req.body.designation,
  unite: req.body.unite,
  quantite :req.body.quantite,
  active:1,
  prixUnitaire:req.body.prixUnitaire,
  datedebut :req.body.datedebut,
  dateFin :req.body.dateFin,
  usr_id: idUser,
  lot_id:LotId,
  // we should not put in the data base calculation information 
  // ishoud delete it later
  montant: 0,
  quantitRealise:0,
  per:0,
  perReal:0,
  perNonReal:100,
  perRealiseCalc:0,
  perNonRealiseCalc:100,
});
article.save().then(res => {
 res.status(201).json({
   message: 'Article created successfully !.',
})        
}).catch(err => {
          res.status(500).json({
            error: err,
            message: 'Article already in use !',
          });
});
};

//Update 
exports.UpdateArticle = (req, res, next) => {
  const ArticleId = req.params.id;
  const idUser = req.userData.id;
    Article.findOne({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
    `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `per`, `perRealiseCalc`, `perNonRealiseCalc`,`dateFin`, `active`],
        where:{id_art:ArticleId}  && {active:1}
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
          datedebut:req.body.datedebut,
          dateFin:req.body.dateFin,
          lot_id:req.body.lot,
          usr_id: idUser,  
        }).then(result => {
          res.status(201).json({
            message: 'Article Update  !!!',
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
//desactiver Article c'est la focntion pour suppriumer un article 
//in the sme we recalculer le montant et les percentage de lot est projet  
exports.DesactiverArticle = (req, res, next) => {
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

//update letat d'avencement d'un Article
exports.UpdateStatLot = (req, res, next) => {
  const idUser = req.userData.id;
  console.log("we are in the backend " , req.body);
  const lotStat = new Lotstat({
       //get from the system 
       dateUpdate: req.body.dateUpdate,
       //quantitie réealise 
       Percentage: req.body.percentage,
       usr_id: idUser,
       id_art:req.body.id_art,
  }); 

  lotStat.save().then(res => {
    
    // update quantite realise dans article
    Article.findOne({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
    `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `per`, `perRealiseCalc`, `perNonRealiseCalc`,`dateFin`, `active`],
        where:{id_art:req.body.id_art}  && {active:1}
      }
     ).then(article => {
      console.log(article)
      if (!article) {
        return res.status(401).json({
          message: 'article does not exist !'
        });
      }else{
        console.log("article")
        article.update({
          quantitRealise: req.body.percentage,
          usr_id: idUser,  
        })
        console.log(" update article")
      }
    })
   res.status(201).json({
          message: 'Article montant realisé update successfully !!',
   })    
}).catch(err => {
  res.status(500).json({
          error: err,
          message: 'lot stat already existe !',
        });
});
};  

exports.getAlllotStats = (req, res, next) => {
  const ArticleId = req.params.id;
  Lotstat.findAll({attributes: [`idStat`, `dateUpdate`, `Percentage`, `id_art`, `usr_id`],
  include:[
    {
      model:Article,attributes:[`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`, `montant`, `quantitRealise`, 
      `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`]}
  ],
  where: {id_art: ArticleId}})
    .then((lotstats) => {
      res.status(200).json({
        message: 'lots !',
        lotstats: lotstats.map(lotstat => {
          return {
             id: lotstat.idStat,
             dateUpdate: lotstat.dateUpdate,
             percentage: lotstat.Percentage,
             id_art:  lotstat.id_art,
             lotTitre: lotstat.lot.titre,       
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

// get lots 
exports.getAllArticles = (req, res, next) => {
  const lotId = req.params.id;
  console.log("get all the ")
  Article.findAll({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
   `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
  include:[
    {
      model:Lot,attributes:[`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, `prj_id`, `active`,'etat']}
  ],
  where: {active: 1}&& {lot_id: lotId} })
    .then((Articles) => {
      res.status(200).json({
        message: 'Articles !',
        Articles: Articles.map(Article => {
          // i sould calculat the statistique 
          // calculer le montent de artciel
          montant = Article.prixUnitaire* Article.quantite;
          console.log("montent article ", montant);
          // calculer le montant realise 
          montantRealise = Article.prixUnitaire*Article.quantitRealise;
          console.log("montant realise de article ",montantRealise)
          // calcuer le percentage realise 
          percentageRealise = montantRealise/montant*100;
          console.log("percnetage realise de article ",percentageRealise)
          //calculer le percentage non realise 
          percentageNonRealise = 100 - percentageRealise;
          console.log("percentage non relise ", percentageNonRealise)
          
          return {
             id: Article.id_art,
             designation: Article.designation,
             unite: Article.unite,
             prixUnitaire: Article.prixUnitaire,
             quantite: Article.quantite,
             quantitRealise:Article.quantitRealise,
            // Calculer 
             montant:montant,
             montantRealise:montantRealise,
             perReal:percentageRealise, 
             perNonReal:percentageNonRealise,


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

