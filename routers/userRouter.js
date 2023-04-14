const express = require('express');
const {userController} = require('../controllers/userController');
const {validateSuperAdminToken} = require('../midddlewares/jwt_superadmin.middleware');
const multer = require('multer');

// Create an instance of the multer middleware
const upload = multer();

// create a user router for all user routes
const userRouter = express.Router();

userRouter.post('/signup', upload.none(), userController.postUser);
userRouter.post('/signin', upload.none(), userController.signUserIn);
userRouter.post('/sendsms', userController.sendSMS);
userRouter.put('/verify', userController.verifySMS);

module.exports = {userRouter};