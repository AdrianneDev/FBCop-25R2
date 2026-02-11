import {
	graphInfo,
	gridConfig,
	columnConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.StaffContractScheduleProcess", primaryView: "Filter" })
export class FS500400 extends PXScreen {
	Filter = createSingle(StaffScheduleFilter);
	StaffSchedules = createCollection(FSStaffSchedule);
	ContractHistoryRecords = createCollection(FSContractGenerationHistory);
}

export class StaffScheduleFilter extends PXView {
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ToDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class FSStaffSchedule extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	RefNbr: PXFieldState;
	StaffScheduleDescription: PXFieldState;
	EmployeeID: PXFieldState;
	BAccount__AcctName: PXFieldState;
	ScheduleType: PXFieldState;
	StartDate_Date: PXFieldState;
	EndDate_Date: PXFieldState;
	StartTime_Time: PXFieldState;
	EndTime_Time: PXFieldState;
	RecurrenceDescription: PXFieldState;
	LastGeneratedElementDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class FSContractGenerationHistory extends PXView {
	GenerationID: PXFieldState;
	LastProcessedDate: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}
