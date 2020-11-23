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
    distributeAdaptationPolicyPath: string;
    distributeNcfsPolicyPath: string;

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
        this.distributeAdaptationPolicyPath = config.policy.distributeAdaptionPolicyPath;
        this.distributeNcfsPolicyPath = config.policy.distributeNcfsPolicyPath;
        this.policyManagementService = new PolicyManagementService(logger);
        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        // Get Policy
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

        // Get Current Policy
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

        // Get Draft Policy
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

        // Save Draft Policy
        this.app.put("/policy/draft", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.saveDraftPolicyPath;

            try {
                await this.policyManagementService.saveDraftPolicy(requestUrl, req.body);

                res.sendStatus(200);
            }
            catch (error) {
                const message = "Error Updating the Draft Policy";
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        // Publish Policy
        this.app.put("/policy/publish/:policyId", async (req, res) => {
            const publishUrl = this.policyManagementServiceBaseUrl + this.publishPolicyPath;
            const distributeAdaptationUrl = this.policyManagementServiceBaseUrl + this.distributeAdaptationPolicyPath;
            const distributeNcfsUrl = this.policyManagementServiceBaseUrl + this.distributeNcfsPolicyPath;

            try {
                await this.policyManagementService.publishPolicy(
                    publishUrl, distributeAdaptationUrl, distributeNcfsUrl, Guid.parse(req.params.policyId));

                res.sendStatus(200);
            }
            catch (error) {
                const message = `Error Publishing Policy - PolicyId: ${req.params.policyId}`;
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        // Delete Draft Policy
        this.app.delete("/policy/draft/:policyId", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.deletePolicyPath;

            try {
                await this.policyManagementService.deleteDraftPolicy(requestUrl, Guid.parse(req.params.policyId));

                res.sendStatus(200);
            }
            catch (error) {
                const message = `Error Deleting Policy - PolicyId: ${req.params.policyId}`;
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });
    }
}

export default PolicyRoutes;