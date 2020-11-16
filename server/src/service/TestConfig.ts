import IConfig from "../common/models/IConfig";

const TestConfig = () => {
    const testConfig: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: "www.glasswall.com",
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: "www.glasswall.com",
            getPolicyPath: "/test",
            deletePolicyPath: "/test",
            getDraftPolicyPath: "/test",
            updateDraftPolicyPath: "/test",
            getCurrentPolicyPath: "/test",
            getPolicyHistoryPath: "/test",
            publishPolicyPath: "/test",
            distributePolicyPath: "/test"
        }
    }

    return testConfig;
};

export default TestConfig;