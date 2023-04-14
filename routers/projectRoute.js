const express = require('express');
const {validateAccessToken} = require('../midddlewares/jwt.middleware');
const {validateAdminAccessToken} = require('../midddlewares/jwt_admin.middleware');
const {validateUserAccessToken} = require('../midddlewares/jwt_user.middleware');
const {validateSuperAdminToken} = require('../midddlewares/jwt_superadmin.middleware');
const {projectController} = require('../controllers/projectController');
const multer = require('multer');

// Create an instance of the multer middleware
const upload = multer();

// create a user router for all user routes
const projectRoute = express.Router();

projectRoute.post('/', upload.none(), validateAccessToken, projectController.postProject);


module.exports = {projectRoute};