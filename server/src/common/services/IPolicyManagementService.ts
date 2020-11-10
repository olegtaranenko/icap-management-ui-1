import {Logger} from "winston";
import { GetPolicyRequest } from "../models/PolicyManagementService/GetPolicy";

export default interface IPolicyManagementService {
    logger: Logger,
    getPolicy: (request: GetPolicyRequest) => Promise<any>
}