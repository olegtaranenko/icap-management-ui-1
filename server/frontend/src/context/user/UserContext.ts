import { CancelToken } from "axios";
import { createContext } from "react";
import User from "../../../../src/common/models/IdentityManagementService/User/User";

export type TUserState = {
    currentUser: User,
    status: "LOADING" | "ERROR" | "LOADED",
    login: (username: string, password: string, cancellationToken: CancelToken) => void,
    logout: () => void
}

export const UserContext = createContext<TUserState | null>(null);