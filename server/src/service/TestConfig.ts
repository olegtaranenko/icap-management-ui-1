import IConfig from "../common/models/IConfig";

const TestConfig = () => {
    const testConfig: IConfig = {
        requestHistory: {
            transactionEventServiceBaseUrl: "www.glasswall.com",
            getTransactionsPath: "/transactions",
            getTransactionDetailsPath: "/transactions"
        },
        policy: {
            policyManagementServiceBaseUrl: "",
            getPolicyPath: "",
            deletePolicyPath: "",
            getDraftPolicyPath: "",
            updateDraftPolicyPath: "",
            getCurrentPolicyPath: "",
            getPolicyHistoryPath: "",
            publishPolicyPath: "",
            distributePolicyPath: ""
        }
    }

    return testConfig;
};

export default TestConfig;