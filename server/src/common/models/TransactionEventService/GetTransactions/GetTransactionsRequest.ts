import { Guid } from "guid-typescript";
import { IncomingHttpHeaders } from "http";
import { FileType } from "../../enums/FileType";
import { Risk } from "../../enums/Risk";

export interface Filter {
    TimestampRangeStart: Date,
    TimestampRangeEnd: Date,
    Risks?: Risk[],
    FileTypes?: FileType[],
    FileIds?: Guid[],
    PolicyIds?: Guid[]
};

export default class GetTransactionsRequest {
    url: string;
    body: { Filter: Filter };
    headers?: { [header: string]: string };

    constructor(url: string, body: { Filter: Filter }, headers?: { [header: string]: string }) {
        this.url = url;
        this.body = body;
        this.headers = headers;
    }
};