import express from "express";
import winston from "winston";
import path from "path";
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


/*
    TODO: Once the prototype phase is over,
    Move UI code to the /server directory and stop using the /proto-app code,
    then we can start using this
*/

// const workingDirectory = process.cwd();
// const tempFrontendDirectory = "temp-frontend";

// app.use(express.static(`${workingDirectory}/${tempFrontendDirectory}/build`));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(`${workingDirectory}/${tempFrontendDirectory}/build/index.html`));
// });


const workingDirectory = process.cwd();
const prototypeUiDirectory = workingDirectory.replace("server", "") + "/proto-app/build";


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