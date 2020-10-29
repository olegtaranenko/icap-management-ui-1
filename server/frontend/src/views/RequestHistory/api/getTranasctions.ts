import Routes from "../../../Routes";
import { Filter } from "../../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";

const requestHistoryRoutes = Routes.requestHistoryRoutes();

export const getTransactions = async (body: Filter): Promise<string> => {
    const response = await fetch(requestHistoryRoutes.getTransactionsRoute, {
        method: "POST",
        body: JSON.stringify({ Filter: body }),
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw response.statusText;
    }

    return response.text();
};