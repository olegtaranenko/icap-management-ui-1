import { Request } from "express";
import { CancelTokenSource } from "axios";

const handleCancellation = (req: Request, cancellationTokenSource: CancelTokenSource, message: string) => {
    req.connection.on("close", () => {
        cancellationTokenSource.cancel(message);
    });
}

export default handleCancellation;