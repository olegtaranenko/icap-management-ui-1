import { Logger } from "winston";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import IPolicyManagementService from "../../../common/services/IPolicyManagementService";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";
import { Guid } from "guid-typescript";

class PolicyManagementService implements IPolicyManagementService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    createPolicyModel = (policyJSON: any): Policy => {
        return new Policy(
            policyJSON.id,
            policyJSON.policyType,
            policyJSON.published,
            policyJSON.lastEdited,
            policyJSON.created,
            policyJSON.ncfsPolicy,
            policyJSON.adaptionPolicy,
            policyJSON.updatedBy
        );
    }

    getPolicy = async (request: GetPolicyByIdRequest) => {
        let policy: Policy;

        try {
            this.logger.info(`Retrieving Policy from the PolicyManagementServie - PolicyId: ${request.policyId}`);

            const response = await PolicyManagementApi.getPolicyById(
                request.url, request.policyId, { "Content-Type": "application/json" });
            const responseJSON = JSON.parse(response);
            policy = this.createPolicyModel(responseJSON);

            if (policy) {
                this.logger.info(`Retrieved Policy - PolicyId: ${request.policyId}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Policy - PolicyId: ${request.policyId}`);
            throw error;
        }

        return policy;
    }

    getCurrentPolicy = async (getCurrentPolicyUrl: string) => {
        let policy: Policy;

        try {
            this.logger.info("Retrieving Current Policy from the PolicyManagementService");

            const response = await PolicyManagementApi.getPolicy(
                getCurrentPolicyUrl, { "Content-Type": "application/json" });
            const responseJSON = JSON.parse(response);
            policy = this.createPolicyModel(responseJSON);

            if (policy) {
                this.logger.info(`Retrieved Current Policy - PolicyId: ${policy.id}`);
            }
        }
        catch (error) {
            this.logger.error("Could not get Current Policy");
            throw error;
        }

        return policy;
    }

    getDraftPolicy = async (getDraftPolicyUrl: string) => {
        let policy: Policy;

        try {
            this.logger.info("Retrieving Draft Policy from the PolicyManagementService");

            const response = await PolicyManagementApi.getPolicy(
                getDraftPolicyUrl, { "Content-Type": "application/json" });
            const responseJSON = JSON.parse(response);
            policy = this.createPolicyModel(responseJSON);

            if (policy) {
                this.logger.info(`Retrieved Draft Policy - PolicyId: ${policy.id}`);
            }
        }
        catch (error) {
            this.logger.error("Could not get Draft Policy");
            throw error;
        }

        return policy;
    }

    saveDraftPolicy = async (updatePolicyUrl: string, draftPolicy: Policy) => {
        try {
            this.logger.info(
                `Saving Draft Policy to the PolicyManagementService - PolicyId: ${draftPolicy.id}`);

            await PolicyManagementApi.saveDraftPolicy(
                updatePolicyUrl, draftPolicy, { "Content-Type": "application/json" });

            this.logger.info(
                `Saved Draft Policy to the PolicyManagementService - PolicyId: ${draftPolicy.id}`)
        }
        catch (error) {
            this.logger.error("Couldn't save Draft Policy");
            throw error;
        }
    }

    publishPolicy = async (publishPolicyUrl: string, distributeAdaptationPolicyUrl: string, distributeNcfsPolicyUrl: string, policyId: Guid) => {
        const headers = { "Content-Type": "application/json" };

        try {
            this.logger.info(`Publishing Policy - PolicyId: ${policyId}`);
            await PolicyManagementApi.publishPolicy(publishPolicyUrl, policyId, headers);

            this.logger.info(`Attempting to Distribute Adaptation Policy - PolicyId: ${policyId}`);
            await PolicyManagementApi.distributeAdaptationPolicy(distributeAdaptationPolicyUrl, headers);

            this.logger.info(`Attempting to Distribute NCFS Policy - PolicyId: ${policyId}`);
            await PolicyManagementApi.distributeNcfsPolicy(distributeNcfsPolicyUrl, headers);

            this.logger.info(`Published Policy - PolicyId: ${policyId}`);
        }
        catch (error) {
            this.logger.error(`Couldn't Publish Policy - PolicyId: ${policyId}`);
            throw error;
        }
    }

    deleteDraftPolicy = async (deleteDraftPolicyUrl: string, policyId: Guid) => {
        try {
            this.logger.info(`Deleting Policy - PolicyId: ${policyId}`);

            await PolicyManagementApi.deleteDraftPolicy(deleteDraftPolicyUrl, policyId, { "Content-Type": "application/json" });

            this.logger.info(`Deleted Policy - PolicyId: ${policyId}`);
        }
        catch (error) {
            this.logger.error(`Couldn't Delete Policy - PolicyId: ${policyId}`);
            throw error;
        }
    }
}

export default PolicyManagementService;