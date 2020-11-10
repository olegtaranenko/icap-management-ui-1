import { NcfsOptions } from "./NcfsOptions";
import { NcfsRoute } from "./NcfsRoute";

export interface NcfsPolicy {
    Routes: NcfsRoute[],
    Options: NcfsOptions
}