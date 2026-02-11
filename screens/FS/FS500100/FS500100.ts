import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.CreateInvoiceByAppointmentPost", primaryView: "Filter" })
export class FS500100 extends PXScreen {
	ViewPostBatch: PXActionState;
	Filter = createSingle(CreateInvoiceFilter);
	PostLines = createCollection(AppointmentToPost);
}

export class CreateInvoiceFilter extends PXView {
	PostTo: PXFieldState<PXFieldOptions.CommitChanges>;
	BillingCycleID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	UpToDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IgnoreBillingCycles: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceDate: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepareInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleaseInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailSalesOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	SOQuickProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleaseBill: PXFieldState<PXFieldOptions.CommitChanges>;
	PayBill: PXFieldState<PXFieldOptions.CommitChanges>;
}
@gridConfig({
	preset: GridPreset.Processing,
})
export class AppointmentToPost extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SrvOrdType: PXFieldState;

	RefNbr: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BillCustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BillLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BillingCycleCD: PXFieldState;

	CutOffDate: PXFieldState;
	SORefNbr: PXFieldState;
	ActualDateTimeBegin_Date: PXFieldState;
	ActualDateTimeBegin_Time: PXFieldState;
	ActualDateTimeEnd_Date: PXFieldState;
	ActualDateTimeEnd_Time: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchLocationID: PXFieldState;

	Status: PXFieldState;
	DocDesc: PXFieldState;
	BatchID: PXFieldState;
}
