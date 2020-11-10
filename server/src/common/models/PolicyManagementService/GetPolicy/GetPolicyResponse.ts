import { Guid } from "guid-typescript";
import { PolicyType } from "../../../../../frontend/src/enums/PolicyType";
import { AdaptationPolicy } from "../../../../../frontend/src/types/Policy/AdaptationPolicy/AdaptationPolicy";
import { NcfsPolicy } from "../../../../../frontend/src/types/Policy/NcfsPolicy/NcfsPolicy";

export class GetPolicyResponse {
    id: Guid;
    policyType: PolicyType;
    published: Date;
    lastEdited: Date;
    created: Date;
    updatedBy: string;
    ncfsPolicy: NcfsPolicy;
    adaptationPolicy: AdaptationPolicy;

    constructor(
        id: string,
        policyType: number,
        published: Date,
        lastEdited: Date,
        created: Date,
        updatedBy: string,
        ncfsPolicy: any,
        adaptationPolicy: any) {
            this.id = Guid.parse(id);
            this.policyType = policyType as PolicyType;
            this.published = published;
            this.lastEdited = lastEdited;
            this.created = created;
            this.updatedBy = updatedBy;
            this.ncfsPolicy = ncfsPolicy as NcfsPolicy;
            this.adaptationPolicy = adaptationPolicy as AdaptationPolicy;
    }
}