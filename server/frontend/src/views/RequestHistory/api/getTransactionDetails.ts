import axios, { CancelToken } from "axios";
import Routes from "../../../Routes";

const routes = new Routes().requestHistoryRoutes;

export const getTransactionDetails = async (transactionFilePath: string, cancellationToken: CancelToken): Promise<string> => {
    const url = `${routes.getTransactionDetailsRoute}/${encodeURIComponent(transactionFilePath)}`;

    const response = await axios(url, {
        method: "GET",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        cancelToken: cancellationToken
    });

    if (response.status < 200 || response.status > 299) {
        throw response.data;
    }

    return response.data;
};