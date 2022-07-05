const express = require('express');

const ProjetController = require("../controllers/projet.controller");
const checkAuth = require("../middleware/check-auth");
// const authorize = require("../middleware/authorize")

const router = express.Router();

router.get('/',checkAuth,ProjetController.getAllProjets);
router.get('/:id',checkAuth,ProjetController.getProjet);
// add project
router.post('/', checkAuth, ProjetController.createProjet);

//update user

router.put('/update/:id',checkAuth,ProjetController.UpdateProjet);
//Desactiver user

router.put('/desactiver/:id',checkAuth,ProjetController.DesactiverProjet);

module.exports = router;
