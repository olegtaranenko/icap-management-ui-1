const _returnRoute = (route: string) => {
    if (process.env.NODE_ENV === "development") {
        return `http://localhost:8080${route}`;
    }

    return route;
}

export default class Routes {
    static requestHistoryRoutes = () => {
        return {
            getTransactionsRoute: _returnRoute("/request-history/transactions"),
            getTransactionDetailsRoute: _returnRoute("/request-history/transactionDetails")
        }
    }

    static policyRoutes = () => {
        return {
            getPolicyByIdRoute: _returnRoute("/policy/getPolicy"),
            deletePolicyRoute: _returnRoute("/policy/deletePolicy"),
            getDraftPolicyRoute: _returnRoute("/policy/getDraftPolicy"),
            updateDraftPolicyRoute: _returnRoute("/policy/updateDraftPolicy"),
            getCurrentPolicyRoute: _returnRoute("/policy/getCurrentPolicy"),
            getPolicyHistory: _returnRoute("/policy/getPolicyHistory"),
            publishPolicyRoute: _returnRoute("/policy/publishPolicy"),
            distributePolicyRoute: _returnRoute("/policy/distributePolicy")
        }
    }
}