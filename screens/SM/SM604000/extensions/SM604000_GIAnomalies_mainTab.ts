import { PXFieldOptions, PXFieldState } from "client-controls";
import { ConstraintHistoryView, MainInformationFilterClass } from "../views";
import { SM604000 } from "../SM604000";

export interface SM604000_GIAnomalies_mainTab extends SM604000 { }

export class SM604000_GIAnomalies_mainTab { }

export interface MLGIConstraintHistoryView extends ConstraintHistoryView {}

export interface MLGIMainInformationFilter extends MainInformationFilterClass {}

export class MLGIMainInformationFilter {
	MaxGILinesProcessedPerDay: PXFieldState<PXFieldOptions.Readonly>;
	MaxGIAnomaliesProcessedPerDay: PXFieldState<PXFieldOptions.Readonly>;
}
