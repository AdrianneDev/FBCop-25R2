/* eslint-disable @stylistic/brace-style */
import {
	GridCell, GridPreset, PXFieldState, PXView, gridConfig,
	GridFastFilterVisibility, GridNoteFilesShowMode, GridPagerMode, PXFieldOptions, columnConfig, headerDescription, readOnly
} from "client-controls";
import { Order } from "../AM215555/view-models";

export enum PeriodKind {
	Hour = 1,
	Day = 2,
	Week = 3
}

export enum ResourceEventType {
	Order = "Order",
	Operation = "Operation",
	Material = "Material"
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
	showFastFilter: GridFastFilterVisibility.ToolBar,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	}
})
export class ProdOrder extends PXView {
	ConstDate: GridCell;
	EndDate: GridCell;
	SchPriority: GridCell;
	InventoryCD: GridCell;
	LackOfMaterials: GridCell;
	OrderDate: GridCell;
	ProductWorkgroupID: GridCell;
	ProductManagerID: GridCell;
	ProdOrdID: GridCell;
	Descr: GridCell;
	IsOnTime: GridCell;
	StatusID: GridCell;
	IsEarly: GridCell;
	IsLate: GridCell;
	QtyRemaining: GridCell;
	QtytoProd: GridCell;
	DueDate: GridCell;
	ScheduleStatus: GridCell;
	SchedulingMethod: GridCell;
	ProjectID: GridCell;
	TaskID: GridCell;
	@columnConfig({ allowFilter: false }) Id: GridCell;
	@columnConfig({ allowFilter: false }) OrderType: GridCell;
	@columnConfig({ allowFilter: false }) ShippingDescr: GridCell;
	@columnConfig({ allowFilter: false }) CustomerID: GridCell;
	@columnConfig({ allowFilter: false }) StartDate: GridCell;
	@columnConfig({ allowFilter: false }) SoOrderType: GridCell;
	@columnConfig({ allowFilter: false }) SoOrderNumber: GridCell;
	@columnConfig({ allowFilter: false }) FirmSchedule: GridCell;
	@columnConfig({ allowFilter: false }) OrdTypeDescr: GridCell;
	@columnConfig({ allowFilter: false }) CustomerName: GridCell;
	@columnConfig({ allowFilter: false }) Uom: GridCell;
	@columnConfig({ allowFilter: false }) RequestedOn: GridCell;
	@columnConfig({ allowFilter: false }) Schedulable: GridCell;
	@columnConfig({ allowFilter: false }) Released: GridCell;
	@columnConfig({ allowFilter: false }) ParentOrderType: GridCell;
	@columnConfig({ allowFilter: false }) ParentOrdID: GridCell;
	@columnConfig({ allowFilter: false }) ProductOrderType: GridCell;
	@columnConfig({ allowFilter: false }) ProductOrdID: GridCell;
	@columnConfig({ allowFilter: false }) ProductID: GridCell;
	@columnConfig({ allowFilter: false }) ParentID: GridCell;
	@columnConfig({ allowFilter: false }) IsProduct: GridCell;

	isFilteredOut: boolean;
	isDimmed: boolean;

	get orderID() { return `${this.OrderType?.cellText}-${this.ProdOrdID?.cellText}`; }
	get parentID() { return `${this.ParentOrderType?.cellText}-${this.ParentOrdID?.cellText}`; }
	get isUnscheduled() { return ["U"].includes(this.ScheduleStatus?.value.toUpperCase()); }
	get isCompleted() { return ["M", "C"].includes(this.StatusID?.value.toUpperCase()); }
	get isSchedulable() { return !!this.Schedulable?.value; }
	get isFirm() { return !!this.FirmSchedule?.value; }
	get isScheduled() { return ["S"].includes(this.ScheduleStatus?.value.toUpperCase()) || this.isFirm; }
	get isProduct() { return !!this.IsProduct?.value; }
	get isLate() { return !!this.IsLate?.value; }
	get startDate() { return new Date(this.StartDate?.value); }
	get endDate() { return new Date(this.EndDate?.value); }
	get requestedDate() { return new Date(this.RequestedOn?.value); }
	get ID() { return this.Id?.value ? this.Id.value : undefined; }
}

export class ProdOrderRecord extends Order {
	SchPriority: PXFieldState<PXFieldOptions.CommitChanges>;
	ConstDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SchedulingMethod: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 0,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	fastFilterByAllFields: false,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})

