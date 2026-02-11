import {
	createCollection, PXScreen, graphInfo, PXActionState, PXView, PXFieldState, gridConfig, columnConfig, linkCommand,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.BatchRelease", primaryView: "BatchList",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL501000 extends PXScreen {

	BatchList_batchNbr_ViewDetails: PXActionState;

	BatchList = createCollection(Batch);
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: ["BatchNbr", "Description"]
})
export class Batch extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	BranchID: PXFieldState;
	Module: PXFieldState;
	@linkCommand("BatchList_batchNbr_ViewDetails")
	BatchNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	DateEntered: PXFieldState;
	LastModifiedByID_Modifier_Username: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	ControlTotal: PXFieldState;
	Description: PXFieldState;
}
