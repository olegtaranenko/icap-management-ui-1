const _returnRoute = (route: string) => {
    if (process.env.NODE_ENV === "development") {
        return `http://localhost:8080${route}`;
    }

    return route;
}

export default class Routes {
    static requestHistoryRoutes = () => {
        return {
            getTransactionsRoute: _returnRoute("/request-history/transactions")
        }
    }
}