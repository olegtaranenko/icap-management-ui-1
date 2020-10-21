import fetch from "node-fetch";

export default class TransactionEventApi {
    static getTransactions = async (getTransactionsUrl: string, body: any, headers?: { [header: string]: string }): Promise<string> => {
        const response = await fetch(`${getTransactionsUrl}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }

        return response.text();
    };
};