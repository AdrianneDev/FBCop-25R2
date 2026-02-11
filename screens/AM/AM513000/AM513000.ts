import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.AMTimeCardCreate", primaryView: "Items", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM513000 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	TimeCardFilter = createSingle(TimeCardFilter);
	@viewInfo({ containerName: "Documents" })
	Items = createCollection(Items);
}

export class TimeCardFilter extends PXView {
	ShowAll: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class Items extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	BatNbr: PXFieldState;
	TranDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	EmployeeID: PXFieldState;
	LaborTime: PXFieldState;
	LaborRate: PXFieldState;
	ExtCost: PXFieldState;
	@columnConfig({ hideViewLink: true }) ProjectID: PXFieldState;
	@columnConfig({ hideViewLink: true }) TaskID: PXFieldState;
	CostCodeID: PXFieldState;
	TimeCardStatus: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true }) LaborCodeID: PXFieldState;
}
