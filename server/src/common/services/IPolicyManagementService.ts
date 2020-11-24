import { Guid } from "guid-typescript";
import { Logger } from "winston";
import { GetPolicyByIdRequest } from "../models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import { Policy } from "../models/PolicyManagementService/Policy/Policy";

export default interface IPolicyManagementService {
    logger: Logger,
    getPolicy: (request: GetPolicyByIdRequest) => Promise<Policy>,
    getCurrentPolicy: (getCurrentPolicyUrl: string) => Promise<Policy>,
    getDraftPolicy: (getDraftPolicyUrl: string) => Promise<Policy>,
    saveDraftPolicy: (saveDraftPolicyUrl: string, draftPolicy: Policy) => Promise<void>,
    publishPolicy: (publishPolicyUrl: string, distributeAdaptationPolicyUrl: string, distributeNcfsPolicy: string, policyId: Guid) => Promise<void>,
    deleteDraftPolicy: (deleteDraftPolicyUrl: string, policyId: Guid) => Promise<void>
}