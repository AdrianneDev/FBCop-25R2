import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,

	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INDocumentRelease",
	primaryView: "INDocumentList",
})
export class IN501000 extends PXScreen {
	ViewDocument: PXActionState;

	@viewInfo({ containerName: "IN Document List" })
	INDocumentList = createCollection(INDocumentList);
}

@gridConfig({
	preset: GridPreset.Processing
})
export class INDocumentList extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrigModule: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	Status: PXFieldState;
	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	TotalQty: PXFieldState;
	TotalCost: PXFieldState;
	TotalAmount: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchBaseCuryID: PXFieldState;

	TranDesc: PXFieldState;
}