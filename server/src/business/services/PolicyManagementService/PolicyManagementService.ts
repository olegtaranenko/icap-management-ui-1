import { Logger } from "winston";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import IPolicyManagementService from "../../../common/services/IPolicyManagementService";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";

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

            const response = await PolicyManagementApi.getPolicyById(request.url, request.policyId);
            const responseJSON = JSON.parse(response);
            policy = this.createPolicyModel(responseJSON);

            if (policy) {
                this.logger.info(`Retrieved Policy - PolicyId: ${request.policyId}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Policy - PolicyId: ${request.policyId}`);
        }

        return policy;
    }

    getCurrentPolicy = async (getCurrentPolicyUrl: string) => {
        let policy: Policy;

        try {
            this.logger.info("Retrieving Current Policy from the PolicyManagementService");

            const response = await PolicyManagementApi.getPolicy(getCurrentPolicyUrl);
            const responseJSON = JSON.parse(response);
            policy = this.createPolicyModel(responseJSON);

            if (policy) {
                this.logger.info(`Retrieved Current Policy - PolicyId: ${policy.id}`);
            }
        }
        catch (error) {
            this.logger.error("Could not get Current Policy");
        }

        return policy;
    }
}

export default PolicyManagementService;