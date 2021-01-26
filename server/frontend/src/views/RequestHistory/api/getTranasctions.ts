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

    if (response.statusText !== "OK") {
        throw response.statusText;
    }

    return response.data;

};