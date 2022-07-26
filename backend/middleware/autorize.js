// const jwt = require("jsonwebtoken");

// const UserPrivilege = require('../models/user_privilege');

// // module.exports = authorize;

// exports.superAdmin = (req, res, next) => {
//   // UserPrivilege.findAll({attributes: ['user_privilege_id']})
//   //   .then((privileges) => {
//   //     if (privileges.length && !privileges.includes(req.userData.userRole)) {
//   //       // user's privilege is not authorized
//   //       return res.status(401).json({ message: 'Unauthorized' });
//   //     }
//   //     // authentication and authorization successful
//   //     next();
//   //   })
//   if (req.userData.userRole != 'Super Admin') {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   next();
// }

// exports.admin = (req, res, next) => {
//   if (req.userData.userRole != 'Administrateur') {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   next();
// }

// exports.agent = (req, res, next) => {
//   if (req.userData.userRole != 'Société') {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   next();
// }

// exports.agent = (req, res, next) => {
//   if (req.userData.userRole != 'Agent') {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   next();
// }
