const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB_URL,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            collection: process.env.MONGODB_COLLECTION,
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});

module.exports = logger;
