import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POPrintOrder",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class PO503000 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(POPrintOrderFilter);

	@viewInfo({ containerName: "Orders" })
	Records = createCollection(POOrder);
}

export class POPrintOrderFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	DefinePrinterManually: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCopies: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class POOrder extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	OrderType: PXFieldState<PXFieldOptions.Hidden>;
	OrderNbr: PXFieldState;
	OrderDate: PXFieldState;
	Status: PXFieldState;
	EPEmployee__acctName: PXFieldState;
	OrderDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryControlTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Vendor__AcctCD: PXFieldState;

	Vendor__AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Vendor__VendorClassID: PXFieldState;
}
