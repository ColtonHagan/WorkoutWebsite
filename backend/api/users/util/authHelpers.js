const { sign } = require('jsonwebtoken');

// Generates an access token for a given user ID.
const generateAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

//Generates a refresh token for a given user ID.
const generateRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
