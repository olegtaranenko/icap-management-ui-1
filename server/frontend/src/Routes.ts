export interface IRoutes {
    root: {
        versionRoute: string
    };

    requestHistoryRoutes: {
        getTransactionsRoute: string,
        getTransactionDetailsRoute: string
    };

    policyRoutes: {
        getPolicyByIdRoute: string,
        getCurrentPolicyRoute: string,
        getDraftPolicyRoute: string,
        saveDraftPolicyRoute: string,
        publishPolicyRoute: string,
        deletePolicyRoute: string,
        getPolicyHistory: string,
    };

    usersRoutes: {
        login: string,
        register: string,
        forgotPassword: string,
        validateResetToken: string,
        resetPassword: string
    }
}

const _returnRoute = (route: string) => {
    if (process.env.NODE_ENV === "development") {
        return `http://localhost:8080${route}`;
    }

    return route;
}

class Routes implements IRoutes {
    root = {
        versionRoute: _returnRoute("/version")
    };

    requestHistoryRoutes = {
        getTransactionsRoute: _returnRoute("/request-history/transactions"),
        getTransactionDetailsRoute: _returnRoute("/request-history/transactionDetails")
    };

    policyRoutes = {
        getPolicyByIdRoute: _returnRoute("/policy/getPolicy"),
        getCurrentPolicyRoute: _returnRoute("/policy/current"),
        getDraftPolicyRoute: _returnRoute("/policy/draft"),
        saveDraftPolicyRoute: _returnRoute("/policy/draft"),
        publishPolicyRoute: _returnRoute("/policy/publish"),
        deletePolicyRoute: _returnRoute("/policy/draft"),
        getPolicyHistory: _returnRoute("/policy/history"),
    };

    usersRoutes = {
        login: _returnRoute("/users/login"),
        register: _returnRoute("/users/register"),
        forgotPassword: _returnRoute("/users/forgot-password"),
        validateResetToken: _returnRoute("/users/validate-reset-token"),
        resetPassword: _returnRoute("/users/reset")
    };
}

export default Routes;
