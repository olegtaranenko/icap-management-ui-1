import { PolicyFlagList } from "./PolicyFlagList";

export interface Policy {
    id: string,
    username: string,
    userEmail: string,
    timestamp: string,
    policyFlagList: PolicyFlagList
}