import axios, { CancelToken } from "axios";
import fetch from "node-fetch";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

export default class PolicyManagementApi {
    static getPolicyById = async (getPolicyByIdUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<string> => {
        const url = `${getPolicyByIdUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.text();
    }

    static getPolicy = async (
        getPolicyUrl: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }): Promise<Policy> => {

        const response = await axios.get(getPolicyUrl, {
            headers,
            cancelToken: cancellationToken
        });

        if (response.statusText !== "OK") {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static saveDraftPolicy = async (saveDraftPolicyUrl: string, draftPolicy: Policy, headers?: { [header: string]: string }): Promise<void> => {
        const response = await fetch(saveDraftPolicyUrl, {
            method: "PUT",
            body: JSON.stringify(draftPolicy),
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    static publishPolicy = async (publishPolicyUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<void> => {
        const url = `${publishPolicyUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "PUT",
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    static distributeAdaptationPolicy = async (distributeAdaptationPolicyUrl: string, headers?: { [header: string]: string }): Promise<void> => {
        const response = await fetch(distributeAdaptationPolicyUrl, {
            method: "PUT",
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    static distributeNcfsPolicy = async (distributeNcfsPolicyUrl: string, headers?: { [header: string]: string }): Promise<void> => {
        const response = await fetch(distributeNcfsPolicyUrl, {
            method: "PUT",
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    static deleteDraftPolicy = async (deleteDraftPolicyUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<void> => {
        const url = `${deleteDraftPolicyUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }

    static getPolicyHistory = async (
        getPolicyHistoryUrl: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<PolicyHistory> => {
        const response = await axios.get(getPolicyHistoryUrl, {
            headers,
            cancelToken: cancellationToken
        });

        if (response.statusText !== "OK") {
            throw new Error(response.statusText);
        }

        return response.data;
    };
}