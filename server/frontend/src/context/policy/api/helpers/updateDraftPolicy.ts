import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const updateDraftPolicy = async(url: string, policy: Policy): Promise<string> => {
    const response = await fetch(url, {
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