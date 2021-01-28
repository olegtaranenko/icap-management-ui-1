import { CancelToken } from "axios";
import { getPolicy } from "./helpers";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Routes from "../../../Routes";
import { Guid } from "guid-typescript";
import { PolicyHistory } from "../../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";
import axiosRequestHelper from "../../../helpers/axiosRequestHelper";

const routes = new Routes().policyRoutes;

export const getCurrentPolicy = async (cancellationToken: CancelToken,  authToken: string): Promise<Policy> => {
    return await getPolicy(routes.getCurrentPolicyRoute, cancellationToken, authToken);
}

export const getDraftPolicy = async (cancellationToken: CancelToken,  authToken: string): Promise<Policy> => {
    return await getPolicy(routes.getDraftPolicyRoute, cancellationToken, authToken);
}

export const saveDraftPolicy = async (policy: Policy, cancellationToken: CancelToken, authToken: string): Promise<void> => {
    return await axiosRequestHelper(routes.saveDraftPolicyRoute, "PUT", cancellationToken, authToken, policy);
}

export const publishPolicy = async (policyId: Guid, cancellationToken: CancelToken, authToken: string): Promise<void> => {
    const url = `${routes.publishPolicyRoute}/${policyId.toString()}`;

    return await axiosRequestHelper(url, "PUT", cancellationToken, authToken);
}

export const deleteDraftPolicy = async (policyId: Guid, cancellationToken: CancelToken, authToken: string): Promise<void> => {
    const url = `${routes.deletePolicyRoute}/${policyId.toString()}`;

    return await axiosRequestHelper(url, "DELETE", cancellationToken, authToken);

    // const response = await axios(url, {
    //     method: "DELETE",
    //     headers: {
    //         "Accept": "*/*",
    //         "Content-Type": "application/json"
    //     },
    //     cancelToken: cancellationToken
    // });

    // if (response.status < 200 || response.status > 299) {
    //     throw response.statusText;
    // }
}

export const getPolicyHistory = async (cancellationToken: CancelToken, authToken: string): Promise<PolicyHistory> => {
    return await axiosRequestHelper(routes.getPolicyHistory, "GET", cancellationToken, authToken);
}