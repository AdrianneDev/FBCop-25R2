import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridPreset } from "client-controls";


// Views

export class RowFilter extends PXView  {
}

@gridConfig({
	preset: GridPreset.Primary,
	autoAdjustColumns: true
})
export class RowTableDefinition extends PXView  {
	@linkCommand("actionEdit")
	@columnConfig({width: 150})	ShortName: PXFieldState;
	@columnConfig({width: 300})	TableName: PXFieldState;
	@columnConfig({width: 150})	DBName: PXFieldState;
}

export class RowFilterCreateTable extends PXView  {
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
}
