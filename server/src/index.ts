import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import dotenv from "dotenv";
import setup from "./service/Setup";
import Config from "./service/Config";
import path from "path";
import cors from "cors";

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

const port = 8080;
const workingDirectory = process.cwd();

const app = express();
app.disable("x-powered-by");
app.use(express.static(`${workingDirectory}/frontend/build`));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
    app.use(cors())
}

setup(Config(), app, logger);

app.get("*", (req, res) => {
    res.sendFile(path.join(`${workingDirectory}/frontend/build/index.html`));
});

app.listen(port, () => {
    logger.info(`env: ${process.env.NODE_ENV}`);
    logger.info(`Server is Running at http://localhost:${port}`);
});

module.exports.app = app;