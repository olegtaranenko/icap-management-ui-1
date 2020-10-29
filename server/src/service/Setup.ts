import { Express } from "express";
import { Logger } from "winston";

import IConfig from "../common/models/IConfig";
// import setupRequestHistory from "./Routes/RequestHistory/RequestHistoryRoutes";
import RequestHistoryRoutes from "./Routes/RequestHistory/RequestHistoryRoutes";

const setup = (config: IConfig, app: Express, logger: Logger) => {
   // setupRequestHistory(config, app, logger);
   new RequestHistoryRoutes(config, app, logger).setup();
};

export default setup;