import { Logger } from "winston";

const handleError = (res: any, error: any, message: string, logger: Logger) => {
    if (error.response) {
        logger.error(`${error.response.data.message}`);
        res.status(error.response.status).json(error.response.data.message)
    }
    else {
        logger.error(`${message} - ${error.stack ? error.stack : error}`);
        res.status(500).json(`${message} - ${error.message ? error.message : error}`);
    }
}

export default handleError;