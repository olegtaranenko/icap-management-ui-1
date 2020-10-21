import { Guid } from "guid-typescript";
import { FileType } from "../../enums/FileType";
import { Risk } from "../../enums/Risk";
import ArgumentException from "../../errors/ArgumentException";
import ArgumentNullException from "../../errors/ArgumentNullException";
import TransactionFile from "../TransactionFile";

export default class GetTransactionsResponse {
    count: number;
    files: TransactionFile[];

    constructor(count: number, files: any[]) {
        if (count > 0 && files.length < 1) {
            throw new ArgumentException("files", "Count was non-zero, but no files were found");
        }

        this.count = count;
        this.files = files.map((file) => {
            if (!file.timestamp) {
                throw new ArgumentNullException("file.timestamp");
            }

            if (!file.fileId) {
                throw new ArgumentNullException("file.fileId");
            }

            if (!file.detectionFileType) {
                throw new ArgumentNullException("file.detectionFileType");
            }

            if (!file.risk) {
                throw new ArgumentNullException("file.risk");
            }

            if (!file.activePolicyId) {
                throw new ArgumentNullException("file.activePolicyId");
            }

            if (!file.directory) {
                throw new ArgumentNullException("file.directory");
            }

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
}