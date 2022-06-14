const Lot = require('../models/lot');
const Projet = require('../models/projet');

// const lotPrivilege = require('../models/lot_privilege');
//      //SELECT `lot_id`, `titre`, `description`, `duree`, `dateFinLot`, `usr_id`, `prj_id`, `active` FROM `lot` WHERE 1
exports.createlot = (req, res, next) => {

  console.log(req.body)
    const idUser = req.userData.id;
       const lot = new Lot({
         titre: req.body.titre,
         duree: req.body.duree,
         description :req.body.description,
         active:1,
         dateFinLot: req.body.dateFinLot,
         usr_id: idUser,
         prj_id:req.body.prj_id,
        });

        lot.save()
          .then(result => {
            console.log("we save lot");
          
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
 
  Lot.findAll({attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`, `prj_id`, `active`],
  include:[
    {
      model:Projet,attributes:['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage']}
  ],
  where: {active: 1}})
    .then((lots) => {

      res.status(200).json({
        message: 'lots !',
        lots: lots.map(lot => {
          console.log(lot)
          return {
             id: lot.lot_id,
             titre: lot.titre,
             duree: lot.duree,
             description: lot.description,
             dateFinLot: lot.dateFinLot,
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
    .catch((err) => {
      console.log(err)
    });
};

//Update 
exports.Updatelot = (req, res, next) => {
  const lotId = req.params.id;
  const idUser = req.userData.id;
 console.log("we are here" , req.body)
  Lot.findOne({attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`, `prj_id`, `active`],
  include:[
    {
      model:Projet,attributes:['prj_id', 'titre', 'duree', 'description','localisation', 'dateDemarage'],},],
   where:{lot_id:lotId}}

   ).then(lot => {
    console.log("lot  the we fond it ",lot )
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
          dateFinLot: req.body.dateFinLot,
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
};

//desactiver lot 
exports.Desactiverlot = (req, res, next) => {
  const lotId = req.params.id;
  const idUser = req.userData.id;
 console.log("we are here" , lotId)
  Lot.findOne({ attributes: [`lot_id`, `titre`, `description`, `duree`, `dateFinLot`, `usr_id`, `prj_id`, `active`],
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
