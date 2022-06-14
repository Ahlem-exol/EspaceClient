const express = require('express');

const ContactController = require("../controllers/contact.controller");
const checkAuth = require("../middleware/check-auth");
// const authorize = require("../middleware/authorize")

const router = express.Router();


router.get('/',checkAuth,ContactController.getAllcontacts);
router.post('/', checkAuth, ContactController.createcontact);

//update user

router.put('/update/:id',checkAuth,ContactController.Updatecontact);
//Desactiver user

router.put('/desactiver/:id',checkAuth,ContactController.Desactivercontact);

module.exports = router;
