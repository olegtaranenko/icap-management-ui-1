import IConfig from "../common/models/IConfig";

const TestConfig = () => {
    const testConfig: IConfig = {
        transactionEventServiceBaseUrl: "www.glasswall.com",
        getTransactionsPath: "/transactions",
        getTransactionDetailsPath: "/transactions"
    }

    return testConfig;
};

export default TestConfig;