import { columnConfig, createCollection, createSingle, featureInstalled, gridConfig, GridPreset, linkCommand, PXFieldOptions, PXFieldState, PXView } from "client-controls";
import { ConstraintHistoryView } from "../views";
import { SM604000 } from "../SM604000";

export interface SM604000_GIAnomalies extends SM604000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+GIAnomalyDetection")
export class SM604000_GIAnomalies {
	GILinesProcessedFilter = createSingle(GILinesProcessedFilter);
	GILinesProcessedDetails = createCollection(GILinesProcessedDetails);
}

export interface MLGIConstraintHistoryView extends ConstraintHistoryView {}

@featureInstalled("PX.Objects.CS.FeaturesSet+GIAnomalyDetection")
export class MLGIConstraintHistoryView {
	@linkCommand("actionGILinesProcessedDetails")
	@columnConfig({	allowUpdate: false	})
	GILinesProcessed: PXFieldState;
	@linkCommand("actionGILinesProcessedDetails")
	@columnConfig({	allowUpdate: false	})
	GIAnomaliesProcessed: PXFieldState;
}

export class GILinesProcessedFilter extends PXView {
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	InfoMessage: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, allowUpdate: false, autoAdjustColumns: true })
export class GILinesProcessedDetails extends PXView {
	Date: PXFieldState;
	CompanyID: PXFieldState;
	GIDesignWithCompany__Name: PXFieldState;
	RowsUploaded: PXFieldState;
}
