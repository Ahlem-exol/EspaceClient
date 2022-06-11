const express = require('express');

const SocieteController = require("../controllers/societe.controller");
const checkAuth = require("../middleware/check-auth");
// const authorize = require("../middleware/authorize")

const router = express.Router();
 

console.log("in socite contoroller")
router.get('/',checkAuth,SocieteController.getAllSociete);
router.post('/', checkAuth, SocieteController.createSociete);

//update user

router.put('/update/:id',checkAuth,SocieteController.UpdateSociete);
//Desactiver user

router.put('/desactiver/:id',checkAuth,SocieteController.DesactiverSociete);

module.exports = router;
