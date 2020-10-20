import { Guid } from "guid-typescript";
import { FileType } from "../enums/FileType";
import { Risk } from "../enums/Risk";

export default class TransactionFile {
    Timestamp: string;
    FileId: Guid;
    FileType: FileType;
    Risk: Risk;
    ActivePolicyId: Guid;
    Directory: string

    constructor(timestamp: string, fileId: Guid, fileType: FileType, risk: Risk, activePolicyId: Guid, directory: string) {
        this.Timestamp = timestamp;
        this.FileId = fileId;
        this.FileType = fileType;
        this.Risk = risk;
        this.ActivePolicyId = activePolicyId;
        this.Directory = directory;
    }

}