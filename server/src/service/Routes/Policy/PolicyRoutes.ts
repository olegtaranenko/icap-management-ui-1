import { Express } from "express";
import { Logger } from "winston";
import { Guid } from "guid-typescript";
import PolicyManagementService from "../../../business/services/PolicyManagementService/PolicyManagementService";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import IConfig from "../../../common/models/IConfig";

class PolicyRoutes {
    policyManagementServiceBaseUrl: string;
    getPolicyPath: string;
    deletePolicyPath: string;
    getDraftPolicyPath: string;
    saveDraftPolicyPath: string;
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
        this.saveDraftPolicyPath = config.policy.saveDraftPolicyPath;
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
                const getPolicyRequest = new GetPolicyByIdRequest(requestUrl, Guid.parse(req.params.policyId));

                const policy = await this.policyManagementService.getPolicy(getPolicyRequest);

                res.json(policy);
            }
            catch (error) {
                const message = "Error Retrieving Policy";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        this.app.get("/policy/current", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getCurrentPolicyPath;

            try {
                const policy = await this.policyManagementService.getCurrentPolicy(requestUrl);

                res.json(policy);
            }
            catch (error) {
                const message = "Error Retrieving The Currently Published Policy";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        this.app.get("/policy/draft", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getDraftPolicyPath;

            try {
                const policy = await this.policyManagementService.getDraftPolicy(requestUrl);

                res.json(policy);
            }
            catch (error) {
                const message = "Error Retrieving the Draft Policy";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        this.app.put("/policy/draft", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.saveDraftPolicyPath;

            try {
                const response = await this.policyManagementService.saveDraftPolicy(requestUrl, req.body)

                res.json(response);
            }
            catch (error) {
                const message = "Error Updating the Draft Policy";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });
    }
}

export default PolicyRoutes;