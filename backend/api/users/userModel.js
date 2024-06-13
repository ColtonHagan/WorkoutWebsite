const db = require('../../config/dbConfig');

const createUser = async (user) => {
  const [result] = await db.execute(
    'INSERT INTO registration (username, email, password) VALUES (?, ?, ?)',
    [user.username, user.email, user.password]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM registration WHERE email = ?', [email]);
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM registration WHERE username = ?', [username]);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername
};