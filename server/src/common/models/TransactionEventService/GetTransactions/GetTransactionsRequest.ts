import { Guid } from "guid-typescript";
import { FileType } from "../../enums/FileType";
import { Risk } from "../../enums/Risk";
import ArgumentNullException from "../../erros/ArgumentNullException";

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
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!body.Filter) {
            throw new ArgumentNullException("body.Filter");
        }

        this.url = url;
        this.body = body;
        this.headers = headers;
    }
};