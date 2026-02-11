import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnType, TextAlign, GridPreset, GridNoteFilesShowMode, fieldConfig } from "client-controls";

// Views

export class CustProject extends PXView  {
	Name: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false,
	autoAdjustColumns: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	autoRepaint: ["EditObject"],
	actionsConfig: { adjust: { hidden: true }, exportToExcel: { hidden: true } },
})
export class CustObject extends PXView  {
	Name: PXFieldState;
	Type: PXFieldState;
	Description: PXFieldState;
	@columnConfig({allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsDisabled: PXFieldState;
	CreatedByID_Creator_Username: PXFieldState;
	CreatedDateTime: PXFieldState;
	LastModifiedByID_Modifier_Username: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

export class SelectedCustObject extends PXView  {
	@fieldConfig({ controlType: "qp-code-editor" })
	Content: PXFieldState;
}
