import { Express } from "express";
import { Logger } from "winston";

import IConfig from "../common/models/IConfig";
import setupRequestHistory from "./RequestHistory/setupRequestHistory";

const setup = (config: IConfig, app: Express, logger: Logger) => {
    setupRequestHistory(config, app, logger);
};

export default setup;