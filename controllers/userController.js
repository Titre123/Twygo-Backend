const {dbClient} = require('../database_manager/db');
const {User} = require('../database_manager/user_manager');
const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const {Verification} = require('../database_manager/verification_manager')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

// get a user from the database based on the Id
async function findUserById(userId) {
  return await User.findUser({ _id: new ObjectId(userId) });
}

// decoded a jwt token from the request
async function getUserFromToken(request) {
  const authHeader = request.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded;
}

class userController {

  static async postUser(req, res) {
    try{
      const body = req.body;
      const find_user = await User.findUser({email: body.email});
      if (!find_user) {
        body.password = sha1(body.password);
        body.verified = false;
        body.role = 'user';
        // Generate a JWT for the user
        const token = jwt.sign({ email: body.email, phoneNumber: body.phoneNumber, role: body.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const result = await User.insertUser(body);
        const user = await findUserById(result.insertedId);
        return res.status(201).json({user, token});
      }
      return res.status(401).json({error: 'User already exist'});
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async sendSMS(req, res) {
    try {
      // get the decoded user information
      const decoded = await getUserFromToken(req);
      const find_user = await User.findUser({email: decoded.email});
      if (!find_user) {
        return res.status().json({error: 'Unauthorized'});
      }
       // Generate a 6-digit OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000);

      // send message usint twilio API
      const message = await twilioClient.messages
      .create({body: `Hi there, your code is ${otpCode}`, from: process.env.TWILIO_NO, to: decoded.phoneNumber})

      // save the verfication code to the database with the userId
      await Verification.insertCode({
        userId: find_user._id,
        verification_code: otpCode.toString()
      });
      res.status(200).json({message: message});
    } catch(error) {
      console.error(error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(500).json({error: 'Token Expired'});
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async verifySMS(req, res) {
    try{
      // get the decoded user information
      const decoded = await getUserFromToken(req);

      //  get the user from the database
      const find_user = await User.findUser({email: decoded.email});

      // get the verification code from the database
      const verification = await Verification.findCode({verification_code: req.query.verification_code});

      // check if the user found id is same with the verification userId
      if (!find_user || find_user._id.toString() !== verification.userId.toString()) {
        return res.status().json({error: 'Unauthorized'});
      }

      // if verification is not found that means the user verification  failed
      if (!verification) {
        return res.status(500).json({error: 'verification failed'});
      }
      await User.updateUser(find_user, {verified: true});
      const updated_user = await User.findUser({email: decoded.email});
      res.status(201).json({user: updated_user});
    } catch(error) {
      console.error(error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(500).json({error: 'Token Expired'});
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async signUserIn(req, res) {
    try{
      const { email, password } = req.body;
      // Find the user in the database
      const user = await User.findUser({ email });

      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Check the password
      const hashedPassword = sha1(password);
      if (user.password != hashedPassword) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // If the email and password are correct, generate a JWT and return it
      const token = jwt.sign({ id: user._id, role: user.role, verify: user.verified }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ token });
      
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUsers() {

  }

  static async getNumOfUsers() {
    
  }
}

module.exports = {userController};