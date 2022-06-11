const express = require('express');

const UsersController = require("../controllers/users.controller");
const checkAuth = require("../middleware/check-auth");
// const authorize = require("../middleware/authorize")

const router = express.Router();



router.post('/signup',  UsersController.createUser);
router.get('/',checkAuth,UsersController.getAllUsers);
//update user

router.put('/update/:id',checkAuth,UsersController.UpdateUser);
//Desactiver user

router.put('/desactiver/:id',checkAuth,UsersController.DesactiverUser);

module.exports = router;
