const _returnRoute = (route: string) => {
    if (process.env.NODE_ENV === "development") {
        return `http://localhost:8080${route}`;
    }

    return route;
}

const Routes = {
    requestHistoryRoutes: {
        getTransactionsRoute: _returnRoute("/request-history/transactions"),
        getTransactionDetailsRoute: _returnRoute("/request-history/transactionDetails")
    },

    policyRoutes: {
        getPolicyByIdRoute: _returnRoute("/policy/getPolicy"),
        deletePolicyRoute: _returnRoute("/policy/deletePolicy"),
        getDraftPolicyRoute: _returnRoute("/policy/getDraftPolicy"),
        updateDraftPolicyRoute: _returnRoute("/policy/updateDraftPolicy"),
        getCurrentPolicyRoute: _returnRoute("/policy/current"),
        getPolicyHistory: _returnRoute("/policy/getPolicyHistory"),
        publishPolicyRoute: _returnRoute("/policy/publishPolicy"),
        distributePolicyRoute: _returnRoute("/policy/distributePolicy")
    }
}

export default Routes;
