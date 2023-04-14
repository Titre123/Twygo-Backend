const jwt = require('jsonwebtoken');

const validateUserAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header found' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (decodedToken.role != 'user') {
      return res.status(401).json({error: "User doesn't have user access"});
    }

    req.user = decodedToken;
    next();
  });
};

module.exports = {
  validateUserAccessToken,
};
