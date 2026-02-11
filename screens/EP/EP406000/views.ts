import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnDisplayMode, GridPreset, TextAlign, linkCommand } from "client-controls";

export class TimecardFilter extends PXView  {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false
})
export class TimecardWithTotals extends PXView {
	@linkCommand("Update") TimeCardCD: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;
	EmployeeID_description: PXFieldState;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		textAlign: TextAlign.Left
	})
	WeekID: PXFieldState;
	Status: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpentCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	OvertimeSpentCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TotalSpentCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeBillableCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	OvertimeBillableCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TotalBillableCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	BillingRateCalc: PXFieldState;
	WeekStartDate: PXFieldState;
}
