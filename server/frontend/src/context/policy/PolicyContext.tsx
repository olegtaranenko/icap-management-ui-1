import { Guid } from "guid-typescript";
import { createContext } from "react";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

export type TPolicyState = {
	currentPolicy: Policy,
	draftPolicy: Policy,
	newDraftPolicy: Policy,
	setNewDraftPolicy: (policy: Policy) => void,
	saveDraftChanges: () => void,
	cancelDraftChanges: () => void,
	publishPolicy: (policyId: Guid) => void,
	deleteDraftPolicy: (policyId: Guid) => void,
	loadPolicyHistory: () => void,
	policyHistory: PolicyHistory,
	isPolicyChanged: boolean,
	status: "LOADING" | "ERROR" | "LOADED",
	policyError: "",
}

export const PolicyContext = createContext<TPolicyState | null>(null);