import { PXView, PXFieldState, gridConfig, fieldConfig, columnConfig, GridColumnType, GridPreset } from "client-controls";


// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

export class FilterCodeFile extends PXView  {
}


export class CustObject extends PXView  {
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	FileContent: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoAdjustColumns: true
})
export class RowBaseMethod extends PXView  {
	@columnConfig({width: 50, type: GridColumnType.CheckBox})	Selected: PXFieldState;
	@columnConfig({width: 100})	DeclaringType: PXFieldState;
	@columnConfig({width: 300})	Name: PXFieldState;
}

export class FilterActionWizard extends PXView  {
	ActionName: PXFieldState;
	DisplayName: PXFieldState;
}
