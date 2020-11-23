import { getPolicy } from "./helpers";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Routes from "../../../Routes";
import { Guid } from "guid-typescript";

export const getCurrentPolicy = async (): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getCurrentPolicyRoute);

    return response;
}

export const getDraftPolicy = async (): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getDraftPolicyRoute);

    return response;
}

export const saveDraftPolicy = async (policy: Policy): Promise<void> => {
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
}

export const publishPolicy = async (policyId: Guid): Promise<void> => {
    const url = `${Routes.policyRoutes.publishPolicyRoute}/${policyId.toString()}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw response.statusText;
    }
}

export const deleteDraftPolicy = async (policyId: Guid): Promise<void> => {
    const url = `${Routes.policyRoutes.deletePolicyRoute}/${policyId.toString()}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw response.statusText;
    }
}