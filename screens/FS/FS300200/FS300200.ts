import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	linkCommand,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	CurrencyInfo,
	GridPagerMode,
	GridPreset,
	GridColumnDisplayMode,
	GridNoteFilesShowMode,
	controlConfig,
	fieldConfig,
	actionConfig,
	TextAlign,
	headerDescription,
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
const padStartSix = 6;
const padStartThree = 3;
let changeHandlersToIgnore = 0;

@graphInfo({
	graphType: "PX.Objects.FS.AppointmentEntry",
	primaryView: "AppointmentRecords",
	showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true
})
export class FS300200 extends PXScreen {
	QuickProcessOk: PXActionState;
	AddSelectedItems: PXActionState;

	//Commands
	AddReceipt: PXActionState;
	AddBill: PXActionState;
	Refresh: PXActionState;
	ViewDirectionOnMap: PXActionState;
	ViewStartGPSOnMap: PXActionState;
	ViewCompleteGPSOnMap: PXActionState;
	AddInvSelBySite: PXActionState;

	//LinkCommands
	ViewPOVendor: PXActionState;
	ViewPOVendorLocation: PXActionState;
	viewLinkedDoc: PXActionState;
	ViewEmployee: PXActionState;
	openPostBatch: PXActionState;

	FSBillHistory$ChildDocLink$Link: PXActionState;

	OpenSourceDocument: PXActionState;
	FSApptLineSplit$RefNoteID$Link: PXActionState;

	AppointmentRecords = createSingle(FSAppointment);

	@viewInfo({ containerName: "ServiceOrder Header" })
	ServiceOrderRelated = createSingle(FSServiceOrder);

	@viewInfo({ containerName: "ServiceOrder Header -> Delivery Notes" })
	AppointmentSelected = createSingle(FSAppointmentSelected);

	ServiceOrder_Contact = createSingle(Contact);
	ServiceOrder_Address = createSingle(Address);

	@viewInfo({ containerName: "Details" })
	AppointmentDetails = createCollection(FSAppointmentDetail);

	Taxes = createCollection(FSAppointmentTaxTran);
	AppointmentServiceEmployees = createCollection(FSAppointmentEmployee);
	AppointmentResources = createCollection(FSAppointmentResource);
	LogRecords = createCollection(FSAppointmentLog);
	ProfitabilityRecords = createCollection(FSProfitability);

	@viewInfo({ containerName: "Attributes" })
	Answers = createCollection(FSAppointmentAnswer);

	Adjustments = createCollection(ARPayment);

	@viewInfo({ containerName: "Billing Documents" })
	InvoiceRecords = createCollection(FSBillHistory);

	ScheduleRecord = createSingle(FSSchedule);
	QuickProcessParameters = createSingle(FSAppQuickProcessParams);
	StaffSelectorFilter = createSingle(StaffSelectionFilter);
	SkillGridFilter = createCollection(SkillGridFilter);
	LicenseTypeGridFilter = createCollection(LicenseTypeGridFilter);
	StaffRecords = createCollection(BAccountStaffMember);

	@viewInfo({ containerName: "Action" })
	LogActionStartFilter = createSingle(FSLogActionStartFilter);

	@viewInfo({ containerName: "Selected" })
	LogActionStaffDistinctRecords = createCollection(FSAppointmentStaffDistinct);

	@viewInfo({ containerName: "Action" })
	LogActionPCRFilter = createSingle(FSLogActionPCRFilter);

	@viewInfo({ containerName: "Perform Action" })
	LogActionLogRecords = createCollection(FSAppointmentLogExtItemLine);

	@viewInfo({ containerName: "Action" })
	LogActionStartServiceFilter = createSingle(FSLogActionStartServiceFilter);
	ServicesLogAction = createCollection(FSDetailFSLogAction);

