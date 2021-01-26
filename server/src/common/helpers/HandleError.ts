import { Logger } from "winston";

const handleError = (res: any, statusCode: number, error: Error, message: string, logger: Logger) => {
    logger.error(`${message} - ${error.stack ? error.stack : error}`);
    res.status(statusCode).json(`${message} - ${error.message ? error.message : error}`);
}

export default handleError;