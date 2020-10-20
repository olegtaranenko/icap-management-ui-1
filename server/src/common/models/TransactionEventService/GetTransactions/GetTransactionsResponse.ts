import TransactionFile from "../TransactionFile";

export default class GetTransactionsResponse {
    Count: number;
    Files: TransactionFile[];

    constructor(count: number, files: TransactionFile[]) {
        this.Count = count;
        this.Files = files;
    }
};