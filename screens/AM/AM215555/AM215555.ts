/* eslint-disable @stylistic/brace-style */
/* eslint-disable @typescript-eslint/member-ordering */

import { ColumnStore, ColumnStoreConfig, Grid, GridColumnConfig, Model, Popup, PresetManager, PresetStore, ProjectModel, ResourceHistogram, ResourceModel, SchedulerAssignmentModel, SchedulerEventModel, SchedulerEventModel as SchedulerOperationModel, SchedulerPro, SchedulerProConfig, SchedulerResourceModel, ViewPreset, ViewPresetConfig } from "@bryntum/schedulerpro";
import { Aurelia, autoinject, bindable, BindingEngine, ElementEvents, observable, TemplatingEngine, Disposable } from "aurelia-framework";
import {
	createCollection, createSingle, graphInfo, GridFastFilterVisibility, localizable, PXPageLoadBehavior, PXScreen, QpButtonCustomElement,
	QpDatetimeEditCustomElement, QpFieldsetCustomElement, QpGridCustomElement, QpTabbarCustomElement, QpToolBarCustomElement,
	QpGridEventArgs,
	NewMenuButton,
	ISplitterConfig, QpSplitterCustomElement,
	GridFilter, IButtonControlConfig, ICommandUpdateResult, NetType, ScreenUpdateParams,
	IPreferencesPair, IPreferencesTarget, PreferenceBase, PreferencesService,
	formatDate, getScreenID,
	dateFormatInfo
} from "client-controls";
import { DataHandler } from "./data-handler";
import { PopupHandler } from "./popup-handler";
import { EntityRole, Renderer } from "./renderer";
import { AMProdItem, AMProdOper, AMSchdItem, AMSchdOper, CalendarResource, DatesFilter, MachineResource, Operation, Order, PeriodKind, SchdDetailsForMachine, SchdDetailsForShiftAndPeriod, SelectionFilter, WCResource } from "./view-models";

@localizable
export class Formats {
	static TimeAxisWeek = "ddd, MMMM D, YYYY";
	static TimeAxisDay = "ddd, MMMM D, YYYY";
	static TimeAxisWeekDayShort = "D MMM";
	static TimeAxisHour = "H:mm";
	static YearOnly = "YYYY";
	static DayMonth = "MMMM d";
	static OnlyMonth = "MMMM";
	static ShortDate = dateFormatInfo().shortDate;
	static DateRangeSameMonthP1 = "MMMM d";
	static DateRangeSameMonthP2 = "d ";
	static DateRangeDiffMonthP1 = "MMMM d, yy";
	static DateRangeDiffMonthP2 = "MMMM d, yy";
}

@localizable
export class Labels {
	static Day = "Day";
	static Week = "Week";
	static Month = "Month";
	static ProductionOrder = "Production Order";
	static Allocations = "Allocations";
	static Orders = "Orders";
	static ProductionOrders = "Production Orders";
	static Operation = "Operation";
	static PrevPeriod = "Previous";
	static NextPeriod = "Next";
	static OrderType = "Order Type";
	static WC = "Work Center";
	static WCs = "Work Centers";
	static Machine = "Machine";
	static Machines = "Machines";
	static ProductionOrderStatus = "Order Status";
	static DispatchPriority = "Dispatch Priority";
	static NonBusinessHours = "Nonworking Hours";
	static NarrowDown = "Narrow Down";
	static FullScreen = "Full Screen";
	static ViewOrder = "View...";
	static Select = "Select";
	static Deselect = "Deselect";
	static ScheduleOrder = "Schedule";
	static FirmOrder = "Firm";
	static UndoFirmOrder = "Undo Firm";
	static Save = "Save";
	static FirmAll = "Firm All";
	static UndoFirmAll = "Undo Firm All";
	static ScheduleAll = "Schedule All";
}

@localizable
export class Messages {
	static ErrorLoadingData = "An error occurred while loading data from the server.";
}

export const nameof = (name: Extract<keyof AM215555, string>): string => name;

