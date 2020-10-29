import Routes from "../../../Routes";

const requestHistoryRoutes = Routes.requestHistoryRoutes();

export const getTransactionDetails = async (transactionFilePath: string): Promise<string> => {
    const url = `${requestHistoryRoutes.getTransactionDetailsRoute}/${encodeURIComponent(transactionFilePath)}`;

    const response = await fetch(url, {
        method: "GET",
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