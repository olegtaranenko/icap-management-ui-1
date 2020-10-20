import { Guid } from "guid-typescript";
import { FileType } from "../../enums/FileType";
import { Risk } from "../../enums/Risk";
import ArgumentException from "../../erros/ArgumentException";
import ArgumentNullException from "../../erros/ArgumentNullException";
import TransactionFile from "../TransactionFile";

export default class GetTransactionsResponse {
    count: number;
    files: TransactionFile[];

    constructor(count: number, files: any[]) {
        if (!count) {
            throw new ArgumentNullException("count");
        }

        if (count > 0 && files.length < 1) {
            throw new ArgumentException("files", "Count was non-zero, but no files were found");
        }

        this.count = count;
        this.files = files.map((file) => {
            return new TransactionFile(
                new Date(file.timestamp),
                Guid.parse(file.fileId),
                file.fileType as FileType,
                file.risk as Risk,
                Guid.parse(file.activePolicyId),
                file.directory
            )
        });
    }
};