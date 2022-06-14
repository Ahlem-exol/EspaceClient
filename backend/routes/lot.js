const express = require('express');

const LotController = require("../controllers/lot.controller");
const checkAuth = require("../middleware/check-auth");

// const authorize = require("../middleware/authorize")
const router = express.Router();

router.get('/',checkAuth,LotController.getAlllots);
router.post('/', checkAuth,LotController.createlot);

//update user
router.put('/update/:id',checkAuth,LotController.Updatelot);
//Desactiver user
router.put('/desactiver/:id',checkAuth,LotController.Desactiverlot);
module.exports = router;
