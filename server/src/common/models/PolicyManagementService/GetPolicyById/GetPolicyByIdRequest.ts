import { Guid } from "guid-typescript";
import ArgumentNullException from "../../errors/ArgumentNullException";

export class GetPolicyByIdRequest {
    url: string;
    policyId: Guid;

    constructor(url: string, policyId: Guid) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!policyId) {
            throw new ArgumentNullException("policyId");
        }

        this.url = url;
        this.policyId = policyId;
    }
}