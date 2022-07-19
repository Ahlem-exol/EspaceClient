const express = require('express');

const LotController = require("../controllers/lot.controller");
const checkAuth = require("../middleware/check-auth");

// const authorize = require("../middleware/authorize")
const router = express.Router();

router.get('/all/:id',checkAuth,LotController.getAlllots);
router.get('/fini',checkAuth,LotController.GetLotFini);

router.get('/notFin',checkAuth,LotController.GetLotEnattend);

router.get('/:id',checkAuth,LotController.getAlllotStats);


router.post('/', checkAuth,LotController.createlot);
router.post('/updateLotStat', checkAuth,LotController.UpdateStatLot);
//update user
router.put('/update/:id',checkAuth,LotController.Updatelot);
//Desactiver user
router.put('/desactiver/:id',checkAuth,LotController.Desactiverlot);
module.exports = router;
