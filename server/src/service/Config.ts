import IConfig from "../common/models/IConfig";

const Config = () => {
    const development: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: "https://localhost:1000/api/v1",
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: "https://localhost:2000/api/v1",
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
            transactionEventServiceBaseUrl: process.env.TRANSACTION_EVENT_API_URL,
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: process.env.POLICY_MANAGEMENT_API_URL,
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
