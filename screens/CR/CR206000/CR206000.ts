import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	columnConfig,
	viewInfo,
	localizable,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

import { CSAttributeGroup } from "src/screens/CR/common/tabs/tab-attributes/views";

@localizable
class MessagesLocal {
	static InitialResponseTimeTracking = "Initial Response Time Tracking";
	static ResponseTimeTracking = "Response Time Tracking";
	static ResolutionTimeTracking = "Resolution Time Tracking";
}

@graphInfo({ graphType: "PX.Objects.CR.CRCaseClassMaint", primaryView: "CaseClasses", keepControlFocus: true, showActivitiesIndicator: true })
export class CR206000 extends PXScreen {
	@viewInfo({ containerName: "Case Class Summary" })
	CaseClasses = createSingle(CRCaseClass);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);

	@viewInfo({ containerName: "Reaction" })
	CaseClassesReaction = createCollection(CRClassSeverityTime);

	LaborMatrix = createCollection(CRCaseClassLaborMatrix);

	WorkCalendar = createSingle(CSCalendar);
}

export class CRCaseClass extends PXView {
	CaseClassID: PXFieldState;
	IsInternal: PXFieldState;
	Description: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CalendarID: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireCustomer: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireVendor: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireContact: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowEmployeeAsContact: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireContract: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireClosureNotes: PXFieldState;
	DefaultEMailAccountID: PXFieldState;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOverrideBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	PerItemBilling: PXFieldState<PXFieldOptions.CommitChanges>;
	TrackSolutionsInActivities: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LabourItemID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	OvertimeItemID: PXFieldState;
	RoundingInMinutes: PXFieldState;
	MinBillTimeInMinutes: PXFieldState;
	@controlConfig({ allowNull: true })
	ReopenCaseTimeInDays: PXFieldState;
	StopTimeCounterType: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeSystemActivitiesResponseTimeCalculation: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, fastFilterByAllFields: false })
export class CRClassSeverityTime extends PXView {
	Severity: PXFieldState;
	@columnConfig({ allowNull: false, toolTip: MessagesLocal.InitialResponseTimeTracking })
	TrackInitialResponseTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	InitialResponseTimeTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	InitialResponseGracePeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false, toolTip: MessagesLocal.ResponseTimeTracking })
	TrackResponseTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	ResponseTimeTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	ResponseGracePeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false, toolTip: MessagesLocal.ResolutionTimeTracking })
	TrackResolutionTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	ResolutionTimeTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	ResolutionGracePeriod: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig ({ preset: GridPreset.Details })
export class CRCaseClassLaborMatrix extends PXView {
	EarningType: PXFieldState;
	LabourItemID: PXFieldState;
}

export class CSCalendar extends PXView {
	WorkdayTime: PXFieldState<PXFieldOptions.Disabled>;
}
