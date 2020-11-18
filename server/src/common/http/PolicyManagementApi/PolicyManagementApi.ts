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

    static updateDraftPolicy = async(updateDraftPolicyUrl: string, draftPolicy: Policy, headers?: { [header: string]: string }): Promise<void> => {
        const response = await fetch(updateDraftPolicyUrl, {
            method: "PUT",
            body: JSON.stringify(draftPolicy),
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }
    }
}