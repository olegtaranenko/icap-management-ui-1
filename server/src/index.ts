import express from "express";
import winston from "winston";
// import http from "http";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine
        (
            winston.format.json(),
            winston.format.timestamp()
        ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({ format: winston.format.combine(winston.format.cli(), winston.format.timestamp()) })
    ],
});

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.info(`Server is Running at http://localhost:${port}`);

    logger.log({
        level: "info",
        message: `env: ${process.env.NODE_ENV}`
    });
});