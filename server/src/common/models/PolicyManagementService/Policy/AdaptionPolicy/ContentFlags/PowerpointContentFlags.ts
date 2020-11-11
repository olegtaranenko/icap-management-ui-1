import { ContentManagementFlagAction } from "../../../../enums/ContentManagementFlagAction";

export interface PowerpointContentFlags {
    EmbeddedFiles: ContentManagementFlagAction,
    EmbeddedImages: ContentManagementFlagAction,
    ExternalHyperlinks: ContentManagementFlagAction,
    InternalHyperlinks: ContentManagementFlagAction,
    Macros: ContentManagementFlagAction,
    Metadata: ContentManagementFlagAction,
    ReviewComments: ContentManagementFlagAction
}