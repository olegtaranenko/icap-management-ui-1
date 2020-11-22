import { Guid } from "guid-typescript";
import fetch from "node-fetch";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";

export default class PolicyManagementApi {
    static getPolicyById = async (getPolicyByIdUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<string> => {
        const url = `${getPolicyByIdUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }

        return response.text();
    }

    static getPolicy = async (getPolicyUrl: string, headers?: { [header: string]: string }): Promise<string> => {
        const response = await fetch(getPolicyUrl, {
            method: "GET",
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }

        return response.text();
    }

    static saveDraftPolicy = async(saveDraftPolicyUrl: string, draftPolicy: Policy, headers?: { [header: string]: string }): Promise<void> => {
        const response = await fetch(saveDraftPolicyUrl, {
            method: "PUT",
            body: JSON.stringify(draftPolicy),
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }
    }

    static publishPolicy = async(publishPolicyUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<void> => {
        const url = `${publishPolicyUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "PUT",
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }
    }

    static deleteDraftPolicy = async(deleteDraftPolicyUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<void> => {
        const url = `${deleteDraftPolicyUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }
    }
}