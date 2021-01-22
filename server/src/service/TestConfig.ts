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
            saveDraftPolicyPath: "/test",
            getCurrentPolicyPath: "/test",
            getPolicyHistoryPath: "/test",
            publishPolicyPath: "/test",
            distributeAdaptionPolicyPath: "/test",
            distributeNcfsPolicyPath: "/test"
        },
        identityManagement: {
            identityManagementServiceBaseUrl: "www.glasswall.com",
            authenticatePath: "/test",
            newUserPath: "/test",
            forgotPasswordPath: "/test",
            validateResetTokenPath: "/test",
            resetPasswordPath: "/test",
            getUsersPath: "/test",
            getUserPath: "/test",
            updateUserPath: "/test",
            deleteUserPath: "/test"
        }
    }

    return testConfig;
};

export default TestConfig;