@graphInfo({ graphType: "PX.Objects.AM.ManufacturingDiagram", primaryView: "SelectionFilter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
@autoinject
export class AM215555 extends PXScreen implements IPreferencesTarget {
	readonly prefid = "main_prefs";
	readonly ordersBrickLeftID = "ordersBrickLeftID";
	readonly ordersBrickRightID = "ordersBrickRightID";
	readonly productBrickLeftID = "productBrickLeftID";
	readonly productBrickRightID = "productBrickRightID";
	readonly operationsBrickLeftID = "operationsBrickLeftID";
	readonly operationsBrickRightID = "operationsBrickRightID";
	readonly unscheduledBrickLeftID = "unscheduledBrickLeftID";
	readonly unscheduledBrickRightID = "unscheduledBrickRightID";
	readonly searchBrickLeftID = "searchBrickLeftID";
	readonly searchBrickRightID = "searchBrickRightID";
	readonly allRecordsFilter = "00000000-0000-0000-0000-000000000000";

	private get isPeriodDay() { return this.currentPeriodKind === PeriodKind.Day; }
	private get isPeriodWeek() { return this.currentPeriodKind === PeriodKind.Week; }
	private get isPeriodMonth() { return this.currentPeriodKind === PeriodKind.Month; }

	private get currentPeriodKind() {
		const currentPresetId = (<PresetStore> this.orderCalendar?.presets)?.getAt(this.orderCalendar?.zoomLevel ?? 0)?.id;
		let kind = this.DatesFilter?.periodKindValue;
		if (currentPresetId) {
			switch (currentPresetId) {
				case "qp-monthAndYear":
					kind = PeriodKind.Month;
					break;
				case "qp-weekAndDay":
					kind = PeriodKind.Week;
					break;
				default:
					kind = PeriodKind.Day;
					break;
			}
		}
		return kind;
	}

	private get currentPreset() {
		const kind = this.currentPeriodKind;
		return kind === PeriodKind.Day ? this.getHoursPreset()
			: kind === PeriodKind.Day ? this.getWeekPreset()
				: this.getMonthPreset();
	}
	private topBarConfig =  {
		narrowDown: { index: 2,
			config: { ...NewMenuButton("narrowDown"),
				commandName: "narrowDown",
				images: { normal: "svg:main@pinned" },
				toolTip: Labels.NarrowDown,
				isSystem: false, toggleMode: true, showInToolbar: true, target: this.element, pushed: false,
			}
		},
		fullScreen: { index: 3,
			config: { ...NewMenuButton("fullScreen"),
				commandName: "fullScreen",
				images: { normal: "svg:main@fullscreen" },
				toolTip: Labels.FullScreen,
				isSystem: false, toggleMode: true, showInToolbar: true, target: this.element, pushed: false,
			}
		},
	};

	private searchBarConfig =  {
		firmAll: {
			config: { text: Labels.FirmAll, commandName: "firmAll" }
		},
		unfirmAll: {
			config: { text: Labels.UndoFirmAll, commandName: "unfirmAll" }
		},
		scheduleAll: {
			config: { text: Labels.ScheduleAll, commandName: "scheduleAll" }
		},
	};

	private rightToolBarConfig = {
		id: "rightToolBarConfigID",
		items: {
			periodDay: {
				config: {
					text: Labels.Day, commandName: "periodDay", cssClass: "qp-sch-time-period qp-sch-period-day",
				}
			},
			periodWeek: {
				config: {
					text: Labels.Week, commandName: "periodWeek", cssClass: "qp-sch-time-period qp-sch-period-week",
				}
			},
			periodMonth: {
				config: {
					text: Labels.Month, commandName: "periodMonth", cssClass: "qp-sch-time-period qp-sch-period-month",
				}
			},
		},
		hidden: true
	};

	private colorSchemeSelectorConfig = {
		id: "colorSchemeSelectorConfigId",
		required: false,
		enabled: true,
		readOnly: false,
		allowMultiSelect: false,
		valueType: NetType.String,
		allowEdit: false,
		allowNull: false,
		autoSuggest: false,
		valuesSeparator: "",
		colorMode: false,
		options: [
			{ value: "Status", text: Labels.ProductionOrderStatus },
			{ value: "Type", text: Labels.OrderType },
			{ value: "Priority", text: Labels.DispatchPriority },
		]
	};

	private filterDatePickerBtnConfig : IButtonControlConfig = {
		id: `scheduler_date_picker_btn`,
		enabled: true,
		displayIconAndText: true,
		images: {
			normal: "svg:main@datePicker"
		},
		action: "openDatePicker",
		hidden: true
	};

	private mainSplitterConfig: ISplitterConfig = {
		split: "width",
		initialSplit: "300px",
		initialState: "normal",
		style: "height: 100%",
		fading: true,
	};

	private ordersSplitterConfig: ISplitterConfig = {
		split: "height",
		initialSplit: "50%",
		initialState: "normal",
		firstHeader: Labels.ProductionOrders,
		secondHeader: Labels.Machines,
		fading: true,
	};

	private operationsSplitterConfig: ISplitterConfig = {
		split: "height",
		initialSplit: "75%",
		initialState: "normal",
		firstHeader: Labels.ProductionOrders,
		secondHeader: Labels.WCs,
		fading: true,
	};

	private dataGridSettings = {
		allowStoredFilters: false,
		showTopBar: false,
		pageSize: 3000,
	};

	Labels = Labels;

	DatesFilter = createSingle(DatesFilter);
	SelectionFilter = createSingle(SelectionFilter);

	SearchOrders = createCollection(Order, {
		topBarItems: this.searchBarConfig,
	});
	UnscheduledOrders = createCollection(Order, {
	});

	OrdersFiltered = createCollection(Order, {
		allowStoredFilters: true,
		pageSize: 3000,
		showFastFilter: GridFastFilterVisibility.False,
		fastFilterByAllFields: false,
		topBarItems: this.topBarConfig,
	});
	OrdersHighlighted = createCollection(Order, this.dataGridSettings);

	WCResources = createCollection(WCResource, this.dataGridSettings);
	WCOperationsAll = createCollection(Operation, this.dataGridSettings);
	WCOperationsFiltered = createCollection(Operation, this.dataGridSettings);
	WCOperationsHighlighted = createCollection(Operation, this.dataGridSettings);
	WCShiftCalendarResources = createCollection(CalendarResource);

	MachineResources = createCollection(MachineResource, this.dataGridSettings);
	MachineOperationsAll = createCollection(Operation, this.dataGridSettings);
	MachineOperationsFiltered = createCollection(Operation, this.dataGridSettings);
	MachineOperationsHighlighted = createCollection(Operation, this.dataGridSettings);
	MachineCalendarResources = createCollection(CalendarResource);

	SchdDetailsForShiftAndPeriod = createCollection(SchdDetailsForShiftAndPeriod);
	SchdDetailsForMachine = createCollection(SchdDetailsForMachine);

	SelectedProdItem = createSingle(AMProdItem);
	SelectedSchdItem = createSingle(AMSchdItem);
	SelectedProdOper = createSingle(AMProdOper);
	SelectedSchdOper = createSingle(AMSchdOper);
	SelectedWCOperation = createSingle(Operation);

	SchedulerGridFilters = Array<GridFilter>();

	// @observable({ changeHandler: "wCSplitterIdVisibleChanged"}) wcSplitterIdVisible;
	@observable({ changeHandler: "colorSchemeChanged"}) colorScheme: ColorScheme = "Status";
	@observable({ changeHandler: "tabUnscheduledVisibleChanged"}) tabUnscheduledVisible;
	@observable({ changeHandler: "tabSearchVisibleChanged"}) tabSearchVisible;

	private preferencesBase = new AM215555_Preferences();
	private get preferences() { return this.preferencesBase?.preferences as AM215555_PreferenceData; }
	private actualizingPreferences = false;

	private initializationDataProcessed = false;
	private disposables: Disposable[] = [];

	@bindable searchOrdersGrid!: QpGridCustomElement;
	@bindable unscheduledOrdersGrid!: QpGridCustomElement;
	@bindable ordersFilteredGrid!: QpGridCustomElement;
	@bindable ordersHighlighedGrid!: QpGridCustomElement;
	@bindable wCResourceGrid!: QpGridCustomElement;
	@bindable wCOperationsAllGrid!: QpGridCustomElement;
	@bindable wCOperationsFilteredGrid!: QpGridCustomElement;
	@bindable wCOperationsHighlightedGrid!: QpGridCustomElement;
	@bindable wCShiftCalendarGrid!: QpGridCustomElement;
	@bindable machineResourceGrid!: QpGridCustomElement;
	@bindable machineOperationsAllGrid!: QpGridCustomElement;
	@bindable machineOperationsFilteredGrid!: QpGridCustomElement;
	@bindable machineOperationsHighlightedGrid!: QpGridCustomElement;
	@bindable machineShiftCalendarGrid!: QpGridCustomElement;
	@bindable rightToolBar!: QpToolBarCustomElement;
	@bindable mainSplitter!: QpSplitterCustomElement;
	@bindable schedulerTabBar!: QpTabbarCustomElement;
	@bindable ordersSplitter!: QpSplitterCustomElement;
	@bindable operationsSplitter!: QpSplitterCustomElement;
	@bindable filterDatePickerBtn!: QpButtonCustomElement;

	private periodStart: Date;
	private periodEnd: Date;

	orderContainer!: HTMLElement;
	wCContainer!: HTMLElement;
	machineContainer!: HTMLElement;

	private unscheduledFastFilter!: HTMLInputElement;
	private searchFastFilter!: HTMLInputElement;
	private schedulerFilter: HTMLElement;
	private dayButton: HTMLElement;
	private datePickerHolder: HTMLElement;
	private searchOrdersGridElement: HTMLElement;
	private unscheduledOrdersGridElement: HTMLElement;
	private targetElement: HTMLElement;

	private aureliaEnhancedElements = new Set<HTMLElement>();

	private data = new DataHandler({
		getActiveEntity: () => this.activeEntity,
		datesFilter: this.DatesFilter,
	});

	private renderer = new Renderer({
		data: this.data,
		isPeriodMonth: () => this.isPeriodMonth,
		getScheduler: () => this.orderCalendar,
		getActiveEntity: () => this.activeEntity,
		getUnscheduledFastFilter: () => this.unscheduledFastFilter,
		getSearchFastFilter: () => this.searchFastFilter,
		preferences: this.preferences,
	});

	private get graphName() { return this.screenService.getGraphInfo()?.graphType; }

	private workingHoursSignature: string;

	private activeEntity: Order | Operation | null = null;
	private orderCalendar: SchedulerPro | null;
	private wCCalendar: SchedulerPro | null;
	private machineCalendar: SchedulerPro | null;
	private wCHistogramFiltered: ResourceHistogram | null;
	private wCHistogramAll: ResourceHistogram | null;
	private machinesHistogramFiltered: ResourceHistogram | null;
	private machinesHistogramAll: ResourceHistogram | null;
	private unscheduledControl: Grid | null;
	private searchControl: Grid | null;
	private datesFilterPopup: Popup | null = null;

	private get allCalendars() { return [this.orderCalendar, this.wCCalendar, this.machineCalendar]; }
	private get allControllers() { return [this.orderCalendar, this.wCCalendar, this.machineCalendar,
		//this.wCHistogramAll, this.wCHistogramFiltered, this.machinesHistogramAll, this.machinesHistogramFiltered
	];}

	private domEvents: ElementEvents;

	private subscribedToOperationsBrickPreferences = false;
	private subscribedToUnscheduledBrickPreferences = false;
	private subscribedToSearchBrickPreferences = false;

	private gridRowSelecting = false;
	private wCOperationsFilteredUpdated = false;
	private wCShiftCalendarUpdated = false;
	private wCResourcesUpdated = false;
	private forceUpdating = false;
	private calendarGridReloadRequired = false;
	private lockedSubGridsResizing = false;
	private openPopupTimer: ReturnType<typeof setTimeout>;

	private tick: {startDate: Date; endDate: Date};

	private popups = new PopupHandler({
		element: this.element,
		bindingEngine: this.bindingEngine,
		selectedProdItem: () => this.SelectedProdItem,
		getScreenService: () => this.screenService,
		selectionFilter: this.SelectionFilter,
	});

	// schedulerTabBar
	// SchedulerGridFilters
	// schedulerGrid

	constructor(
		public element: Element,
		private preferencesService: PreferencesService,
		private bindingEngine: BindingEngine,
		private templatingEngine: TemplatingEngine,
		private au: Aurelia,
	) {
		super();
		PresetManager.registerPreset("qp-hourAndDay", this.getHoursPreset());
		PresetManager.registerPreset("qp-weekAndDay", this.getWeekPreset());
		PresetManager.registerPreset("qp-monthAndYear", this.getMonthPreset());
	}

	async attached() {
		this.preferencesService.subscribe(this.prefid, this);
		await super.attached();

		this.attachToolbarHandling();
		await this.releaseUIControl(); // allow engine to redraw toolbar

		await this.attachUnscheduledPane();
		await this.attachCalendars();
		await this.attachHistograms();

		this.unscheduledFastFilter = document.getElementById("unscheduledOrdersGridId_fb_text") as HTMLInputElement;
		this.searchFastFilter = document.getElementById("searchOrdersGridId_fb_text") as HTMLInputElement;

		await this.releaseUIControl(); // allow engine to position datepicker control before we update it

		this.onDatesFilterUpdated();
		this.setFilterIconText();
		[this.DatesFilter.DateFrom, this.DatesFilter.DateTo].forEach(obj => this.disposables.push(
			this.bindingEngine.propertyObserver(obj, "value").subscribe((newValue: any, oldValue: any) => {
				if (newValue === oldValue) return;
				this.setFilterIconText();
			})));
		this.popups.initialize();
		if (this.filterDatePickerBtn) this.filterDatePickerBtn.hidden = false;
		if (this.rightToolBar && this.rightToolBar.config) this.rightToolBar.config.hidden = false;
	}

	protected onAfterInitialize() {
		this.setSchedulerTabs();
		// this.popups.afterInitialize();
	}

	detached() {
		super.detached();
		this.disposables.forEach(t => t.dispose());
		// this.detachCalendar();
	}

	public applyPreferences(prefs: IPreferencesPair<AM215555_Preferences>) {
		this.preferencesBase = new AM215555_Preferences(prefs.user?.preferences);
		this.actualizePreferences();
	}

	protected actualizePreferences() {
		this.actualizingPreferences = true;
		try {
			if (this.preferences?.colorScheme) {
				this.colorScheme = "Status";
			}
		} finally {
			this.renderer.preferences = this.preferences;
			this.actualizingPreferences = false;
		}
	}

	protected subscribeForPreferences(id: string, fieldSet: QpFieldsetCustomElement, role: EntityRole) {
		this.preferencesService.subscribe(id, {
			applyPreferences: (prefs) => {
				fieldSet.applyPreferences(prefs);
				switch (role) {
					case "order":
						this.updateUnscheduledPane(false);
						break;
					case "operation":
						this.updateOperationsControl();
						break;
					case "search":
						this.updateSearchPane(false);
						break;
				}
			}
		});
	}

	protected async savePreferences() {
		if (this.actualizingPreferences) return;
		console.log(`savePreferences: ${this.preferences.toString()}`);
		await this.preferencesService.saveUserPreferences(getScreenID(), this.prefid, this.preferencesBase);
	}

	protected async updateOperationsControl() {
		if (!this.orderCalendar) return;
		this.switchVisibleOperationsControls();
		if (this.isPeriodMonth) {
			this.allCalendars.forEach(x => x.suspendEvents());
			await this.updateCalendars();
			await this.updateHistograms();
			this.allCalendars.forEach(x => x.resumeEvents());
		}
		else {
			await this.updateCalendars();
			this.initLockedSubGridsWidth();
		}
	}

	protected switchVisibleOperationsControls() {
		const currentPreset = this.currentPreset;
		if (this.wCCalendar && (this.wCCalendar.viewPreset as ViewPreset).shiftUnit !== currentPreset.shiftUnit) {
			this.wCCalendar.viewPreset = currentPreset;
		}

		return;
		if (this.wCHistogramAll && (this.wCHistogramAll.viewPreset as ViewPreset).shiftUnit !== currentPreset.shiftUnit) {
			this.wCHistogramFiltered.viewPreset = currentPreset;
			this.wCHistogramAll.viewPreset = currentPreset;
			this.machinesHistogramFiltered.viewPreset = currentPreset;
			this.machinesHistogramAll.viewPreset = currentPreset;
		}

		this.wCCalendar?.element.classList.toggle("hidden", this.isPeriodMonth);
		this.machineCalendar?.element.classList.toggle("hidden", this.isPeriodMonth);
		this.wCHistogramAll?.element.classList.toggle("hidden", !this.isPeriodMonth);
		this.wCHistogramFiltered?.element.classList.toggle("hidden", !this.isPeriodMonth);
		this.machinesHistogramAll?.element.classList.toggle("hidden", !this.isPeriodMonth);
		this.machinesHistogramFiltered?.element.classList.toggle("hidden", !this.isPeriodMonth);
	}

	protected async createProjects(kind: "wc" | "machine", mainProjectOnly = false) {
		if (kind === "wc") {
			return await this.data.createOperationsProjects(
				"wc", mainProjectOnly, this.WCResources, this.WCShiftCalendarResources,
				this.WCOperationsAll, this.WCOperationsFiltered, this.WCOperationsHighlighted,
			);
		}
		else {
			return await this.data.createOperationsProjects(
				"machine", mainProjectOnly, this.MachineResources, this.MachineCalendarResources,
				this.MachineOperationsAll, this.MachineOperationsFiltered, this.MachineOperationsHighlighted,
			);
		}
	}

	protected async updateCalendars() {
		if (!this.wCCalendar) {
			this.attachCalendars();
		}
		else {
			this.data.startNextGeneration();
			const affectedCalenders = this.isPeriodMonth ? [this.orderCalendar] : this.allCalendars;

			const ordersProject = await this.data.createOrdersProject(this.OrdersFiltered, this.OrdersHighlighted);
			const [wCProjectAll] = await this.createProjects("wc", true);
			const [machinesProjectAll] = await this.createProjects("machine", true);
			const [newPeriodStart, newPeriodEnd] = this.data.getPeriodStartEndDates();

			// Note: we can't use Calendar's start and end times as those account for non-working hours/days
			const datesChanged = this.periodStart !== newPeriodStart || this.periodEnd !== newPeriodEnd;
			this.periodStart = newPeriodStart;
			this.periodEnd = newPeriodEnd;

			affectedCalenders.forEach(x => x.suspendEvents());

			this.orderCalendar.project = ordersProject;
			this.wCCalendar.project = wCProjectAll;
			this.machineCalendar.project = machinesProjectAll;

			this.orderCalendar.rowHeight = this.renderer.getOrderBrickHeight();
			this.wCCalendar.rowHeight = this.renderer.getOperationBrickHeight();
			this.machineCalendar.rowHeight = this.renderer.getOperationBrickHeight();

			if (datesChanged) {
				affectedCalenders.forEach(x => x.setTimeSpan(newPeriodStart, newPeriodEnd));
			}
			if (this.orderCalendar.viewPreset !== this.currentPreset) {
				affectedCalenders.forEach(x => {
					if (x === this.orderCalendar) return;
					x.viewPreset = this.currentPreset;
				});
			}

			affectedCalenders.forEach(x => x.renderContents());
			affectedCalenders.forEach(x => x.resumeEvents());

			await this.releaseUIControl();
		}
	}

	protected async updateHistograms() {
		return;
		this.wCOperationsFilteredUpdated = false;
		this.wCShiftCalendarUpdated = false;
		this.wCResourcesUpdated = false;

		const storedWCsScroll = this.wCHistogramAll?.storeScroll();
		const storedMachinesScroll = this.machinesHistogramAll?.storeScroll();

		await this.attachHistograms();

		await this.wCHistogramAll?.scrollHorizontallyTo((<any>storedWCsScroll).scrollLeft.normal, false);
		await this.machinesHistogramAll?.scrollHorizontallyTo((<any>storedMachinesScroll).scrollLeft.normal, false);

		return;

		// TODO: Bryntum Histogram throws an error on redraw if we try to replace the project

		if (!this.wCHistogramFiltered) {
			await this.attachHistograms();
		}
		else {
			const [newPeriodStartDate, newPeriodEndDate] = this.data.getPeriodStartEndDates();
			const [wCProjectAll, wCProjectFiltered] = await this.createProjects("wc");
			const [machinesProjectAll, machinesProjectFiltered] = await this.createProjects("machine");

			const datesChanged = this.wCCalendar.startDate !== newPeriodStartDate || this.wCCalendar.endDate !== newPeriodEndDate;

			this.wCHistogramFiltered.suspendEvents();
			this.wCHistogramAll.suspendEvents();
			this.wCHistogramFiltered.project = wCProjectFiltered;
			this.wCHistogramAll.project = wCProjectAll;
			if (datesChanged) {
				this.wCHistogramFiltered.setTimeSpan(newPeriodStartDate, newPeriodEndDate);
				this.wCHistogramAll.setTimeSpan(newPeriodStartDate, newPeriodEndDate);
			}
			this.wCHistogramFiltered.renderContents();
			this.wCHistogramAll.renderContents();
			this.wCHistogramFiltered.resumeEvents();
			this.wCHistogramAll.resumeEvents();
			// TODO: If uncommented -- Add processing for machines

			await this.releaseUIControl();
		}
	}

	protected attachToolbarHandling() {
		this.domEvents = new ElementEvents(this.element);
		this.domEvents.subscribe("buttonpressed", (e: CustomEvent) => this.processToolBarClick(e));
		this.schedulerFilter = document.querySelector(".qp-sch-grid-container-inner .grid-right-toolbar-cont");
		this.dayButton = document.querySelector("#rightToolBarConfigIDperiodDay");
		this.datePickerHolder = document.querySelector("#datePickerHolderID");

		// const screenToolBar = document.querySelector(".top-bar-cont qp-tool-bar");
		// const mainGridToolBar = this.mainToolBarHolderElement.querySelector(".grid-left-toolbar-cont");
		// mainGridToolBar.appendChild(screenToolBar);
	}

	protected getCalendarConfig(kind: "order" | "machine" | "wc", container: HTMLElement, label: string): Partial<SchedulerProConfig> {
		const [periodStartDate, periodEndDate] = this.data.getPeriodStartEndDates();
		let columns : ColumnStore | Partial<GridColumnConfig>[] | Partial<ColumnStoreConfig>;
		if (kind === "order") {
			columns = [{
				type: "tree", field: "name", text: label, autoWidth: true,
				renderer: this.renderer.calendarResourceRenderer.bind(this.renderer)
			}];
		}
		else {
			columns = [{
				type: "resourceInfo", field: "name", text: label, flex: 1, showEventCount: false, showImage: false,
				showMeta: ({ id }: ResourceModel) => this.data.getOperationResource(id.toString(), kind)?.getResourceDetails(), width: 150
			}];
		}
		const config: Partial<SchedulerProConfig> = {
			appendTo: container,
			startDate: periodStartDate,
			endDate: periodEndDate,
			visibleDate: this.activeEntity?.startDate ? { date: this.activeEntity?.startDate, block: "center" } : null,
			snap: true,
			enableEventAnimations: false,
			createEventOnDblClick: false,
			cls: "qp-sch-events",
			rowHeight: kind === "order" ? this.renderer.getOrderBrickHeight() : this.renderer.getOperationBrickHeight(),
			barMargin: 5,
			resourceMargin: this.renderer.getOperationRowMargin(),
			columns: columns,
			presets: [ this.getHoursPreset(), this.getWeekPreset(), this.getMonthPreset() ],
			viewPreset: this.currentPreset,
			timeAxis: { continuous: false, },
			onDragCreateStart: () => false,
			onBeforeEventAdd: () => false,
			onBeforeEventResize: () => false,
			onSelectionChange: () => false,
			// onScheduleClick: this.onCalendarClick.bind(this),
			onEventClick: this.onCalendarClick.bind(this),
			onEventMouseEnter: this.onEventMouseEnter.bind(this),
			// onEventMouseOver: this.onEventMouseOver.bind(this),
			// onEventMouseLeave: this.onEventMouseLeave.bind(this),
			onEventDblClick: () => false,
			// onEventDblClick: this.onOperationDblClick.bind(this),
			onCellClick: this.onCalendarCellClick.bind(this),
			onBeforeCellEditStart: () => false,
			onGridRowBeforeDragStart: () => false,
			// onBeforeSelectionChange: () => false,
			// onTimeAxisHeaderClick: this.onTimeAxisHeaderClick.bind(this),
			// eventLayout: "pack",
			onPresetChange: this.onPresetChange.bind(this),
			zoomKeepsOriginalTimespan: true,
			selectionMode: {
				row: true
			},
			onToggleNode: this.onToggleNode.bind(this),
			project: new ProjectModel({}),
			features: {
				cellMenu: false,
				cellTooltip: false,
				cellCopyPaste: false,
				columnRename: false,
				eventMenu: {
					items: this.getMenuItems(),
					processItems: this.processMenuItems.bind(this),
				},
				headerMenu: false,
				resourceMenu: false,
				scheduleMenu: false,
				timeAxisHeaderMenu: false,
				nonWorkingTime: true, //false,
				resourceTimeRanges: true,
				eventTooltip: false,
				eventEdit: false,
				eventDrag: false, /*{
					//snapToPosition: this.snapToPosition.bind(this),
					constrainDragToTimeline: false,
					dragHelperConfig: null,
					},*/
				eventDragCreate: {
					allowResizeToZero: false,
					showExactResizePosition: true,
					showTooltip: true,
				},
				timeRanges: {
					showCurrentTimeLine: false,
					showHeaderElements: false,
					enableResizing: false
				},
				scheduleTooltip: false,
				stickyEvents: true,
				tree: kind === "order" ? true : false,
				dependencies: {
					disabled: kind === "order" ? false : true,
					allowCreate: false,
					highlightDependenciesOnEventHover: true,
					renderer: this.renderer.orderDependenciesRenderer.bind(this.renderer)
				},
			},
			eventRenderer: kind === "order"
				? this.renderer.calendarOrderRenderer.bind(this.renderer)
				: this.renderer.operationRenderer.bind(this.renderer),
			eventLayout: "stack"
		};
		// (config as any).eventLayout = "none";
		return config;
	}

	protected async attachCalendars() {
		if (this.wCCalendar) return;
		if (!this.DatesFilter.PickerDateTo || !this.DatesFilter.PickerDateFrom) return; // still waiting for the date from the server

		const orderProject = await this.data.createOrdersProject(this.OrdersFiltered, this.OrdersHighlighted);
		const [wCProjectAll] = await this.createProjects("wc", true);
		const [machineProjectAll] = await this.createProjects("machine", true);
		[this.periodStart, this.periodEnd] = this.data.getPeriodStartEndDates();

		const oldOrderCalendar = this.orderCalendar;
		const orderConfig = this.getCalendarConfig("order", this.orderContainer, Labels.Orders);
		this.orderCalendar = new SchedulerPro(orderConfig);
		this.orderCalendar.project = orderProject;
		this.orderCalendar.setTimeSpan(this.periodStart, this.periodEnd);
		oldOrderCalendar?.destroy();

		const oldWCCalendar = this.wCCalendar;
		const wCConfig = this.getCalendarConfig("wc", this.wCContainer, Labels.WC);
		// wCConfig.hideHeaders = true;
		this.wCCalendar = new SchedulerPro(wCConfig);
		this.wCCalendar.project = wCProjectAll;
		this.wCCalendar.setTimeSpan(this.periodStart, this.periodEnd);
		oldWCCalendar?.destroy();

		const oldMachineCalendar = this.machineCalendar;
		const machineConfig = this.getCalendarConfig("machine", this.machineContainer, Labels.Machine);
		// machineConfig.hideHeaders = true;
		// machinesConfig.partner = this.wcCalendar;
		machineConfig.columns = this.wCCalendar.columns;
		this.machineCalendar = new SchedulerPro(machineConfig);
		this.machineCalendar.project = machineProjectAll;
		this.machineCalendar.setTimeSpan(this.periodStart, this.periodEnd);
		oldMachineCalendar?.destroy();

		// this.wcCalendar.getSubGrid(`locked`).hide();
		this.onSplitterChanged();
		this.actualizePreferences();
		this.linkCalendarsScrollers();
		this.linkLockedSubGrids();
	}

	protected async onSearchScroll({ source, scrollTop }) {
		const items = this.searchControl.data;
		const lastIndex = this.searchControl.lastVisibleRow.dataIndex;
		if (lastIndex < items.length - 1) return;

		this.searchOrdersGrid.getMoreRows(0, true, false);
	}

	protected async onUnscheduledScroll({ source, scrollTop }) {
		const items = this.unscheduledControl.data;
		const lastIndex = this.unscheduledControl.lastVisibleRow.dataIndex;
		if (lastIndex < items.length - 1) return;

		this.unscheduledOrdersGrid.getMoreRows(0, true, false);
	}

	protected onGridMouseOver({ record, cellElement, target }) {
		this.aureliaEnhance(cellElement);
	}

	protected onEventMouseEnter({ eventRecord, event }) {
		this.aureliaEnhance(event.target);
	}

	protected onEventMouseOver({ eventRecord, event }) {
		if (this.openPopupTimer) {
			clearTimeout(this.openPopupTimer);
		}
		const entity = this.data.getEntity(eventRecord?.id);
		if (this.popups.isOpenFor(entity.fullId) || this.popups.hasUnsavedData) return;

		let target = event.target as HTMLElement;
		while (target && !target.classList.contains("b-sch-event")) {
			target = target.parentElement;
		}

		this.openPopupTimer = setTimeout(() => {
			this.popups.openEntityPopup(entity, target);
		}, 1000); // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	protected onEventMouseLeave({ eventRecord, event }) {
		if (this.openPopupTimer) {
			clearTimeout(this.openPopupTimer);
		}
	}

	protected aureliaEnhance(element) {
		if (this.aureliaEnhancedElements.has(element)) return;
		this.aureliaEnhancedElements.add(element);

		const view = this.templatingEngine.enhance({
			element: element,
			container: this.au.container,
			resources: this.au.resources
		});
		view.bind({});
		view.attached();
	}

	protected async onGridCellClick({ record, cellElement, target }) {
		const targetElement = target as HTMLElement;
		const order = this.data.unscheduled.getEntry(record.id) ?? this.data.search.getEntry(record.id);

		let fieldName = targetElement.getAttribute("sch-field");
		if (!fieldName) {
			fieldName = targetElement.parentElement.getAttribute("sch-field");
		}
		if (fieldName === "SelectedWCOperation.ProdOrdID") {
			await this.popups.openEntityPopup(order, cellElement);
			return;
		}
		await this.setActiveEntity(order, true);
	}

	protected async onGridCellDblClick({ record }) {
		await this.onSelectOrder({ record: record, eventRecord: null });
	}

	protected async resetActiveEntity() {
		if (this.activeEntity == null) return;
		const isUnscheduled = this.activeEntity?.isUnscheduled;
		this.activeEntity = null;
		await this.updateOperationsControl();
		if (isUnscheduled) this.updateUnscheduledPane();
		else this.updateSearchPane();
	}

	protected async setActiveEntity(entity: Order | Operation, scrollIntoView = false) {
		if (entity === null || this.activeEntity?.orderID === entity.orderID) {
			this.resetActiveEntity();
			return;
		}

		this.activeEntity = entity;
		try {
			if (scrollIntoView && await this.scrollActiveIntoView(true, true)) return;

			if (!await this.updateCalendarGrids(scrollIntoView)) return;
			if (scrollIntoView) await this.scrollActiveIntoView(false, false);

			if (this.ordersFilteredGrid.getActiveFilter().filterID === this.allRecordsFilter) return;
		}
		finally {
			if (!scrollIntoView) await this.updateOperationsControl(); // If Condition to prevent unnecessary re-render
			if (this.activeEntity?.isUnscheduled) this.updateUnscheduledPane();
			else this.updateSearchPane();
		}
	}

	protected async scrollActiveIntoView(needRedraw = true, needAnimation = true) {

		// TODO: Recheck the kludge to to work with orders and operations
		// TODO: Make animation go off at the same time

		const entity = this.activeEntity;
		if (!entity) return false;
		if (entity.EndDate?.value?.fromView() > this.DatesFilter.DateTo.value) return false;
		if (entity.StartDate?.value?.fromView() < this.DatesFilter.DateFrom.value) return false;

		const loadedOrder = this.data.getOrder(entity.orderID);
		const loadedWCOperations = this.data.getOperationsByOrderId(entity.orderID, "wc");
		const loadedMachineOperations = this.data.getOperationsByOrderId(entity.orderID, "machine");
		if (loadedOrder === null || !loadedOrder) return false;
		if (loadedWCOperations?.some(x => x.isFilteredOut)) return false;

		if (needRedraw) {
			await this.updateOperationsControl();
		}

		const scrollOptions = { animate: needAnimation, block: "start", edgeOffset: 20, extendTimeAxis: false };
		const assignmentOrderId = `${Renderer.eventSegments.event} - ${this.data.getFullAssignmentId("order", loadedOrder.orderID)}`;
		const assignmentOrder = this.orderCalendar.assignmentStore.getById(assignmentOrderId) as SchedulerAssignmentModel;
		await this.orderCalendar.scrollAssignmentIntoView(assignmentOrder, scrollOptions);
		await this.orderCalendar.scrollResourceEventIntoView(assignmentOrder.resource as SchedulerResourceModel, assignmentOrder.event as SchedulerOperationModel, scrollOptions);
		if (loadedWCOperations.length > 0 && !this.isPeriodMonth)
		{
			const assignmentWCId = this.data.getFullAssignmentId("wc", loadedWCOperations[0].opId);
			const assignmentWC = this.wCCalendar.assignmentStore.getById(assignmentWCId) as SchedulerAssignmentModel;
			await this.wCCalendar.scrollResourceIntoView(assignmentWC.resource as SchedulerResourceModel, scrollOptions);

			const element = this.wCCalendar.getElementFromAssignmentRecord(assignmentWC);
			if (element?.parentElement?.getAttribute("data-assignment-id") !== assignmentWCId) {
				// TODO: That's a kludge for Bryntum's bug -- we should've had the assignment's element exist
				// instead, it might not exist or exist with a null assignment ID
				console.log(`assignment not found, going to try another method`);
				await this.updateOperationsControl();
				const assignment = this.wCCalendar.assignmentStore.getById(assignmentWCId) as SchedulerAssignmentModel;
				await this.wCCalendar.scrollResourceIntoView(assignment?.resource as SchedulerResourceModel, scrollOptions);
			}
		}
		if (loadedMachineOperations.length > 0 && !this.isPeriodMonth) {
			const assignmentMachineId = this.data.getFullAssignmentId("machine", loadedMachineOperations[0].opId);
			const assignmentMachine = this.machineCalendar.assignmentStore.getById(assignmentMachineId) as SchedulerAssignmentModel;
			await this.machineCalendar.scrollResourceIntoView(assignmentMachine?.resource as SchedulerResourceModel, scrollOptions);
		}

		return true;
	}

	protected getHoursPreset() : Partial<ViewPresetConfig> {
		return PresetManager.getById("qp-hourAndDay") ?? {
			tickWidth: 40,
			displayDateFormat: "ll HH:mm",
			shiftIncrement: 1,
			shiftUnit: "hour",
			defaultSpan: 8,
			timeResolution: { unit: "minute", increment: 60 },
			headers: [
				{ unit: "day", dateFormat: Formats.TimeAxisDay },
				{ unit: "hour", dateFormat: Formats.TimeAxisHour }
			],
			id: "qp-hourAndDay",
			base: "hourAndDay"
		};
	}

	protected getWeekPreset() : Partial<ViewPresetConfig> {
		return PresetManager.getById("qp-weekAndDay") ?? {
			tickWidth: 40,
			displayDateFormat: "ll HH:mm",
			shiftIncrement: 1,
			shiftUnit: "week",
			defaultSpan: 8,
			timeResolution: { unit: "day", increment: 1 },
			headers: [
				{ unit: "Week", dateFormat: Formats.TimeAxisWeek },
				{ unit: "day", dateFormat: Formats.TimeAxisWeekDayShort },
			],
			id: "qp-weekAndDay",
			base: "weekAndDay"
		};
	}

	protected getMonthPreset() : Partial<ViewPresetConfig> {
		return PresetManager.getById("qp-monthAndYear") ?? {
			tickWidth: 40,
			displayDateFormat: "ll HH:mm",
			shiftIncrement: 1,
			shiftUnit: "month",
			defaultSpan: 8,
			timeResolution: { unit: "day", increment: 1 },
			headers: [
				{ unit: "year", dateFormat: Formats.YearOnly },
				{ unit: "month", dateFormat: Formats.OnlyMonth },
			],
			id: "qp-monthAndYear",
			base: "monthAndYear"
		};
	}

	protected createHistogram(
		old: ResourceHistogram,
		container: HTMLElement,
		label: string,
		cls: string,
		ref: string,
		project: ProjectModel,
		resources: WCResource[] | MachineResource[],
		hideHeaders = false
	) {
		const [periodStartDate, periodEndDate] = this.data.getPeriodStartEndDates();
		const config = {
			appendTo: container,
			// partner: this.orderCalendar,
			columns: [{ field: "name", text: label, flex: 1 }],
			hideHeaders: false, //hideHeaders,
			viewPreset: this.currentPreset,
			timeAxis: { continuous: false, },
			project: project,
			// useProjectTimeUnitsForScale: true,
			startDate: periodStartDate,
			endDate: periodEndDate,
			ref: ref,
			rowHeight: this.renderer.getOperationBrickHeight(),
			barMargin: 4,
			// showBarTip: true,
			multiEventSelect: false,
			onScheduleMouseMove: (obj) => this.onScheduleMouseMove(obj),
			onScheduleMouseDown: (obj) => this.onScheduleMouseDown(obj),
			onCellClick: ({record, target}) => this.openHistogramPopup(record.id, target, resources),
			onCellMouseOver: ({record, target}) => this.onHistogramOver(record.id, target, resources),
			getRectClass(series, rectConfig, datum, index) {
				if (series.id !== "effort") return "";
				if (datum.effot > datum.maxEeffot) return "b-overallocated";
				if (datum.effort < datum.maxEffort) return "b-underallocated";
				return "";
			},
			cls: cls,
			features: {
				stripe: false,
				cellEdit: false,
				cellMenu: false,
				eventMenu: false,
				eventDragCreate: false,
				eventEdit: false,
				eventResize: false,
				simpleEventEdit: false,
				scheduleMenu: false,
				timeRanges: {
					showCurrentTimeLine: false,
				},
				scheduleTooltip: false,
				stickyEvents: true
			},
		};
		(config as any).useProjectTimeUnitsForScale = true;
		const newHistogram = new ResourceHistogram(config);
		old?.destroy();
		return newHistogram;
	}

	protected async attachHistograms() {
		return;
		const [periodStartDate, periodEndDate] = this.data.getPeriodStartEndDates();
		if (!periodStartDate) return; // still waiting for the date from the server

		const [wCProjectAll, wCProjectFiltered] = await this.createProjects("wc");
		const [machinesProjectAll, machinesProjectFiltered] = await this.createProjects("machine");

		this.wCHistogramAll = this.createHistogram(this.wCHistogramAll, this.wCContainer, Labels.WC,
			"qp-sch-histogram-background", "wCSchedulerBack", wCProjectAll, this.WCResources.records);
		this.wCHistogramFiltered = this.createHistogram(this.wCHistogramFiltered, this.wCContainer, "",
			"qp-sch-histogram-foreground", "wCScheduler", wCProjectFiltered, this.WCResources.records);
		this.machinesHistogramAll = this.createHistogram(this.machinesHistogramAll, this.machineContainer, Labels.Machine,
			"qp-sch-histogram-background", "machineSchedulerBack", machinesProjectAll, this.MachineResources.records, true);
		this.machinesHistogramFiltered = this.createHistogram(this.machinesHistogramFiltered, this.machineContainer, "",
			"qp-sch-histogram-foreground", "machineScheduler", machinesProjectFiltered, this.MachineResources.records, true);

		this.switchVisibleOperationsControls();
		this.onSplitterChanged();

		// this.wCHistogramFiltered.getSubGrid(`locked`).hide();
		// this.wCHistogramAll.getSubGrid(`locked`).hide();
		// this.machinesHistogram.getSubGrid(`locked`).hide();
		this.linkHistogramScrollers("wCContainer");
		this.linkHistogramScrollers("machineContainer");
		this.linkWcAndMachineHistograms();
		this.linkLockedSubGrids();
	}

	protected linkLockedSubGrids() {
		if (this.allControllers.some(x => !x)) return;
		this.initLockedSubGridsWidth();
		const initSubGrid = this.orderCalendar.getSubGrid(`locked`);
		initSubGrid.width = initSubGrid.width;
		this.allControllers.forEach(controller => controller.getSubGrid(`locked`).onResize = this.onLockedSubGridResize.bind(this));
	}

	protected initLockedSubGridsWidth() {
		if (this.allControllers.some(x => !x)) return;
		if (this.lockedSubGridsResizing) return;
		this.lockedSubGridsResizing = true;
		try {
			const initSubGrid = this.orderCalendar.getSubGrid(`locked`);
			if (!initSubGrid) return; // fake event

			this.allControllers.forEach(controller => {
				const subGrid = controller.getSubGrid(`locked`);
				if (subGrid !== initSubGrid && subGrid.width !== initSubGrid.width) {
					subGrid.width = initSubGrid.width;
				}
			});
			// if (this.saveSplitterPositionTimer) {
			// 	clearTimeout(this.saveSplitterPositionTimer);
			// }
			// this.saveSplitterPositionTimer = setTimeout(() => {
			// 	this.splitterPreferences.position = width;
			// 	this.savePreferences();
			// }, 300); // eslint-disable-line @typescript-eslint/no-magic-numbers
		}
		finally {
			this.lockedSubGridsResizing = false;
		}
	}

	protected onLockedSubGridResize({ width }) {
		if (this.allControllers.some(x => !x)) return;
		if (this.lockedSubGridsResizing) return;
		this.lockedSubGridsResizing = true;
		try {
			const movingElement = document.getElementsByClassName("b-moving")?.[0] as HTMLElement;
			if (!movingElement) return; // fake event

			this.allControllers.forEach(controller => {
				const subGrid = controller.getSubGrid(`locked`);
				if (subGrid.element !== movingElement) {
					subGrid.width = width;
				}
			});
			// if (this.saveSplitterPositionTimer) {
			// 	clearTimeout(this.saveSplitterPositionTimer);
			// }
			// this.saveSplitterPositionTimer = setTimeout(() => {
			// 	this.splitterPreferences.position = width;
			// 	this.savePreferences();
			// }, 300); // eslint-disable-line @typescript-eslint/no-magic-numbers
		}
		finally {
			this.lockedSubGridsResizing = false;
		}
	}

	protected linkHistogramScrollers(container: string) {
		const eventWrapperBack = document.querySelector(`[ref="${container}"] > .b-resourcehistogram:not(:last-child) .b-grid-body-container.b-vertical-overflow`) as HTMLElement;
		const eventWrapper = document.querySelector(`[ref="${container}"] > .b-resourcehistogram:last-child .b-grid-body-container.b-vertical-overflow`) as HTMLElement;

		eventWrapperBack?.addEventListener("scroll", (e) => {
			eventWrapper.scrollTo(eventWrapperBack.scrollLeft, eventWrapperBack.scrollTop);
		}, false);

		const eventHorWrapperBack = document.querySelector(`[ref="${container}"] > .b-resourcehistogram:not(:last-child) .b-virtual-scroller:not(:first-child)`) as HTMLElement;
		const eventHorWrapper = document.querySelector(`[ref="${container}"] > .b-resourcehistogram:last-child .b-virtual-scroller:not(:first-child)`) as HTMLElement;

		eventHorWrapperBack?.addEventListener("scroll", (e) => {
			eventHorWrapper.scrollTo(eventHorWrapperBack.scrollLeft, eventHorWrapperBack.scrollTop);
		}, false);

	}

	protected getScrollerWrapper(container: "order" | "wC" | "machine", type: "resourcehistogram" | "schedulerpro") {
		return document.querySelector(`[ref="${container}Container"] > .b-${type}:${type === "schedulerpro" ? "last-child" : "not(:last-child)"} .b-virtual-scroller:not(:first-child)`) as HTMLElement;
	}

	protected linkWcAndMachineHistograms() {
		const orderScroller = this.getScrollerWrapper("order", "schedulerpro");
		const wCScroller = this.getScrollerWrapper("wC", "resourcehistogram");
		const machineScroller = this.getScrollerWrapper("machine", "resourcehistogram");

		if (!(machineScroller && orderScroller && wCScroller)) return;
		this.linkScrollers(orderScroller, wCScroller, machineScroller);
		this.linkScrollers(wCScroller, orderScroller, machineScroller);
		this.linkScrollers(machineScroller, orderScroller, wCScroller);
	}

	protected linkCalendarsScrollers() {
		const orderScroller = this.getScrollerWrapper("order", "schedulerpro");
		const wCScroller = this.getScrollerWrapper("wC", "schedulerpro");
		const machineScroller = this.getScrollerWrapper("machine", "schedulerpro");
		this.linkScrollers(orderScroller, wCScroller, machineScroller);
		this.linkScrollers(wCScroller, orderScroller, machineScroller);
		this.linkScrollers(machineScroller, orderScroller, wCScroller);
	}

	protected linkScrollers(from: HTMLElement, to1: HTMLElement, to2: HTMLElement) {
		from.addEventListener("scroll", (e) => {
			to1.scrollTo(from.scrollLeft, to1.scrollTop);
			to2.scrollTo(from.scrollLeft, to2.scrollTop);
		}, false);
	}

	protected async attachUnscheduledPane() {
		const schedulerSOContainer = document.getElementById("schedulerSOContainer");
		const data = this.data.unscheduled.createData();

		const oldUnscheduledControl = this.unscheduledControl;
		this.unscheduledControl = new Grid({
			appendTo: schedulerSOContainer,
			features: {
				cellEdit: false,
				cellMenu: {
					items: this.getMenuItems(),
					processItems: this.processMenuItems.bind(this),
				},
			},
			columns: [{
				editable: false,
				text: "unscheduled",
				field: "unscheduled",
				flex: 1,
				cellCls: "",
				autoHeight: true,
				htmlEncode: false,
				renderer: this.renderer.unscheduledRenderer.bind(this.renderer),
			}],
			data: data,
			onBeforeSelectionChange: () => false,
			onCellClick: this.onGridCellClick.bind(this),
			onScroll: this.onUnscheduledScroll.bind(this),
			onCellMouseOver: this.onGridMouseOver.bind(this),
		});

		oldUnscheduledControl?.destroy();
	}

	protected detachUnscheduledPane() {
		if (this.unscheduledControl) {
			this.unscheduledControl.destroy();
			this.unscheduledControl = null;
		}
	}

	protected async updateUnscheduledPane(fullUpdate = false) {
		if (!this.unscheduledControl || fullUpdate) {
			this.detachUnscheduledPane();
			this.attachUnscheduledPane();
		}
		else {
			const store = this.unscheduledControl?.storeScroll();
			this.unscheduledControl.data = this.data.unscheduled.createData();
			this.unscheduledControl?.restoreScroll(store);
		}
	}

	protected async tabUnscheduledVisibleChanged() {
		if (!this.tabUnscheduledVisible) return;
		await this.releaseUIControl(); // allow the engine to render tab first
		this.updateUnscheduledPane(false);
	}

	protected async attachSearchPane() {
		const searchContainer = document.getElementById("searchContainer");
		const data = this.data.search.createData();

		const oldSearchControl = this.searchControl;
		this.searchControl = new Grid({
			appendTo: searchContainer,
			features: {
				cellEdit: false,
				cellMenu: {
					items: this.getMenuItems(),
					processItems: this.processMenuItems.bind(this),
				},
			},
			columns: [{
				editable: false,
				text: "search",
				field: "search",
				flex: 1,
				cellCls: "",
				autoHeight: true,
				htmlEncode: false,
				renderer: this.renderer.searchRenderer.bind(this.renderer),
			}],
			data: data,
			onBeforeSelectionChange: () => false,
			onCellClick: this.onGridCellClick.bind(this),
			// onCellDblClick: this.onGridCellDblClick.bind(this),
			onScroll: this.onSearchScroll.bind(this),
			onCellMouseOver: this.onGridMouseOver.bind(this),
		});

		oldSearchControl?.destroy();
	}

	protected detachSearchPane() {
		if (this.searchControl) {
			this.searchControl.destroy();
			this.searchControl = null;
		}
	}


	protected async updateSearchPane(fullUpdate = false) {
		if (!this.searchControl || fullUpdate) {
			this.detachSearchPane();
			this.attachSearchPane();
		}
		else {
			const store = this.searchControl?.storeScroll();
			this.searchControl.data = this.data.search.createData();
			this.searchControl?.restoreScroll(store);
		}
	}

	protected async tabSearchVisibleChanged() {
		if (!this.tabSearchVisible) return;
		await this.releaseUIControl(); // allow the engine to render tab first
		this.updateSearchPane(false);
	}

	public getCaptionText() { return ""; }

	protected onSplitterChanged(args: any = null) {
		const ordersSplitterCollapsed = this.ordersSplitter?.getSplitterState() === "collapsed-first";
		const operationsSplitterCollapsed = this.operationsSplitter?.getSplitterState() === "collapsed-first";
		this.orderContainer.querySelector(".b-grid-header-container")?.classList.toggle("hidden", ordersSplitterCollapsed || operationsSplitterCollapsed);
		this.wCContainer.querySelectorAll(".b-grid-header-container").forEach(x => x.classList.toggle("hidden", ordersSplitterCollapsed || !operationsSplitterCollapsed));
		this.machineContainer.querySelectorAll(".b-grid-header-container").forEach(x => x.classList.toggle("hidden", !ordersSplitterCollapsed));
	}

	protected onActiveFilterChanged(args: QpGridEventArgs) {
		this.setSchedulerTabs();
		const filter = this.ordersFilteredGrid.getActiveFilter();
		this.schedulerTabBar.showTab(filter.filterID);
	}

	protected onFiltersChanged(args: QpGridEventArgs) {
		this.setSchedulerTabs();
	}

	protected filterTabSelected(tabId: string) {
		if (this.ordersFilteredGrid.getActiveFilter()?.filterID !== tabId) {
			this.ordersFilteredGrid.setActiveFilter(tabId);
		}
	}

	protected setSchedulerTabs() {
		this.SchedulerGridFilters = this.ordersFilteredGrid.getFilters();
	}

	protected onSearchFiltersChanged(args: QpGridEventArgs) {
		this.calendarGridReloadRequired = true;
	}

	protected async searchOrdersDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as Order);
		// TODO: add handling of initialization data
		// if (!this.initializationDataProcessed && this.MainAppointmentFilter.InitialRefNbr.value?.length > 0) {
		// 	return; // wait for the initialization data to be processed
		// }
		if (!this.data.search.initializeWith(Array.from(items))) return;

		if (this.calendarGridReloadRequired) {
			try {
				await this.updateCalendarGrids();
			}
			finally {
				this.calendarGridReloadRequired = false;
			}
		}
		else {
			this.updateSearchPane();
		}

		if (this.subscribedToSearchBrickPreferences) return;
		this.subscribedToSearchBrickPreferences = true;
		this.subscribeForPreferences(this.searchBrickLeftID, this.renderer.searchBrickLeft, "search");
		this.subscribeForPreferences(this.searchBrickRightID, this.renderer.searchBrickRight, "search");
	}

	protected async unscheduledOrdersDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as Order);
		// TODO: add handling of initialization data
		// if (!this.initializationDataProcessed && this.MainAppointmentFilter.InitialSORefNbr.value?.length > 0) {
		// 	return; // wait for the initialization data to be processed
		// }
		if (!this.data.unscheduled.initializeWith(Array.from(items))) return;
		this.updateUnscheduledPane();

		if (this.subscribedToUnscheduledBrickPreferences) return;
		this.subscribedToUnscheduledBrickPreferences = true;
		this.subscribeForPreferences(this.unscheduledBrickLeftID, this.renderer.unscheduledBrickLeft, "order");
		this.subscribeForPreferences(this.unscheduledBrickRightID, this.renderer.unscheduledBrickRight, "order");
	}

	protected async updateDependandCalendarGrids() {
		let res:ICommandUpdateResult;
		try {
			res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
				views: [
					nameof("OrdersHighlighted"),
					nameof("WCOperationsAll"), nameof("WCOperationsFiltered"), nameof("WCOperationsHighlighted"),
					nameof("WCResources"), nameof("WCShiftCalendarResources"),
					nameof("MachineOperationsAll"), nameof("MachineOperationsFiltered"), nameof("MachineOperationsHighlighted"),
					nameof("MachineResources"), nameof("MachineCalendarResources"), "LongRunData"
				]
			}));
		}
		finally {
			//
		}
		if (!res?.succeeded) return false;
		await this.updateOperationsControl();
		return true;

	}

	protected async updateCalendarGrids(scrollIntoView = true) {
		this.forceUpdating = true;
		let res:ICommandUpdateResult;
		try {
			res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
				views: [nameof("OrdersFiltered")]
			}));
			if (!res?.succeeded) return false;
			if (!await this.updateDependandCalendarGrids()) return false;
			if (this.activeEntity?.isUnscheduled) await this.updateUnscheduledPane();
			else await this.updateSearchPane();
			if (scrollIntoView) await this.scrollActiveIntoView(false);
			return true;
		}
		finally {
			this.forceUpdating = false;
		}
	}

	protected async ordersFilteredDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (this.DatesFilter?.DatePickerMode?.value) return;
		if (!this.forceUpdating) {
			await this.updateDependandCalendarGrids();
		}

		if (this.subscribedToOperationsBrickPreferences) return;
		this.subscribedToOperationsBrickPreferences = true;
		this.subscribeForPreferences(this.operationsBrickLeftID, this.renderer.operationsBrickLeft, "operation");
		this.subscribeForPreferences(this.operationsBrickRightID, this.renderer.operationsBrickRight, "operation");
		this.subscribeForPreferences(this.productBrickLeftID, this.renderer.productBrickLeft, "operation");
		this.subscribeForPreferences(this.productBrickRightID, this.renderer.productBrickRight, "operation");
		this.subscribeForPreferences(this.ordersBrickLeftID, this.renderer.operationsBrickLeft, "operation");
		this.subscribeForPreferences(this.ordersBrickRightID, this.renderer.operationsBrickRight, "operation");
	}

	protected async machineOperationDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		await this.updateOperationsControl();
	}

	protected async onCalendarClick({ eventRecord, event, assignmentRecord }) {
		const entity = this.data.getEntity(eventRecord?.id);
		this.setActiveEntity(entity, false);

		if (!this.activeEntity) return;
	}

	protected async onCalendarCellClick({ grid, record, column, cellElement, target, event }) {
		const id = record.id;
		const orderID = this.data.getPartialId(id);
		if (!orderID) return;

		const targetElem = event.target as HTMLElement;
		const collapseBtn = target?.classList?.contains("qp-chevron-icon") ? target
			: target?.parentElement?.classList?.contains("qp-chevron-icon") ? target.parentElement : undefined;
		if (collapseBtn) {
			await this.orderCalendar.toggleCollapse(record);
			return;
		}

		if (targetElem?.parentElement && targetElem.parentElement.classList.contains("b-grid-row")) return;

		if (this.activeEntity?.orderID === orderID) {
			await this.resetActiveEntity();
			return;
		}

		const order = this.data.getOrder(orderID);
		if (!order) return;
		await this.setActiveEntity(order, true);
	}

	protected async onToggleNode(event: { record: Model; collapse: boolean }) {
		if (!(event.record instanceof ResourceModel)) return;
		const order = this.data.getOrder(event.record?.id?.toString());
		if (order) {
			this.OrdersFiltered.activeRow = order;
			this.OrdersFiltered.activeRow.IsEventExpanded.value = !event.collapse;
			this.OrdersFiltered.activeRowChanged = true;
		}
	}

	protected async onOperationDblClick({ eventRecord, eventElement, assignmentRecord }) {
		const operation = this.data.getOperation(eventRecord.id);
		await this.popups.openEntityPopup(operation, eventElement);
	}

	protected async onPresetChange({ source: Scheduler, startDate, centerDate, endDate, from, to }) {
		const affectedCalenders = this.isPeriodMonth ? [this.orderCalendar] : this.allCalendars;
		const [ periodStart, periodEnd ] = this.data.getPeriodStartEndDates();
		for (const calendar  of affectedCalenders) {
			if (!calendar) return;
			calendar.setTimeSpan(periodStart, periodEnd);
		}
		this.switchVisibleOperationsControls();
		this.onDatesFilterUpdated();
	}

	protected onScheduleMouseDown(obj) {
		this.tick = obj.tick;
	}

	protected onScheduleMouseMove(obj) {
		this.tick = obj.tick;
		console.log(`${this.tick.startDate}, ${this.tick.endDate}`);
	}

	protected async openHistogramPopup(recordId: string, target: Element, records: WCResource[] | MachineResource[]) {
		if (!(target instanceof SVGRectElement)) return;

		const resource = records.find(
			(row) => row.Id.value === this.data.getPartialId(recordId)) as WCResource;
		await this.popups.openHistogramDetailsPopup(resource, this.tick.startDate, this.tick.endDate, target);
	}

	protected async onHistogramOver(recordId: string, target: Element, records: WCResource[] | MachineResource[]) {

		// TODO: Histograms don't send out onScheduleMouseMove so we can't get the tick
		// do it some other way if required
		return;

		if (this.openPopupTimer) {
			clearTimeout(this.openPopupTimer);
		}
		const resource = records.find(
			(row) => row.Id.value === this.data.getPartialId(recordId)) as WCResource;
		const entityId = resource.getFullId(this.tick.startDate, this.tick.endDate);
		if (this.popups.isOpenFor(entityId)) return;

		this.openPopupTimer = setTimeout(() => {
			this.popups.openHistogramDetailsPopup(resource, this.tick.startDate, this.tick.endDate, target);
		}, 1000); // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	protected async processToolBarClick(e: CustomEvent) {
		const btnConfig = e.detail?.config;
		const action = btnConfig?.commandName;
		let res: boolean;
		let promise: Promise<boolean> | Promise<void> | Promise<boolean | void> | null = null;

		let processed = true;
		switch (action) {
			case "firmAll": promise = this.processAll("CalendarFirm"); break;
			case "unfirmAll": promise = this.processAll("CalendarUndoFirm"); break;
			case "scheduleAll": promise = this.processAll("CalendarSchedule"); break;
			case "narrowDown": promise = this.switchNarrowDownFilter(); break;
			case "fullScreen": promise = this.switchFullScreen(); break;
			case "periodDay": promise = this.setDayPeriod(); break;
			case "periodWeek": promise = this.setWeekPeriod(); break;
			case "periodMonth": promise = this.setMonthPeriod(); break;
			case "select":
			case "deselect":
				promise = this.selectOrder(this.popups.getEntity())
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "firm":
			case "unfirm":
				promise = this.firmOrder(this.popups.getEntity())
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "schedule":
				promise = this.scheduleOrder(this.popups.getEntity())
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "save":
				promise = this.saveOrder(this.popups.getEntity())
					.then((res) => { if (res) this.popups.clearSave(); });
				break;
			default:
				processed = false;
				break;
		}
		if (processed) {
			e.stopPropagation();
			(<any>e).propagationStopped = true;
		}
		await promise;
	}

	protected getDataItemFromMenuCommand(record, eventRecord) {
		if (record) {
			const searchEntry = this.data.search.getEntry(record.id);
			if (searchEntry) return searchEntry;
			return this.data.unscheduled.getEntry(record.id);
		}
		return this.data.getEntity(eventRecord.id);
	}

	protected getMenuItems() {
		return {
			copyEvent: false,
			cutEvent: false,
			splitEvent: false,
			removeRow: false,
			deleteEvent: false,
			unassignEvent: false,
			editEvent: { text: Labels.ViewOrder, onItem: this.onViewOrder.bind(this), cls: "qp-sch-menu", icon: "" },
			selectEvent: { text: Labels.Select, onItem: this.onSelectOrder.bind(this), cls: "qp-sch-menu", icon: "" },
			scheduleEvent: { text: Labels.ScheduleOrder, onItem: this.onScheduleOrder.bind(this), cls: "qp-sch-menu", icon: "" },
			firmEvent: { text: Labels.FirmOrder, onItem: this.onFirmOrder.bind(this), cls: "qp-sch-menu", icon: "" },
		};
	}

	protected processMenuItems({record, eventRecord, items, targetElement}) {
		const item = this.getDataItemFromMenuCommand(record, eventRecord);
		this.targetElement = targetElement;

		items.scheduleEvent = (!item.isSchedulable || item.isFirm) ? false : { text: Labels.ScheduleOrder,
			onItem: this.onScheduleOrder.bind(this), cls: "qp-sch-menu", icon: "" };
		items.firmEvent.text = item.isFirm ? Labels.UndoFirmOrder : Labels.FirmOrder;
		items.firmEvent.hidden = item.isUnscheduled || !item.isSchedulable;
		items.selectEvent.text = item.isSelected ? Labels.Deselect : Labels.Select;
		items.selectEvent.hidden = item.isUnscheduled;
	}

	protected async onViewOrder({ record, eventRecord }) {
		const item = this.getDataItemFromMenuCommand(record, eventRecord);
		await this.popups.openEntityPopup(item, this.targetElement);
	}

	protected async processSingle(command: string, entity: Order | Operation, views = [nameof("SearchOrders"), "LongRunData"]) {
		this.SelectionFilter.ProdOrdID.updateValue(entity.ProdOrdID.cellText);
		this.SelectionFilter.OrderType.updateValue(entity.OrderType.cellText);
		this.SelectionFilter.SchdID.updateValue(Number(entity.SchdID.cellText));
		let res:ICommandUpdateResult;
		try {
			// Trigger updating of all the panes
			this.calendarGridReloadRequired = true;
			res = await this.screenService.update(command, new ScreenUpdateParams({ blockPage: false, views: views }));
		}
		finally {
			//
		}
		return res?.succeeded ?? false;
	}

	protected async processAll(action: string) {
		this.SelectionFilter.ProdOrdID.updateValue(0);
		let res:ICommandUpdateResult;
		try {
			// Trigger updating of all the panes
			this.calendarGridReloadRequired = true;
			res = await this.screenService.update(action, new ScreenUpdateParams({ blockPage: false, views: [nameof("SearchOrders"), "LongRunData"] }));
		}
		finally {
			//
		}
		return res?.succeeded ?? false;
	}

	protected async onScheduleOrder({ record, eventRecord }) {
		const item = this.getDataItemFromMenuCommand(record, eventRecord);
		await this.scheduleOrder(item);
	}

	protected async scheduleOrder(entity: Order | Operation) {
		return await this.processSingle("CalendarSchedule", entity, [nameof("SearchOrders"), nameof("UnscheduledOrders"), "LongRunData"]);
	}

	protected async saveOrder(entity: Order | Operation) {
		return await this.processSingle("CalendarSaveProdItem", entity);
	}

	protected async onFirmOrder({ record, eventRecord }) {
		const item = this.getDataItemFromMenuCommand(record, eventRecord);
		await this.firmOrder(item);
	}

	protected async firmOrder(entity: Order | Operation) {
		const action = entity.isFirm ? "CalendarUndoFirm" : "CalendarFirm" ;
		return await this.processSingle(action, entity);
	}

	protected async onSelectOrder({ record, eventRecord }) {
		const entity = this.getDataItemFromMenuCommand(record, eventRecord);
		await this.selectOrder(entity);
	}

	protected async selectOrder(entity: Order | Operation) {
		return await this.processSingle("CalendarToggleSelection", entity, [nameof("SearchOrders"), "LongRunData"]);
	}

	protected async setDayPeriod() {
		if (this.isPeriodDay) return;
		this.DatesFilter?.PeriodKind.updateValue(PeriodKind.Day);
		this.orderCalendar.viewPreset = PresetManager.getById(this.getHoursPreset().id);
	}

	protected async setWeekPeriod() {
		if (this.isPeriodWeek) return;
		this.DatesFilter?.PeriodKind.updateValue(PeriodKind.Week);
		this.orderCalendar.viewPreset = PresetManager.getById(this.getWeekPreset().id);
	}

	protected async setMonthPeriod() {
		if (this.isPeriodMonth) return;
		this.DatesFilter?.PeriodKind.updateValue(PeriodKind.Month);
		this.orderCalendar.viewPreset = PresetManager.getById(this.getMonthPreset().id);
	}

	protected async reloadForDate(forceSetPeriod = false)
	{
		const storedOrdersScroll = this.wCCalendar?.storeScroll();
		//const storedWCsScroll = this.wCHistogramAll?.storeScroll();
		//const storedMachinesScroll = this.machinesHistogramAll?.storeScroll();

		await this.updateCalendarGrids(false);

		this.wCCalendar?.scrollVerticallyTo((<any>storedOrdersScroll).scrollTop, false);
		//this.wCHistogramAll?.scrollVerticallyTo((<any>storedWCsScroll).scrollTop, false);
		//this.machinesHistogramAll?.scrollVerticallyTo((<any>storedMachinesScroll).scrollTop, false);
	}

	protected onDatesFilterUpdated() {
		// We can"t change the styles through the config, as setupViewModel() removes the date picker from the toolbar
		document.querySelector(".qp-sch-period-day")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodDay);
		document.querySelector(".qp-sch-period-week")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodWeek);
		document.querySelector(".qp-sch-period-month")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodMonth);
	}

	protected setFilterIconText() {
		const start = this.DatesFilter.DateFrom?.value;
		const end = this.DatesFilter.DateTo?.value;
		const sameMonth = start?.getMonth() === end?.getMonth() && start?.getFullYear() === end?.getFullYear();
		const periodStart = start ? formatDate(start, sameMonth ? Formats.DateRangeSameMonthP1 : Formats.DateRangeDiffMonthP1, dateFormatInfo()) : " ";
		const periodEnd = end ? formatDate(end, sameMonth ? Formats.DateRangeSameMonthP2 : Formats.DateRangeDiffMonthP2, dateFormatInfo()) : " ";
		const fullFormattedDate = `${periodStart} - ${periodEnd}`;
		if (this.filterDatePickerBtn) {
			this.filterDatePickerBtn.caption = fullFormattedDate;
		}
	}

	protected async switchNarrowDownFilter() {
		this.data.narrowDownFilter = !this.data.narrowDownFilter;
		this.topBarConfig.narrowDown.config.pushed = this.data.narrowDownFilter;
		this.ordersFilteredGrid.setTopBarButtonsState();
		await this.updateOperationsControl();
		if (this.data.narrowDownFilter) {
			this.scrollActiveIntoView();
		}
	}

	protected async switchFullScreen() {
		const mainDiv = document.querySelector("body");
		if (!document.fullscreenElement) {
			await mainDiv.requestFullscreen();
		}
		else {
			await document.exitFullscreen();
		}

		mainDiv.addEventListener("fullscreenchange", (event) => {
			mainDiv.classList.toggle("qp-sch-full-screen", !!document.fullscreenElement);
			this.topBarConfig.fullScreen.config.pushed = !!document.fullscreenElement;
			this.ordersFilteredGrid.setTopBarButtonsState();
		});
	}

	protected async colorSchemeChanged() {
		if (!this.preferences) return;
		this.preferences.colorScheme = this.colorScheme;
		await this.updateOperationsControl();
		await this.updateSearchPane();
		await this.updateUnscheduledPane();
		await this.savePreferences();
	}

	protected async releaseUIControl() {
		await new Promise(resolve => setTimeout(resolve, 1));
	}
}

