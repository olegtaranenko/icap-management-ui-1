import { PolicyType } from "../../../../src/common/models/enums/PolicyType";
import { AdaptionPolicy } from "./AdaptionPolicy/AdaptionPolicy";
import { NcfsPolicy } from "./NcfsPolicy/NcfsPolicy";

export interface Policy {
    id: string,
    policyType: PolicyType,
    published: Date,
    lastEdited: Date,
    created: Date,
    updatedBy: string,
    ncfsPolicy: NcfsPolicy,
    adaptionPolicy: AdaptionPolicy,
}