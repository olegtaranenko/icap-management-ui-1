import { FileDetailsStatus } from "../../enums/FileDetailsStatus";

export class GetTransactionDetailsResponse {
    status: FileDetailsStatus;
    analysisReport?: string;

    constructor (status: number, analysisReport?: string) {
        this.status = status as FileDetailsStatus;
        this.analysisReport = analysisReport;
    }
}