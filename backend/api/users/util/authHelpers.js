const { sign } = require('jsonwebtoken');

const generateAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); //update to 1h tmp
};

const generateRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); //update to 7d temp
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};