import { PdfContentFlags } from "./PdfContentFlags";
import { WordContentFlags } from "./WordContentFlags";
import { ExcelContentFlags } from "./ExcelContentFlags";
import { PowerpointContentFlags } from "./PowerpointContentFlags";

export interface ContentFlags {
    pdfContentManagement: PdfContentFlags,
    wordContentManagement: WordContentFlags,
    excelContentManagement: ExcelContentFlags,
    powerPointContentManagement: PowerpointContentFlags
}