import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig, linkCommand,
	GridColumnType, PXFieldOptions, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARPPDCreditMemoProcess", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR504500 extends PXScreen {
	ViewDocument: PXActionState;

   	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ARPPDCreditMemoParameters);

   	@viewInfo({containerName: "Applications"})
	Applications = createCollection(ARAdjust);
}

export class ARPPDCreditMemoParameters extends PXView {
	ApplicationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerateOnePerCustomer: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxAdjustmentDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class ARAdjust extends PXView {
	@columnConfig({ allowNull: false, allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AdjdBranchID: PXFieldState;

	AdjdCustomerID: PXFieldState;
	AdjdDocType: PXFieldState;

	@linkCommand("ViewDocument")
	AdjdRefNbr: PXFieldState;

	AdjdDocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InvCuryID: PXFieldState;

	InvCuryOrigDocAmt: PXFieldState;
	CuryAdjdPPDAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InvTermsID: PXFieldState;

	@linkCommand("ViewDocument")
	AdjgRefNbr: PXFieldState;
}
