const express = require('express');

const ArticleController = require("../controllers/article.controller");
const checkAuth = require("../middleware/check-auth");

// const authorize = require("../middleware/authorize")
const router = express.Router();

router.get('/',checkAuth,ArticleController.getAlllots);
router.get('/fini',checkAuth,ArticleController.GetLotFini);

router.get('/notFin',checkAuth,ArticleController.GetLotEnattend);

router.get('/:id',checkAuth,ArticleController.getAlllotStats);


router.post('/', checkAuth,ArticleController.createlot);
router.post('/updateLotStat', checkAuth,ArticleController.UpdateStatLot);
//update user
router.put('/update/:id',checkAuth,ArticleController.Updatelot);
//Desactiver user
router.put('/desactiver/:id',checkAuth,ArticleController.Desactiverlot);
module.exports = router;
