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
            saveDraftPolicyPath: "/policy/draft",
            getCurrentPolicyPath: "/policy/current",
            getPolicyHistoryPath: "/policy/history",
            publishPolicyPath: "/policy/publish",
            distributeAdaptionPolicyPath: "/policy/current/distribute-adaption",
            distributeNcfsPolicyPath: "/policy/current/distribute-ncfs"
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
            saveDraftPolicyPath: "/policy/draft",
            getCurrentPolicyPath: "/policy/current",
            getPolicyHistoryPath: "/policy/history",
            publishPolicyPath: "/policy/publish",
            distributeAdaptionPolicyPath: "/policy/current/distribute-adaption",
            distributeNcfsPolicyPath: "/policy/current/distribute-ncfs"
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
