import { ContentManagementFlagAction } from "../../../../enums/ContentManagementFlagAction";

export interface PowerpointContentFlags {
    embeddedFiles: ContentManagementFlagAction,
    embeddedImages: ContentManagementFlagAction,
    externalHyperlinks: ContentManagementFlagAction,
    internalHyperlinks: ContentManagementFlagAction,
    macros: ContentManagementFlagAction,
    metadata: ContentManagementFlagAction,
    reviewComments: ContentManagementFlagAction
}