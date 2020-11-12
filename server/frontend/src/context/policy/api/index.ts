import { getPolicy, getPolicyById } from "./helpers";
import Routes from "../../../Routes";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getCurrentPolicy = async (): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getCurrentPolicyRoute);

    return response as Policy;
}