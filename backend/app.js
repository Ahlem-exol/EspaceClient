const express = require('express');
const bodyParser = require('body-parser');
// the routes

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);


module.exports = app;

