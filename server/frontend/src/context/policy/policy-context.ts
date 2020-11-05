import { createContext } from "react";

export interface PolicyContextProps {
	policyFlags: {},
	id: string,
		email: string,
		timestamp: string,
		isPolicyChanged: boolean,
		changeToggle: (toggle: ) => void,
		cancelChanges,
		saveChanges,
}

export const PolicyContext = createContext<Partial<PolicyContextProps>>({});