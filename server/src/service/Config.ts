import IConfig from "../common/models/IConfig";

const Config = () => {
    const development: IConfig = {
        transactionEventServiceBaseUrl: "https://transactioneventapifunction20201016103513.azurewebsites.net/api/v1",
        getTransactionsPath: "/transactions"
    };

    const production: IConfig = {
        transactionEventServiceBaseUrl: process.env.TRANSACTION_EVENT_SERVICE_BASE_URL,
        getTransactionsPath: process.env.TRANSACTION_EVENT_SERVICE_GET_TRANSACTIONS_PATH
    };

    switch (process.env.NODE_ENV) {
        case "development":
            return development;
        case "production":
            return production;
    }
};

export default Config;