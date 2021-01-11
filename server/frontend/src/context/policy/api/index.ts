import axios, { CancelToken } from "axios";
import { getPolicy } from "./helpers";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Routes from "../../../Routes";
import { Guid } from "guid-typescript";
import { PolicyHistory } from "../../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

export const getCurrentPolicy = async (cancellationToken: CancelToken): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getCurrentPolicyRoute, cancellationToken);

    return response;
}

export const getDraftPolicy = async (cancellationToken: CancelToken): Promise<Policy> => {
    const response = await getPolicy(Routes.policyRoutes.getDraftPolicyRoute, cancellationToken);

    return response;
}

export const saveDraftPolicy = async (policy: Policy, cancellationToken: CancelToken): Promise<void> => {
    const response = await axios(Routes.policyRoutes.saveDraftPolicyRoute, {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(policy),
        cancelToken: cancellationToken
    });

    if (response.status < 200 || response.status > 299) {
        throw response.statusText;
    }
}

export const publishPolicy = async (policyId: Guid, cancellationToken: CancelToken): Promise<void> => {
    const url = `${Routes.policyRoutes.publishPolicyRoute}/${policyId.toString()}`;

    const response = await axios(url, {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        cancelToken: cancellationToken
    });

    if (response.status < 200 || response.status > 299) {
        throw response.statusText;
    }
}

export const deleteDraftPolicy = async (policyId: Guid, cancellationToken: CancelToken): Promise<void> => {
    const url = `${Routes.policyRoutes.deletePolicyRoute}/${policyId.toString()}`;

    const response = await axios(url, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        cancelToken: cancellationToken
    });

    if (response.status < 200 || response.status > 299) {
        throw response.statusText;
    }
}

export const getPolicyHistory = async (cancellationToken: CancelToken): Promise<PolicyHistory> => {
    const url = Routes.policyRoutes.getPolicyHistory;

    const response = await axios(url, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        cancelToken: cancellationToken
    });

    if (response.status < 200 || response.status > 299) {
        throw response.statusText;
    }

    return response.data;
}