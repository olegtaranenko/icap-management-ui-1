import { ContentManagementFlagAction } from "../../../../enums/ContentManagementFlagAction";

export interface PdfContentFlags {
    acroform: ContentManagementFlagAction,
    actionsAll: ContentManagementFlagAction,
    embeddedFiles: ContentManagementFlagAction,
    embeddedImages: ContentManagementFlagAction,
    externalHyperlinks: ContentManagementFlagAction,
    internalHyperlinks: ContentManagementFlagAction,
    javascript: ContentManagementFlagAction,
    metadata: ContentManagementFlagAction
}