import express from "express";
import winston from "winston";
import path from "path";

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
        new winston.transports.Console({ format: winston.format.combine(winston.format.cli(), winston.format.timestamp()) })
    ],
});

const app = express();
const port = 8080;

const workingDirectory = process.cwd();
const prototypeUiDirectory = workingDirectory.replace("server", "") + "/frontend/build";


app.use(express.static(prototypeUiDirectory));

app.get("*", (req, res) => {
    res.sendFile(path.join(`${prototypeUiDirectory}/index.html`));
});

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