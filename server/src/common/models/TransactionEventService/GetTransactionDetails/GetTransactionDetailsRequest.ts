import ArgumentNullException from "../../errors/ArgumentNullException";

export class GetTransactionDetailsRequest {
    url: string;
    transactionFileDirectory: string;
    headers?: { [header: string]: string };

    constructor(url: string, transactionFileDirectory: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!transactionFileDirectory) {
            throw new ArgumentNullException("transactionFileDirectory");
        }

        this.url = url;
        this.transactionFileDirectory = transactionFileDirectory;
    }
}