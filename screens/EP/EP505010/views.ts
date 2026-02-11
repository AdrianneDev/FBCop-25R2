import {
	columnConfig,
	gridConfig,
	GridColumnDisplayMode,
	PXFieldState,
	PXFieldOptions,
	PXView,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

@gridConfig({
	preset: GridPreset.Processing,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FilteredItems extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35 })
	Selected: PXFieldState;

	TimeCardCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 150 })
	EmployeeID_description: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true, width: 200 })
	WeekID: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	OvertimeSpent: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.NoLabel>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TotalTimeSpent: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.NoLabel>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeBillable: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	OvertimeBillable: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.NoLabel>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TotalTimeBillable: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.NoLabel>;

	@columnConfig({ width: 150, hideViewLink: true })
	EPApprovalEx__ApprovedByID: PXFieldState;

	@columnConfig({ width: 150, visible: false })
	EPEmployeeEx__AcctName: PXFieldState;

	EPApprovalEx__ApproveDate: PXFieldState;
}
