import { Express } from "express";
import { Logger } from "winston";
import { Guid } from "guid-typescript";
import PolicyManagementService from "../../../business/services/PolicyManagementService/PolicyManagementService";
import { GetPolicyRequest } from "../../../common/models/PolicyManagementService/GetPolicy";
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

    policyManagementService: PolicyManagementService;

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
        this.policyManagementService = new PolicyManagementService(logger);
        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        this.app.get("/policy/getPolicy/:policyId", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getPolicyPath;

            try {
                const getPolicyRequest = new GetPolicyRequest(requestUrl, Guid.parse(req.params.policyId));

                const policy = await this.policyManagementService.getPolicy(getPolicyRequest);

                res.json(policy);
            }
            catch (error) {
                const message = "Error Retrieving Policy";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });
    }
}

export default PolicyRoutes;