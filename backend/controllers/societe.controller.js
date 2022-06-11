
const Societe = require('../models/societe');

exports.createSociete = (req, res, next) => {
    const idUser = req.userData.id;
  
    
       const societe = new Societe({
        raison_social: req.body.raisonSocial,
        adresse :req.body.adresse,
        mail:req.body.mail,
        telephone:req.body.telephone,
        description: req.body.description,
        active: 1,
        fix: req.body.fix,
        usr_id: idUser,
        });

        societe.save()
          .then(result => {      
           res.status(201).json({
            message: 'Account created successfully !.',
           
        })
    }).catch(err => {
          res.status(500).json({
            error: err,
            message: 'societename or Email already in use !',
          });
        });
  };


// get Societe 
exports.getAllSociete = (req, res, next) => {
  
 Societe.findAll({attributes: ['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix'],
  where: {active: 1}})
    .then((societes) => {
      res.status(200).json({
        message: 'Clients  !',
        societes: societes
    
        .map(societe => {
          console.log(societe);
          return {
            id:societe.societe_id,
            raisonSocial: societe.raison_social,
            adresse :societe.adresse,
            mail:societe.mail,
            telephone:societe.telephone,
            description: societe.description,
            fix: societe.fix,
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

//UpdateSociete 
exports.UpdateSociete = (req, res, next) => {
  const societeId = req.params.id;
  const idUser = req.userData.id;
  Societe.findOne({ attributes: ['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix','usr_id'],
    where:{societe_id:societeId}}

   ).then(societe => {
    if (!societe) {
      return res.status(401).json({
        message: 'societe does not exist !'
      });
    }else{
        societe.update({
          raison_social: req.body.raisonSocial,
          adresse :req.body.adresse,
          mail:req.body.mail,
          telephone:req.body.telephone,
          description: req.body.description,
          fix: req.body.fix,
          usr_id: idUser,
         
      }) .then(result => {
        res.status(201).json({
          message: 'societe Update  !',
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
//desactiver societe 

exports.DesactiverSociete = (req, res, next) => {
  const societeId = req.params.id;
  const idUser = req.userData.id;
 
  Societe.findOne({attributes: ['societe_id', 'raison_social', 'adresse', 'mail','telephone', 'description','fix'],
  where:{societe_id:societeId}}

   ).then(societe => {
     console.log(societe)
    if (!societe) {
      return res.status(401).json({
        message: 'societe does not exist !'
      });
    }else{
        societe.update({
          active:0,
          usr_id: idUser,
      }) .then(result => {
        res.status(201).json({
          message: 'societe Desactivat  !',
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
