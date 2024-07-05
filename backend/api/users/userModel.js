const db = require('../../config/dbConfig');

const createUser = async (user) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [user.username, user.email, user.password]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const storeRefreshToken = async (userId, refreshToken) => {
  const [result] = await db.execute(
    'INSERT INTO refresh_tokens (userId, refreshToken) VALUES (?, ?) ON DUPLICATE KEY UPDATE refreshToken = VALUES(refreshToken)',
    [userId, refreshToken]
  );
  return result;
};

const findRefreshToken = async (userId) => {
  const [rows] = await db.execute('SELECT * FROM refresh_tokens WHERE userId = ?', [userId]);
  return rows[0];
};

const getUserByRefreshToken = async (refreshToken) => {
  const [rows] = await db.execute('SELECT userId FROM refresh_tokens WHERE refreshToken = ?', [refreshToken]);
  return rows[0];
};

const removeRefreshToken = async (refreshToken) => {
  console.log("running delete token");
  const [result] = await db.execute('DELETE FROM refresh_tokens WHERE refreshToken = ?', [refreshToken]);
  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  storeRefreshToken,
  findRefreshToken,
  getUserByRefreshToken,
  removeRefreshToken
};