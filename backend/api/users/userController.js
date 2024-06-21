const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserByUsername } = require("./userModel");

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

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        error: 'Invalid email or password'
      });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: 'Invalid email or password'
      });
    }

    const jwtToken = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login sucessful",
      token: jwtToken
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

module.exports = {
  register,
  login,
};
