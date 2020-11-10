import { Logger } from "winston";
import { GetPolicyResponse } from "../../../common/models/PolicyManagementService/GetPolicy";
import { GetPolicyRequest } from "../../../common/models/PolicyManagementService/GetPolicy";
import IPolicyManagementService from "../../../common/services/IPolicyManagementService";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";

class PolicyManagementService implements IPolicyManagementService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    getPolicy = async (request: GetPolicyRequest) => {
        let policy: GetPolicyResponse;

        try {
            this.logger.info(`Retrieving Policy from the PolicyManagementServie - PolicyId: ${request.policyId}`);

            const response = await PolicyManagementApi.getPolicy(request.url, request.policyId);
            const responseJSON = JSON.parse(response);
            policy = new GetPolicyResponse(
                responseJSON.id,
                responseJSON.policyType,
                responseJSON.published,
                responseJSON.lastEdited,
                responseJSON.created,
                responseJSON.updatedBy,
                responseJSON.ncfsPolicy,
                responseJSON.adaptationPolicy
            );

            if (policy) {
                this.logger.info(`Retrieved Policy - PolicyId: ${request.policyId}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Policy - PolicyId: ${request.policyId}`);
        }

        return policy;
    }
}

export default PolicyManagementService;