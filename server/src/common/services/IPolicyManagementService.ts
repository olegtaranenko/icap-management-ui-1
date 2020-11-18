import { Logger } from "winston";
import { GetPolicyByIdRequest } from "../models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import { Policy } from "../models/PolicyManagementService/Policy/Policy";

export default interface IPolicyManagementService {
    logger: Logger,
    getPolicy: (request: GetPolicyByIdRequest) => Promise<Policy>,
    getCurrentPolicy: (getCurrentPolicyUrl: string) => Promise<Policy>,
    getDraftPolicy: (getDraftPolicyUrl: string) => Promise<Policy>,
    updateDraftPolicy: (updateDraftPolicyUrl: string, draftPolicy: Policy) => Promise<void>
}