	@viewInfo({ containerName: "Action" })
	LogActionStartStaffFilter = createSingle(FSLogActionStartStaffFilter);
	LogActionStaffRecords = createCollection(FSAppointmentStaffExtItemLine);
	ItemFilter = createSingle(FSSiteStatusFilter);
	ItemInfo = createCollection(FSSiteStatusSelected);
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
		const activeRow = args.viewModel.activeRow as FSSiteStatusSelected;
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
		const activeRow = args.viewModel.activeRow as FSSiteStatusSelected;
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
		const activeRow = args.viewModel.activeRow as FSSiteStatusSelected;
		const formattedDuration = this.getTimeSpanWithFormat(activeRow.DurationSelected.value.toString());
		const selectedValue = formattedDuration === this.getTimeSpanWithFormat("0") ? false : true;
		activeRow.Selected.value = selectedValue;
		activeRow.DurationSelected.value = formattedDuration;
		changeHandlersToIgnore += 2;
		this.ItemInfo.activeRowChanged = true;
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSSiteStatusSelected extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	QtySelected: PXFieldState;
	DurationSelected: PXFieldState;
	SiteID: PXFieldState;
	SiteCD: PXFieldState;
	ItemClassID: PXFieldState;
	ItemType: PXFieldState;
	ItemClassDescription: PXFieldState;
	PriceClassID: PXFieldState;
	PriceClassDescription: PXFieldState;
	PreferredVendorID: PXFieldState;
	PreferredVendorDescription: PXFieldState;
	InventoryCD: PXFieldState;
	SubItemCD: PXFieldState;
	SubItemID: PXFieldState;
	Descr: PXFieldState;
	EstimatedDuration: PXFieldState;
	BillingRule: PXFieldState;
	SalesUnit: PXFieldState;
	QtyAvailSale: PXFieldState;
	QtyOnHandSale: PXFieldState;
	QtyLastSale: PXFieldState;
	CuryUnitPrice: PXFieldState;
	LastSalesDate: PXFieldState;
	AlternateID: PXFieldState;
	AlternateType: PXFieldState;
	AlternateDescr: PXFieldState;
}

export class FSSiteStatusFilter extends PXView {
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;
	Inventory: PXFieldState;
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	ItemClass: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	SubItem: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	Mode: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	OnlyAvailable: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	HistoryDate: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSAppointmentStaffExtItemLine extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	LineRef: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BAccountID: PXFieldState;

	InventoryID: PXFieldState;
	Descr: PXFieldState;
	EstimatedDuration: PXFieldState;
}

