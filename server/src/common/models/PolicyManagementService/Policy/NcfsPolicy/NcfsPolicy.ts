import { NcfsOptions } from "./NcfsOptions";
import { NcfsRoute } from "./NcfsRoute";

export interface NcfsPolicy {
    routes: NcfsRoute[],
    options: NcfsOptions
}