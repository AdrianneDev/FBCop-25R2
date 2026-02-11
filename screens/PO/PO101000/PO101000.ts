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
	GridColumnDisplayMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POSetupMaint",
	primaryView: "Setup",
})
export class PO101000 extends PXScreen {
	@viewInfo({ containerName: "General Settings" })
	Setup = createSingle(POSetup);
}

export class POSetup extends PXView {
	StandardPONumberingID: PXFieldState;
	RegularPONumberingID: PXFieldState;
	ReceiptNumberingID: PXFieldState;
	LandedCostDocNumberingID: PXFieldState;
	RequireReceiptControlTotal: PXFieldState;
	RequireOrderControlTotal: PXFieldState;
	RequireBlanketControlTotal: PXFieldState;
	RequireDropShipControlTotal: PXFieldState;
	RequireProjectDropShipControlTotal: PXFieldState;
	RequireLandedCostsControlTotal: PXFieldState;
	PPVAllocationMode: PXFieldState<PXFieldOptions.CommitChanges>;
	PPVReasonCodeID: PXFieldState;
	APInvoiceValidation: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyLineDescrSO: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyLineNoteSO: PXFieldState;
	CopyLineNotesFromServiceOrder: PXFieldState;
	CopyLineAttachmentsFromServiceOrder: PXFieldState;
	CopyLineNotesToReceipt: PXFieldState;
	CopyLineFilesToReceipt: PXFieldState;
	AutoCreateInvoiceOnReceipt: PXFieldState;
	AutoCreateLCAP: PXFieldState;
	FreightExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightExpenseSubID: PXFieldState;
	RCReturnReasonCodeID: PXFieldState;
	TaxReasonCodeID: PXFieldState;
	AutoReleaseIN: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoReleaseLCIN: PXFieldState;
	AutoReleaseAP: PXFieldState;
	HoldReceipts: PXFieldState;
	HoldLandedCosts: PXFieldState;
	AddServicesFromNormalPOtoPR: PXFieldState<PXFieldOptions.CommitChanges>;
	AddServicesFromDSPOtoPR: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateSubOnOwnerChange: PXFieldState;
	AutoAddLineReceiptBarcode: PXFieldState;
	ReceiptByOneBarcodeReceiptBarcode: PXFieldState;
	ReturnOrigCost: PXFieldState;
	ChangeCuryRateOnReceipt: PXFieldState;
	DefaultReceiptAssignmentMapID: PXFieldState;
	ShipDestType: PXFieldState;
	DefaultReceiptQty: PXFieldState;
	OrderRequestApproval: PXFieldState;
}
