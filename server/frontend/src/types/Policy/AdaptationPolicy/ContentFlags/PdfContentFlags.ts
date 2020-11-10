import { ContentManagementFlagAction } from "../../../../enums/ContentManagementFlagAction";

export interface PdfContentFlags {
    Acroform: ContentManagementFlagAction,
    ActionsAll: ContentManagementFlagAction,
    EmbeddedFiles: ContentManagementFlagAction,
    EmbeddedImages: ContentManagementFlagAction,
    ExternalHyperlinks: ContentManagementFlagAction,
    InternalHyperlinks: ContentManagementFlagAction,
    Javascript: ContentManagementFlagAction,
    Metadata: ContentManagementFlagAction
}