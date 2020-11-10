import { PdfContentFlags } from "./PdfContentFlags";
import { WordContentFlags } from "./WordContentFlags";
import { ExcelContentFlags } from "./ExcelContentFlags";
import { PowerpointContentFlags } from "./PowerpointContentFlags";

export interface ContentFlags {
    PdfContentManagement: PdfContentFlags,
    WordContentManagement: WordContentFlags,
    ExcelContentManagement: ExcelContentFlags,
    PowerPointContentManagement: PowerpointContentFlags
}