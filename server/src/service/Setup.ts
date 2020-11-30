import { Express } from "express";
import { Logger } from "winston";

import IConfig from "../common/models/IConfig";
import PolicyRoutes from "./Routes/Policy/PolicyRoutes";
import RequestHistoryRoutes from "./Routes/RequestHistory/RequestHistoryRoutes";

const version = process.env.npm_package_version;

const setup = (config: IConfig, app: Express, logger: Logger) => {
   logger.info("Setting Up Express Server");

   app.get("/version", (req, res) => {
      logger.info("Returned Server Version");
      res.send(version);
   });

   new RequestHistoryRoutes(config, app, logger).setup();
   new PolicyRoutes(config, app, logger).setup();
};

export default setup;