const { verify } = require('jsonwebtoken');

const tokenValidation = async (req, res, next) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log("ERROR: missing token: ", token);
    return res.status(401).json({
      error: 'Access denied'
    });
  }

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decoded: " + decoded?.userId)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      error: 'Invalid token'
    });
  }
};

module.exports = tokenValidation;
