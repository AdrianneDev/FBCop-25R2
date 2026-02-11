/* eslint-disable @stylistic/brace-style */
import { observable } from "aurelia-binding";
import {
	GridCell, GridPreset, PXFieldState, PXView, gridConfig,
	GridFastFilterVisibility, GridFilterBarVisibility, GridNoteFilesShowMode,
	GridPagerMode, PXFieldOptions, columnConfig, headerDescription, readOnly
} from "client-controls";

export enum PeriodKind {
	Day = 1,
	Week = 2,
	Month = 3,
}

export class DatesFilter extends PXView {
	DateFrom: PXFieldState;
	DateTo: PXFieldState;
	FilterBusinessHours: PXFieldState;
	PeriodKind: PXFieldState;

	PickerDateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	PickerDateTo: PXFieldState<PXFieldOptions.CommitChanges>;
	DatePickerMode: PXFieldState;

	get filterBusinessHoursValue() {
		return this.FilterBusinessHours?.value ?? true;
	}

	get periodKindValue() {
		return this.PeriodKind?.value ?? PeriodKind.Day;
	}
}


@gridConfig({
	preset: GridPreset.Details,
	allowStoredFilters: true,
	pageSize: 50,
	adjustPageSize: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class Order extends PXView {
	Id: GridCell;
	@columnConfig({ allowFilter: true }) OrderType: GridCell;
	@columnConfig({ allowFastFilter: true }) ProdOrdID: GridCell;
	@columnConfig({ allowFilter: false }) SchdID: GridCell;
	@columnConfig({ allowFastFilter: true }) InventoryCD: GridCell;
	OrdDescr: GridCell;
	Descr: GridCell;
	CalcedStartDate: GridCell;
	CalcedEndDate: GridCell;
	@columnConfig({ allowFilter: false }) CalcedA: GridCell;
	QtytoProd: GridCell;
	QtyRemaining: GridCell;
	StartDate: GridCell;
	EndDate: GridCell;
	@columnConfig({ allowFilter: false }) ProductOrderType: GridCell;
	@columnConfig({ allowFilter: false }) ProductOrdID: GridCell;
	@columnConfig({ allowFilter: false }) ParentOrderType: GridCell;
	@columnConfig({ allowFilter: false }) ParentOrdID: GridCell;
	ProductID: GridCell;
	ParentID: GridCell;
	@columnConfig({ allowFilter: false }) IsProduct: GridCell;
	@columnConfig({ allowFilter: false }) IsChild: GridCell;
	ChildMinStartDate: GridCell;
	ChildMaxEndDate: GridCell;
	@columnConfig({ allowFilter: false }) RequestedOn: GridCell;
	SchPriority: GridCell;
	@columnConfig({ allowFilter: false }) IsLate: GridCell;
	@columnConfig({ allowFilter: false }) IsEarly: GridCell;
	@columnConfig({ allowFilter: false }) IsOnTime: GridCell;
	@columnConfig({ allowFilter: false }) LackOfMaterials: GridCell;
	@columnConfig({ allowFilter: false }) ShippingDescr: GridCell;
	@columnConfig({ allowFilter: false }) ReadOnly: GridCell;
	Schedulable: GridCell;
	@columnConfig({ allowFilter: false }) FirmSchedule: GridCell;
	@columnConfig({ allowFilter: false }) Selected: GridCell;
	@columnConfig({ allowFilter: false, commitChanges: true }) IsEventExpanded: GridCell;
	SchedulingMethod: GridCell;
	ScheduleStatus: GridCell;
	StatusID: GridCell;
	CustomerID: GridCell;
	@columnConfig({ allowFilter: false }) CustomerName: GridCell;
	@columnConfig({ allowFilter: false }) ProductWorkgroupID: GridCell;
	@columnConfig({ allowFilter: false }) WorkgroupDescr: GridCell;
	ProductManagerID: GridCell;
	@columnConfig({ allowFilter: false }) ProductManager: GridCell;
	SoOrderType: GridCell;
	SoOrderNumber: GridCell;
	OrderDate: GridCell;

	isFilteredOut: boolean;
	isDimmed: boolean;

	get caption() { return this.ProdOrdID.cellText; }
	get fullId() { return `${this.OrderType.cellText} - ${this.ProdOrdID.cellText}`; }
	get startDate() { return new Date(this.StartDate?.value); }
	get endDate() { return new Date(this.EndDate?.value); }
	get orderID() { return `${this.OrderType.cellText} - ${this.ProdOrdID.cellText}`; }
	get isProduct() { return !!this.IsProduct.value; }
	get isChild() { return !!this.IsChild.value; }
	get productID() { return `${this.ProductOrderType.cellText} - ${this.ProductOrdID.cellText}`; }
	get parentID() { return `${this.ParentOrderType.cellText} - ${this.ParentOrdID.cellText}`; }
	get childMinStartDate() { return this.ChildMinStartDate?.value; }
	get childMaxEndDate() { return this.ChildMaxEndDate?.value; }
	get requestedDate() { return new Date(this.RequestedOn?.value); }
	get isSchedulable() { return !!this.Schedulable?.value; }
	get isFirm() { return !!this.FirmSchedule.value; }
	get isScheduled() { return ["S"].includes(this.ScheduleStatus.value.toUpperCase()) || this.isFirm; }
	get isUnscheduled() { return ["U"].includes(this.ScheduleStatus.value.toUpperCase()); }
	get isCompleted() { return ["M", "C"].includes(this.StatusID.value.toUpperCase()); }
	get isReadOnly() { return !!this.ReadOnly.value; }
	get isSelected() { return this.Selected.value; }
	get isEventExpanded() { return !!this.IsEventExpanded?.value; }
	get isLate() { return !!this.IsLate.value; }
	get isOnTime() { return !!this.IsOnTime.value; }
	get prodSchdStatus() { return `${this.StatusID.cellText} - ${this.ScheduleStatus.cellText}`; }
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 10000,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	fastFilterByAllFields: false,
	actionsConfig: {
		// refresh: { hidden: true }, // TODO: Bug in Platform: Removing it the normal way moves changes the size of the toolbar
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class Operation extends PXView {
	Id: GridCell;
	OrderType: GridCell;
	@columnConfig({ allowFastFilter: true }) ProdOrdID: GridCell;
	SchdID: GridCell;
	ResourceId: GridCell;
	ProductOrderType: GridCell;
	ProductOrdID: GridCell;
	InventoryCD: GridCell;
	Name: GridCell;
	OperationID: GridCell;
	OperationDescr: GridCell;
	OperationStart: GridCell;
	OperationEnd: GridCell;
	StartDate: GridCell;
	EndDate: GridCell;
	OperationStatus: GridCell;
	ReadOnly: GridCell;
	Schedulable: GridCell;
	FirmSchedule: GridCell;
	Selected: GridCell;
	ScheduleStatus: GridCell;
	StatusID: GridCell;
	SchPriority: GridCell;
	IsLate: GridCell;
	IsEarly: GridCell;
	IsOnTime: GridCell;
	ShippingDescr: GridCell;
	LackOfMaterials: GridCell;
	@columnConfig({ allowFastFilter: true }) Descr: GridCell;
	QtytoProd: GridCell;
	CustomerID: GridCell;

	isFilteredOut: boolean;
	isDimmed: boolean;

	get orderID() { return `${this.OrderType.cellText} - ${this.ProdOrdID.cellText}`; }
	get opId() { return this.Id.cellText; }
	get fullId() { return `${this.ProdOrdID.cellText}-${this.OrderType.cellText}-${this.Id.cellText}`; }
	get resourceId() { return this.ResourceId.cellText; }
	get productID() { return `${this.ProductOrderType.cellText} - ${this.ProductOrdID.cellText}`; }
	get operationStart() { return new Date(this.OperationStart?.value); }
	get operationEnd() { return new Date(this.OperationEnd?.value); }
	get startDate() { return new Date(this.StartDate?.value); }
	get endDate() { return new Date(this.EndDate?.value); }

	get isCompleted() { return ["M", "C"].includes(this.OperationStatus.value.toUpperCase()); }
	get isPlanned() { return ["P"].includes(this.OperationStatus.value.toUpperCase()); }
	get isSchedulable() { return !!this.Schedulable?.value; }
	get isFirm() { return !!this.FirmSchedule.value; }
	get isScheduled() { return ["S"].includes(this.ScheduleStatus.value.toUpperCase()) || this.isFirm; }
	get isUnscheduled() { return ["U"].includes(this.ScheduleStatus.value.toUpperCase()); }
	get isReadOnly() { return !!this.ReadOnly.value; }
	get isSelected() { return this.Selected.value; }
	get prodSchdStatus() { return `${this.StatusID.cellText} - ${this.ScheduleStatus.cellText}`; }
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 1000,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showTopBar: false,
	actionsConfig: {
		// refresh: { hidden: true }, // TODO: Bug in Platform: Removing it the normal way moves changes the size of the toolbar
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class WCResource extends PXView {
	WcID: GridCell;
	Shift: GridCell;
	Id: GridCell;
	ShiftCode: GridCell;
	CrewSize: GridCell;
	Machines: GridCell;
	ResourceDetails: GridCell;

	getFullId(dateFrom: Date, dateTo: Date) { return `${this.Id.value}-${dateFrom.toISOString()}-${dateTo.toISOString()}`; }
	getResourceDetails() { return `${this.ResourceDetails?.value ? this.ResourceDetails?.displayName ?? this.ResourceDetails.cellText : ""}${this.ResourceDetails?.value ? `: ${this.ResourceDetails.value}` : ""}`; }
	get resourceName() { return this.WcID?.value; }
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 1000,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showTopBar: false,
})
export class MachineResource extends PXView {
	Id: GridCell;

	getFullId(dateFrom: Date, dateTo: Date) { return `${this.Id.value}-${dateFrom.toISOString()}-${dateTo.toISOString()}`; }
	getResourceDetails() { return ""; }
	get resourceName() { return this.Id?.value as string; }
}

export class SelectionFilter extends PXView {
	@readOnly ProdOrdID: PXFieldState;
	@readOnly OrderType: PXFieldState;
	@readOnly OperationID: PXFieldState;
	@readOnly SchdID: PXFieldState;
	@readOnly WcID: PXFieldState;
	@readOnly ShiftCD: PXFieldState;
	@readOnly MachID: PXFieldState;
	@readOnly DateFrom: PXFieldState;
	@readOnly DateTo: PXFieldState;
	@readOnly Allocated: PXFieldState;
	@readOnly MaxAllocation: PXFieldState;
}


@gridConfig({
	preset: GridPreset.Details,
	pageSize: 10000,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showTopBar: false,
	actionsConfig: {
		// refresh: { hidden: true }, // TODO: Bug in Platform: Removing it the normal way moves changes the size of the toolbar
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class CalendarResource extends PXView {
	Id: GridCell;
	Name: GridCell;
	UnspecifiedTimeIsWorking: GridCell;
	IsWorking: GridCell;
	RecurrentEndDate: GridCell;
	RecurrentStartDate: GridCell;
}

export class AMProdItem extends PXView {
	ConstDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SchedulingMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	SchPriority: PXFieldState;
	@readOnly Selected: PXFieldState;
	@readOnly StatusID: PXFieldState;
	@readOnly ScheduleStatus: PXFieldState;
	@readOnly OrderType: PXFieldState;
	@readOnly Descr: PXFieldState;
	@readOnly @headerDescription ProdOrdID: PXFieldState;
	@readOnly @headerDescription InventoryID: PXFieldState;
	@readOnly @headerDescription SubItemID: PXFieldState;
	@readOnly QtytoProd: PXFieldState;
	@readOnly @headerDescription UOM: PXFieldState;
	@readOnly StartDate: PXFieldState;
	@readOnly EndDate: PXFieldState;
	@readOnly DueDate: PXFieldState;
	@readOnly DueDateDiff: PXFieldState;
	@readOnly ProdDate: PXFieldState;
	@readOnly OrdTypeRef: PXFieldState;
	@readOnly OrdNbr: PXFieldState;
	@readOnly @headerDescription CustomerID: PXFieldState;
	@readOnly DetailSource: PXFieldState;
	@readOnly @headerDescription ProjectID: PXFieldState;
	@readOnly @headerDescription TaskID: PXFieldState;
	@readOnly @headerDescription CostCodeID: PXFieldState;
	@readOnly @headerDescription BranchID: PXFieldState;
	@readOnly @headerDescription LocationID: PXFieldState;
	@readOnly @headerDescription SiteID: PXFieldState;
}

export class AMSchdItem extends PXView {
	@readOnly QtyRemaining: PXFieldState;
	@readOnly SchPriority: PXFieldState;
	@readOnly ConstDate: PXFieldState;
	@readOnly StartDate: PXFieldState;
	@readOnly EndDate: PXFieldState;
	@readOnly SchedulingMethod: PXFieldState;
	@readOnly ScheduleStatus: PXFieldState;
	@readOnly FirmSchedule: PXFieldState;
	@readOnly SchdID: PXFieldState;
	@readOnly Selected: PXFieldState;
}

export class AMProdOper extends PXView {
	@readOnly @headerDescription OperationID: PXFieldState;
	@readOnly OperationCD: PXFieldState;
	@readOnly @headerDescription WcID: PXFieldState;
	@readOnly Descr: PXFieldState;
	@readOnly SetupTime: PXFieldState;
	@readOnly SetupTimeRaw: PXFieldState;
	@readOnly RunUnits: PXFieldState;
	@readOnly RunUnitTime: PXFieldState;
	@readOnly RunUnitTimeRaw: PXFieldState;
	@readOnly MachineUnits: PXFieldState;
	@readOnly MachineUnitTime: PXFieldState;
	@readOnly MachineUnitTimeRaw: PXFieldState;
	@readOnly QueueTime: PXFieldState;
	@readOnly QueueTimeRaw: PXFieldState;
	@readOnly FinishTime: PXFieldState;
	@readOnly FinishTimeRaw: PXFieldState;
	@readOnly MoveTime: PXFieldState;
	@readOnly MoveTimeRaw: PXFieldState;
	@readOnly QtytoProd: PXFieldState;
	@readOnly QtyComplete: PXFieldState;
	@readOnly QtyScrapped: PXFieldState;
	@readOnly QtyRemaining: PXFieldState;
	@readOnly TotalQty: PXFieldState;
	@readOnly StatusID: PXFieldState;
	@readOnly BFlush: PXFieldState;
	@readOnly StartDate: PXFieldState;
	@readOnly EndDate: PXFieldState;
	@readOnly ActStartDate: PXFieldState;
	@readOnly ActEndDate: PXFieldState;
	@readOnly ScrapAction: PXFieldState;
	@readOnly PhtmBOMID: PXFieldState;
	@readOnly PhtmBOMRevisionID: PXFieldState;
	@readOnly PhtmBOMOperationID: PXFieldState;
	@readOnly PhtmBOMLineRef: PXFieldState;
	@readOnly PhtmLevel: PXFieldState;
	@readOnly PhtmMatlBOMID: PXFieldState;
	@readOnly @headerDescription PhtmMatlRevisionID: PXFieldState;
	@readOnly @headerDescription PhtmMatlOperationID: PXFieldState;
	@readOnly PhtmMatlLineRef: PXFieldState;
	@readOnly PhtmPriorLevelQty: PXFieldState;
	@readOnly OutsideProcess: PXFieldState;
	@readOnly DropShippedToVendor: PXFieldState;
	@readOnly @headerDescription VendorID: PXFieldState;
	@readOnly @headerDescription VendorLocationID: PXFieldState;
	@readOnly @headerDescription POOrderNbr: PXFieldState;
	@readOnly @headerDescription POLineNbr: PXFieldState;
	@readOnly ShippedQuantity: PXFieldState;
	@readOnly ShipRemainingQty: PXFieldState;
	@readOnly AtVendorQuantity: PXFieldState;
	@readOnly ControlPoint: PXFieldState;
	@readOnly AutoReportQty: PXFieldState;
}

export class AMSchdOper extends PXView {
	@readOnly QtyRemaining: PXFieldState;
	@readOnly SchPriority: PXFieldState;
	@readOnly ConstDate: PXFieldState;
	@readOnly StartDate: PXFieldState;
	@readOnly EndDate: PXFieldState;
	@readOnly SchedulingMethod: PXFieldState;
	@readOnly ScheduleStatus: PXFieldState;
	@readOnly FirmSchedule: PXFieldState;
	@readOnly SchdID: PXFieldState;
}

abstract class SchdDetails extends PXView {
	@readOnly AMProdItem__OrderType: PXFieldState;
	@readOnly @headerDescription AMProdItem__ProdOrdID: PXFieldState;
	@readOnly @headerDescription AMProdItem__InventoryID: PXFieldState;
	@readOnly AMProdItem__QtytoProd: PXFieldState;

	@readOnly StartTime: PXFieldState;
	@readOnly EndTime: PXFieldState;
	@readOnly Description: PXFieldState;

	@readOnly AMProdItem__Descr: PXFieldState;
	@readOnly @headerDescription AMProdItem__SubItemID: PXFieldState;
	@readOnly ProdDate: PXFieldState;
	@readOnly AMProdItem__OrdTypeRef: PXFieldState;
	@readOnly AMProdItem__OrdNbr: PXFieldState;
	@readOnly @headerDescription AMProdItem__CustomerID: PXFieldState;
	@readOnly @headerDescription AMProdItem__ProjectID: PXFieldState;
	@readOnly @headerDescription AMProdItem__TaskID: PXFieldState;
	@readOnly @headerDescription AMProdItem__BranchID: PXFieldState;
	@readOnly @headerDescription AMProdItem__LocationID: PXFieldState;
	@readOnly @headerDescription AMProdItem__SiteID: PXFieldState;

	@readOnly @headerDescription AMProdOper__OperationID: PXFieldState;
	@readOnly AMProdOper__OperationCD: PXFieldState;
	@readOnly AMProdOper__Descr: PXFieldState;
	@readOnly AMProdOper__QtyComplete: PXFieldState;
	@readOnly AMProdOper__QtyScrapped: PXFieldState;
	@readOnly AMProdOper__QtyRemaining: PXFieldState;
	@readOnly AMProdOper__TotalQty: PXFieldState;
	@readOnly AMProdOper__StatusID: PXFieldState;
	@readOnly @headerDescription AMProdOper__VendorID: PXFieldState;
	@readOnly @headerDescription AMProdOper__VendorLocationID: PXFieldState;
	@readOnly @headerDescription AMProdOper__POOrderNbr: PXFieldState;
	@readOnly @headerDescription AMProdOper__POLineNbr: PXFieldState;
	@readOnly AMProdOper__ShippedQuantity: PXFieldState;
	@readOnly AMProdOper__ShipRemainingQty: PXFieldState;
	@readOnly AMProdOper__AtVendorQuantity: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 100,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showFilterBar: GridFilterBarVisibility.False,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class SchdDetailsForShiftAndPeriod extends SchdDetails {
	@readOnly WcID: PXFieldState;
	@readOnly ShiftCD: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 100,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showFilterBar: GridFilterBarVisibility.False,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class SchdDetailsForMachine extends SchdDetails {
	@readOnly MachID: PXFieldState;
}
