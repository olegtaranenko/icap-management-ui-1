import IConfig from "../common/models/IConfig";

const Config = () => {
    const development: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: "https://transactioneventapifunction20201016103513.azurewebsites.net/api/v1",
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: "https://policymanagementapifunction20201016103513.azurewebsites.net/api/v1",
            getPolicyPath: "/policy",
            deletePolicyPath: "/policy",
            getDraftPolicyPath: "/policy/draft",
            updateDraftPolicyPath: "/policy/draft",
            getCurrentPolicyPath: "/policy/current",
            getPolicyHistoryPath: "/policy/history",
            publishPolicyPath: "/policy/publish",
            distributePolicyPath: "/policy/distribute"
        }
    };

    const production: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: "http://transactioneventapi.transaction-event-api.svc.cluster.local/api/v1",
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: "https://policymanagementapifunction20201016103513.azurewebsites.net/api/v1",
            getPolicyPath: "/policy",
            deletePolicyPath: "/policy",
            getDraftPolicyPath: "/policy/draft",
            updateDraftPolicyPath: "/policy/draft",
            getCurrentPolicyPath: "/policy/current",
            getPolicyHistoryPath: "/policy/history",
            publishPolicyPath: "/policy/publish",
            distributePolicyPath: "/policy/distribute"
        }
    };

    switch (process.env.NODE_ENV) {
        case "development":
            return development;
        case "production":
            return production;
    }
};

export default Config;
