const Lot = require('../models/lot');
const Lotstat = require('../models/lotstat');
const Projet = require('../models/projet');
const { Op } = require("sequelize");
const Article = require('../models/article');
exports.createlot = (req, res, next) => {
// get the projet by id here then get only the price pour claculer le percentage de cette lot 
const ProjetId = req.body.prj_id;
const idUser = req.userData.id;
const lot = new Lot({
      titre: req.body.titre,
      duree: req.body.duree,
      description :req.body.description,
      active:1,
      montentLot:0,
      dateFinLot: req.body.dateFinLot,
      datedebut :req.body.datedebut,
      etat:req.body.etat,
      percentage:0, 
      percentageRealise:0,
      percentageNonRealise:100, 
      percentageRealiseCalcule:0,
      percentageNonRealiseCalcule:0 ,
      usr_id: idUser,
      prj_id:req.body.prj_id,
     });

     lot.save()
       .then(result => {
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
exports.getAlllots = (req, res, next) => {
 
  Lot.findAll({attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' ,
   `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, 
   `prj_id`, `active`,'etat'],
  include:[
    {
      model:Projet,attributes:['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage']},
      

  ],
  where: {active: 1}})
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
          console.log("montant de lot ",montentLot);
          console.log("montnt realise d'un lot ",montentRealise)
    // Calculer le percentage realise and notRealiser
    percentageRealise = montentRealise /montentLot*100 ;
    percentageNonRealise=100-percentageRealise; 
    console.log("le percentgae realise de lot ", percentageRealise )
    console.log("le percentgae realise de lot ", percentageNonRealise )

    res.status(200).json({
      message: 'lots !!!',
      lots: lots.map(lot => {
        return {
           id: lot.lot_id,
           titre: lot.titre,
           duree: lot.duree,
           description: lot.description,
           dateFinLot: lot.dateFinLot,
           datedebut:lot.datedebut,
          
           montentLot:montentLot,

           percentageRealise:percentageRealise,
           percentageNonRealise:percentageNonRealise,
           etat:lot.etat,
           projet_id:  lot.prj_id,
           projeTitre: lot.projet.titre,
          projet:{
           id: lot.projet.prj_id,
           titre: lot.projet.titre,
           duree: lot.projet.duree,
           description: lot.projet.description,
           localisation: lot.projet.localisation,       
          }
        }
      }),
    });
        })
      })
    
  
   
    })
    .catch((err) => {
      console.log(err)
    });
};

//Get lot  en cour et en attend
exports.GetLotEnattend = (req, res, next) => {
  const lotId = req.params.id;
  const idUser = req.userData.id;
  Lot.findAll({attributes:[`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, `prj_id`, `active`,'etat'],
  include:[
    {
      model:Projet,attributes:['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage'],},],
   where:
      { percentage:{ [Op.notIn]:100}, }
  //  {etat:'En attente' || etat:'En attente'}
  }
   ).then((lots) => {
console.log("this the non start ou  en cour de ramsiation ", lots);
    res.status(200).json({
      message: 'lots !',
      lots: lots.map(lot => {
        return {
           id: lot.lot_id,
           titre: lot.titre,
           duree: lot.duree,
           description: lot.description,
           dateFinLot: lot.dateFinLot,
           datedebut:lot.datedebut,
           montentLot:lot.montentLot,
           percentage:lot.percentage, 
           percentageRealise:lot.percentageRealise,
           percentageNonRealise:lot.percentageNonRealise,
           percentageRealiseCalcule:lot.percentageRealiseCalcule,
           percentageNonRealiseCalcule:lot.percentageNonRealiseCalcule,
           etat:lot.etat,
           projet_id:  lot.prj_id,
           projeTitre: lot.projet.titre,
       
        }
      }),
    });
  })
  .catch((err) => {
    console.log(err)
  });
};

//Get lot Fini 
exports.GetLotFini = (req, res, next) => {
  const lotId = req.params.id;
  const idUser = req.userData.id;
  Lot.findAll({attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`,'datedebut','montentLot' , `percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`, `prj_id`, `active`,'etat'],
  include:[
    {
      model:Projet,attributes:['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage'],},],
      where: {
       
        percentage:100,
      },
    }

   ).then((lots) => {
    console.log("this the lots fini  ", lots);
    res.status(200).json({
      message: 'lots !',
      lots: lots.map(lot => {
        return {
           id: lot.lot_id,
           titre: lot.titre,
           duree: lot.duree,
           description: lot.description,
           dateFinLot: lot.dateFinLot,
           datedebut:lot.datedebut,
           montentLot:lot.montentLot,
           percentage:lot.percentage, 
           percentageRealise:lot.percentageRealise,
           percentageNonRealise:lot.percentageNonRealise,
           percentageRealiseCalcule:lot.percentageRealiseCalcule,
           percentageNonRealiseCalcule:lot.percentageNonRealiseCalcule,
           etat:lot.etat,
           projet_id:  lot.prj_id,
           projeTitre: lot.projet.titre,
       
        }
      }),
    });
  })
  .catch((err) => {
    console.log(err)
  });
};

//Update 
exports.Updatelot = (req, res, next) => {
  const lotId = req.params.id;
  const idUser = req.userData.id;
  console.log(req.body)
// get the projet by id here then get only the price pour claculer le percentage de cette lot 
const ProjetId = req.body.projet_id;

Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','montent', `usr_id`, `societe_id`, `perRealise`, `perNonReal`],
 where:{prj_id:ProjetId}}

 ).then(Projet => {
  if (!Projet) {
    return res.status(401).json({
      message: 'Projet does not exist !'
    });
  }else{
  
    // calculer le percentage de lot apartire de leur prix et le prix global de projet 
    per = (req.body.montentLot *100)/Projet.montent;
    console.log(per)
    Lot.findOne({attributes: ['lot_id','titre','description','duree','dateFinLot','datedebut','montentLot' ,'prj_id', 'active','etat','percentage','percentageRealise', 'percentageNonRealise', 'percentageRealiseCalcule', 'percentageNonRealiseCalcule'],
   
        where:{lot_id:lotId}
      }
     ).then(lot => {
      console.log(lot)
      if (!lot) {
        return res.status(401).json({
          message: 'lot does not exist !'
        });
      }else{
          lot.update({
            titre: req.body.titre,
            duree: req.body.duree,
            description :req.body.description,
            active:1,
            montentLot:req.body.montentLot,
            percentage:per, 
            percentageRealise:lot.percentageRealise,
            percentageNonRealise:lot.percentageNonRealise, 
            percentageRealiseCalcule:lot.percentageRealiseCalcule,
            percentageNonRealiseCalcule:lot.percentageNonRealiseCalcule,
            dateFinLot: req.body.dateFinLot,
            datedebut:req.body.datedebut,
            etat:req.body.etat,
            usr_id: idUser,
            prj_id:req.body.projet,    
        }) .then(result => {
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
  }
})


};

//desactiver lot 
exports.Desactiverlot = (req, res, next) => {
  console.log("we try to delet the lot ")
  const lotId = req.params.id;
  const idUser = req.userData.id;
  Lot.findOne({ attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`, 'datedebut','montentLot',`usr_id`, `prj_id`, `active`,`percentage`, `percentageRealise`, `percentageNonRealise`, `percentageRealiseCalcule`, `percentageNonRealiseCalcule`],
    where:{lot_id:lotId}}

   ).then(lot => {
    if (!lot) {
      return res.status(401).json({
        message: 'lot does not exist !'
      });
    }else{
        lot.update({
          
          active:0,
          usr_id: idUser,
      }) .then(result => {
        res.status(201).json({
          message: 'lot Desactivat  !',
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
exports.UpdateStatLot = (req, res, next) => {
  console.log(req.body)
  //here is must be we get the lot and we update the apll the statistique apaartier 
  //then we shoul also get all thelo  an calcule the satoyique of the project §§§

  const idUser = req.userData.id;
  const lotStat = new Lotstat({
      dateUpdate: req.body.dateUpdate,
      Percentage: req.body.percentage,
       usr_id: idUser,
       lot_id:req.body.lot_id,
  });

  const idlot = req.body.lot_id;
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