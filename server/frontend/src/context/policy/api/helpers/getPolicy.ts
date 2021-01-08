import axios, { CancelToken } from "axios";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getPolicy = async (baseUrl: string, cancellationToken: CancelToken): Promise<Policy> => {
    const response = await axios(baseUrl, {
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