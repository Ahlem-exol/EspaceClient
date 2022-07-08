const Article = require('../models/article');
const Lotstat = require('../models/lotstat');
const Lot = require('../models/lot');

exports.createArticle = (req, res, next) => {
const LotId = req.body.lot_id;
const idUser = req.userData.id;
const article = new Article({
  designation: req.body.designation,
  unite: req.body.unite,
  quantite :req.body.quantite,
  active:1,
  prixUnitaire:req.body.prixUnitaire,
  montant: req.body.quantite * req.body.prixUnitaire,
  percentage:0,
  perReal:0,
  perNonReal:100,
  perRealiseCalc:0,
  perNonRealiseCalc:100,
  datedebut :req.body.datedebut,
  dateFin :req.body.dateFin,
  usr_id: idUser,
  lot_id:req.body.LotId,
});
  //####################  save article ##################################
article.save().then(res => {
  //####################  Find Lot  ##################################
  Lot.findOne({attributes: ['lot_id','titre','description','duree','dateFinLot','datedebut','montentLot' ,'prj_id', 'active','etat',
  'percentage','percentageRealise', 'percentageNonRealise', 'percentageRealiseCalcule', 'percentageNonRealiseCalcule'],
  where:{lot_id:LotId } &&{active:1}}).then(lot => {
    if (!lot) {
      return res.status(401).json({message: 'lot does not exist !' });
    }else{
      //#################### Update montent Lot  ##################################    
      lot.update({
        montentLot:req.body.montentLot+ req.body.quantite * req.body.prixUnitaire,
        usr_id: idUser, 
      }).then(res => {
      //#################### Get All the article pour le changement de ercentage de chaque article apprtire de montent de Lot ################################## 
      Article.findAll({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
        `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `per`, `perRealiseCalc`, `perNonRealiseCalc`,`dateFin`, `active`],
      where: {active: 1} && {lot_id :lot.lot_id } })
      .then((Articles) => {
           res.status(200).json({
             message: 'Articles !',
             Articles: Articles.map(Article => {
              Article.update({
                per : Article.montant *100/lot.montentLot,
                perNonRealiseCalc: Article.montant *100/lot.montentLot,
                usr_id: idUser, 
              })
             }),
           });
         })
         .catch((err) => {
           console.log(err)
         });
      //#################### Get project and change the montante  ################################## 
        Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin',
        'montent', `usr_id`, `societe_id`, `perRealise`, `perNonReal`],
              where:{prj_id:ProjetId}} 
        ).then(Projet => {
               if (!Projet) {
                 return res.status(401).json({
                   message: 'Projet does not exist !'
                 });
               }else{
                   Projet.update({
                       montent:Projet.montant + lot.montentLot,
                       usr_id: idUser,
                 }) .then(result => {
 //#################### Get All the Lots pour le changement de percentage de chaque Lots apprtire de montent de Project ################################## 
        Lot.findAll({attributes:['lot_id','titre','description','duree','dateFinLot','datedebut','montentLot' ,'prj_id', 'active','etat',
        'percentage','percentageRealise', 'percentageNonRealise', 'percentageRealiseCalcule', 'percentageNonRealiseCalcule'],
         where: {active: 1} && {prj_id :Projet.prj_id } })
         .then((Lots) => {
                     res.status(200).json({
                       message: 'Lots !',
                       Lots: Lots.map(lot => {
                        lot.update({
                          percentage : lot.montentLot *100/Projet.montent,
                          percentageNonRealiseCalcule : lot.montentLot *100/Projet.montent,
                          usr_id: idUser, 
                        })
                       }),
                     });
          })})
               }
             })
            })
          }
        })    
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
          montant: req.body.quantite * req.body.prixUnitaire,
          datedebut:req.body.datedebut,
          dateFin:req.body.dateFin,
          usr_id: idUser,  
        }) .then(result => {

          Lot.findOne({attributes: ['lot_id','titre','description','duree','dateFinLot','datedebut','montentLot' ,'prj_id', 'active','etat',
          'percentage','percentageRealise', 'percentageNonRealise', 'percentageRealiseCalcule', 'percentageNonRealiseCalcule'],
             where:{lot_id:LotId}
           }
          ).then(lot => {
           if (!lot) {
             return res.status(401).json({
               message: 'lot does not exist !'
             });
           }else{
               lot.update({
                 montentLot:req.body.montentLot+ req.body.quantite * req.body.prixUnitaire,
                 usr_id: idUser, 
             }) .then(result => {
               res.status(201).json({
                 message: 'lot Update  !',
                 result: result,
               });
               //Update project
               Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','montent', `usr_id`, `societe_id`, `perRealise`, `perNonReal`],
               where:{prj_id:ProjetId}}
            
               ).then(Projet => {
                if (!Projet) {
                  return res.status(401).json({
                    message: 'Projet does not exist !'
                  });
                }else{
                    Projet.update({
                        montent:Projet.montant + lot.montentLot,
                        usr_id: idUser,
 
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
             }).catch(err => {
               res.status(500).json({
                 error: err,
               });
             });
           }
         })     
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


        Lot.findOne({attributes: ['lot_id','titre','description','duree','dateFinLot','datedebut','montentLot' ,'prj_id', 'active','etat',
        'percentage','percentageRealise', 'percentageNonRealise', 'percentageRealiseCalcule', 'percentageNonRealiseCalcule'],
           where:{lot_id:LotId}
         }
        ).then(lot => {
         if (!lot) {
           return res.status(401).json({
             message: 'lot does not exist !'
           });
         }else{
             lot.update({
               montentLot:req.body.montentLot - req.body.quantite * req.body.prixUnitaire,
               usr_id: idUser, 
           }) .then(result => {
             res.status(201).json({
               message: 'lot Update  !',
               result: result,
             });
             //Update project
             Projet.findOne({  attributes: ['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage','dateFin','montent', `usr_id`, `societe_id`, `perRealise`, `perNonReal`],
             where:{prj_id:ProjetId}}
          
             ).then(Projet => {
              if (!Projet) {
                return res.status(401).json({
                  message: 'Projet does not exist !'
                });
              }else{
                  Projet.update({
                      montent:Projet.montant + lot.montentLot,
                      usr_id: idUser,

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



           }).catch(err => {
             res.status(500).json({
               error: err,
             });
           });
         }
       })     




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
  const lotStat = new Lotstat({
    //get from the system 
      dateUpdate: req.body.dateUpdate,
      //quantitie réealise 
      Percentage: req.body.percentage,
       usr_id: idUser,
       id_art:req.body.id,
  });
  const idArticle = req.body.id;
  lotStat.save().then(res => {
   Article.findOne({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`, `montant`, `quantitRealise`, 
   `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
    where:{id_art:idArticle}}
    ).then(article => {
      if (!article) {
            return res.status(401).json({
              message: 'article does not exist !'
            });
      }else{
        realise = (req.body.percentage*article.prixUnitaire)/article.montant*100;
        nonRealise = article.perNonReal-realise;              
        article.update({
          quantitRealise:req.body.percentage,
          perReal:realise, 
          perNonReal:nonRealise,           
          }) .then(result => {
          Lot.findOne({attributes: ['lot_id','titre','description','duree','dateFinLot','datedebut','montentLot' ,
          'prj_id', 'active','etat','percentage','percentageRealise', 'percentageNonRealise', 'percentageRealiseCalcule', 'percentageNonRealiseCalcule'], 
            where:{lot_id:article.lot_id}
          }
         ).then(lot => {
          console.log(lot)
          if (!lot) {
            return res.status(401).json({
              message: 'lot does not exist !'
            });
          }else{
            //get all the article existe in the lot
           const somPer=0;
          Article.findAll({attributes: [`id_art`, `designation`, `unite`, `quantite`, `prixUnitaire`,
            `montant`, `quantitRealise`, `lot_id`, `usr_id`, `perReal`, `perNonReal`, `datedebut`, `dateFin`, `active`],
           where: {lot_id:lot.lot_id}})
             .then((Articles) => {
               res.status(200).json({
                 message: 'Articles !',
                 Articles: Articles.map(Article => {
                   console.log(somPer)
                   somPer= somPer +article.perReal
                 }),
               });
             })
             .catch((err) => {
               console.log(err)
             });
              lot.update({
                montentLot:lot.montentLot+article.montant,
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













    
      




   res.status(201).json({
          message: 'Article update successfully !!',
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



