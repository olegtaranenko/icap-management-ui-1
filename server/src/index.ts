import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import dotenv from "dotenv";
import setup from "./service/Setup";
import Config from "./service/Config";
import path from "path";
import cors from "cors";
import https from "https";
import fs from "fs";

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
logger.info("Starting Service: ICAP Management UI...");

dotenv.config();
logger.info("Loading Environment Variables with dotenv");

const workingDirectory = process.cwd();
const app = express();
app.disable("x-powered-by");
app.use(express.static(`${workingDirectory}/frontend/build`));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
    const reactDevServerEndpoint = "http://localhost:3000";
    const corsOptions = { origin: reactDevServerEndpoint };
    app.use(cors(corsOptions));
    logger.info(`CORS Config added for REACT dev server - cross-origin source: ${reactDevServerEndpoint}`);
}

setup(Config(), app, logger);

app.get("*", (req, res) => {
    res.sendFile(path.join(`${workingDirectory}/frontend/build/index.html`));
});

const port = 8080;
const httpsOptions = {
    key: fs.readFileSync(process.env.TLS_CERT),
    cert: fs.readFileSync(process.env.TLS_KEY)
};

const server = https.createServer(httpsOptions, app);
server.listen(port, () => {
    logger.info("Started Service: ICAP Management UI");

    if (process.env.NODE_ENV === "development") {
        logger.info(`env: ${process.env.NODE_ENV}`);
        logger.info(`Listening on http://localhost:${port}`);
    }

    if (process.env.NODE_ENV === "production") {
        logger.info(`Logs: ${path.join(workingDirectory, "/error.log")} && ` +
            `${path.join(workingDirectory, "/combined.log")}`);
    }
});
module.exports.server = server;