import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	graphInfo,
	viewInfo,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INSetupMaint",
	primaryView: "setup",
})
export class IN101000 extends PXScreen {
	@viewInfo({ containerName: "IN Preferences" })
	setup = createSingle(insetup);
}

export class insetup extends PXView {
	BatchNumberingID: PXFieldState;
	ReceiptNumberingID: PXFieldState;
	IssueNumberingID: PXFieldState;
	AdjustmentNumberingID: PXFieldState;
	KitAssemblyNumberingID: PXFieldState;
	PINumberingID: PXFieldState;
	ReplenishmentNumberingID: PXFieldState;
	ServiceItemNumberingID: PXFieldState;
	ManufacturingNumberingID: PXFieldState;

	UseInventorySubItem: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplanBackOrders: PXFieldState;
	AllocateDocumentsOnHold: PXFieldState;

	ARClearingAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ARClearingSubID: PXFieldState;
	TransitBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	INTransitAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	INTransitSubID: PXFieldState;
	INProgressAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	INProgressSubID: PXFieldState;

	UpdateGL: PXFieldState;
	SummPost: PXFieldState;
	AutoPost: PXFieldState;

	HoldEntry: PXFieldState;
	RequireControlTotal: PXFieldState;
	AddByOneBarcode: PXFieldState;
	AutoAddLineBarcode: PXFieldState;
	ShowBarcodesInOrderLines: PXFieldState;
	DfltStkItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltNonStkItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	ReceiptReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	IssuesReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjustmentReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	AssemblyDisassemblyReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	TransferReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	PIReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;

	PIUseTags: PXFieldState;
	PILastTagNumber: PXFieldState;
	TurnoverPeriodsPerYear: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoReleasePIAdjustment: PXFieldState;

	IncludeSaleInTurnover: PXFieldState;
	IncludeProductionInTurnover: PXFieldState;
	IncludeAssemblyInTurnover: PXFieldState;
	IncludeIssueInTurnover: PXFieldState;
	IncludeTransferInTurnover: PXFieldState;
}
