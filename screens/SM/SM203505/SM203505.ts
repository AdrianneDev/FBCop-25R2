import {
	CustomEventType, handleEvent, RowSelectedHandlerArgs, PXViewCollection, PXView, PXFieldState, PXActionState, PXScreen, PXFieldOptions,
	gridConfig, columnConfig, graphInfo, createSingle, createCollection, GridPreset,
	CellCssHandlerArgs} from "client-controls";

@graphInfo({graphType: "PX.SM.InstallationSetup", primaryView: "Setup"})
export class SM203505 extends PXScreen {
	reloadParameters: PXActionState;

	Setup = createSingle(UPSetup);
	StorageSettings = createCollection(UPStorageParameters);

	@handleEvent(CustomEventType.RowSelected, { view: "StorageSettings" })
	onDetailsChanged(args: RowSelectedHandlerArgs<PXViewCollection<UPStorageParameters>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow?.Value) {
			if (activeRow?.Value.isPassword) {
				activeRow.Value.columnConfig.editorConfig = {type: 2};
			}
			else {
				activeRow.Value.columnConfig.editorConfig = undefined;
			}
		}
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "StorageSettings", column: "Value" })
	public getPasswordCss(args: CellCssHandlerArgs<PXViewCollection<UPStorageParameters>>) {
		const row = args?.selector?.row as UPStorageParameters;
		console.log("row: ", row);
		if (row?.Value?.isPassword) return "password-cell";
		return "";
	}

}

export class UPSetup extends PXView {
	UpdateEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	UpdateServer: PXFieldState;
	UpdateNotification: PXFieldState;
	StorageProvider: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	fastFilterByAllFields: false
})
export class UPStorageParameters extends PXView {
	@columnConfig({allowUpdate: false, allowFastFilter: false})
	Name: PXFieldState;
	@columnConfig({allowUpdate: false, allowFastFilter: false})
	Value: PXFieldState;
	ReloadParameters: PXActionState;
}
