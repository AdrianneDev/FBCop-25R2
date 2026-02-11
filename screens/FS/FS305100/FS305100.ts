import {
	graphInfo,
	gridConfig,
	controlConfig,
	createSingle,
	createCollection,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	GridPreset,
	GridColumnDisplayMode,
	CustomEventType,
	ValueChangedHandlerArgs,
	handleEvent,
	GridNoteFilesShowMode,
	viewInfo,
	headerDescription,
	HeaderDescription,
	GridColumnShowHideMode,
	GridPagerMode
} from "client-controls";

// TODO: refactor this flag and the related change handlers when frontend team provides a better solution
const padStartSix = 6;
const padStartThree = 3;
let changeHandlersToIgnore = 0;

@graphInfo({
	graphType: "PX.Objects.FS.ServiceContractScheduleEntry",
	primaryView: "ContractScheduleRecords",
	bpEventsIndicator: true
})
export class FS305100 extends PXScreen {
	AddSelectedItems: PXActionState;
	ContractScheduleRecords = createSingle(FSContractSchedule);
	ItemFilter = createSingle(FSSiteStatusFilter);
	ItemInfo = createCollection(FSSiteStatusSelected);
	CurrentServiceContract = createSingle(FSServiceContract);

	@viewInfo({ containerName: "Details" })
	ScheduleDetails = createCollection(FSScheduleDet);

	ContractScheduleSelected = createSingle(FSContractScheduleSelected);
	Answers = createCollection(CRAttributeList);
	FromToFilter = createSingle(FromToFilter);
	ScheduleProjectionRecords = createCollection(ScheduleProjection);

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

export class FSContractSchedule extends PXView {

	@headerDescription(HeaderDescription.ShowKey)
	EntityID: PXFieldState<PXFieldOptions.CommitChanges>;

	RefNbr: PXFieldState;

	Active: PXFieldState;
	ScheduleStartTime_Time: PXFieldState;
	ScheduleDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "id" })
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription(HeaderDescription.ShowDescription)
	CustomerID: PXFieldState;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	NextExecutionDate: PXFieldState<PXFieldOptions.CommitChanges>;
	LastGeneratedElementDate: PXFieldState<PXFieldOptions.Readonly>;
	ScheduleGenType: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
}

export class FSContractScheduleSelected extends PXView {
	FrequencyType: PXFieldState<PXFieldOptions.CommitChanges>;
	RecurrenceDescription: PXFieldState<PXFieldOptions.Readonly>;
	DailyFrequency: PXFieldState;
	DailyLabel: PXFieldState<PXFieldOptions.Readonly>;
	WeeklyFrequency: PXFieldState;
	WeeklyLabel: PXFieldState<PXFieldOptions.Readonly>;
	WeeklyOnSun: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyOnMon: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyOnTue: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyOnWed: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyOnThu: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyOnFri: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyOnSat: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyFrequency: PXFieldState;
	MonthlyLabel: PXFieldState<PXFieldOptions.Readonly>;
	MonthlyRecurrenceType1: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDay1: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnWeek1: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDayOfWeek1: PXFieldState<PXFieldOptions.CommitChanges>;
	Monthly2Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyRecurrenceType2: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDay2: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnWeek2: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDayOfWeek2: PXFieldState<PXFieldOptions.CommitChanges>;
	Monthly3Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyRecurrenceType3: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDay3: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnWeek3: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDayOfWeek3: PXFieldState<PXFieldOptions.CommitChanges>;
	Monthly4Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyRecurrenceType4: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDay4: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnWeek4: PXFieldState<PXFieldOptions.CommitChanges>;
	MonthlyOnDayOfWeek4: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualFrequency: PXFieldState;
	YearlyLabel: PXFieldState<PXFieldOptions.Readonly>;
	AnnualOnJan: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnFeb: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnMar: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnApr: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnMay: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnJun: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnJul: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnAug: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnSep: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnOct: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnNov: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnDec: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualRecurrenceType: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnDay: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnWeek: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualOnDayOfWeek: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "PasteLine",
	pagerMode: GridPagerMode.InfiniteScroll
})
export class FSScheduleDet extends PXView {
	ShowItems: PXActionState;
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	BillingRule: PXFieldState<PXFieldOptions.CommitChanges>;
	ServiceTemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	EstimatedDuration: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentLineRef: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	EquipmentAction: PXFieldState;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class ScheduleProjection extends PXView {
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DayOfWeek: PXFieldState;
	WeekOfYear: PXFieldState;
	BeginDateOfWeek: PXFieldState;
}

export class FromToFilter extends PXView {
	DateBegin: PXFieldState<PXFieldOptions.CommitChanges>;
	DateEnd: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class CRAttributeList extends PXView {
	@columnConfig({
		textField: "AttributeID_description",
		allowShowHide: GridColumnShowHideMode.False,
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
		width: 300
	})
	AttributeID: PXFieldState;

	isRequired: PXFieldState;
	Value: PXFieldState;
}

export class FSServiceContract extends PXView {
	CustomerContractNbr: PXFieldState;
}

export class FSSiteStatusFilter extends PXView {
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;
	Inventory: PXFieldState;
	BarCode: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClass: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItem: PXFieldState<PXFieldOptions.CommitChanges>;
	Mode: PXFieldState<PXFieldOptions.CommitChanges>;
	OnlyAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
	HistoryDate: PXFieldState<PXFieldOptions.CommitChanges>;
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
