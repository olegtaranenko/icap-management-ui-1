import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";

export interface ExcelContentFlags {
    DynamicDataExchange: ContentManagementFlagAction,
    EmbeddedFiles: ContentManagementFlagAction,
    EmbeddedImages:ContentManagementFlagAction,
    ExternalHyperlinks: ContentManagementFlagAction,
    InternalHyperlinks: ContentManagementFlagAction,
    Macros: ContentManagementFlagAction,
    Metadata: ContentManagementFlagAction,
    ReviewComments: ContentManagementFlagAction
}