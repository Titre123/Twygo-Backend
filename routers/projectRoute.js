const express = require('express');
const {validateAccessToken} = require('../midddlewares/jwt.middleware');
const {projectController} = require('../controllers/projectController');
const multer = require('multer');

// Create an instance of the multer middleware
const upload = multer();

// create a user router for all user routes
const projectRoute = express.Router();

projectRoute.post('/', upload.none(), validateAccessToken, projectController.postProject);


module.exports = {projectRoute};