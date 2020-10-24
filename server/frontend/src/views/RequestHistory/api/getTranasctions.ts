import { GetTransactionsFilter } from "../../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";

const getTransactions = async (
    getTransactionsUrl: string,
    body: GetTransactionsFilter
): Promise<string> => {
    const response = await fetch(getTransactionsUrl, {
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

export default getTransactions;