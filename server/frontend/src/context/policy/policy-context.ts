import { createContext } from "react";
import { PolicyToggle, PolicyFlagList } from "./models/index";

export interface PolicyContextProps {
	id: string,
	email: string,
	policyFlags: PolicyFlagList,
	timestamp: string,
	isPolicyChanged: boolean,
	changeToggle: (toggle: PolicyToggle) => void,
	cancelChanges: () => void,
	saveChanges: () => void
}

export const PolicyContext = createContext<Partial<PolicyContextProps>>({});