export type ColorScheme = "Status";

export class AM215555_PreferenceData {
	public colorScheme: ColorScheme = "Status";

	constructor(preferences: AM215555_PreferenceData = null) {
		if (preferences === null) return;
		this.colorScheme = "Status";
	}
}

class AM215555_Preferences extends PreferenceBase {
	preferences = new AM215555_PreferenceData();

	constructor(preferences: AM215555_PreferenceData = null) {
		super();
		this.type = "AM215555";
		if (preferences === null) return;
		this.preferences = new AM215555_PreferenceData(preferences);
	}
}


// TODO: Check if we can get rid of any of this - it might be a kludge for Platform bug(s) (in DateTime editor)
declare global { // to access the global type String
	interface Date {
		withoutTimeInMsec(): number;
		toView(): Date;
		fromView(): Date;
		clearHoursUTC(): Date;
	}
}

Date.prototype.withoutTimeInMsec = function () {
	const d = this.clearHoursUTC();
	return d.getTime();
};


Date.prototype.toView = function () {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	return new Date(this.getTime() + this.getTimezoneOffset() * 60000);
};

Date.prototype.fromView = function () {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	return new Date(this.getTime() - this.getTimezoneOffset() * 60000);
};

Date.prototype.clearHoursUTC = function () {
	const newDate = (this.getTimezoneOffset() > 0)
		? new Date(new Date(this.toUTCString().substring(0, 25)))  // eslint-disable-line @typescript-eslint/no-magic-numbers
		: new Date(this);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
};
