import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.RouteMaint", primaryView: "RouteRecords" })
export class FS203700 extends PXScreen {
	RouteRecords = createSingle(FSRoute);
	RouteSelected = createSingle(FSRouteSelected);
	RouteEmployeeRecords = createCollection(FSRouteEmployee);
	Mapping = createCollection(CSAttributeGroupList);
	WeekCodeFilter = createSingle(WeekCodeFilter);
	WeekCodeDateRecords = createCollection(FSWeekCodeDate);
}

export class FSRoute extends PXView {
	RouteCD: PXFieldState;
	OriginRouteID: PXFieldState<PXFieldOptions.CommitChanges>;
	RouteShort: PXFieldState;
	Descr: PXFieldState;
	WeekCode: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxAppointmentQty: PXFieldState<PXFieldOptions.CommitChanges>;
	NoAppointmentLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginBranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	EndBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	EndBranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSRouteSelected extends PXView {
	ActiveOnSunday: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnMonday: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnTuesday: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnWednesday: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnThursday: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnFriday: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnSaturday: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnSunday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnMonday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnTuesday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnWednesday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnThursday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnFriday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	BeginTimeOnSaturday_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	NbrTripOnSunday: PXFieldState;
	NbrTripOnMonday: PXFieldState;
	NbrTripOnTuesday: PXFieldState;
	NbrTripOnWednesday: PXFieldState;
	NbrTripOnThursday: PXFieldState;
	NbrTripOnFriday: PXFieldState;
	NbrTripOnSaturday: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FSRouteEmployee extends PXView {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccount__AcctName: PXFieldState;
	BAccount__Status: PXFieldState;
	PriorityPreference: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CSAttributeGroupList extends PXView {
	IsActive: PXFieldState;
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	ControlType: PXFieldState;
	DefaultValue: PXFieldState;
}

export class WeekCodeFilter extends PXView {
	DateBegin: PXFieldState<PXFieldOptions.CommitChanges>;
	DateEnd: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FSWeekCodeDate extends PXView {
	WeekCodeDate: PXFieldState<PXFieldOptions.CommitChanges>;
	WeekCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Mem_DayOfWeek: PXFieldState;
	Mem_WeekOfYear: PXFieldState;
	BeginDateOfWeek: PXFieldState;
}
