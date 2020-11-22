import { PolicyType } from "../../enums/PolicyType";
import { AdaptionPolicy } from "./AdaptationPolicy/AdaptionPolicy";
import { NcfsPolicy } from "./NcfsPolicy/NcfsPolicy";

export class Policy {
    id: string;
    policyType: PolicyType;
    published: Date;
    lastEdited: Date;
    created: Date;
    updatedBy?: string;
    ncfsPolicy: NcfsPolicy;
    adaptionPolicy: AdaptionPolicy;

    constructor(
        id: string,
        policyType: PolicyType,
        published: string,
        lastEdited: string,
        created: string,
        ncfsPolicy: NcfsPolicy,
        adaptionPolicy: AdaptionPolicy,
        updatedBy?: string) {
        this.id = id;
        this.policyType = policyType;
        this.published = new Date(published);
        this.lastEdited = new Date(lastEdited);
        this.created = new Date(created);
        this.updatedBy = updatedBy;
        this.ncfsPolicy = ncfsPolicy;
        this.adaptionPolicy = adaptionPolicy;
    }
}