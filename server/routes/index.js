const express = require('express');
const Router = express.Router();
const articleRoutes = require('./article');
const userRoutes = require('./user');

// Resource routes
Router.use('/users', userRoutes);
Router.use('/articles', articleRoutes);

module.exports = Router;