export class SelectionFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderTypeSelected: PXFieldState;
	ProdOrdIDSelected: PXFieldState;
	PeriodKind: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayMatlRemaining: PXFieldState<PXFieldOptions.CommitChanges>;
	PopupOrderType: PXFieldState;
	PopupProdOrdID: PXFieldState;
	PopupOperMatlLineID: PXFieldState;
	PopupEventType: PXFieldState;
	ActiveMatlPOOrderNbr: PXFieldState;

	get periodKindValue() {
		return this.PeriodKind?.value ?? PeriodKind.Hour;
	}
	get orderID() { return `${this.OrderTypeSelected?.value || ""}${this.ProdOrdIDSelected?.value ? (`-${this.ProdOrdIDSelected?.value}`) : ""}`; }

	get displayMatlRemaining() { return this.DisplayMatlRemaining?.value ?? true; }
}

export class ProdOpersMatls extends PXView {
	@columnConfig({ allowSort: false, allowFilter: false }) OrderType: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) ProdOrdID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) OperationCD: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) OperMatlLineID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) OperationEventCD: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) WcID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) Descr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) ActualLaborTime: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) PlanLaborTime: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) OperUOM: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) QtytoProd: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) QtyComplete: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) QtyScrapped: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) QtyRemaining: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) TotalQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) StartDate: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) EndDate: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) LackOfMaterials: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) OutsideProcess: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) POOrderNbr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) VendorID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) POPromiseDate: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) ShippedQuantity: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) ShipRemainingQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) AtVendorQuantity: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialCD: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlDescr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) ReceivedDescr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) IssuedDescr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialScheduledStart: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialScheduledEnd: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialSiteID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialLocationID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialType: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlSubcontractSource: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialMarkFor: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) RequiredMaterialQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) IssuedMaterialQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) RemainingMaterialQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MaterialUOM: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) StatusID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlPOLinked: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) MatlPOOrderType: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOOrderNbr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOPromiseDate: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOVendorID: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOLineDescr: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOUOM: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOOrderQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false }) MatlPOOpenQty: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlRegularStockWBom: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlRegularStockWOBom: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlSubCWBomMFG: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlSubCWOBomMFG: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlRegularNS: GridCell;
	@columnConfig({ allowSort: false, allowFilter: false, visible: false }) IsMatlSubCNS: GridCell;

	isFilteredOut: boolean;
	isDimmed: boolean;
	get orderID() { return `${this.OrderType.cellText}-${this.ProdOrdID.cellText}`; }
	get isCompleted() { return false; }
	get isMatlSubcontract() { return this.IsMatlSubCNS?.value || this.IsMatlSubCWBomMFG?.value || this.IsMatlSubCWOBomMFG?.value; }
	get operMatlLineID() { return this.OperMatlLineID?.cellText || this.OperMatlLineID?.value; }
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 0,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showTopBar: false,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class ProdOrderCalendarResource extends PXView {
	ID: GridCell;
	Name: GridCell;
	ParentID: GridCell;
	ResourceType: GridCell;
	Icon: GridCell;
	OrderType: GridCell;
	ProdOrdID: GridCell;
	SortOrder: GridCell;
	OperMatlLineID: GridCell;

	get iD() { return this.ID?.value; }
	get entityType(): ResourceEventType { return this.ResourceType?.value; }
	get sortOrder() { return this.SortOrder?.value; }
	get icon() { return this.Icon?.value; }
	get orderID() { return `${this.OrderType.cellText}-${this.ProdOrdID.cellText}`; }
	get operMatlLineID() { return this.OperMatlLineID?.cellText || this.OperMatlLineID?.value; }
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 0,
	adjustPageSize: false,
	syncPosition: false,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showTopBar: false,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class ProdOrderCalendarEvent extends PXView {
	ID: GridCell;
	ResourceID: GridCell;
	EventType: GridCell;
	StartDate: GridCell;
	EndDate: GridCell;
	ToEventId: GridCell;
	OrderType: GridCell;
	ProdOrdID: GridCell;
	OperMatlLineID: GridCell;
	SortOrder: GridCell;

	get iD() { return this.ID?.value; }
	get resourceId() { return this.ResourceID?.value; }
	get startDate() { return new Date(this.StartDate?.value); }
	get endDate() { return new Date(this.EndDate?.value); }
	get entityType(): ResourceEventType { return this.EventType?.value; }
	get sortOrder() { return this.SortOrder?.value; }
	get orderID() { return `${this.OrderType.cellText}-${this.ProdOrdID.cellText}`; }
	get operMatlLineID() { return this.OperMatlLineID?.cellText || this.OperMatlLineID?.value; }
}

export class AMProdItemPopup extends PXView {
	ConstDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SchedulingMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	SchPriority: PXFieldState<PXFieldOptions.CommitChanges>;
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
	@readOnly QtyRemaining: GridCell;
}
