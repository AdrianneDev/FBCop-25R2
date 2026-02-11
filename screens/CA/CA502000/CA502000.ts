import {
	PXScreen, createCollection, graphInfo, PXView, gridConfig,
	PXFieldState,
	PXActionState,
	columnConfig,
	linkCommand,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CATrxRelease", primaryView: "CARegisterList", hideFilesIndicator: true, hideNotesIndicator: true })
export class CA502000 extends PXScreen {
	CARegisterList = createCollection(CARegister);
}

@gridConfig({ preset: GridPreset.Processing })
export class CARegister extends PXView {
	ViewCATrx: PXActionState;

	@columnConfig({ allowCheckAll: true, allowNull: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	TranType: PXFieldState;

	@linkCommand("ViewCATrx")
	ReferenceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	CuryID: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryTranAmt: PXFieldState;

	Description: PXFieldState;

	DocDate: PXFieldState;

	FinPeriodID: PXFieldState;
}
