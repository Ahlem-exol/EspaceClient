const express = require('express');

const UsersController = require("../controllers/users.controller");
const checkAuth = require("../middleware/check-auth");
// const authorize = require("../middleware/authorize")

const router = express.Router();



router.post('/signup',  UsersController.createUser);
router.get('/',checkAuth,UsersController.getAllUsers);
//update user

//suprimer user

module.exports = router;
