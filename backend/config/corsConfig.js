// CORS configuration options
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
};

module.exports = corsOptions;