import { Express } from "express";
import { Logger } from "winston";

import IConfig from "../../../common/models/IConfig";


class PolicyRoutes {
    policyManagementServiceBaseUrl: string;
    getPolicyPath: string;
    deletePolicyPath: string;
    getDraftPolicyPath: string;
    updateDraftPolicyPath: string;
    getCurrentPolicyPath: string;
    getPolicyHistoryPath: string;
    publishPolicyPath: string;
    distributePolicyPath: string;

    app: Express;
    logger: Logger;

    constructor(config: IConfig, app: Express, logger: Logger) {
        this.policyManagementServiceBaseUrl = config.policy.policyManagementServiceBaseUrl;
        this.getPolicyPath = config.policy.getPolicyPath;
        this.deletePolicyPath = config.policy.deletePolicyPath;
        this.getDraftPolicyPath = config.policy.getDraftPolicyPath;
        this.updateDraftPolicyPath = config.policy.updateDraftPolicyPath;
        this.getCurrentPolicyPath = config.policy.getCurrentPolicyPath;
        this.publishPolicyPath = config.policy.publishPolicyPath;
        this.distributePolicyPath = config.policy.distributePolicyPath;

        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        this.app.get("/policy/getPolicy", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getPolicyPath;
        });
    }
}