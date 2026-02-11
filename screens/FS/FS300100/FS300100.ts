import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	linkCommand,
	columnConfig,
	headerDescription,
	GridColumnShowHideMode,
	CurrencyInfo,
	GridPagerMode,
	GridPreset,
	GridColumnDisplayMode,
	GridNoteFilesShowMode,
	controlConfig,
	fieldConfig,
	TextAlign,
	CustomEventType,
	ValueChangedHandlerArgs,
	handleEvent,
	ISelectorControlConfig,
	viewInfo
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";
import { NullTextValues } from "../../common/messages";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

// TODO: refactor this flag and the related change handlers when frontend team provides a better solution
const padStartThree = 3;
const padStartSix = 6;
let changeHandlersToIgnore = 0;

@graphInfo({
	graphType: "PX.Objects.FS.ServiceOrderEntry",
	primaryView: "ServiceOrderRecords",
	showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true
})
export class FS300100 extends PXScreen {
	QuickProcessOk: PXActionState;
	AddSelectedItems: PXActionState;

	//Commands
	Refresh: PXActionState;

	//LinkCommands
	ViewEmployee: PXActionState;
	OpenServiceOrderScreen: PXActionState;
	openPostBatch: PXActionState;
	FSBillHistory$ChildDocLink$Link: PXActionState;
	FSSODetSplit$RefNoteID$Link: PXActionState;
	ViewPOVendor: PXActionState;
	ViewPOVendorLocation: PXActionState;
	viewLinkedDoc: PXActionState;
	AddInvSelBySite: PXActionState;

	@viewInfo({ containerName: "Service Order" })
	ServiceOrderRecords = createSingle(FSServiceOrder);

	CurrentServiceOrder = createSingle(FSServiceOrderSelected);
	ServiceOrder_Contact = createSingle(Contact);
	ServiceOrder_Address = createSingle(Address);

	@viewInfo({ containerName: "Details" })
	ServiceOrderDetails = createCollection(FSSODet);

	Taxes = createCollection(FSServiceOrderTaxTran);
	ServiceOrderAppointments = createCollection(FSAppointment);
	ProfitabilityRecords = createCollection(FSProfitability);
	ServiceOrderEmployees = createCollection(FSSOEmployee);
	ServiceOrderEquipment = createCollection(FSSOResource);

	@viewInfo({ containerName: "Attributes" })
	Answers = createCollection(FSAttributeList);
	RelatedServiceOrders = createCollection(RelatedServiceOrder);
	Adjustments = createCollection(ARPayment);
	InvoiceRecords = createCollection(FSBillHistory);
	ScheduleRecord = createSingle(FSSchedule);
	QuickProcessParameters = createSingle(FSSrvOrdQuickProcessParams);
	StaffSelectorFilter = createSingle(StaffSelectionFilter);
	SkillGridFilter = createCollection(SkillGridFilter);
	LicenseTypeGridFilter = createCollection(LicenseTypeGridFilter);
	StaffRecords = createCollection(BAccountStaffMember);
	ServiceOrderTypeSelector = createSingle(SrvOrderTypeAux);
	ItemFilter = createSingle(FSSiteStatusFilter);
	ItemInfo = createCollection(FSSiteStatusLookup);
	currencyinfo = createSingle(CurrencyInfo);

	getTimeSpanWithFormat(rawValue: string) {
		let formattedValue = rawValue.replace(/\s/g, "0");
		formattedValue =  parseInt(formattedValue).toString();
		formattedValue = formattedValue.padStart(padStartThree, "0");
		formattedValue = formattedValue.padStart(padStartSix, " ");

		return formattedValue;
	}

	@handleEvent(CustomEventType.ValueChanged, { view: "ItemInfo", field: "Selected" })
	onSelectedChange(args: ValueChangedHandlerArgs) {
		if (changeHandlersToIgnore) {
			changeHandlersToIgnore--;
			return;
		}
		const activeRow = args.viewModel.activeRow as FSSiteStatusLookup;
		if (args.newValue) {
			if (activeRow.BillingRule.value === "TIME") {
				const formattedDuration = this.getTimeSpanWithFormat(activeRow.EstimatedDuration.value);
				activeRow.DurationSelected.value = formattedDuration;
			}
			else {
				activeRow.QtySelected.value = 1;
			}
			changeHandlersToIgnore++;
		}
		else {
			if (activeRow.QtySelected.value !== 0) {
				activeRow.QtySelected.value = 0;
				changeHandlersToIgnore++;
			}
			if (activeRow.DurationSelected.value !== this.getTimeSpanWithFormat("0")) {
				activeRow.DurationSelected.value = this.getTimeSpanWithFormat("0");
				changeHandlersToIgnore++;
			}
		}

		this.ItemInfo.activeRowChanged = true;
	}

