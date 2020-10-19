import { Express } from "express";
import TransactionService from "../../business/services/TransactionEventService/TransactionEventService";

const setupRequestHistory = (app: Express) => {
    app.get("/request-history/transactions", (req, res) => {
        res.json({message: "test"});
    });
};

export default setupRequestHistory;