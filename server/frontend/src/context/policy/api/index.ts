import { getPolicy } from "./helpers";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Routes from "../../../Routes";

export const getCurrentPolicy = async (): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getCurrentPolicyRoute);

    return response as Policy;
}

export const getDraftPolicy = async (): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getDraftPolicyRoute);

    return response as Policy;
}

export const saveDraftPolicy = async (policy: Policy): Promise<string> => {
    const response = await fetch(Routes.policyRoutes.saveDraftPolicyRoute, {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(policy)
    });

    if (!response.ok) {
        throw response.statusText;
    }

    return response.text();
}