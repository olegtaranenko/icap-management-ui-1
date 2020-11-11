import { getPolicy, getPolicyById } from "./helpers";
import Routes from "../../../Routes";

export const getCurrentPolicy = async (): Promise<string> => {
    return await getPolicy(Routes.policyRoutes.getCurrentPolicyRoute);
}