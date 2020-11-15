import { NcfsActions } from "../NcfsPolicy/NcfsActions";
import { NcfsRoute } from "../NcfsPolicy/NcfsRoute";
import { ContentFlags } from "./ContentFlags/ContentFlags";

export interface AdaptionPolicy {
    contentManagementFlags: ContentFlags,
    errorReportTemplate: string,
    ncfsRoute: NcfsRoute,
    ncfsActions: NcfsActions
}