	@handleEvent(CustomEventType.ValueChanged, { view: "ItemInfo", field: "QtySelected" })
	onQtySelectedChange(args: ValueChangedHandlerArgs) {
		if (changeHandlersToIgnore) {
			changeHandlersToIgnore--;
			return;
		}
		const activeRow = args.viewModel.activeRow as FSSiteStatusLookup;
		activeRow.Selected.value = args.newValue === 0 ? false : true;
		changeHandlersToIgnore++;
		this.ItemInfo.activeRowChanged = true;
	}

	@handleEvent(CustomEventType.ValueChanged, { view: "ItemInfo", field: "DurationSelected" })
	onDurationSelectedChange(args: ValueChangedHandlerArgs) {
		if (changeHandlersToIgnore) {
			changeHandlersToIgnore--;
			return;
		}
		const activeRow = args.viewModel.activeRow as FSSiteStatusLookup;
		const formattedDuration = this.getTimeSpanWithFormat(activeRow.DurationSelected.value.toString());
		const selectedValue = formattedDuration === this.getTimeSpanWithFormat("0") ? false : true;
		activeRow.Selected.value = selectedValue;
		activeRow.DurationSelected.value = formattedDuration;
		changeHandlersToIgnore += 2;
		this.ItemInfo.activeRowChanged = true;
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class LicenseTypeGridFilter extends PXView {
	@columnConfig({ allowCheckAll: true })
	Mem_Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ visible: false })
	LicenseTypeCD: PXFieldState;

	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSSiteStatusLookup extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	QtySelected: PXFieldState;
	DurationSelected: PXFieldState;
	SiteID: PXFieldState;
	ItemClassID: PXFieldState;
	ItemType: PXFieldState;
	ItemClassDescription: PXFieldState;
	PriceClassID: PXFieldState;
	PriceClassDescription: PXFieldState;
	PreferredVendorID: PXFieldState;
	PreferredVendorDescription: PXFieldState;
	InventoryCD: PXFieldState;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	EstimatedDuration: PXFieldState;
	BillingRule: PXFieldState;
	SalesUnit: PXFieldState;
	QtyAvailSale: PXFieldState;
	QtyOnHandSale: PXFieldState;
	CuryID: PXFieldState;
	QtyLastSale: PXFieldState;
	CuryUnitPrice: PXFieldState;
	LastSalesDate: PXFieldState;
	AlternateID: PXFieldState;
	AlternateType: PXFieldState;
	AlternateDescr: PXFieldState;
}

export class FSSiteStatusFilter extends PXView {
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;
	Inventory: PXFieldState<PXFieldOptions.CommitChanges>;
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClass: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItem: PXFieldState<PXFieldOptions.CommitChanges>;
	Mode: PXFieldState<PXFieldOptions.CommitChanges>;
	OnlyAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
	HistoryDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SrvOrderTypeAux extends PXView {
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class BAccountStaffMember extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ visible: false })
	Type: PXFieldState;

	AcctCD: PXFieldState;
	AcctName: PXFieldState;
}

export class StaffSelectionFilter extends PXView {
	@controlConfig({
		displayMode: "id"
	})
	ServiceLineRef: PXFieldState<PXFieldOptions.CommitChanges>;

	PostalCode: PXFieldState;
	GeoZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class SkillGridFilter extends PXView {
	@columnConfig({ allowCheckAll: true })
	Mem_Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ visible: false })
	SkillCD: PXFieldState;

	Descr: PXFieldState;
	Mem_ServicesList: PXFieldState;
}

