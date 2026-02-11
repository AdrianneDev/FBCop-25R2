import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	TextAlign,
	GridPreset,
	GridFastFilterVisibility,
	ViewQueryParameter,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.NumberingMaint", primaryView: "Header" })
export class CS201010 extends PXScreen {
	@viewInfo({ containerName: "Numbering Sequence Summary",  parameters: [ new ViewQueryParameter("Numbering.NumberingID", "NumberingID") ] })
	Header = createSingle(Numbering);

	@viewInfo({ containerName: "Numbering Sequence Details" })
	Sequence = createCollection(NumberingSequence);
}

export class Numbering extends PXView {
	NumberingID: PXFieldState;
	Descr: PXFieldState;
	UserNumbering: PXFieldState<PXFieldOptions.CommitChanges>;
	NewSymbol: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
	syncPosition: false
})
export class NumberingSequence extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	NBranchID: PXFieldState;
	StartNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	EndNbr: PXFieldState;
	StartDate: PXFieldState;
	LastNbr: PXFieldState;
	WarnNbr: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	NbrStep: PXFieldState;
}
