import { createContext } from "react";

import { GlobalStore } from "./globalStore";

export const GlobalStoreContext = createContext<Partial<GlobalStore>>({});