export class FSLogActionStartStaffFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Me: PXFieldState<PXFieldOptions.CommitChanges>;
	LogDateTime_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	LogDateTime_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	DetLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSDetailFSLogAction extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	LineRef: PXFieldState;
	InventoryID: PXFieldState;
	Descr: PXFieldState;
	EstimatedDuration: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSLogActionStartServiceFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Me: PXFieldState<PXFieldOptions.CommitChanges>;
	LogDateTime_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	LogDateTime_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	DetLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSAppointmentLogExtItemLine extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	LineRef: PXFieldState;
	Status: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	Travel: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTimeBegin_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTimeBegin_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTimeEnd_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTimeEnd_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	TimeDuration: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSLogActionPCRFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Me: PXFieldState<PXFieldOptions.CommitChanges>;
	LogDateTime_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	LogDateTime_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	DetLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class FSAppointmentStaffDistinct extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSLogActionStartFilter extends PXView {
	Action: PXFieldState;
	Type: PXFieldState;
	Me: PXFieldState;
	LogDateTime_Date: PXFieldState;
	LogDateTime_Time: PXFieldState;
	DetLineRef: PXFieldState;
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

export class StaffSelectionFilter extends PXView {

	@controlConfig({displayMode: "id"})
	ServiceLineRef: PXFieldState<PXFieldOptions.CommitChanges>;

	PostalCode: PXFieldState;
	GeoZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSAppQuickProcessParams extends PXView {
	CloseAppointment: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailSignedAppointment: PXFieldState<PXFieldOptions.CommitChanges>;
	GenerateInvoiceFromAppointment: PXFieldState<PXFieldOptions.CommitChanges>;
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
	@actionConfig({
		popupCommand: "Refresh"
	})
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
	CurySOApplAmt: PXFieldState;
	CuryUnappliedBal: PXFieldState;
	CuryID: PXFieldState;
	FSAdjust__AdjdAppRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class FSAppointmentAnswer extends PXView {
	@columnConfig({ textField: "AttributeID_description", hideViewLink: true })
	AttributeID: PXFieldState;

	isRequired: PXFieldState;
	Value: PXFieldState;
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
	CuryProfit: PXFieldState;
	ProfitPercent: PXFieldState;
	ProfitMarginPercent: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	initNewRow: true
})
export class FSAppointmentLog extends PXView {
	DocType: PXFieldState;
	DocRefNbr: PXFieldState;
	LineRef: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	WorkGroupID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Travel: PXFieldState<PXFieldOptions.CommitChanges>;
	DetLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
	FSAppointmentDet__InventoryID: PXFieldState;
	Descr: PXFieldState;
	DateTimeBegin_Date: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorConfig: { timeMode: true } })
	DateTimeBegin_Time: PXFieldState<PXFieldOptions.CommitChanges>;

	DateTimeEnd_Date: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorConfig: { timeMode: true } })
	DateTimeEnd_Time: PXFieldState<PXFieldOptions.CommitChanges>;

	TimeDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	TrackOnService: PXFieldState<PXFieldOptions.CommitChanges>;
	TrackTime: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	BillableTimeDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryBillableTranAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningType: PXFieldState<PXFieldOptions.CommitChanges>;
	LaborItemID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Value })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeID: PXFieldState;
	TimeCardCD: PXFieldState;
	ApprovedTime: PXFieldState;
	KeepDateTimes: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class FSAppointmentResource extends PXView {
	SrvOrdType: PXFieldState;
	RefNbr: PXFieldState;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	FSEquipment__Descr: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class FSAppointmentEmployee extends PXView {
	OpenStaffSelectorFromStaffTab: PXActionState;
	StartStaff: PXActionState;
	PauseStaff: PXActionState;
	ResumeStaff: PXActionState;
	CompleteStaff: PXActionState;
	DepartStaff: PXActionState;
	ArriveStaff: PXActionState;
	LineNbr: PXFieldState;
	LineRef: PXFieldState;

	@linkCommand("ViewEmployee")
	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;

	PrimaryDriver: PXFieldState;
	ServiceLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
	FSAppointmentServiceEmployee__InventoryID: PXFieldState;
	FSAppointmentServiceEmployee__TranDesc: PXFieldState;
	TrackTime: PXFieldState;
	EarningType: PXFieldState<PXFieldOptions.CommitChanges>;
	LaborItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsDriver: PXFieldState;
	Type: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class FSAppointmentTaxTran extends PXView {
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

export class FSServiceOrder extends PXView {
	SourceType: PXFieldState;

	@linkCommand("OpenSourceDocument")
	SourceReferenceNbr: PXFieldState<PXFieldOptions.Readonly>;

	SOPrepaymentReceived: PXFieldState;
	SOPrepaymentApplied: PXFieldState;
	SOPrepaymentRemaining: PXFieldState;
	SOCuryBillableUnpaidBalanace: PXFieldState;
	CuryDocTotal: PXFieldState;
	CuryEffectiveBillableDocTotal: PXFieldState;
	SOCuryUnpaidBalanace: PXFieldState;
	BillingBy: PXFieldState;
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	Commissionable: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "addNewContact" })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	RoomID: PXFieldState;
	CustPORefNbr: PXFieldState;
	CustWorkOrderRefNbr: PXFieldState;
	Severity: PXFieldState;
	Priority: PXFieldState;
	AssignedEmpID: PXFieldState;
	ProblemID: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillCustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	statusField: "Availability",
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "DetailsPasteLine",
	pageSize: 100,
	allowStoredFilters: false
})
export class FSAppointmentDetail extends PXView {
	ShowItems: PXActionState;
	FSAppointmentLineSplittingExtension_ShowSplits: PXActionState;
	OpenStaffSelectorFromServiceTab: PXActionState;
	AddReceipt: PXActionState;
	AddBill: PXActionState;
	Availability: PXFieldState<PXFieldOptions.Hidden>;
	StartItemLine: PXActionState;
	PauseItemLine: PXActionState;
	ResumeItemLine: PXActionState;
	CompleteItemLine: PXActionState;
	CancelItemLine: PXActionState;
	ShowAddLotSerialNbrPanel: PXActionState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: NullTextValues.New })
	LineRef: PXFieldState;

	LineNbr: PXFieldState;
	SortOrder: PXFieldState;
	SODetID: PXFieldState<PXFieldOptions.CommitChanges>;
	UIStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;
	PickupDeliveryAppLineRef: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	BillingRule: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;

	EquipmentAction: PXFieldState<PXFieldOptions.CommitChanges>;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	NewTargetEquipmentLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentLineRef: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	StaffID: PXFieldState<PXFieldOptions.CommitChanges>;

	Warranty: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	SiteLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState;

	@columnConfig({ allowDragDrop: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	EstimatedDuration: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	EstimatedQty: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryEstimatedTranAmt: PXFieldState;
	ActualDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	ActualQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTranAmt: PXFieldState;
	IsFree: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	BillableQty: PXFieldState;

	CuryBillableExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState;
	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryBillableTranAmt: PXFieldState;
	TaxCategoryID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	AcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CoveredQty: PXFieldState;
	ExtraUsageQty: PXFieldState;
	CuryExtraUsageUnitPrice: PXFieldState;
	EnablePO: PXFieldState<PXFieldOptions.CommitChanges>;
	POSource: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOVendor")
	POVendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOVendorLocation")
	POVendorLocationID: PXFieldState;

	PONbr: PXFieldState;
	POStatus: PXFieldState;
	POCompleted: PXFieldState;
	IsPrepaid: PXFieldState;
	LinkedEntityType: PXFieldState;

	@linkCommand("viewLinkedDoc")
	LinkedDisplayRefNbr: PXFieldState;

	ContractRelated: PXFieldState;
	SubID: PXFieldState;
	ServiceType: PXFieldState;
	PickupDeliveryServiceID: PXFieldState<PXFieldOptions.CommitChanges>;
	Comment: PXFieldState;
}

export class FSAppointmentSelected extends PXView {
	CuryID: PXFieldState;
	BillServiceContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillContractPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeBegin_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeBegin_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeEnd_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDateTimeEnd_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	ExecutionDate: PXFieldState<PXFieldOptions.CommitChanges>;
	HandleManuallyScheduleTime: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduledDuration: PXFieldState;
	ROOptimizationStatus: PXFieldState;
	Confirmed: PXFieldState<PXFieldOptions.CommitChanges>;
	ValidatedByDispatcher: PXFieldState;
	ActualDateTimeBegin_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	ActualDateTimeEnd_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ActualDateTimeEnd_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	HandleManuallyActualTime: PXFieldState<PXFieldOptions.CommitChanges>;
	ActualDuration: PXFieldState;
	Finished: PXFieldState<PXFieldOptions.CommitChanges>;
	UnreachedCustomer: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCalcMode: PXFieldState<PXFieldOptions.CommitChanges>;
	DeliveryNotes: PXFieldState;
	CuryEstimatedLineTotal: PXFieldState;
	CuryEstimatedCostTotal: PXFieldState;
	CuryLineTotal: PXFieldState;
	CuryBillableLineTotal: PXFieldState;
	CuryLogBillableTranAmountTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
	CuryDocTotal: PXFieldState;
	CuryVatExemptTotal: PXFieldState;
	CuryVatTaxableTotal: PXFieldState;
	AppCompletedBillableTotal: PXFieldState;
	CuryCostTotal: PXFieldState;
	ProfitPercent: PXFieldState;
	ProfitMarginPercent: PXFieldState;
	ServiceContractID: PXFieldState;
	ScheduleID: PXFieldState;
	MapLatitude: PXFieldState;
	MapLongitude: PXFieldState;
	GPSLatitudeStart: PXFieldState<PXFieldOptions.CommitChanges>;
	GPSLongitudeStart: PXFieldState<PXFieldOptions.CommitChanges>;
	GPSLatitudeComplete: PXFieldState<PXFieldOptions.CommitChanges>;
	GPSLongitudeComplete: PXFieldState<PXFieldOptions.CommitChanges>;
	GPSLatitudeLongitude: PXFieldState;
	RouteDocumentID: PXFieldState;
	FullNameSignature: PXFieldState;
	LongDescr: PXFieldState;
	RouteID: PXFieldState;

	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSAppointment extends PXView {
	ScheduledDateTimeBegin_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ExecutionDate: PXFieldState<PXFieldOptions.CommitChanges>;
	SrvOrdType: PXFieldState;
	RefNbr: PXFieldState;
	SORefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;

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
	IsRouteAppoinment: PXFieldState;
	IsPrepaymentEnable: PXFieldState;
	DocDesc: PXFieldState;

	@headerDescription
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ textAlign: TextAlign.Right })
	EstimatedDurationTotal: PXFieldState;

	@controlConfig({ textAlign: TextAlign.Right })
	ActualDurationTotal: PXFieldState;

	CuryActualBillableTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
	CuryDocTotal: PXFieldState;
	TimeRegistered: PXFieldState<PXFieldOptions.CommitChanges>;
	WaitingForParts: PXFieldState;
}
