import { Guid } from "guid-typescript";
import { FileType } from "../../../../frontend/src/enums/FileType";
import { Risk } from "../enums/Risk";

export default class TransactionFile {
    timestamp: Date;
    fileId: Guid;
    fileType: FileType;
    risk: Risk;
    activePolicyId: Guid;
    directory: string

    constructor(timestamp: Date, fileId: Guid, fileType: FileType, risk: Risk, activePolicyId: Guid, directory: string) {
        this.timestamp = timestamp;
        this.fileId = fileId;
        this.fileType = fileType;
        this.risk = risk;
        this.activePolicyId = activePolicyId;
        this.directory = directory;
    }
}