import {
	columnConfig,
	controlConfig,
	gridConfig,
	GridNoteFilesShowMode,
	GridPreset,
	linkCommand,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridColumnShowHideMode,
	GridColumnDisplayMode
} from "client-controls";

export class DailyFieldReport extends PXView {
	DailyFieldReportCd: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Hold: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden | PXFieldOptions.NoLabel>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectManagerId: PXFieldState<PXFieldOptions.CommitChanges>;
	CreatedById: PXFieldState;
	SiteAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	City: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryId: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState<PXFieldOptions.CommitChanges>;
	PostalCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Department: PXFieldState<PXFieldOptions.CommitChanges>;
	SubDepartment: PXFieldState<PXFieldOptions.CommitChanges>;
	StreetName: PXFieldState<PXFieldOptions.CommitChanges>;
	BuildingNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	BuildingName: PXFieldState<PXFieldOptions.CommitChanges>;
	Floor: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	PostBox: PXFieldState<PXFieldOptions.CommitChanges>;
	Room: PXFieldState<PXFieldOptions.CommitChanges>;
	TownLocationName: PXFieldState<PXFieldOptions.CommitChanges>;
	DistrictName: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true }) Latitude: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true }) Longitude: PXFieldState<PXFieldOptions.CommitChanges>;
	TemperatureLevel: PXFieldState;
	Humidity: PXFieldState;
	Icon: PXFieldState;
	TimeObserved_Time: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
})
export class EmployeeActivities extends PXView {
	@columnConfig({
		width: 150,
		hideViewLink: true,
	})
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID_description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	WorkgroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EarningTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }})
	Date_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	TimeBillable: PXFieldState;
	Summary: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LastModifiedById: PXFieldState<PXFieldOptions.CommitChanges>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewTimeCard")
	TimeCardCD: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	ApprovalStatus: PXFieldState;
	Date_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentTaskNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	CertifiedJob: PXFieldState;
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	WorkCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShiftID: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproverID: PXFieldState;
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNoteID: PXFieldState;
	ReportedInTimeZoneID: PXFieldState;
	ReportedOnDate_Date: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t" })
	ReportedOnDate_Time: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class ProgressWorksheetLines extends PXView {
	LoadTemplate: PXActionState;
	SelectBudgetLines: PXActionState;

	@linkCommand("ViewProgressWorksheet")
	PMProgressWorksheet__HiddenRefNbr: PXFieldState;
	PMProgressWorksheet__HiddenStatus: PXFieldState;
	OwnerID: PXFieldState;
	WorkgroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	UOM: PXFieldState;
	PreviouslyCompletedQuantity: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	PriorPeriodQuantity: PXFieldState;
	CurrentPeriodQuantity: PXFieldState;
	TotalCompletedQuantity: PXFieldState;
	CompletedPercentTotalQuantity: PXFieldState;
	TotalBudgetedQuantity: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ChangeRequests extends PXView {
	CreateChangeRequest: PXActionState;

	@linkCommand("ViewChangeRequest")
	ChangeRequestId: PXFieldState<PXFieldOptions.CommitChanges>;
	PMChangeRequest__Date: PXFieldState;
	PMChangeRequest__ExtRefNbr: PXFieldState;
	PMChangeRequest__Description: PXFieldState;
	PMChangeRequest__Status: PXFieldState;
	PMChangeRequest__CostTotal: PXFieldState;
	PMChangeRequest__LineTotal: PXFieldState;
	PMChangeRequest__MarkupTotal: PXFieldState;
	PMChangeRequest__PriceTotal: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	PMChangeRequest__LastModifiedByID: PXFieldState;
	PMChangeRequest__LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class ChangeOrders extends PXView {
	CreateChangeOrder: PXActionState;

	@linkCommand("ViewChangeOrder")
	ChangeOrderId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	PMChangeOrder__ClassID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PMChangeOrder__CustomerID: PXFieldState;
	Customer__AcctName: PXFieldState;
	PMChangeOrder__DelayDays: PXFieldState;
	PMChangeOrder__ProjectNbr: PXFieldState;
	PMChangeOrder__ExtRefNbr: PXFieldState;
	PMChangeOrder__Description: PXFieldState;
	PMChangeOrder__Status: PXFieldState;
	PMChangeOrder__RevenueTotal: PXFieldState;
	PMChangeOrder__CommitmentTotal: PXFieldState;
	PMChangeOrder__CostTotal: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	PMChangeOrder__LastModifiedByID: PXFieldState;
	PMChangeOrder__LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Subcontractors extends PXView {
	@linkCommand("ViewVendor")
	VendorId: PXFieldState<PXFieldOptions.CommitChanges>;
	Vendor__AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeId: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfWorkers: PXFieldState<PXFieldOptions.CommitChanges>;
	TimeArrived_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	TimeDeparted_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkingTimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalWorkingTimeSpent: PXFieldState;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LastModifiedById: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ProjectIssues extends PXView {
	CreateProjectIssue: PXActionState;

	@linkCommand("ViewProjectIssue")
	ProjectIssueId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectIssue__Summary: PXFieldState;
	ProjectIssue__Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectIssue__PriorityId: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectIssue__ProjectTaskId: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectIssue__ProjectIssueTypeId: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	ProjectIssue__LastModifiedByID: PXFieldState;
	ProjectIssue__LastModifiedDateTime: PXFieldState;
	ProjectIssue__CreationDate: PXFieldState<PXFieldOptions.Hidden>;
	ProjectIssue__DueDate: PXFieldState<PXFieldOptions.Hidden>;
	ProjectIssue__OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	ProjectIssue__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoRepaint: ["MainPhoto"]
})
export class PhotoLogs extends PXView {
	CreatePhotoLog: PXActionState;

	@linkCommand("ViewPhotoLog")
	PhotoLogId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	PhotoLog__StatusId: PXFieldState;
	PhotoLog__Date: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PhotoLog__ProjectTaskId: PXFieldState;
	PhotoLog__Description: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	PhotoLog__CreatedById: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	PhotoLog__LastModifiedByID: PXFieldState;
	PhotoLog__LastModifiedDateTime: PXFieldState;
	@columnConfig({
		visible: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Photo__FileId: PXFieldState;
}

export class MainPhoto extends PXView {
	ImageUrl: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Notes extends PXView {
	Time_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LastModifiedById: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class PurchaseReceipts extends PXView {
	CreateNewPurchaseReceipt: PXActionState;
	CreateNewPurchaseReturn: PXActionState;

	@linkCommand("ViewPurchaseReceipt")
	PurchaseReceiptId: PXFieldState<PXFieldOptions.CommitChanges>;
	POReceipt__ReceiptType: PXFieldState;
	POReceipt__Status: PXFieldState;
	POReceipt__VendorID: PXFieldState;
	Vendor__AcctName: PXFieldState;
	POReceipt__OrderQty: PXFieldState;
	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	POReceipt__LastModifiedByID: PXFieldState;
	POReceipt__LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Equipment extends PXView {
	@columnConfig({ hideViewLink: true })
	EquipmentId: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentDescription: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	SetupTime: PXFieldState<PXFieldOptions.CommitChanges>;
	RunTime: PXFieldState<PXFieldOptions.CommitChanges>;
	SuspendTime: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LastModifiedByID: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	@linkCommand("ViewEquipmentTimeCard")
	EquipmentTimeCardCd: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Weather extends PXView {
	LoadWeatherConditions: PXActionState;

	@columnConfig({ editorConfig: { timeMode: true } })
	TimeObserved_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	Cloudiness: PXFieldState;
	SkyState: PXFieldState;
	TemperatureLevel: PXFieldState;
	TemperatureLevelMobile: PXFieldState;
	Temperature: PXFieldState;
	Humidity: PXFieldState;
	PrecipitationAmount: PXFieldState;
	PrecipitationAmountMobile: PXFieldState;
	Precipitation: PXFieldState;
	WindSpeed: PXFieldState;
	WindSpeedMobile: PXFieldState;
	WindPower: PXFieldState;
	LocationCondition: PXFieldState;
	IsObservationDelayed: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LastModifiedById: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Visitors extends PXView {
	VisitorType: PXFieldState;
	VisitorName: PXFieldState;
	@linkCommand("ViewBAccount")
	BusinessAccountId: PXFieldState<PXFieldOptions.CommitChanges>;
	Company: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }})
	TimeArrived_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }})
	TimeDeparted_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	PurposeOfVisit: PXFieldState;
	AreaVisited: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LastModifiedById: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class EmployeeExpenses extends PXView {
	CreateExpenseReceipt: PXActionState;

	@linkCommand("ViewExpenseReceipt")
	EmployeeExpenseId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	EPExpenseClaimDetails__TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EPExpenseClaimDetails__CostCodeID: PXFieldState;
	EPExpenseClaimDetails__Status: PXFieldState;
	EPExpenseClaimDetails__TranDesc: PXFieldState;
	EPExpenseClaimDetails__ExpenseRefNbr: PXFieldState;
	EPExpenseClaimDetails__CuryTranAmtWithTaxes: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EPExpenseClaimDetails__CuryID: PXFieldState;
	@columnConfig({ hideViewLink: true, textField: "EPExpenseClaimDetails__EmployeeID_description" })
	EPExpenseClaimDetails__EmployeeID: PXFieldState;
	@linkCommand("ViewExpenseClaim")
	EPExpenseClaimDetails__RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	EPExpenseClaimDetails__LastModifiedByID: PXFieldState;
	EPExpenseClaimDetails__LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class History extends PXView {
	@linkCommand("ViewAttachedReport")
	FileName: PXFieldState<PXFieldOptions.CommitChanges>;
	Comment: PXFieldState;
	CreatedDateTime: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	CreatedById: PXFieldState;
}

export class costBudgetfilter extends PXView {
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: false,
	allowUpdate: false,
	allowDelete: false,
})
export class CostBudgets extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	RevisedQty: PXFieldState;
}
