import { FileDetailStatus } from "../../enums/FileDetailsStatus";

export class GetTransactionDetailsResponse {
    status: FileDetailStatus;
    analysisReport?: string;

    constructor (status: FileDetailStatus, analysisReport?: string) {
        this.status = status;
        this.analysisReport = analysisReport;
    }
}