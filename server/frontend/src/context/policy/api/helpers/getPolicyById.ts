import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getPolicyById = async (baseUrl: string, policyId: Guid, cancellationToken: CancelToken): Promise<Policy> => {
    const url = `${baseUrl}/${policyId}`;

    const response = await axios(url, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        cancelToken: cancellationToken
    });

    if (response.statusText !== "OK") {
        throw response.statusText;
    }

    return response.data;
}