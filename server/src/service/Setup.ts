import { Express } from "express";
import { Logger } from "winston";

import setupRequestHistory from "./RequestHistory/RequestHistory";

const setup = (app: Express, logger: Logger) => {
    setupRequestHistory(app, logger);
};

export default setup;