import { Express } from "express";

import setupRequestHistory from "./RequestHistory/RequestHistory";

const setup = (app: Express) => {
    setupRequestHistory(app);
};

export default setup;