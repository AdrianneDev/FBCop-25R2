import { PXView, PXFieldState, PXFieldOptions } from "client-controls";

export class MLCrossSalesSetup extends PXView  {
	ReCalculationPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	MLCrossSalesProcessing__ProcessingID: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__NextRun: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__Progress: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__MLStatus: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__UploadDate: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__ProcessedDate: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__RowsUploaded: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__RowsImported: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__Error: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__MinRelevanceScorePercent: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__DataPeriodForAnalysis: PXFieldState<PXFieldOptions.Readonly>;
	MLCrossSalesProcessing__InfoMessage: PXFieldState<PXFieldOptions.Readonly>;
}
