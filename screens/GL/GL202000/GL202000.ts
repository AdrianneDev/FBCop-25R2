import {
	PXView, createSingle, graphInfo, PXScreen, createCollection, columnConfig, gridConfig, GridPreset,
	PXFieldOptions, PXFieldState
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.AccountClassMaint", primaryView: "AccountClassRecords",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL202000 extends PXScreen {
	AccountClassRecords = createCollection(AccountClassRecords);
}

@gridConfig({ preset: GridPreset.Primary })
export class AccountClassRecords extends PXView {
	AccountClassID: PXFieldState;
	Type: PXFieldState;
	Descr: PXFieldState;
}
