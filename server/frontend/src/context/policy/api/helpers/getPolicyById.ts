import { Guid } from "guid-typescript";

export const getPolicyById = async (baseUrl: string, policyId: Guid): Promise<string> => {
    const url = `${baseUrl}/${policyId}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw response.statusText;
    }

    return response.text();
}