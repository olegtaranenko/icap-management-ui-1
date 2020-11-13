import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getPolicy = async (baseUrl: string): Promise<Policy> => {
    const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw response.statusText;
    }

    return response.json();
}