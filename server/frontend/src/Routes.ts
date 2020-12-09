const _returnRoute = (route: string) => {
    if (process.env.NODE_ENV === "development") {
        return `http://localhost:8080${route}`;
    }

    return route;
}

const Routes = {
    root: {
        versionRoute: _returnRoute("/version")
    },

    requestHistoryRoutes: {
        getTransactionsRoute: _returnRoute("/request-history/transactions"),
        getTransactionDetailsRoute: _returnRoute("/request-history/transactionDetails")
    },

    policyRoutes: {
        getPolicyByIdRoute: _returnRoute("/policy/getPolicy"),
        getCurrentPolicyRoute: _returnRoute("/policy/current"),
        getDraftPolicyRoute: _returnRoute("/policy/draft"),
        saveDraftPolicyRoute: _returnRoute("/policy/draft"),
        publishPolicyRoute: _returnRoute("/policy/publish"),
        deletePolicyRoute: _returnRoute("/policy/draft"),
        getPolicyHistory: _returnRoute("/policy/history"),
    }
}

export default Routes;
