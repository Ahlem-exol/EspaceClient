const express = require('express');
const bodyParser = require('body-parser');
// the routes

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const societeRoutes = require('./routes/societe');
const ContactRoutes = require('./routes/contact');
const ProjetRoutes = require('./routes/projet');
const LotRoutes = require('./routes/lot');
const ArticleRoutes = require('./routes/article');


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
app.use('/api/societe', societeRoutes);
app.use('/api/contact', ContactRoutes);
app.use('/api/projet', ProjetRoutes);
app.use('/api/lot', LotRoutes);
app.use('/api/article', ArticleRoutes);

module.exports = app;