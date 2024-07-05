const { hash, compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require("./util/authHelpers")
const { createUser, findUserByEmail, findUserByUsername, storeRefreshToken, getUserByRefreshToken, removeRefreshToken } = require("./userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    const hashedPassword = await hash(password, 10);

    const user = {
      username,
      email,
      password: hashedPassword,
    };
    await createUser(user);
    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({
    error: 'Missing email or password'
  });

  try {
    const user = await findUserByEmail(email);
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid || !user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const refreshToken = generateRefreshToken(user.id);
    const accessToken = generateAccessToken(user.id);

    await storeRefreshToken(user.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    });

    res.status(200).json({
      message: "Login sucessful",
      accessToken: accessToken
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    console.error('Missing refresh token');
    res.status(401).json({ error: 'Missing refresh token' });
  }
  const refreshToken = cookies.refreshToken;

  const user = (await getUserByRefreshToken(refreshToken))?.userId;
  if (!user) {
    console.error('Expired refresh token');
    res.status(403).json({ error: 'Expired refresh token' });
  }

  try {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decoded.userId !== user) {
      console.error('Incorrect refresh token');
      res.status(403).json({ error: 'Incorrect refresh token' });
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json({
      message: "Access token refreshed",
      accessToken: accessToken
    });
  } catch (err) {
    console.error('Incorrect refresh token', err);
    res.status(403).json({ error: 'Incorrect refresh token' });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    console.log("Missing token in logout");
    return res.status(204).json({ message: 'No content' }); // already logged out
  }
  const refreshToken = cookies.refreshToken;

  try {
    const user = await getUserByRefreshToken(refreshToken);
    if (user) {
      await removeRefreshToken(refreshToken);
    } else {
      console.log("no user found in logout"); //temp
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};
