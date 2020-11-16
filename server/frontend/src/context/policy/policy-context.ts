import { createContext } from "react";
import { Policy } from "../../../../src/common/models/PolicyManagementService/Policy/Policy";

export interface PolicyContextProps {
	currentPolicy: Policy,
	draftPolicy?: Policy,
	newDraftPolicy: Policy,
	updateNewDraftPolicy: (newPolicy: Policy) => void,
	policyHistory: Policy[],
	isPolicyChanged: boolean,
	policyContextHasError: boolean,
	cancelChanges: () => void,
	saveChanges: () => void
}

export const PolicyContext = createContext<Partial<PolicyContextProps>>({});