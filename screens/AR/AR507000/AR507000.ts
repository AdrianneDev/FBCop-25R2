import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand,
	columnConfig, PXActionState, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.ARFinChargesApplyMaint", primaryView: "Filter", })
export class AR507000 extends PXScreen {

	ViewDocument: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(ARFinChargesApplyParameters);

	ARFinChargeRecords = createCollection(ARFinChargesDetails);
}

export class ARFinChargesApplyParameters extends PXView {
	StatementCycle: PXFieldState<PXFieldOptions.CommitChanges>;
	FinChargeDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class ARFinChargesDetails extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	DocDate: PXFieldState;
	DueDate: PXFieldState;
	CustomerID: PXFieldState;
	CustomerID_BAccountR_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;
	LastPaymentDate: PXFieldState;
	LastChargeDate: PXFieldState;
	OverdueDays: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinChargeCuryID: PXFieldState;

	FinChargeAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ARSubID: PXFieldState;

	FinChargeID: PXFieldState;
}
