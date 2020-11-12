import IConfig from "../common/models/IConfig";

const Config = () => {
    const development: IConfig = {
        transactionEventServiceBaseUrl: "https://transactioneventapifunction20201016103513.azurewebsites.net/api/v1",
        getTransactionsPath: "/transactions",
        getTransactionDetailsPath: "/transactions"
    };

    const production: IConfig = {
        transactionEventServiceBaseUrl: "http://transactioneventapi.transaction-event-api.svc.cluster.local/api/v1",
        getTransactionsPath: "/transactions",
        getTransactionDetailsPath: "/transactions"
    };

    switch (process.env.NODE_ENV) {
        case "development":
            return development;
        case "production":
            return production;
    }
};

export default Config;
