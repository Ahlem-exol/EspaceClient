const express = require('express');

const ArticleController = require("../controllers/article.controller");
const checkAuth = require("../middleware/check-auth");

// const authorize = require("../middleware/authorize")
const router = express.Router();
router.get('/all/:id',checkAuth,ArticleController.getAllArticles);
router.get('/:id',checkAuth,ArticleController.getAlllotStats );


router.post('/', checkAuth,ArticleController.createArticle);
router.post('/updateLotStat', checkAuth,ArticleController.UpdateStatLot);


//update user
router.put('/update/:id',checkAuth,ArticleController.UpdateArticle);
//Desactiver user
router.put('/desactiver/:id',checkAuth,ArticleController.DesactiverArticle);
module.exports = router;
