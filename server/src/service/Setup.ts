import { Express } from "express";
import { Logger } from "winston";

import IConfig from "../common/models/IConfig";
import RequestHistory from "./RequestHistory/RequestHistory";

const setup = (config: IConfig, app: Express, logger: Logger) => {
    RequestHistory.setupRequestHistory(config, app, logger);
};

export default setup;