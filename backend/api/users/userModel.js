const db = require('../../config/dbConfig');

// Create a new user
const createUser = async (user) => {
  const [result] = await db.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [user.email, user.password]
  );
  return result;
};

// Get a user by email
const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

// Store/update a refresh token for a user
const storeRefreshToken = async (userId, refreshToken) => {
  const [result] = await db.execute(
    'INSERT INTO refresh_tokens (userId, refreshToken) VALUES (?, ?) ON DUPLICATE KEY UPDATE refreshToken = VALUES(refreshToken)',
    [userId, refreshToken]
  );
  return result;
};

// Get refresh token from user id
const findRefreshToken = async (userId) => {
  const [rows] = await db.execute('SELECT * FROM refresh_tokens WHERE userId = ?', [userId]);
  return rows[0];
};

// Get user ID associated with a refresh token
const getUserByRefreshToken = async (refreshToken) => {
  const [rows] = await db.execute('SELECT userId FROM refresh_tokens WHERE refreshToken = ?', [refreshToken]);
  return rows[0];
};

// Remove a refresh token
const removeRefreshToken = async (refreshToken) => {
  const [result] = await db.execute('DELETE FROM refresh_tokens WHERE refreshToken = ?', [refreshToken]);
  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  storeRefreshToken,
  findRefreshToken,
  getUserByRefreshToken,
  removeRefreshToken
};