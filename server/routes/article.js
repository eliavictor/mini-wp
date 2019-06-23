const express = require('express');
const Router = express.Router();
const articleController = require('../controllers/articleCon')
const { Authentication, Authorization } = require('../middlewares/auth')
const uploadToGCS = require('../middlewares/upload')
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 4900000
    }
});

Router.get('/', articleController.list)
Router.get('/:id', articleController.findOne)
Router.use(Authentication)
Router.post('/', multer.single('file'), uploadToGCS, articleController.create)
Router.put('/:id', Authorization, articleController.update)
Router.delete('/:id', Authorization, articleController.delete)

module.exports = Router;