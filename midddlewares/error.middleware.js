const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {
  if (error instanceof jwt.JsonWebTokenError) {
    const message = "Invalid token";

    response.status(401).json({ message });

    return;
  }

  if (error instanceof jwt.TokenExpiredError) {
    const message = "Token expired";

    response.status(401).json({ message });

    return;
  }

  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  response.status(status).json({ message });
};

module.exports = {
  errorHandler,
};
