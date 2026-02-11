import {
	PXScreen, graphInfo, PXView, PXFieldState, PXActionState, createCollection, linkCommand, gridConfig, GridPreset, columnConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CA.CAPendingReviewEnq", primaryView: "Documents",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class CA403000 extends PXScreen {
	Documents = createCollection(ARPaymentInfo);

	redirectToDoc: PXActionState;
	redirectToCustomer: PXActionState;
}

@gridConfig({ preset: GridPreset.Inquiry, initNewRow: true, quickFilterFields: ["RefNbr", "CustomerID"] })
export class ARPaymentInfo extends PXView {
	BranchID: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("redirectToDoc")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PaymentMethodID: PXFieldState;

	PMInstanceDescr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProcessingCenterID: PXFieldState;

	@linkCommand("redirectToCustomer")
	CustomerID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;
	DocDate: PXFieldState;
	CCPaymentStateDescr: PXFieldState;
	ValidationStatus: PXFieldState;
}
