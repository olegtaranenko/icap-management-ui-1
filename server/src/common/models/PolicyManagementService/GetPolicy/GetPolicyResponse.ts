import { Guid } from "guid-typescript";
import { AdaptationPolicy } from "../../../../../frontend/src/types/Policy/AdaptationPolicy/AdaptationPolicy";

export class GetPolicyResponse {
    id: Guid;
    policyType: number;
    published: Date;
    lastEdited: Date;
    created: Date;
    updatedBy: string;
    ncfsPolicy: NCFSPolicy;
    AdaptationPolicy: AdaptationPolicy;
}