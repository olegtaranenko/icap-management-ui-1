import { Express } from "express";

const setupRequestHistory = (app: Express) => {
    app.get("/request-history/transactions", (req, res) => {
        res.json({message: "test"});
    });
};

export default setupRequestHistory;