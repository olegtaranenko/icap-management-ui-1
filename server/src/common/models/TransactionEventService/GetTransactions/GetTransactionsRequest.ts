import { Guid } from "guid-typescript";
import { FileType } from "../../../../../frontend/src/enums/FileType";
import { Risk } from "../../enums/Risk";
import ArgumentNullException from "../../errors/ArgumentNullException";

export interface GetTransactionsFilter {
    TimestampRangeStart: Date,
    TimestampRangeEnd: Date,
    Risks?: Risk[],
    FileTypes?: FileType[],
    FileIds?: Guid[],
    PolicyIds?: Guid[]
}

export default class GetTransactionsRequest {
    url: string;
    body: { Filter: GetTransactionsFilter };
    headers?: { [header: string]: string };

    constructor(url: string, body: { Filter: GetTransactionsFilter }, headers?: { [header: string]: string }) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (body === undefined || body === null || (Object.keys(body).length === 0 && body.constructor === Object)) {
            throw new ArgumentNullException("body");
        }

        this.url = url;
        this.body = body;
        if (headers) {
            this.headers = headers;
        }
    }
}