export class FSSrvOrdQuickProcessParams extends PXView {
	AllowInvoiceServiceOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	CompleteServiceOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	CloseServiceOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerateInvoiceFromServiceOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepareInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	SOQuickProcess: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailSalesOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	ReleaseInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailInvoice: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSSchedule extends PXView {
	RecurrenceDescription: PXFieldState<PXFieldOptions.Readonly>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class FSBillHistory extends PXView {
	@linkCommand("openPostBatch")
	BatchID: PXFieldState;

	ChildEntityType: PXFieldState;

	@linkCommand("FSBillHistory$ChildDocLink$Link")
	ChildDocLink: PXFieldState;

	ChildDocDesc: PXFieldState;
	ChildDocDate: PXFieldState;
	ChildDocStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class ARPayment extends PXView {
	CreatePrepayment: PXActionState;
	ViewPayment: PXActionState;

	DocType: PXFieldState;

	@linkCommand("ViewPayment")
	RefNbr: PXFieldState;

	Status: PXFieldState;
	AdjDate: PXFieldState;
	ExtRefNbr: PXFieldState;
	PaymentMethodID: PXFieldState;
	CashAccountID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	CurySOAppltAmt: PXFieldState;
	CuryUnappliedBal: PXFieldState;
	CuryID: PXFieldState;
	FSAdjust__AdjdAppRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class RelatedServiceOrder extends PXView {
	SrvOrdType: PXFieldState;
	RefNbr: PXFieldState;
	DocDesc: PXFieldState;
	Status: PXFieldState;
	OrderDate: PXFieldState;
	CuryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSAttributeList extends PXView {
	@columnConfig({ textField: "AttributeID_description", hideViewLink: true })
	AttributeID: PXFieldState;

	isRequired: PXFieldState;
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FSSOResource extends PXView {
	SrvOrdType: PXFieldState;
	RefNbr: PXFieldState;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	FSEquipment__Descr: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FSSOEmployee extends PXView {
	OpenStaffSelectorFromStaffTab: PXActionState;

	@linkCommand("ViewEmployee")
	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;

	Type: PXFieldState;
	ServiceLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
	FSSODetEmployee__InventoryID: PXFieldState;
	FSSODetEmployee__TranDesc: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSProfitability extends PXView {
	LineRef: PXFieldState;
	LineType: PXFieldState;
	ItemID: PXFieldState;
	Descr: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	EmployeeID: PXFieldState;

	CuryUnitPrice: PXFieldState;
	CuryUnitCost: PXFieldState;
	EstimatedQty: PXFieldState;
	CuryEstimatedAmount: PXFieldState;
	CuryEstimatedCost: PXFieldState;
	ActualDuration: PXFieldState;
	ActualQty: PXFieldState;
	CuryActualAmount: PXFieldState;
	CuryExtCost: PXFieldState;
	BillableQty: PXFieldState;
	CuryBillableAmount: PXFieldState;
	CuryCostTotal: PXFieldState;
	CuryProfit: PXFieldState;
	ProfitPercent: PXFieldState;
	ProfitMarginPercent: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSAppointment extends PXView {
	RefNbr: PXFieldState;
	Confirmed: PXFieldState;
	Status: PXFieldState;
	ScheduledDateTimeBegin_Date: PXFieldState;
	ScheduledDateTimeBegin_Time: PXFieldState;
	ScheduledDateTimeEnd_Date: PXFieldState;
	ScheduledDateTimeEnd_Time: PXFieldState;
	CuryBillableLineTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
	AppCompletedBillableTotal: PXFieldState;
	CuryCostTotal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class FSServiceOrderTaxTran extends PXView {
	TaxID: PXFieldState;
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	statusField: "Availability",
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "DetailsPasteLine",
	pageSize: 200,
	allowStoredFilters: false
})
export class FSSODet extends PXView {
	ShowItems: PXActionState;
	openStaffSelectorFromServiceTab: PXActionState;
	FSServiceOrderLineSplittingExtension_ShowSplits: PXActionState;
	AddReceipt: PXActionState;
	AddBill: PXActionState;
	ShowAddLotSerialNbrPanel: PXActionState;

	Availability: PXFieldState<PXFieldOptions.Hidden>;
	SrvOrdType: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNbr: PXFieldState;

	@columnConfig({ nullText: NullTextValues.New })
	LineRef: PXFieldState;

	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	BillingRule: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentAction: PXFieldState<PXFieldOptions.CommitChanges>;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	NewTargetEquipmentLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentLineRef: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	StaffID: PXFieldState<PXFieldOptions.CommitChanges>;

	Warranty: PXFieldState;
	IsPrepaid: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, nullText: LSNullText.Split })
	SiteLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState;

	@columnConfig({ allowDragDrop: true })
	UOM: PXFieldState;

	EstimatedDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	EstimatedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEstimatedTranAmt: PXFieldState;
	ContractRelated: PXFieldState;
	CoveredQty: PXFieldState;
	ExtraUsageQty: PXFieldState;
	CuryExtraUsageUnitPrice: PXFieldState;
	ApptEstimatedDuration: PXFieldState;
	ApptDuration: PXFieldState;
	ApptQty: PXFieldState;
	CuryApptTranAmt: PXFieldState;
	ApptCntr: PXFieldState;
	IsFree: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	BillableQty: PXFieldState;

	CuryBillableExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryBillableTranAmt: PXFieldState;
	EnablePO: PXFieldState<PXFieldOptions.CommitChanges>;
	POSource: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOVendor")
	POVendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOVendorLocation")
	POVendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PONbr: PXFieldState;
	POStatus: PXFieldState;
	POCompleted: PXFieldState;
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Value })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	AcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	SubID: PXFieldState;

	Mem_LastReferencedBy: PXFieldState;
	Comment: PXFieldState;
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;
	LinkedEntityType: PXFieldState;

	@linkCommand("viewLinkedDoc")
	LinkedDisplayRefNbr: PXFieldState;
}

export class FSServiceOrder extends PXView {
	SrvOrdType: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState;
	OrderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CustPORefNbr: PXFieldState;
	CustWorkOrderRefNbr: PXFieldState;

	@headerDescription
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDesc: PXFieldState;

	@controlConfig({ textAlign: TextAlign.Right })
	EstimatedDurationTotal: PXFieldState;

	@controlConfig({ textAlign: TextAlign.Right })
	CuryEstimatedBillableTotal: PXFieldState;

	CuryTaxTotal: PXFieldState;
	CuryDocTotal: PXFieldState;
	CuryEffectiveBillableDocTotal: PXFieldState;

	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "WFStageID",
				valueField: "WFStageCD",
				textField: "WFStageCD",
				dataMember: "TreeWFStages",
				mode: "single",
				hideRootNode: false
			},
		},
	})
	WFStageID: PXFieldState<PXFieldOptions.CommitChanges>;
	WaitingForParts: PXFieldState;
	AppointmentsNeeded: PXFieldState;
	IsPrepaymentEnable: PXFieldState;
	ShowInvoicesTab: PXFieldState;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillServiceContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillContractPeriodID: PXFieldState;
}

export class FSServiceOrderSelected extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "addNewContact" })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	RoomID: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	SLAETA_Date: PXFieldState;
	SLAETA_Time: PXFieldState;
	Severity: PXFieldState;
	Priority: PXFieldState;
	AssignedEmpID: PXFieldState;
	ProblemID: PXFieldState;
	BillCustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	BillingBy: PXFieldState;
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	Commissionable: PXFieldState;
	EstimatedDurationTotal: PXFieldState;
	CuryEstimatedOrderTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
	CuryDocTotal: PXFieldState;
	CuryBillableOrderTotal: PXFieldState;
	CuryVatExemptTotal: PXFieldState;
	CuryVatTaxableTotal: PXFieldState;
	CuryEffectiveCostTotal: PXFieldState;
	ApptDurationTotal: PXFieldState;
	CuryApptOrderTotal: PXFieldState;
	CuryAppointmentTaxTotal: PXFieldState;
	CuryAppointmentDocTotal: PXFieldState;
	ProfitPercent: PXFieldState;
	ProfitMarginPercent: PXFieldState;
	SOPrepaymentReceived: PXFieldState;
	SOPrepaymentApplied: PXFieldState;
	SOPrepaymentRemaining: PXFieldState;
	SOCuryUnpaidBalanace: PXFieldState;
	SOCuryBillableUnpaidBalanace: PXFieldState;
	SourceType: PXFieldState;
	SourceReferenceNbr: PXFieldState<PXFieldOptions.Readonly>;
	ServiceContractID: PXFieldState;

	@controlConfig({ linkCommand: "OpenScheduleScreen" })
	ScheduleID: PXFieldState;

	AllowInvoice: PXFieldState;
	Mem_Invoiced: PXFieldState;
	LongDescr: PXFieldState;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
}
