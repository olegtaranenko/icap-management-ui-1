import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import setup from "./service/Setup";
import dotenv from "dotenv";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine
        (
            winston.format.json(),
            winston.format.timestamp()
        ),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.cli(), winston.format.timestamp()),
        })],
});

dotenv.config();

const app = express();
const port = 8080;

const workingDirectory = process.cwd();
const prototypeUiDirectory = workingDirectory.replace("server", "") + "/frontend/build";

app.use(express.static(prototypeUiDirectory));
app.use(bodyParser.json());
setup(app, logger);

app.listen(port, () => {
    logger.log({
        level: "info",
        message: `env: ${process.env.NODE_ENV}`
    });

    logger.log({
        level: "info",
        message: `Server is Running at http://localhost:${port}`
    });
});