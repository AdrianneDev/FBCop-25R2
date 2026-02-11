import {
	createCollection, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, linkCommand, columnConfig, PXActionState,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.VoucherRelease", primaryView: "Documents",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL501500 extends PXScreen {

	EditDetail: PXActionState;

	Documents = createCollection(GLDocBatch);
}


@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: ["BatchNbr", "Description"]
})
export class GLDocBatch extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	Module: PXFieldState;

	@linkCommand("EditDetail")
	BatchNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	DateEntered: PXFieldState;
	LastModifiedByID_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	ControlTotal: PXFieldState;
	Description: PXFieldState;
}
