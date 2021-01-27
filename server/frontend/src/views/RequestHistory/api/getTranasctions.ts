import axios, { CancelToken } from "axios";
import Routes from "../../../Routes";
import { Filter } from "../../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import { GetTransactionsResponse } from "../../../../../src/common/models/TransactionEventService/GetTransactions";

const requestHistoryRoutes = new Routes().requestHistoryRoutes;

export const getTransactions = async (body: Filter, cancellationToken: CancelToken): Promise<GetTransactionsResponse> => {
    const response = await axios(requestHistoryRoutes.getTransactionsRoute, {
        method: "POST",
        data: JSON.stringify({ Filter: body }),
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