import { ContentManagementFlagAction } from "../../../../enums/ContentManagementFlagAction";

export interface WordContentFlags {
    DynamicDataExchange: ContentManagementFlagAction,
    EmbeddedFiles: ContentManagementFlagAction,
    EmbeddedImages: ContentManagementFlagAction,
    ExternalHyperlinks: ContentManagementFlagAction,
    InternalHyperlinks: ContentManagementFlagAction,
    Macros: ContentManagementFlagAction,
    Metadata: ContentManagementFlagAction,
    ReviewComments: ContentManagementFlagAction
}