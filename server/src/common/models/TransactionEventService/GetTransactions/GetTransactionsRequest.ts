import { Guid } from "guid-typescript";
import { FileType } from "../../../../../frontend/src/enums/FileType";
import { Risk } from "../../../../../frontend/src/enums/Risk";
import ArgumentNullException from "../../errors/ArgumentNullException";

export interface Filter {
    TimestampRangeStart: Date,
    TimestampRangeEnd: Date,
    Risks?: Risk[],
    FileTypes?: FileType[],
    FileIds?: Guid[],
    PolicyIds?: Guid[]
}

export class GetTransactionsRequest {
    url: string;
    body: { Filter: Filter };
    headers?: { [header: string]: string };

    constructor(url: string, body: { Filter: Filter }, headers?: { [header: string]: string }) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (body === undefined || body === null || (Object.keys(body).length === 0 && body.constructor === Object)) {
            throw new ArgumentNullException("body");
        }

        this.url = url;
        this.body = body;
        this.headers = headers;
    }
}