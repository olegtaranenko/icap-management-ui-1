import axios, { CancelToken } from "axios";
import Routes from "../../../Routes";
import { Filter } from "../../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import { GetTransactionsResponse } from "../../../../../src/common/models/TransactionEventService/GetTransactions";

const requestHistoryRoutes = Routes.requestHistoryRoutes;

export const getTransactions = async (body: Filter, cancellationToken: CancelToken): Promise<GetTransactionsResponse> => {
    try {

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
            throw new Error(response.data);
        }

        return response.data;
    }
    catch (error) {
        // tslint:disable-next-line: no-console
        console.error("getTransactions: " + error);
        throw error;
    }
};