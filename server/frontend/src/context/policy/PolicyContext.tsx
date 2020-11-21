import { Guid } from "guid-typescript";
import { createContext } from "react";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";

export type TPolicyState = {
	currentPolicy: Policy,
	draftPolicy: Policy,
	newDraftPolicy: Policy,
	setNewDraftPolicy: (policy: Policy) => void,
	saveDraftChanges: () => void,
	cancelDraftChanges: () => void,
	publishPolicy: (policyId: Guid) => void,
	policyHistory: Policy[],
	isPolicyChanged: boolean,
	status: "LOADING" | "ERROR" | "LOADED",
	policyErrorMessage: ""
}

export const PolicyContext = createContext<TPolicyState | null>(null);