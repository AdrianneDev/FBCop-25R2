import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridFilterBarVisibility,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign
} from "client-controls";

export class Filter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	MyWorkGroup: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class Records extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewSubcontractDetails")
	OrderNbr: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ allowUpdate: false })
	Status: PXFieldState;
	@columnConfig({ allowUpdate: false })
	EPEmployee__acctName: PXFieldState;
	OrderDesc: PXFieldState;
	@columnConfig({
		width: 200,
		hideViewLink: true,
		textAlign: TextAlign.Left
	})
	OwnerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	CuryControlTotal: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Vendor__AcctCD: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Vendor__AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Vendor__VendorClassID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OwnerWorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
}
