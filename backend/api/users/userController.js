const { 
  createUser, 
  findUserByEmail, 
  storeRefreshToken, 
  getUserByRefreshToken, 
  removeRefreshToken 
} = require("./userModel");
const { registerValidation, loginValidation } = require('./userValidation');
const validate = require('../../middleware/validationMiddleware');
const { generateAccessToken, generateRefreshToken } = require("./util/authHelpers");
const { asyncHandler, createApiError } = require('../../middleware/errorHandler');
const { hash, compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');

// Register a new user
const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Checks if user already exists via email
  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw createApiError('Email already in use', 409);
  }

  // Hash the password with a salt rounds of 10
  const hashedPassword = await hash(password, 10);
  const user = { email, password: hashedPassword };

  await createUser(user);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !(await compare(password, user.password))) {
    throw createApiError('Invalid email or password', 401);
  }

  const refreshToken = generateRefreshToken(user.id);
  const accessToken = generateAccessToken(user.id);

  await storeRefreshToken(user.id, refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, // Ensure cookie is sent only over HTTPS
    sameSite: 'none', // Hosting backend and frontend on diffrent sites
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  });

  res.status(200).json({ message: "Login successful", accessToken: accessToken });
});

// Refreshes access token
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    throw createApiError('Missing refresh token', 401);
  }

  // Check if user matches with refresh token
  const user = (await getUserByRefreshToken(refreshToken)).userId;
  if (!user) {
    throw createApiError('Expired or invalid refresh token', 403);
  }

  // Verify refresh token
  const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (decoded.userId !== user) {
    throw createApiError('MInvalid refresh token', 403);
  }

  const accessToken = generateAccessToken(user);
  res.status(200).json({ message: "Access token refreshed", accessToken: accessToken });
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    throw createApiError('Already Logged out', 401);
  }

  // Get and remove refresh token
  const user = await getUserByRefreshToken(refreshToken);
  if(!user) {
    throw createApiError('Already Logged out', 401);
  }
  await removeRefreshToken(refreshToken);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(200).json({ message: "Logout successful" });
});


module.exports = {
  register : [registerValidation, validate, register],
  login : [loginValidation, validate, login],
  refresh,
  logout
};