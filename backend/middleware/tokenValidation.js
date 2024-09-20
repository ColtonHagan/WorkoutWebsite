const { verify } = require('jsonwebtoken');

// Middleware to validate the JWT token
const tokenValidation = async (req, res, next) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Invalid or expired token'
    });
  }
};

module.exports = tokenValidation;