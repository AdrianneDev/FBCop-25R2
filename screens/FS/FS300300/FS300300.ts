/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable brace-style */
import { autoinject, bindable, ElementEvents, observable, BindingEngine, TemplatingEngine, Aurelia } from "aurelia-framework";
import { SchedulerPro, EventModel, ResourceModel,
	SchedulerEventModel, SchedulerAssignmentModel,
	SubGrid, Model, SchedulerResourceModel, ViewPresetConfig, Grid
} from "@bryntum/schedulerpro";
import {
	PXScreen, ScreenUpdateParams, createCollection, graphInfo,
	PXActionState, PXFieldState, localizable, QpGridCustomElement, GridPagerMode, QpTabbarCustomElement, GridFilter,
	showInformer, createSingle, ICommandUpdateResult, QpHyperIconCustomElement, GridFilterBarVisibility,
	GridFastFilterVisibility, ServerCommand, GridNoteFilesShowMode,
	QpGridEventArgs,
	NewMenuButton,
	formatDate, getScreenID,
	dateFormatInfo,
	ISplitterConfig, QpSplitterCustomElement,
	IPreferencesPair, IPreferencesTarget, PreferenceBase, PreferencesService,
	FieldsetPreferences
} from "client-controls";
import { ExternalEventDragHelper, ExternalEventDragHelperConfig } from "./drag-helpers/external-event-drag-helper";
import { ResourceDragHelper } from "./drag-helpers/resource-drag-helper";
import { AzureMapCustomElement } from "./azure-map";
import { AzureMapController } from "./azure-map-controller";
import { SODataHandler } from "./data-handlers/so-data-handler";
import { AppointmentsDataHandler } from "./data-handlers/appointments-data-handler";
import { SearchAppointmentsDataHandler } from "./data-handlers/search-appointments-data-handler";
import { ISchedulerApiClient, PeriodKind  } from "./scheduler-types";
import { SchedulerApiClient } from "./scheduler-api-client";
import { AppointmentEmployeeModel, AppointmentFilterModel, DevicesFilterModel,
	EmployeeModel, LastUpdatedAppointmentFilterModel,
	SelectedAppointmentModel, SelectedSOModel, ServiceOrderModel, UpdatedAppointmentModel, DatesFilterModel,
	SOFilterModel, InitDataModel, DraggableEntity, SearchAppointmentModel, RoomModel, MainAppointmentFilterModel, SetupModel,
	SuitableEmployeeModel, SchedulerTrackingHistory,
	AppointmentEntity
} from "./view-models";
import { TimeConverter } from "./data-handlers/time-converter";
import { TestHelperHTMLElement, testHelperScrollToXPercent, testHelperSimulateDragAndDrop } from "./test-helpers";
import { PopupHandler } from "./popup-handler";
import { TileRenderer } from "./tile-renderer";



@localizable
export class Captions {
	static ServiceOrdersDetails = "Details";
	static Employees = "Employees";
	static Staff = "Staff";
	static DefaultStaff = "Default Staff";
	static Unassigned = "Unassigned";
	static Vendor = "Vendor";
	static Employee = "Employee";

	static AppointmentDocDesc = "Appointment Description";
	static AppointmentStatus = "Appointment Status";

	static ServiceOrderRefNbr = "Service Order Nbr.";
	static ServiceOrderDocDesc = "Service Order Description";
	static ServiceOrderStatus = "Service Order Status";
	static ServiceType = "Service Type";

	static EmployeeDepartment = "Employee Department";
}

@localizable
export class Labels {
	// static SwitchToVertical = "Switch to Vertical";
	static NonBusinessHours = "Nonworking Hours";
	static Appointment = "Appointment";
	static ServiceOrder = "Service Order";
	static AddAppointment = "Add Appointment";
	static NewAppointment = "New Appointment";
	static Schedule = "Schedule";
	static PutOnHold = "Put on Hold";
	static DeleteAppointment = "Delete";
	static CloneAppointment = "Clone...";
	static CreateAppointment = "Create Appointment...";
	static Unassign = "Unassign";
	static ViewAppointment = "View...";
	static Confirm = "Confirm";
	static Unconfirm = "Unconfirm";
	static ValidateByDispatcher = "Validate by Dispatcher";
	static ClearValidation = "Clear Validation";
	static PrevPeriod = "Previous";
	static NextPeriod = "Next";
	static DiscardChanges = "Discard Changes";
}

@localizable
export class Messages {
	static ErrorLoadingData = "An error occurred while loading data from the server.";
	static NoWorkingCalendarSet = "No working calendar has been defined for the displayed employees.";
}

@localizable
export class Formats {
	static TimeAxisDay = dateFormatInfo().longDate;
	static TimeAxisHour = dateFormatInfo().shortTime;
	static DayMonth = "MMMM d";
	static OnlyMonth = "MMMM";
	static DateRangeSameMonthP1 = "MMMM d";
	static DateRangeSameMonthP2 = "d ";
	static DateRangeDiffMonthP1 = "MMMM d";
	static DateRangeDiffMonthP2 = "MMMM d";
	static ShortDate = dateFormatInfo().shortDate;
}

@graphInfo({ graphType: "PX.Objects.FS.SchedulerMaint", primaryView: "MainAppointmentFilter", hideFilesIndicator: true, hideNotesIndicator: true, showActivitiesIndicator: true, showUDFIndicator: true })
@autoinject
export class FS300300 extends PXScreen implements IPreferencesTarget {

	readonly horizontalSnapDistance = 15; 	// eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly verticalSnapDistance = 30; 	// eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly prefid = "main_prefs";
	readonly serviceOrdersBrickLeftID = "serviceOrdersBrickLeftID";
	readonly serviceOrdersBrickRightID = "serviceOrdersBrickRightID";
	readonly searchAppointmentBrickLeftID = "searchAppointmentBrickLeftID";
	readonly searchAppointmentBrickRightID = "searchAppointmentBrickRightID";
	readonly appointmentsBrickLeftID = "appointmentsBrickLeftID";
	readonly appointmentsBrickRightID = "appointmentsBrickRightID";
	readonly allRecordsFilter = "00000000-0000-0000-0000-000000000000";
	readonly newAppointmentId = "new";

	private orientation: "horizontal" | "vertical" = "horizontal";
	private get isPeriodDay() { return this.DatesFilter?.periodKindValue === PeriodKind.Day; }
	private get isPeriodWeek() { return this.DatesFilter?.periodKindValue === PeriodKind.Week; }
	private get isPeriodMonth() { return this.DatesFilter?.periodKindValue === PeriodKind.Month; }

	private topBarConfig =  {
		// TODO: uncomment when/if we reintroduce orientation switching
		// rotate: { index: 1,
		// 	config: { ...NewMenuButton("rotate"),
		// 		commandName: "rotate",
		// 		images: { normal: "svg:main@changeOrientation" },
		//		isSystem: false, toggleMode: false, showInToolbar: true, target: this.element, pushed: false,
		// 		toolTip: Labels.SwitchToVertical,
		// 		cssClass: this.getCssClassForOrientation() // eslint-disable-line @typescript-eslint/no-invalid-this
		// 	}
		// },
		add: { index: 0,
			config: { ...NewMenuButton("add"),
				commandName: "add",
				images: { normal: "svg:main@plus" },
				toolTip: Labels.AddAppointment,
				isSystem: false, toggleMode: false, showInToolbar: true, target: this.element, pushed: false,
				hidden: true,
			}
		},
		hours: { index: 1,
			config: { ...NewMenuButton("hours"),
				commandName: "hours",
				images: { normal: "svg:main@aroundTheClock" },
				toolTip: Labels.NonBusinessHours,
				isSystem: false, toggleMode: true, showInToolbar: true, target: this.element, pushed: false,
			}
		},
	};

	private rightToolBarConfig = {
		id: "rightToolBarConfigID",
		items: {
			prevPeriod: {
				config: {
					commandName: "prevPeriod",
					images: { normal: "main@PagePrev" },
					toolTip: Labels.PrevPeriod,
				}
			},
			nextPeriod: {
				config: {
					commandName: "nextPeriod",
					images: { normal: "main@PageNext" },
					toolTip: Labels.NextPeriod,
				}
			},
			periodDay: {
				config: {
					text: "Day", commandName: "periodDay", cssClass: "qp-sch-time-period qp-sch-period-day",
				}
			},
			periodWeek: {
				config: {
					text: "Week", commandName: "periodWeek", cssClass: "qp-sch-time-period qp-sch-period-week",
				}
			},
			periodMonth: {
				config: {
					text: "Month", commandName: "periodMonth", cssClass: "qp-sch-time-period qp-sch-period-month",
				}
			},
		}
	};

	Captions = Captions;
	Labels = Labels;

	ServiceOrders = createCollection(
		ServiceOrderModel,
		{
			pageSize: 50,
			adjustPageSize: false,
			pagerMode: GridPagerMode.InfiniteScroll,
			syncPosition: false,
			allowDelete: false,
			allowInsert: false,
			fastFilterByAllFields: false,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
			columnsConfig: [
				{ field: "DocDesc", caption: Captions.ServiceOrderDocDesc },
				{ field: "InventoryItem__InventoryID", caption: Captions.ServiceType },
				{ field: "RefNbr", caption: Captions.ServiceOrderRefNbr },
				{ field: "Status", caption: Captions.ServiceOrderStatus },
			]
		}
	);

	SchedulerGridFilters = Array<GridFilter>();

	SearchAppointments = createCollection(
		SearchAppointmentModel,
		{
			pageSize: 50,
			adjustPageSize: false,
			pagerMode: GridPagerMode.InfiniteScroll,
			syncPosition: false,
			allowDelete: false,
			allowInsert: false,
			fastFilterByAllFields: false,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
			columnsConfig: [
				{ field: "DocDesc", caption: Captions.AppointmentDocDesc },
				{ field: "EPEmployee__DepartmentID", caption: Captions.EmployeeDepartment },
				{ field: "InventoryItem__InventoryID", caption: Captions.ServiceType },
				{ field: "SchedulerServiceOrder__DocDesc", caption: Captions.ServiceOrderDocDesc },
				{ field: "SchedulerServiceOrder__RefNbr", caption: Captions.ServiceOrderRefNbr },
				{ field: "SchedulerServiceOrder__Status", caption: Captions.ServiceOrderStatus },
				{ field: "Status", caption: Captions.AppointmentStatus },
			]
		}
	);

	DatesFilter = createSingle(DatesFilterModel);

	AppointmentsAllStaff = createCollection(
		AppointmentEmployeeModel,
		{
			pageSize: 2000,
			adjustPageSize: false,
			syncPosition: false,
			allowDelete: false,
			allowInsert: true,
			fastFilterByAllFields: false,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
			topBarItems: this.topBarConfig,
			columnsConfig: [
				{ field: "EPEmployee__DepartmentID", caption: Captions.EmployeeDepartment },
				{ field: "InventoryItem__InventoryID", caption: Captions.ServiceType },
				{ field: "SchedulerAppointment__DocDesc", caption: Captions.AppointmentDocDesc },
				{ field: "SchedulerServiceOrder__DocDesc", caption: Captions.ServiceOrderDocDesc },
				{ field: "SchedulerServiceOrder__RefNbr", caption: Captions.ServiceOrderRefNbr },
				{ field: "SchedulerServiceOrder__Status", caption: Captions.ServiceOrderStatus },
				{ field: "Status", caption: Captions.AppointmentStatus },
			]
		}
	);

	LastUpdatedAppointment = createCollection(
		AppointmentEmployeeModel,
		{
			pageSize: 100,
			adjustPageSize: false,
			syncPosition: false,
			allowDelete: false,
			allowInsert: false,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
		}
	);

	SuitableEmployees = createCollection(
		SuitableEmployeeModel,
		{
			pageSize: 1000,
			adjustPageSize: false,
			syncPosition: false,
			allowDelete: false,
			allowInsert: false,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
		}
	);

	EmployeeDevices = createCollection(
		SchedulerTrackingHistory,
		{
			pageSize: 1000,
			adjustPageSize: false,
			syncPosition: false,
			allowDelete: false,
			allowInsert: false,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
		}
	);

	AppointmentFilter = createSingle(AppointmentFilterModel);
	DevicesFilter = createSingle(DevicesFilterModel);
	SOFilter = createSingle(SOFilterModel);
	LastUpdatedAppointmentFilter = createSingle(LastUpdatedAppointmentFilterModel);
	InitData = createSingle(InitDataModel);
	Setup = createSingle(SetupModel);

	SelectedAppointment = createSingle(SelectedAppointmentModel);
	SelectedSO = createSingle(SelectedSOModel);

	SelectedAppointmentEmployees = createCollection(
		EmployeeModel, {
			pageSize: 100,
			adjustPageSize: false,
			syncPosition: true,
			allowDelete: false,
			allowInsert: false,
			showFilterBar: GridFilterBarVisibility.False,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
			pagerMode: GridPagerMode.InfiniteScroll,
		}
	);

	SelectedSOEmployees = createCollection(
		EmployeeModel, {
			pageSize: 100,
			adjustPageSize: false,
			syncPosition: true,
			allowDelete: false,
			allowInsert: false,
			showFilterBar: GridFilterBarVisibility.False,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
			pagerMode: GridPagerMode.InfiniteScroll,
		}
	);

	EditedAppointmentEmployees = createCollection(
		EmployeeModel, {
			pageSize: 100,
			adjustPageSize: false,
			syncPosition: true,
			allowDelete: false,
			allowInsert: false,
			showFilterBar: GridFilterBarVisibility.False,
			pagerMode: GridPagerMode.InfiniteScroll,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
		}
	);

	AllRooms = createCollection(
		RoomModel, {
			pageSize: 1,
			adjustPageSize: false,
			syncPosition: true,
			allowDelete: false,
			allowInsert: false,
			showFilterBar: GridFilterBarVisibility.False,
			pagerMode: GridPagerMode.InfiniteScroll,
			showNoteFiles: GridNoteFilesShowMode.Suppress,
		}
	);

	MainAppointmentFilter = createSingle(MainAppointmentFilterModel);
	UpdatedAppointment = createSingle(UpdatedAppointmentModel);

	@bindable schedulerGrid!: QpGridCustomElement;
	@bindable lastUpdatedGrid!: QpGridCustomElement;
	@bindable suitableEmployeesGrid!: QpGridCustomElement;
	@bindable serviceOrdersGrid!: QpGridCustomElement;
	@bindable searchAppointmentsGrid!: QpGridCustomElement;
	@bindable schedulerTabBar!: QpTabbarCustomElement;
	@bindable mainTabBar!: QpTabbarCustomElement;
	@bindable mainMap!: AzureMapCustomElement;
	@bindable mapSplitter!: QpSplitterCustomElement;
	@bindable iconDatePicker!: QpHyperIconCustomElement;

	@observable({ changeHandler: "datePicked" }) pickerDate;
	@observable({ changeHandler: "tabServiceOrdersVisibleChanged"}) tabServiceOrdersVisible;
	@observable({ changeHandler: "tabSearchAppointmentsVisibleChanged"}) tabSearchAppointmentsVisible;

	private preferencesBase = new FS300300_Preferences();
	private get preferences() { return this.preferencesBase?.preferences as PreferenceData; }
	protected get splitterPreferences() {
		return (this.orientation === "horizontal") ? this.preferences?.horizontalModeSplitter : this.preferences?.verticalModeSplitter;
	}
	private actualizingPreferences = false;
	private backlogEventResizing = false;
	private initializationDataProcessed = false;
	private calendarRedrawSuppressed = false;
	private datePickerReentryPreventionOn = false;
	private updatingAppointmentsFromCode = false;

	private apiClient: ISchedulerApiClient;
	private backlogControl: SchedulerPro | null;
	private schedulerControl: SchedulerPro | null;
	private serviceOrdersControl: Grid | null;
	private searchAppointmentsControl: Grid | null;
	private lockedSubGridBacklog: SubGrid | null;
	private normalSubGridBacklog: SubGrid | null;
	private lockedSubGrid: SubGrid | null;
	private normalSubGrid: SubGrid | null;
	private preservedSelectedRows: Model[] | number[];

	private saveSplitterPositionTimer: ReturnType<typeof setTimeout>;
	private updateMapTimer: ReturnType<typeof setTimeout>;
	private updateDevicesTimeout: ReturnType<typeof setTimeout>;
	private updateDevicesTimer: ReturnType<typeof setInterval>;
	private serviceOrderDragHelper: ExternalEventDragHelper | null;
	private sODetailsDragHelper: ExternalEventDragHelper | null;
	private appointmentsWithNoEmployeeDragHelper: ExternalEventDragHelper | null;
	private resourceDragHelper: ResourceDragHelper | null;
	private prevHoveredResource: SchedulerResourceModel;

	private schedulerFilter: HTMLElement;
	private prevPeriodButton: HTMLElement;
	private datePickerMain: HTMLElement;
	private serviceOrdersFastFilter!: HTMLInputElement;
	private searchAppointmentsFastFilter!: HTMLInputElement;
	private appointmentsAllStaffGridElement: HTMLElement;
	private calendarContainer: HTMLElement;
	private schedulerMainContainer: HTMLElement;

	private domEvents: ElementEvents;

	private dragCreateResourceIDsSet: Set<string>;
	private aureliaEnhancedElements = new Set<HTMLElement>();

	private appointments = new AppointmentsDataHandler();
	private serviceOrders = new SODataHandler();
	private searchAppointments = new SearchAppointmentsDataHandler();
	private devices: SchedulerTrackingHistory[] = [];
	private mapController: AzureMapController;

	private popups = new PopupHandler({
		element: this.element,
		appointments: this.appointments,
		searchAppointments: this.searchAppointments,
		getScreenService: () => this.screenService,
		bindingEngine: this.bindingEngine,
		getScheduler: () => this.schedulerControl,
		getBacklog: () => this.backlogControl,
		MainAppointmentFilter: this.MainAppointmentFilter,
		AppointmentFilter: this.AppointmentFilter,
		SelectedAppointment: this.SelectedAppointment,
		SelectedAppointmentEmployees: this.SelectedAppointmentEmployees,
		SOFilter: this.SOFilter,
	});

	private renderer = new TileRenderer({
		appointments: this.appointments,
		searchAppointments: this.searchAppointments,
		serviceOrders: this.serviceOrders,
		getCurrentAppointmentId: () => this.currentAppointment?.appointmentID,
		getCurrentServiceOrderId: () => this.currentServiceOrder?.orderId,
		getServiceOrdersFastFilter: () => this.serviceOrdersFastFilter,
		getSearchAppointmentsFastFilter: () => this.searchAppointmentsFastFilter,
	});

	private get graphName() { return this.screenService.getGraphInfo()?.graphType; }

	private workingHoursSignature: string;

	private currentEntity: DraggableEntity = null;
	private get currentAppointment() { return !(this.currentEntity instanceof ServiceOrderModel) ? this.currentEntity as AppointmentEntity : null; }
	private get currentServiceOrder() { return (this.currentEntity instanceof ServiceOrderModel) ? this.currentEntity as ServiceOrderModel : null; }
	private ignoreNextSchedulerGridUpdate = false;
	private subscribedToAppointmentsBrickPreferences = false;
	private subscribedToSearchAppointmentsBrickPreferences = false;
	private subscribedToSOBrickPreferences = false;
	private alreadyDisplayedWorkingCalendarWarning = false;
	private dragAndDropInProgress = false;
	private suitableEmployeesRequestedForDND = false;

	private startDatePickerConfig = {
		id: "scheduler_date", class: "dropDown auto-size",
		allowCustomItems: false,
		// timeMode: this.col.timeMode
	};

	private mainSplitterConfig: ISplitterConfig = {
		split: "width",
		initialSplit: "300px",
		initialState: "normal",
		style: "height: 100%",
		fading: true,
	};
	private mapSplitterConfig: ISplitterConfig = {
		split: "width",
		initialSplit: "60%",
		initialState: "collapsed-second",
		disableCollapseFirst: true,
		style: "height: 100%",
		fading: true,
	};

	private popupAppointmentEmployeesConfig = {
		showNoteFiles: GridNoteFilesShowMode.Suppress,
	};
	private popupNewAppointmentEmployeesConfig = {
		showNoteFiles: GridNoteFilesShowMode.Suppress,
	};
	private popupSOEmployeesConfig = {
		showNoteFiles: GridNoteFilesShowMode.Suppress,
	};

	CloneAppointment: PXActionState;
	DeleteAppointment: PXActionState;
	UpdateAppointment: PXActionState;
	ScheduleAppointment: PXActionState;

	constructor(
		public element: Element,
		gridApiClient: SchedulerApiClient,
		private preferencesService: PreferencesService,
		private bindingEngine: BindingEngine,
		private templatingEngine: TemplatingEngine,
		private au: Aurelia,
	) {
		super();
		this.apiClient = gridApiClient;

		const curDate = new Date().clearHoursUTC();
		this.pickerDate = curDate;
	}

	async attached() {
		this.preferencesService.subscribe(this.prefid, this);

		await super.attached();

		const filterBoxInput = document.querySelector(".qp-sch-grid-container-inner qp-filter-box input") as HTMLInputElement;
		filterBoxInput.placeholder = Captions.Staff;

		this.attachSOPane();
		this.attachCalendar();
		this.attachDragHelpers();
		this.attachToolbarHandling();

		await this.ReleaseUIControl(); // allow engine to position datepicker control before we update it
		this.onDatesFilterUpdated();
		this.attachMap();

		this.datePickerMain = document.getElementById("scheduler_date");
		this.serviceOrdersFastFilter = document.getElementById("serviceOrderGridID_fb_text") as HTMLInputElement;
		this.searchAppointmentsFastFilter = document.getElementById("searchAppointmentsGridID_fb_text") as HTMLInputElement;

		const testHelper = this.calendarContainer as TestHelperHTMLElement;
		testHelper.scrollToXPercent = testHelperScrollToXPercent;
		testHelper.simulateDragAndDrop = testHelperSimulateDragAndDrop;
		testHelper.schedulerControl = this.schedulerControl;

		this.popups.initialize({
			cloneEnabled: this.CloneEnabled(),
			createEnabled: this.CreateEnabled(),
			updateEnabled: this.UpdateEnabled(),
			deleteEnabled: this.DeleteEnabled(),
		});

		this.topBarConfig.add.config.hidden = !this.CreateEnabled();
		this.schedulerGrid.setTopBarButtonsState();
	}

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	protected async onAfterInitialize() {
		await this.setupTabs();
		this.popups.afterInitialize();
	}

	detached() {
		super.detached();
		this.detachCalendar();
	}

	public applyPreferences(prefs: IPreferencesPair<FS300300_Preferences>) {
		this.preferencesBase = new FS300300_Preferences(prefs.user?.preferences);
		this.actualizePreferences();
	}

	public applySOBrickLeftPreferences(prefs: IPreferencesPair<FieldsetPreferences>) {
		this.renderer.serviceOrdersBrickLeft.applyPreferences(prefs);
		this.updateSOPane(false);
	}

	public applySOBrickRightPreferences(prefs: IPreferencesPair<FieldsetPreferences>) {
		this.renderer.serviceOrdersBrickRight.applyPreferences(prefs);
		this.updateSOPane(false);
	}

	public applySearchAppointmentsBrickLeftPreferences(prefs: IPreferencesPair<FieldsetPreferences>) {
		this.renderer.searchAppointmentBrickLeft.applyPreferences(prefs);
		this.updateSearchAppointmentsPane(false);
	}

	public applySearchAppointmentsBrickRightPreferences(prefs: IPreferencesPair<FieldsetPreferences>) {
		this.renderer.searchAppointmentBrickRight.applyPreferences(prefs);
		this.updateSearchAppointmentsPane(false);
	}

	public applyAppointmentsBrickLeftPreferences(prefs: IPreferencesPair<FieldsetPreferences>) {
		this.renderer.appointmentsBrickLeft.applyPreferences(prefs);
		if (this.schedulerControl) {
			this.updateCalendar();
		}
	}

	public applyAppointmentsBrickRightPreferences(prefs: IPreferencesPair<FieldsetPreferences>) {
		this.renderer.appointmentsBrickRight.applyPreferences(prefs);
		if (this.schedulerControl) {
			this.updateCalendar();
		}
	}

	protected actualizePreferences() {
		if (!this.lockedSubGrid) return;
		this.actualizingPreferences = true;
		try {
			const splitterPreferences = (this.orientation === "horizontal")
				? this.preferences?.horizontalModeSplitter : this.preferences?.verticalModeSplitter;

			this.lockedSubGridBacklog.collapsed = splitterPreferences?.state === "collapsed-first";
			this.normalSubGridBacklog.collapsed = splitterPreferences?.state === "collapsed-second";
			this.lockedSubGridBacklog.width = splitterPreferences?.position ?? this.lockedSubGrid.width;
			this.lockedSubGrid.collapsed = splitterPreferences?.state === "collapsed-first";
			this.normalSubGrid.collapsed = splitterPreferences?.state === "collapsed-second";
			this.lockedSubGrid.width = splitterPreferences?.position ?? this.lockedSubGrid.width;
			if (splitterPreferences?.state === "collapsed-first") {
				this.lockedSubGridBacklog.width = undefined;
				this.lockedSubGridBacklog.flex = undefined;
				this.lockedSubGrid.width = undefined;
				this.lockedSubGrid.flex = undefined;
			}
			if (splitterPreferences?.state === "collapsed-second") {
				this.lockedSubGrid.width = undefined;
				this.lockedSubGrid.flex = "1 1 0%";
			}

			if (this.preferences?.periodKind === PeriodKind.Week) {
				this.setWeekPeriod();
			}
			if (this.preferences?.periodKind === PeriodKind.Month) {
				this.setMonthPeriod();
			}
		} finally {
			this.actualizingPreferences = false;
		}
	}

	protected async savePreferences() {
		if (this.actualizingPreferences) return;
		console.log(`savePreferences: ${this.preferences.toString()}`);
		await this.preferencesService.saveUserPreferences(getScreenID(), this.prefid, this.preferencesBase);
	}

	protected async setupTabs() {
		await this.setSchedulerTabs();
	}

	protected attachToolbarHandling()
	{
		this.domEvents = new ElementEvents(this.element);
		this.domEvents.subscribe("buttonpressed", (e: CustomEvent) => this.processToolBarClick(e));
		this.schedulerFilter = document.querySelector(".qp-sch-grid-container-inner .grid-right-toolbar-cont");
		this.prevPeriodButton = document.querySelector("#rightToolBarConfigIDprevPeriod");
	}

	protected async attachSOPane() {
		const schedulerSOContainer = document.getElementById("schedulerSOContainer");
		const data = this.serviceOrders.createData();

		const oldServiceOrdersControl = this.serviceOrdersControl;
		this.serviceOrdersControl = new Grid({
			appendTo: schedulerSOContainer,
			features: {
				cellEdit: false,
				cellMenu: false,
			},
			columns: [{
				editable: false,
				text: "serviceOrder",
				field: "serviceOrder",
				flex: 1,
				cellCls: "",
				autoHeight: true,
				htmlEncode: false,
				renderer: this.renderer.serviceOrderRenderer.bind(this.renderer),
			}],
			data: data,
			onBeforeSelectionChange: () => false,
			onCellClick: this.onSOGridCellClick.bind(this),
			onScroll: this.onServiceOrdersScroll.bind(this),
			onCellMouseOver: this.onSOGridCellMouseOver.bind(this),
		});

		oldServiceOrdersControl?.destroy();
	}

	protected detachSOPane() {
		if (this.serviceOrdersControl) {
			this.serviceOrdersControl.destroy();
			this.serviceOrdersControl = null;
		}
	}


	protected async updateSOPane(fullUpdate = false) {
		if (!this.serviceOrdersControl || fullUpdate) {
			this.detachSOPane();
			this.attachSOPane();
		}
		else {
			const store = this.serviceOrdersControl?.storeScroll();
			this.serviceOrdersControl.data = this.serviceOrders.createData();
			this.serviceOrdersControl?.restoreScroll(store);
		}
	}

	public getCaptionText() { return ""; }

	protected async tabServiceOrdersVisibleChanged() {
		if (!this.tabServiceOrdersVisible) return;
		await this.ReleaseUIControl(); // allow the engine to render tab first
		this.updateSOPane(false);
	}

	protected async attachSearchAppointmentsPane() {
		const searchAppointmentContainer = document.getElementById("searchAppointmentContainer");
		const data = this.searchAppointments.createData();

		const oldSearchAppointmentsControl = this.searchAppointmentsControl;
		this.searchAppointmentsControl = new Grid({
			appendTo: searchAppointmentContainer,
			features: {
				cellEdit: false,
				cellMenu: {
					items: this.getMenuItems(),
					processItems: this.processMenuItems.bind(this),
				},

			},
			columns: [{
				editable: false,
				text: "searchAppointment",
				field: "searchAppointment",
				flex: 1,
				cellCls: "",
				autoHeight: true,
				htmlEncode: false,
				renderer: this.renderer.searchAppointmentRenderer.bind(this.renderer),
			}],
			data: data,
			onBeforeSelectionChange: () => false,
			onCellClick: this.onSearchAppointmentGridCellClick.bind(this),
			onScroll: this.onSearchAppointmentsScroll.bind(this),
			onCellMouseOver: this.onSearchAppointmentsMouseOver.bind(this),
		});

		oldSearchAppointmentsControl?.destroy();
	}

	protected detachSearchAppointmentsPane() {
		if (this.searchAppointmentsControl) {
			this.searchAppointmentsControl.destroy();
			this.searchAppointmentsControl = null;
		}
	}


	protected async updateSearchAppointmentsPane(fullUpdate = false) {
		if (!this.searchAppointmentsControl || fullUpdate) {
			this.detachSearchAppointmentsPane();
			this.attachSearchAppointmentsPane();
		}
		else {
			const store = this.searchAppointmentsControl?.storeScroll();
			this.searchAppointmentsControl.data = this.searchAppointments.createData();
			this.searchAppointmentsControl?.restoreScroll(store);
		}
	}

	protected async tabSearchAppointmentsVisibleChanged() {
		if (!this.tabSearchAppointmentsVisible) return;
		await this.ReleaseUIControl(); // allow the engine to render tab first
		this.updateSearchAppointmentsPane(false);
	}

	protected async attachCalendar() {
		if (this.schedulerControl) return;

		const [periodStartDate, periodEndDate] = AppointmentsDataHandler.getPeriodStartEndDates(this.DatesFilter);
		if (!periodStartDate) return; // still waiting for the date from the server

		const updateEnabled = this.UpdateEnabled();
		const createEnabled = this.CreateEnabled();
		const [backlogProject, mainProject] = this.appointments.createProjects(this.DatesFilter, this.currentEntity);
		if (!mainProject.resources?.length) return;

		this.workingHoursSignature = this.appointments.getWorkingHoursSignature();

		this.handleNoWorkingCalendarWarning();

		const oldBacklogControl = this.backlogControl;
		this.backlogControl = new SchedulerPro({
			appendTo: this.schedulerMainContainer,
			startDate: periodStartDate,
			endDate: periodEndDate,
			snap: true,
			createEventOnDblClick: false,
			onEventDblClick: (event) => false,
			cls: "qp-sch-backlog",
			autoHeight: true,
			rowHeight: this.renderer.getAppointmentBrickHeight(),
			barMargin: 5,
			resourceMargin: 2,
			columns: [{
				field: "name",
				text: Captions.Staff,
				flex: 1,
				htmlEncode: false,
				renderer: this.renderer.resourceHeaderRenderer.bind(this.renderer),
			}],
			viewPreset: this.getViewPreset(),
			timeAxis: { continuous: false, },
			onCellClick: this.onSchedulerCellClick.bind(this),
			onEventClick: this.onEventClick.bind(this),
			onEventMouseEnter: this.onEventMouseEnter.bind(this),
			onBeforeEventResize: () => { this.backlogEventResizing = true; },
			onEventResizeEnd: () => { this.backlogEventResizing = false; },
			onBeforeEventResizeFinalize: this.onBeforeEventResizeFinalize.bind(this),
			onBeforeSelectionChange: () => false,
			onTimeAxisHeaderClick: this.onTimeAxisHeaderClick.bind(this),
			onDragCreateEnd: this.onDragCreateEnd.bind(this),
			onDragCreateStart: this.onDragCreateStart.bind(this),
			onEventDragStart: this.onEventDragStart.bind(this),
			onEventDrag: this.onEventDrag.bind(this),
			onEventDragReset: this.onEventDragReset.bind(this),
			project: backlogProject,
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
				resourceTimeRanges: true,
				dependencies: false,
				eventTooltip: false,
				eventDrag: false,
				eventResize: {
					disabled: !updateEnabled,
				},
				eventDragCreate: {
					disabled: !createEnabled,
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
			},
			eventRenderer: this.renderer.unassignedRenderer.bind(this.renderer),
		});

		const oldSchedulerControl = this.schedulerControl;
		this.schedulerControl = new SchedulerPro({
			appendTo: this.schedulerMainContainer,
			partner: this.backlogControl,
			hideHeaders: true,
			mode: this.orientation,
			enableEventAnimations: false,
			createEventOnDblClick: false,
			onEventDblClick: (event) => false,
			snap: true,
			cls: "qp-sch-calendar",
			project: mainProject,
			startDate: periodStartDate,
			endDate: periodEndDate,
			maxTimeAxisUnit: "hour",
			columns: this.backlogControl.columns,
			viewPreset: this.getViewPreset(),
			onBeforeEventResizeFinalize: this.onBeforeEventResizeFinalize.bind(this),
			onBeforeEventDropFinalize: this.onBeforeEventDropFinalize.bind(this),
			onCellClick: this.onSchedulerCellClick.bind(this),
			onEventClick: this.onEventClick.bind(this),
			onEventMouseEnter: this.onEventMouseEnter.bind(this),
			onSelectionChange: this.onSelectionChange.bind(this),
			onSubGridCollapse: this.onSubGridCollapse.bind(this),
			onSubGridExpand: this.onSubGridExpand.bind(this),
			onBeforeCellEditStart: () => false,
			onGridRowBeforeDragStart: () => false,
			onVisibleDateRangeChange: this.onVisibleDateRangeChange.bind(this),
			onDragCreateEnd: this.onDragCreateEnd.bind(this),
			onDragCreateStart: this.onDragCreateStart.bind(this),
			onEventDragStart: this.onEventDragStart.bind(this),
			onEventDrag: this.onEventDrag.bind(this),
			onEventDragReset: this.onEventDragReset.bind(this),
			eventRenderer: this.renderer.assignmentRenderer.bind(this.renderer),
			selectionMode: {
				deselectFilteredOutRecords: true,
			},
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
				resourceTimeRanges: true,
				dependencies: false,
				eventTooltip: false,
				eventDrag: {
					disabled: !updateEnabled,
					snapToPosition: this.snapToPosition.bind(this),
				},
				eventResize: {
					disabled: !updateEnabled,
				},
				eventDragCreate: {
					disabled: !createEnabled,
					allowResizeToZero: false,
					showExactResizePosition: true,
					showTooltip: true,
				},
				scheduleTooltip: false,
				timeRanges: {
					showCurrentTimeLine: false,
					showHeaderElements: false,
					enableResizing: false
				}
			},
			rowHeight: this.renderer.getAppointmentBrickHeight(),
			barMargin: 5,
			resourceMargin: 2,
			useInitialAnimation: false,
		});

		oldSchedulerControl?.destroy();
		oldBacklogControl?.destroy();

		// Hide backlog if there are no unassigned appointments -- unused for now
		if (mainProject.resources.filter(r => r.id === AppointmentEmployeeModel.unassignedId).length === 0) {
			// this.backlogControl.contentElement.parentElement.style.display = 'none";
			// this.backlogControl.element.style.minHeight = '0px";
		}

		this.lockedSubGridBacklog = this.backlogControl.getSubGrid(`locked`);
		this.normalSubGridBacklog = this.backlogControl.getSubGrid(`normal`);
		this.lockedSubGrid = this.schedulerControl.getSubGrid(`locked`);
		this.normalSubGrid = this.schedulerControl.getSubGrid(`normal`);

		this.lockedSubGrid.onResize = this.onLockedSubGridResize.bind(this);

		this.attachMouseEventHandlers();
		this.setDatePickerText();
		this.restoreSelection();
		this.applyHoursFilter();
		this.actualizePreferences();
	}

	protected getViewPreset() : Partial<ViewPresetConfig> {
		return {
			tickWidth: 40,
			displayDateFormat: this.toBryntumFormat(`${Formats.ShortDate} ${Formats.TimeAxisHour}`),
			shiftIncrement: 1,
			shiftUnit: "day",
			defaultSpan: 24,
			timeResolution: { unit: "minute", increment: Number(this.Setup.AppResizePrecision.value) },
			headers: [
				{ unit: "day", dateFormat: this.toBryntumFormat(Formats.TimeAxisDay) },
				{ unit: "hour", dateFormat: this.toTimeAxisHourFormat(Formats.TimeAxisHour) }
			]
		};
	}

	private toBryntumFormat(dateTime: string) {
		return dateTime
			.replace(/y/g, "Y") // Year
			.replace(/tt/gi, "A") // AM/PM
			.replace(/t/gi, "A") // A/P -> AM/PM
			.replace(/K/g, "Z") // Time zone
			.replace(/dddd/g, "_4week_") // Day of the week and day of the month
			.replace(/ddd/g, "_3week_")
			.replace(/d/g, "D")
			.replace(/_4week_/g, "dddd")
			.replace(/_3week_/g, "ddd");
	}

	private toTimeAxisHourFormat(timeAxisHour: string) {
		if (/t/i.test(timeAxisHour)) {
			// For standart time show only hour
			const hh = timeAxisHour.match(/hh|h/i);
			return !hh
				? "h A"
				: `${hh[0]} A`;
		}
		return this.toBryntumFormat(timeAxisHour);
	}

	protected restoreSelection() {
		if (this.preservedSelectedRows?.length > 0) {
			const filteredPreservedSelectedRows = (this.preservedSelectedRows as Model[])
				.filter(row => this.appointments.resources.has(row.id.toString()));
			this.schedulerControl.selectRows(filteredPreservedSelectedRows, null);
		}
		if (this.schedulerControl.selectedRows.length === 0 && this.appointments.resources.size > 0) {
			this.schedulerControl.selectRow(this.appointments.resources.values().next().value);
		}
	}

	protected handleNoWorkingCalendarWarning() {
		const warningNoCalendarNeeded = this.appointments.resources.size > 0 && !this.appointments.hasWorkingCalendarSet();
		if (!this.alreadyDisplayedWorkingCalendarWarning && warningNoCalendarNeeded) {
			showInformer(Messages.NoWorkingCalendarSet, "warning");
			this.alreadyDisplayedWorkingCalendarWarning = true;
		}
		if (!warningNoCalendarNeeded) {
			this.alreadyDisplayedWorkingCalendarWarning = false;
		}
	}

	protected attachMap() {
		this.mainMap.initialize(this.InitData);
	}

	protected detachCalendar() {
		if (this.schedulerControl) {
			this.schedulerControl.destroy();
			this.schedulerControl = null;
		}
		if (this.backlogControl) {
			this.backlogControl.destroy();
			this.backlogControl = null;
		}
	}

	protected async updateCalendar() {
		if (!this.schedulerControl) {
			this.attachCalendar();
		}
		else {
			const [newPeriodStartDate, newPeriodEndDate] = AppointmentsDataHandler.getPeriodStartEndDates(this.DatesFilter);
			const [backlogProject, mainProject] = this.appointments.createProjects(this.DatesFilter, this.currentEntity, this.calendarRedrawSuppressed);
			const newWorkingHoursSignature = this.appointments.getWorkingHoursSignature();

			const datesChanged = this.backlogControl.startDate !== newPeriodStartDate || this.backlogControl.endDate !== newPeriodEndDate;
			const workingHoursChanged = this.workingHoursSignature !== newWorkingHoursSignature;
			this.workingHoursSignature = newWorkingHoursSignature;

			if (this.calendarRedrawSuppressed) return;

			this.schedulerControl.suspendEvents();
			this.backlogControl.suspendEvents();
			this.schedulerControl.project = mainProject;
			this.schedulerControl.rowHeight = this.renderer.getAppointmentBrickHeight();

			this.backlogControl.project = backlogProject;
			this.backlogControl.rowHeight = this.renderer.getAppointmentBrickHeight();

			if (datesChanged || workingHoursChanged) {
				this.backlogControl.setTimeSpan(newPeriodStartDate, newPeriodEndDate);
			}

			this.schedulerControl.renderContents();

			this.backlogControl.resumeEvents();
			this.schedulerControl.resumeEvents();
			await this.ReleaseUIControl();

			this.hideOldGeneration();
		}

		if (this.appointments.hasData()) {
			await this.processInitializationData();
		}
	}

	protected hideOldGeneration() {
		// Fix for the Bryntum issue with some from the old generation of appointments still being visible after D&D
		const oldGeneration = document.querySelectorAll(`.sch-generation-${this.appointments.getGeneration() - 1}`);
		oldGeneration.forEach(gen => gen.classList.add("hidden"));
	}

	protected async processInitializationData() {
		if (this.initializationDataProcessed) return;

		if (this.MainAppointmentFilter.InitialRefNbr.value?.length > 0) {
			this.initializationDataProcessed = true;
			this.mainTabBar.showTab("tabAppointments");
			const appointmentID = this.MainAppointmentFilter.InitialRefNbr.value;
			await this.searchAppointmentsGrid.onFastFilter(appointmentID);
			const searchAppointment = this.searchAppointments.getFirstEntry();
			await this.selectCurrentEntity(searchAppointment);
		}
		if (this.MainAppointmentFilter.InitialSORefNbr.value?.length > 0) {
			this.initializationDataProcessed = true;
			this.mainTabBar.showTab("tabServiceOrders");
			await this.serviceOrdersGrid.onFastFilter(this.MainAppointmentFilter.InitialSORefNbr.value);
		}
	}

	protected getServiceEntryIdFromElement(element: HTMLElement) {
		while (element.parentElement && element.getAttribute("entryId") === null) {
			element = element.parentElement;
		}
		const entryId = element.getAttribute("entryId");
		return entryId;
	}

	protected getEventIdFromElement(element: HTMLElement): string {
		while (element.parentElement && !(<any> element.parentElement).elementData) {
			element = element.parentElement;
		}
		const eventId = (<any> element.parentElement).elementData.assignment.eventId.toString();
		return eventId;
	}

	protected createExternalDragHelperConfig(source: "appointment" | "serviceorder" | "sodetails"): ExternalEventDragHelperConfig {
		const createEnabled = this.CreateEnabled();
		const updateEnabled = this.UpdateEnabled();

		const config = {
			owner: this,
			getSnapToResourcePosition: this.getSnapToResourcePosition.bind(this),
			getScheduler: () => this.schedulerControl,
			getBacklog: () => this.backlogControl,
			allowDragging: () => ((source !== "appointment" && createEnabled)
			 	|| (source === "appointment" && updateEnabled && !this.backlogEventResizing)),

			getEntity: (element: HTMLElement) => (source === "appointment")
				? this.appointments.getUnassignedAppointment(this.getEventIdFromElement(element))
				: this.serviceOrders.getEntry(this.getServiceEntryIdFromElement(element)),

			getProxyInner: (entity: DraggableEntity) => (source === "appointment")
				? this.renderer.renderAppointmentWithStatusBar(entity as AppointmentEmployeeModel)
				: this.renderer.renderDraggedServiceOrder(entity, source === "sodetails"),

			getEventInfo: (entity: DraggableEntity) => (source === "appointment")
				? this.getEventInfoFromAppointment(entity as AppointmentEmployeeModel)
				: this.getEventInfoFromSO(entity as ServiceOrderModel, source === "sodetails"),

			getAppointmentStart: (resourceId: string, entity: DraggableEntity) => (source === "appointment")
				? new Date((entity as AppointmentEmployeeModel)?.dateTimeBegin)
				: this.getSuggestedTimePeriod(resourceId, this.serviceOrders.getEstimatedDurationMS(entity as ServiceOrderModel, source === "sodetails")),

			getDurationMS: (entity: DraggableEntity) => (source === "appointment")
				? this.getAppointmentDurationMS(entity as AppointmentEmployeeModel)
				: this.serviceOrders.getEstimatedDurationMS(entity as ServiceOrderModel, source === "sodetails"),

			onDragStart: (entity: DraggableEntity, start: Date, end: Date) => this.onEntityDragStart(entity, start, end, source === "sodetails"),
			onDragEnd: () => this.onEventDragReset(),

			schedule: (entity: DraggableEntity, resourceId: number, dateBegin: Date, dateEnd: Date) => (source === "appointment")
				? this.assignUnassignedAppointment(entity, resourceId, dateBegin, dateEnd)
				: this.createAppointmentFromSO(entity as ServiceOrderModel, resourceId, dateBegin, dateEnd, source === "sodetails"),
		};
		return config;
	}

	protected attachDragHelpers() {

		this.serviceOrderDragHelper = new ExternalEventDragHelper(this.createExternalDragHelperConfig("serviceorder"), {
			targetSelector: ".qp-sch-not-assigned:not(:has(.qp-sch-service-info:not(.only-child).qp-sch-hover))",
			hideOriginalElement: true,
		});

		this.sODetailsDragHelper = new ExternalEventDragHelper(this.createExternalDragHelperConfig("sodetails"), {
			targetSelector: ".qp-sch-service-info:not(.only-child):not(.scheduled)",
			hideOriginalElement: true,
		});

		this.appointmentsWithNoEmployeeDragHelper = new ExternalEventDragHelper(this.createExternalDragHelperConfig("appointment"), {
			targetSelector: ".qp-sch-main-container > .b-container:nth-child(2) .b-sch-event",
			hideOriginalElement: true,
		});

		this.resourceDragHelper = new ResourceDragHelper(
			{
				getScheduler: () => this.schedulerControl,
				getEventInfo: (assignmentId: string) => this.getEventInfoFromAssignment(assignmentId),
				addResource: this.addResourceToAppointment.bind(this),
				allowDragging: () => this.UpdateEnabled(),
			}, {
				targetSelector: (this.orientation === "vertical") ? ".b-resourceheader-cell" : ".b-grid-subgrid-locked .b-grid-row"
			}
		);
	}

	protected getAppointmentDurationMS(appointment: AppointmentEntity) {
		const duration = appointment.dateTimeEnd.getTime() - appointment.dateTimeBegin.getTime();
		if (duration > 0) {
			return duration;
		}
		return 60 * 60 * 1000; // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	protected async setDayPeriod() {
		if (this.DatesFilter?.PeriodKind.value === PeriodKind.Day) return;
		this.DatesFilter?.PeriodKind.updateValue(PeriodKind.Day);
		await this.reloadForDate(this.DatesFilter.DateSelected.value, true);
	}

	protected async setWeekPeriod() {
		if (this.DatesFilter?.PeriodKind.value === PeriodKind.Week) return;
		this.DatesFilter?.PeriodKind.updateValue(PeriodKind.Week);
		await this.reloadForDate(this.DatesFilter.DateSelected.value, true);
	}

	protected async setMonthPeriod() {
		if (this.DatesFilter?.PeriodKind.value === PeriodKind.Month) return;
		this.DatesFilter?.PeriodKind.updateValue(PeriodKind.Month);
		await this.reloadForDate(this.DatesFilter.DateSelected.value, true);
	}

	protected getEventInfoFromSO(entity: ServiceOrderModel, sODetails: boolean): DragHelperEventInfo {
		return {
			name: sODetails ? entity.serviceId : entity.orderId,
			entity: entity,
			date: entity.OrderDate ? new Date(entity.OrderDate?.value) : null,
		};
	}

	protected getEventInfoFromAppointment(appoointment: AppointmentEmployeeModel): DragHelperEventInfo {
		return {
			name: appoointment.caption,
			entity: appoointment,
			date: null,
		};
	}

	protected getEventInfoFromAssignment(assignmentId: string): DragHelperEventInfo {
		const assignment = this.appointments.getAssignment(assignmentId);
		if (!assignment) return null;
		return {
			name: "",
			entity: assignment,
			date: null,
		};
	}

	protected getSuggestedTimePeriod(resourceId: string, duration: number) {
		if (resourceId == null) return null;

		const visibleRange = this.schedulerControl.visibleDateRange;
		if (visibleRange?.startDate == null || visibleRange?.startDate == null) return null;

		return this.appointments.findEmptyTimePeriod(resourceId, duration, visibleRange.startDate, visibleRange.endDate);
	}

	protected async onActiveFilterChanged(args: QpGridEventArgs) {
		await this.setSchedulerTabs();
		const filter = this.schedulerGrid.getActiveFilter();
		this.schedulerTabBar.showTab(filter.filterID);
	}

	protected async onFiltersListChanged(args: QpGridEventArgs) {
		await this.setSchedulerTabs();
	}

	protected filterTabSelected(tabId: string) {
		if (this.schedulerGrid.getActiveFilter()?.filterID !== tabId) {
			this.calendarContainer?.classList.remove("qp-disable-filters");
			this.schedulerGrid.setActiveFilter(tabId);
		}
	}

	protected async setSchedulerTabs() {
		this.SchedulerGridFilters = this.schedulerGrid.getFilters();
	}

	protected serviceOrdersDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as ServiceOrderModel);
		if (!this.initializationDataProcessed && this.MainAppointmentFilter.InitialSORefNbr.value?.length > 0) {
			return; // wait for the initialization data to be processed
		}
		if (!this.serviceOrders.initializeWith(Array.from(items))) return;
		this.updateSOPane();

		if (this.subscribedToSOBrickPreferences) return;
		this.subscribedToSOBrickPreferences = true;
		this.preferencesService.subscribe(this.serviceOrdersBrickLeftID, {
			applyPreferences: (prefs) => this.applySOBrickLeftPreferences(prefs)
		});
		this.preferencesService.subscribe(this.serviceOrdersBrickRightID, {
			applyPreferences: (prefs) => this.applySOBrickRightPreferences(prefs)
		});
	}

	protected searchAppointmentsDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as SearchAppointmentModel);
		if (!this.initializationDataProcessed && this.MainAppointmentFilter.InitialRefNbr.value?.length > 0) {
			return; // wait for the initialization data to be processed
		}
		if (!this.searchAppointments.initializeWith(Array.from(items))) return;

		this.updateSearchAppointmentsPane();

		if (this.subscribedToSearchAppointmentsBrickPreferences) return;

		this.subscribedToSearchAppointmentsBrickPreferences = true;
		this.preferencesService.subscribe(this.searchAppointmentBrickLeftID, {
			applyPreferences: (prefs) => this.applySearchAppointmentsBrickLeftPreferences(prefs)
		});
		this.preferencesService.subscribe(this.searchAppointmentBrickRightID, {
			applyPreferences: (prefs) => this.applySearchAppointmentsBrickRightPreferences(prefs)
		});
	}

	protected async suitableEmployeesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const employees = [...Array(grid.rows.length).keys()].map(i => grid.view.getRowModel(i) as SuitableEmployeeModel);
		if (this.suitableEmployeesRequestedForDND) {
			this.suitableEmployeesRequestedForDND = false;
			if (!this.dragAndDropInProgress) return; // Data no longer needed - ignore
		}
		this.appointments.setSuitableEmployees(employees, this.dragAndDropInProgress);
	}

	protected async employeeDevicesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		this.devices = [...Array(grid.rows.length).keys()].map(i => grid.view.getRowModel(i) as SchedulerTrackingHistory);
	}

	protected async refreshCalendar() {
		let res:ICommandUpdateResult;
		try {
			this.updatingAppointmentsFromCode = true;
			res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
				views: [nameof("SuitableEmployees"), nameof("AppointmentsAllStaff"), nameof("AppointmentFilter")]
			}));
		}
		finally {
			this.updatingAppointmentsFromCode = false;
		}
		if (!res?.succeeded) return false;

		this.calendarContainer?.classList.toggle("qp-disable-filters", false);
		await this.updateCalendar();
		await this.scrollCurrentEntityIntoView(false, false);

		return true;
	}

	protected async appointmentsDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		// TODO: It's a temporary kludge to ignore the data after resetting filters
		// A more correct way is to make grid not update itself on switching tabs
		if (grid === this.schedulerGrid && this.ignoreNextSchedulerGridUpdate) {
			this.ignoreNextSchedulerGridUpdate = false;
			return;
		}
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].map(i => createInstance(grid.rows[i].cells, AppointmentEmployeeModel));
		if (!this.appointments.initializeWith(Array.from(items))) return;
		if (!this.updatingAppointmentsFromCode) {
			await this.updateCalendar();
		}

		if (!this.subscribedToAppointmentsBrickPreferences) {
			this.subscribedToAppointmentsBrickPreferences = true;
			this.preferencesService.subscribe(this.appointmentsBrickLeftID, {
				applyPreferences: (prefs) => this.applyAppointmentsBrickLeftPreferences(prefs)
			});
			this.preferencesService.subscribe(this.appointmentsBrickRightID, {
				applyPreferences: (prefs) => this.applyAppointmentsBrickRightPreferences(prefs)
			});
		}

		function createInstance<T>(dict: any, type: { new(): T }): T {
			const instance = new type();
			Object.assign(instance, dict);
			return instance;
		}
	}

	protected async lastAppointmentDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as AppointmentEmployeeModel);
		if (items.length === 0) return;

		this.appointments.mergeDataFrom(items);
		if (items[0].appointmentID === this.currentAppointment?.appointmentID) {
			this.currentEntity = items[0]; // update the object since it might get changed
		}
		await this.updateCalendar();
		if (!!this.currentAppointment && this.currentAppointment.appointmentID === items[0].appointmentID) {
			await this.scrollCurrentEntityIntoView(true, true, true);
		}
	}

	protected async processToolBarClick(e: CustomEvent)
	{
		const btnConfig = e.detail?.config;
		const action = btnConfig?.commandName;
		let res: boolean;
		let promise: Promise<boolean> | Promise<void> | Promise<boolean | void> | null = null;

		// TODO: We don't want events for other targets and the target is incorrect for some actions, so we setup a narrow filter for now
		// (Find out what's wrong with the target for "hours")
		if (action === "refresh" && e.target !== this.appointmentsAllStaffGridElement) return;

		let processed = true;
		switch (action)
		{
			case "add": promise = this.addAppointment(); break;
			// case "rotate": promise = this.switchOrientation(); break;
			case "hours": promise = this.switchHoursFilter(); break;
			case "refresh": promise = this.refreshCalendar(); break;
			case "prevPeriod": promise = this.processPrevPeriod(); break;
			case "nextPeriod": promise = this.processNextPeriod(); break;
			case "periodDay": promise = this.setDayPeriod(); break;
			case "periodWeek": promise = this.setWeekPeriod(); break;
			case "periodMonth": promise = this.setMonthPeriod(); break;
			case "reset": promise = this.popups.resetCreateAppointmentForm(); break;
			case "create": promise = this.createApointmentFromPopup(false, true); break;
			case "confirm":
				promise = this.confirmAppointment(this.popups.getEntityId(), true)
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "unconfirm":
				promise = this.confirmAppointment(this.popups.getEntityId(), false)
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "validate":
				promise = this.validateAppointment(this.popups.getEntityId(), true)
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "invalidate":
				promise = this.validateAppointment(this.popups.getEntityId(), false)
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "unassign":
				promise = this.unassignResource(this.popups.getAssignmentId())
					.then((res) => { if (res) this.popups.close(); });
				break;
			case "clone":
				promise = this.cloneAppointment(this.popups.getEntityId())
					.then(() => { this.popups.close(); });
				break;
			case "delete":
				promise = this.deleteAppointment(this.popups.getEntityId())
					.then((res) => { if (res) this.popups.close(); });
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

	protected async processPrevPeriod()
	{
		let newDate = new Date(this.DatesFilter.DateSelected.value.valueOf());
		switch (this.DatesFilter.PeriodKind.value) {
			case PeriodKind.Day:
				newDate.setDate(newDate.getDate() - 1);
				break;

			case PeriodKind.Week:
				newDate.setDate(newDate.getDate() - 7); // eslint-disable-line @typescript-eslint/no-magic-numbers
				break;

			case PeriodKind.Month:
				newDate = new Date(newDate.getFullYear(), newDate.getMonth() - 1, newDate.getDate());
				break;
		}
		await this.reloadForDate(newDate);
	}

	protected async processNextPeriod()
	{
		let newDate = new Date(this.DatesFilter.DateSelected.value.valueOf());
		switch (this.DatesFilter.PeriodKind.value) {
			case PeriodKind.Day:
				newDate.setDate(newDate.getDate() + 1);
				break;

			case PeriodKind.Week:
				newDate.setDate(newDate.getDate() + 7); // eslint-disable-line @typescript-eslint/no-magic-numbers
				break;

			case PeriodKind.Month:
				newDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());
				break;
		}
		await this.reloadForDate(newDate);
	}

	protected async datePicked()
	{
		if (!this.DatesFilter.DateSelected) return; // not loaded yet, it was not the user who picked the date
		if (this.datePickerReentryPreventionOn) return;
		try {
			this.datePickerReentryPreventionOn = true;
			if (this.pickerDate == null
				|| this.pickerDate.withoutTimeInMsec() === this.DatesFilter?.DateSelected?.value?.withoutTimeInMsec()) return;
			await this.reloadForDate(this.pickerDate);
		}
		finally {
			this.datePickerReentryPreventionOn = false;
		}
	}

	protected async reloadForDate(date: Date, forceSetPeriod = false)
	{
		this.setDateFilterToDate(date, forceSetPeriod);
		const storedSchedulerScroll = this.schedulerControl?.storeScroll();
		await this.refreshCalendar();
		this.schedulerControl?.scrollVerticallyTo((<any>storedSchedulerScroll).scrollTop, false);
	}

	protected setDateFilterToDate(date: Date, forceSetPeriod = false) {
		let newDate = date.clearHoursUTC();
		newDate = newDate.fromView();
		if (forceSetPeriod || newDate.withoutTimeInMsec() !== this.DatesFilter.DateSelected?.value?.withoutTimeInMsec()) {
			this.DatesFilter.DateSelected.updateValue(newDate);
			const [periodStartDate, periodEndDate] = AppointmentsDataHandler.getPeriodStartEndDates(this.DatesFilter);
			this.DatesFilter.DateBegin.updateValue(periodStartDate.fromView());
			this.DatesFilter.DateEnd.updateValue(periodEndDate.fromView());
			this.onDatesFilterUpdated();
		}
	}

	protected onDatesFilterUpdated() {
		// We can't change the styles through the config, as setupViewModel() removes the date picker from the toolbar
		document.querySelector(".qp-sch-period-day")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodDay);
		document.querySelector(".qp-sch-period-week")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodWeek);
		document.querySelector(".qp-sch-period-month")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodMonth);

		this.pickerDate = new Date(this.DatesFilter?.DateSelected?.value?.clearHoursUTC() ?? new Date());
		this.setDatePickerText();
	}

	protected setDatePickerText() {
		const datePickerInput = document.querySelector(".qp-sch-calendar-container .qp-datetime__editor input") as HTMLInputElement;
		const datePickerTextSpan = document.querySelector(".qp-sch-calendar-container .qp-datetime__editor .buttonsCont span") as HTMLSpanElement;
		if (!datePickerTextSpan || !datePickerInput) return;

		const date = this.DatesFilter.DateSelected.value.clearHoursUTC();

		let formattedDate = "";
		switch (this.DatesFilter.PeriodKind.value) {
			case PeriodKind.Day:
				formattedDate = formatDate(date, Formats.DayMonth, dateFormatInfo());
				break;

			case PeriodKind.Week:
				const dateCopy = new Date(date);
				const day = date.getDay();
				const diff = dateCopy.getDate() - day + (day === 0 ? -6 : 1); // eslint-disable-line @typescript-eslint/no-magic-numbers
				const firstDayOfWeek = new Date(dateCopy.setDate(diff));
				const lastDayOfWeek = new Date(dateCopy.setDate(diff + 6)); // eslint-disable-line @typescript-eslint/no-magic-numbers
				const sameMonth = firstDayOfWeek.getMonth() === lastDayOfWeek.getMonth();
				const periodStart = formatDate(firstDayOfWeek, sameMonth ? Formats.DateRangeSameMonthP1 : Formats.DateRangeDiffMonthP1, dateFormatInfo());
				const periodEnd = formatDate(lastDayOfWeek, sameMonth ? Formats.DateRangeSameMonthP2 : Formats.DateRangeDiffMonthP2, dateFormatInfo());
				formattedDate = `${periodStart} - ${periodEnd}`;
				break;

			case PeriodKind.Month:
				formattedDate = formatDate(date, Formats.OnlyMonth, dateFormatInfo());
				break;
		}

		datePickerTextSpan.innerText = formattedDate;
		datePickerInput.style.width = `${datePickerTextSpan.offsetWidth + 20}px`; // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	protected async switchHoursFilter() {
		this.DatesFilter.FilterBusinessHours.updateValue(!this.DatesFilter.FilterBusinessHours.value);
		this.topBarConfig.hours.config.pushed = !this.DatesFilter.FilterBusinessHours.value;
		this.schedulerGrid.setTopBarButtonsState();
		this.applyHoursFilter();
	}

	protected applyHoursFilter() {
		if ((this.DatesFilter?.FilterBusinessHours?.value ?? true)) {
			this.schedulerControl.timeAxis.filter(t => !this.appointments.hasWorkingCalendarSet() || this.appointments.isWorkingTime(t.startDate, t.endDate));
			// TODO: use this code as a base for the bird-eye view mode
			// this.schedulerControl.timeAxis.forEach(t => {
			// 	//t.startDate = new Date(t.startDate);
			// 	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			// 	t.startDate.setHours(10);
			// 	//t.endDate = new Date(t.endDate);
			// 	//t.endDate.setDate(t.startDate.getDate());
			// 	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			// 	t.endDate.setHours(18);
			// });
		}
		else {
			this.schedulerControl.timeAxis.clearFilters();
		}
	}

	protected toggleTimeProjection(start: Date, end: Date) {
		// null values turn the projection off
		this.backlogControl.timeRanges[0].startDate = start;
		this.backlogControl.timeRanges[0].endDate = end;
		this.schedulerControl.timeRanges[0].startDate = start;
		this.schedulerControl.timeRanges[0].endDate = end;
	}

	protected getCssClassForOrientation() {
		return (this.orientation === "horizontal") ? "" : "reversed";
	}

	protected getCssClassForPeriodInfo() {
		return (this.DatesFilter?.FilterBusinessHours?.value ?? true) ? "business-hours" : "around-the-clock";
	}

	protected snapToPosition({ resourceRecord, eventRecord, snapTo }) {
		[snapTo.x, snapTo.y] = this.getSnapToResourcePosition(resourceRecord, snapTo.x, snapTo.y, true);
	}

	protected getSnapToResourcePosition(resourceRecord : ResourceModel, x: number, y: number, localCoord = false): [snapX: number, snapY: number] {
		const scheduler = this.schedulerControl;
		const resourceRect = scheduler.getResourceRegion(resourceRecord, null, null);
		if (!resourceRect) {
			return [x, y];
		}
		if (this.orientation === "horizontal") {
			return snapToGridHorizontal(this.horizontalSnapDistance);
		}
		else {
			return snapToGridVertical(this.verticalSnapDistance);
		}

		function snapToGridHorizontal(distance: number): [snapX: number, snapY: number] {
			const topOffset = localCoord ? 1 : (scheduler.y + scheduler.headerHeight - scheduler.scrollTop);
			const rowTop = topOffset + resourceRect.top;
			const normalResHeight = resourceRect.height - 1;
			const snapLine = rowTop + normalResHeight / 2 + scheduler.resourceMargin / 2;
			const distanceFromSnapLine = Math.abs(y + normalResHeight / 2 - snapLine);

			const snapY = (distanceFromSnapLine >= distance) ? y : snapLine - normalResHeight / 2;
			return [x, snapY];
		}

		function snapToGridVertical(distance: number): [snapX: number, snapY: number] {
			const columnWidth = scheduler.resourceColumnWidth;
			const leftOffset = localCoord ? 0 : (scheduler.x + scheduler.timeAxisSubGridElement.offsetLeft - scheduler.scrollX);
			const columnLeft = leftOffset + resourceRect.left;
			const snapLine = columnLeft + columnWidth / 2 + scheduler.resourceMargin;
			const distanceFromSnapLine = Math.abs(x + columnWidth / 2 - snapLine);

			const snapX = (distanceFromSnapLine >= distance) ? x : snapLine - columnWidth / 2;
			return [snapX, y];
		}
	}

	protected async onSchedulerCellClick({ }) {
		await this.deselectCurrentEntity();
	}

	protected async onEventClick({ eventRecord, eventElement, assignmentRecord, event }) {
		const entry = this.appointments.getAssignmentOrUnassignedAppointment(assignmentRecord.id, eventRecord.id);
		if (!entry) return;

		const targetElement = event.target as HTMLElement;
		if (targetElement) {
			let fieldName = targetElement.getAttribute("sch-field");
			if (!fieldName && targetElement.parentElement) {
				fieldName = targetElement.parentElement.getAttribute("sch-field");
			}
			if (fieldName === "SelectedAppointment.RefNbr") {
				await this.popups.open(entry.appointmentID, entry.assignmentID, eventElement);
				return;
			}
		}

		await this.selectCurrentEntity(entry);
	}

	protected onEventMouseEnter({ eventRecord, event, assignmentRecord }) {
		this.aureliaEnhance(event.target);
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

	protected async onSOGridCellClick({ record, cellElement, target }) {
		const serviceOrder = this.serviceOrders.getEntry(record.id);
		// await this.popups.open(serviceOrder.SOID.value, null, cellElement, "view", "serviceOrder");

		const targetElement = target as HTMLElement;

		let fieldName = targetElement.getAttribute("sch-field");
		if (!fieldName) {
			fieldName = targetElement.parentElement.getAttribute("sch-field");
		}
		if (fieldName === "SelectedSO.RefNbr") {
			await this.popups.open(serviceOrder.SOID.value, null, cellElement, "view", "serviceOrder");
			return;
		}
		await this.selectCurrentEntity(serviceOrder);
	}

	protected async onServiceOrdersScroll({ source, scrollTop }) {
		const items = this.serviceOrdersControl.data;
		const lastIndex = this.serviceOrdersControl.lastVisibleRow.dataIndex;
		if (lastIndex < items.length - 1) return;

		this.serviceOrdersGrid.getMoreRows(0, true, false);
	}

	protected onSOGridCellMouseOver({ record, cellElement, target }) {
		this.aureliaEnhance(cellElement);
	}

	protected async onSearchAppointmentsScroll({ source, scrollTop }) {
		const items = this.searchAppointmentsControl.data;
		const lastIndex = this.searchAppointmentsControl.lastVisibleRow.dataIndex;
		if (lastIndex < items.length - 1) return;

		this.searchAppointmentsGrid.getMoreRows(0, true, false);
	}

	protected onSearchAppointmentsMouseOver({ record, cellElement, target }) {
		this.aureliaEnhance(cellElement);
	}

	protected async onSearchAppointmentGridCellClick({ record, cellElement, target }) {
		const targetElement = target as HTMLElement;
		const searchAppointment = this.searchAppointments.getEntry(record.id);

		let fieldName = targetElement.getAttribute("sch-field");
		if (!fieldName) {
			fieldName = targetElement.parentElement.getAttribute("sch-field");
		}
		if (fieldName === "SelectedAppointment.RefNbr") {
			await this.popups.open(searchAppointment.appointmentID, searchAppointment.assignmentID, cellElement);
			return;
		}
		await this.selectCurrentEntity(searchAppointment);
	}

	protected async deselectCurrentEntity() {
		if (this.currentEntity == null) return;
		await this.selectCurrentEntity(this.currentEntity);
	}

	protected async selectCurrentEntity(entity: DraggableEntity) {
		const isPreviousSelectionSO = this.currentEntity instanceof ServiceOrderModel;
		const isServiceOrder = entity instanceof ServiceOrderModel;
		const appointment = isServiceOrder ? null : entity as AppointmentEntity;
		const order = isServiceOrder ? entity as ServiceOrderModel : null;
		const sameAppointment = !!this.currentAppointment && this.currentAppointment?.appointmentID === appointment?.appointmentID;
		const sameOrder = !!this.currentServiceOrder && this.currentServiceOrder?.orderId === order?.orderId;
		if (sameAppointment || sameOrder) {
			// Clear search selection
			this.currentEntity = null;
			if (sameAppointment) {
				this.updateSearchAppointmentsPane();
			}
			else {
				this.updateSOPane();
			}
			this.updateMapController();
			this.appointments.setSuitableEmployees([]);
			this.AppointmentFilter.SearchAppointmentID.updateValue(0);
			this.AppointmentFilter.AssignableAppointmentID.updateValue(0);
			this.AppointmentFilter.AssignableSOID.updateValue(0);
			this.AppointmentFilter.AssignableSODetID.updateValue(0);

			await this.updateCalendar();
			return;
		}

		this.currentEntity = entity;
		this.updateMapController();

		if (!!appointment) {
			this.AppointmentFilter.AssignableSOID.updateValue(0);
			this.AppointmentFilter.AssignableSODetID.updateValue(0);
			this.AppointmentFilter.AssignableAppointmentID.updateValue(Number(appointment.appointmentID));
			this.updateSearchAppointmentsPane();
			if (isPreviousSelectionSO) {
				this.updateSOPane();
			}

			if (await this.scrollCurrentEntityIntoView(true, true)) return;

			// Load from server
			this.setDateFilterToDate(appointment.dateTimeBegin, true);
			this.AppointmentFilter.SearchAppointmentID.updateValue(Number(appointment.appointmentID));
			this.MainAppointmentFilter.ResetFilters.updateValue(false);
			this.MainAppointmentFilter.RefNbr.updateValue(appointment.refNbr);

			if (!await this.refreshCalendar()) return;
			await this.scrollCurrentEntityIntoView(false, false);

			await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false, views: [nameof("MainAppointmentFilter")] }));
			const resetFilters = this.MainAppointmentFilter.ResetFilters.value;

			if (resetFilters) {
				this.calendarContainer.classList.toggle("qp-disable-filters", true);
				if (this.schedulerGrid.getActiveFilter().filterID === this.allRecordsFilter) return;

				this.schedulerGrid.onFilterApplied("", this.allRecordsFilter);
				this.ignoreNextSchedulerGridUpdate = true;
			}
		}
		else {
			this.AppointmentFilter.AssignableSOID.updateValue(Number(order.SOID.value));
			this.AppointmentFilter.AssignableSODetID.updateValue(0);
			this.AppointmentFilter.AssignableAppointmentID.updateValue(0);
			this.updateSOPane();
			await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
				views: [nameof("SuitableEmployees"), nameof("AppointmentFilter")]
			}));
			await this.updateCalendar();
			this.schedulerControl.scrollVerticallyTo(0, { animate: true, block: "start", edgeOffset: 0 });
		}
	}

	protected async scrollCurrentEntityIntoView(needRedraw = true, needAnimation = true, scrollToNearest = undefined) {
		const appointment = this.currentAppointment;
		if (!appointment) return false;

		const redrawIfNeeded = 	async () => {
			if (!needRedraw) return;
			await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
				views: [nameof("SuitableEmployees"), nameof("AppointmentFilter")]
			}));
			await this.updateCalendar();
		};

		const scrollToBlock = (scrollToNearest || appointment instanceof AppointmentEmployeeModel) ? "nearest" : "start";
		// TODO: A bug in Bryntum's code prevents scrolling every second time in some cases if animation is on
		// replace needAnimation with false if it reappears
		const scrollOptions = { animate: true, block: scrollToBlock, edgeOffset: 20 };
		const scrollOptionsAnimate = { animate: needAnimation, block: scrollToBlock, edgeOffset: 20 };
		if (appointment.staffCntr === 0) {
			const loadedAppointment = this.appointments.getUnassignedAppointment(appointment.appointmentID);
			if (loadedAppointment && !loadedAppointment.isFilteredOut) {
				await redrawIfNeeded();
				const controlEvent = this.backlogControl.eventStore.getById(appointment.appointmentID) as SchedulerEventModel;
				await this.backlogControl.scrollEventIntoView(controlEvent, scrollOptionsAnimate);
				return true;
			}
		}
		else {
			const loadedAssignments = this.appointments.getAssignmentsByAppointmentId(appointment.appointmentID);
			if (loadedAssignments.length === appointment.staffCntr && !loadedAssignments.some(x => x.isFilteredOut)) {
				await redrawIfNeeded();
				const shortAssignmentId = appointment instanceof AppointmentEmployeeModel ? appointment.assignmentID : loadedAssignments[0].assignmentID;
				const assignmentId = this.appointments.getFullId(shortAssignmentId);
				const assignment = this.schedulerControl.assignmentStore.getById(assignmentId) as SchedulerAssignmentModel;
				const event = assignment.event as SchedulerEventModel;

				// await Promise.race([
				// 	this.schedulerControl.scrollResourceEventIntoView(assignment.resource as SchedulerResourceModel, event, scrollOptionsAnimate),
				// 	new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 500)) // eslint-disable-line @typescript-eslint/no-magic-numbers
				// ]).catch(function(err) {
				// 	//
				// });
				this.schedulerControl.scrollResourceEventIntoView(assignment.resource as SchedulerResourceModel, event, scrollOptions);
				await this.schedulerControl.scrollAssignmentIntoView(assignment, scrollOptionsAnimate);

				const element = this.schedulerControl.getElementFromAssignmentRecord(assignment);
				if (element?.parentElement?.getAttribute("data-assignment-id") !== assignmentId) {
					// TODO: That's a kludge for Bryntum's bug -- we should've had the assignment's element exist
					// instead, it might not exist or exist with a null assignment ID
					console.log(`assignment not found, going to try another method`);
					await this.updateCalendar();
					const assignment = this.schedulerControl.assignmentStore.getById(assignmentId) as SchedulerAssignmentModel;
					await this.schedulerControl.scrollResourceEventIntoView(assignment.resource as SchedulerResourceModel, event, scrollOptionsAnimate);
				}
				return true;
			}
		}
		return false;
	}

	protected async onSelectionChange() {
		this.updateMapController();
	}

	protected mapSplitterStateChanged() {
		this.updateMapController();
	}

	protected async updateMapController() {
		if (this.mapSplitter.getSplitterState() === "collapsed-second") return;
		this.devices = [];
		this.mapController = new AzureMapController(this.mainMap, this.schedulerControl, this.appointments,
			() => this.currentAppointment,
			async (id, element) => await this.popups.open(id, null, element));
		this.mapController.updateDevices([]);
		await this.mapController.updateMap();
		this.renderer.setColors(this.mapController.getColors());

		if (this.updateDevicesTimer) {
			clearInterval(this.updateDevicesTimer);
		}
		if (this.updateDevicesTimeout) {
			clearTimeout(this.updateDevicesTimeout);
		}
		const updateDevices = (this.InitData.EnableGPSTracking.value === true);
		const updateDevicesInterval = this.InitData.GPSRefreshTrackingTime.value as number;
		if (updateDevices) {
			this.updateDevicesTimeout = setTimeout(() => {
				this.updateMapControllerDevices(true);
			}, 500); // eslint-disable-line @typescript-eslint/no-magic-numbers

			if (updateDevicesInterval > 0) {
				this.updateDevicesTimer = setInterval(() => {
					this.updateMapControllerDevices(false);
				}, updateDevicesInterval * 1000); // eslint-disable-line @typescript-eslint/no-magic-numbers
			}
		}
	}

	protected async updateMapControllerDevices(updateView: boolean) {
		if (this.mapSplitter.getSplitterState() === "collapsed-second") return;
		const selectedResources = this.schedulerControl.selectedRows as SchedulerResourceModel[];
		const ids: any [] = [];
		selectedResources.forEach(resouce => {
			ids.push(resouce.id);
		});

		if (ids.length === 0 || !this.mapController) {
			this.mapController.clearDevices();
			return;
		}

		this.DevicesFilter.SelectedEmployeeIDs.updateValue(ids.join(";"));

		await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
			views: [nameof("EmployeeDevices")]
		}));
		this.mapController.updateDevices(this.devices);
		this.mapController.placeDevices(updateView);
	}

	protected async onSubGridCollapse({ source, subGrid }) {
		if (subGrid === this.lockedSubGrid || subGrid === this.lockedSubGridBacklog) {
			this.splitterPreferences.state = "collapsed-first";
		}
		else if (subGrid === this.normalSubGrid || subGrid === this.normalSubGridBacklog) {
			this.splitterPreferences.state = "collapsed-second";
		}
		await this.savePreferences();
	}

	protected async onSubGridExpand({ source, subGrid }) {
		this.splitterPreferences.state = "normal";
		await this.savePreferences();
	}

	protected async onLockedSubGridResize({ width }) {
		const movingElement = document.getElementsByClassName("b-moving")?.[0] as HTMLElement;
		if (!movingElement) return; // fake event

		if (this.saveSplitterPositionTimer) {
			clearTimeout(this.saveSplitterPositionTimer);
		}
		this.saveSplitterPositionTimer = setTimeout(() => {
			this.splitterPreferences.position = width;
			this.savePreferences();
		}, 300); // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	protected onVisibleDateRangeChange() {
		if (this.updateMapTimer) {
			clearTimeout(this.updateMapTimer);
		}
		this.updateMapTimer = setTimeout(() => {
			this.updateMapController();
		}, 300); // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	protected onDragCreateStart({ source, eventRecord, resourceRecord, eventElement }) {
		const eventResourceId = eventRecord.resourceId.toString();
		if (eventResourceId === AppointmentEmployeeModel.unassignedId) {
			this.dragCreateResourceIDsSet = new Set();
			return;
		}

		this.dragCreateResourceIDsSet = new Set((this.schedulerControl.selectedRows as SchedulerResourceModel[])?.map(r => r.id.toString()));
		this.dragCreateResourceIDsSet.add(eventResourceId);

		this.dragCreateResourceIDsSet.forEach((resourceID) => {
			if (resourceID === eventResourceId) return;
			this.schedulerControl.eventStore.assignEventToResource(eventRecord, resourceID);
		});
	}

	protected onDragCreateEnd({ source, eventRecord, resourceRecord, eventElement }) {
		this.popups.open(this.newAppointmentId, null, eventElement, "edit", "appointment", eventRecord, this.dragCreateResourceIDsSet);
		return false;
	}

	protected async onEventDragStart({ eventRecords }) {
		const appointment = this.appointments.getAppointment(eventRecords[0].id.toString());
		await this.onEntityDragStart(appointment, eventRecords[0].startDate as Date, eventRecords[0].endDate as Date);
	}

	protected async onEntityDragStart(entity: DraggableEntity, start: Date = null, end: Date = null, detailsOnly = false) {
		this.dragAndDropInProgress = true;
		if (!(entity instanceof ServiceOrderModel)) {
			this.toggleTimeProjection(start, end);
		}
		await this.setUnassignableResourcesDND(entity, detailsOnly);
	}

	protected onEventDrag({ newResource, context }) {
		context.valid = newResource.cls !== AppointmentsDataHandler.unsuitableClass;
	}

	protected async onEventDragReset() {
		this.toggleTimeProjection(null, null);
		this.dragAndDropInProgress = false;
		await this.setResourcesClasses(false);
	}

	protected async setResourcesClasses(forDragAndDrop: boolean) {
		if (forDragAndDrop && !this.dragAndDropInProgress) return;

		const suitableEmployees = this.appointments.getSuitableEmployees(forDragAndDrop);
		this.schedulerControl.resourceStore.forEach(resource => {
			const employee = suitableEmployees.get(resource.id.toString());
			resource.cls = employee ? AppointmentsDataHandler.getEmployeeClass(employee) : "";
			resource.label = employee ? employee.Label.value : "";
			const resourceElement = document.querySelector(`.qp-sch-resource-id${resource.id} .label`);
			if (resourceElement) {
				resourceElement.innerHTML = employee?.Label?.value ?? "";
			}
		});
	}

	protected async setUnassignableResourcesDND(entity: DraggableEntity, detailsOnly = false) {
		if (entity instanceof ServiceOrderModel) {
			this.AppointmentFilter.AssignableSOID.updateValue(entity.SOID.value);
			this.AppointmentFilter.AssignableSODetID.updateValue(detailsOnly ? entity.FSSODet__SODetID.value : 0);
			this.AppointmentFilter.AssignableAppointmentID.updateValue(0);
		}
		else {
			this.AppointmentFilter.AssignableSOID.updateValue(0);
			this.AppointmentFilter.AssignableSODetID.updateValue(0);
			this.AppointmentFilter.AssignableAppointmentID.updateValue(Number(entity.appointmentID));
		}
		this.suitableEmployeesRequestedForDND = true;
		await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false,
			views: [nameof("SuitableEmployees"), nameof("AppointmentFilter")]
		}));

		await this.setResourcesClasses(true);
	}

	protected async onTimeAxisHeaderClick({ startDate, endDate }) {
		await this.deselectCurrentEntity();
		await this.schedulerControl.scrollToDate(startDate,  { animate: true, block: "start", edgeOffset: 0 });
	}

	protected attachMouseEventHandlers() {
		this.schedulerControl.element.addEventListener("mousemove", (e) => {
			const element = document.elementFromPoint(e.pageX, e.pageY) as HTMLElement;
			const resourceAtCursor = this.schedulerControl.resolveResourceRecord(element);
			this.hightlightResource(resourceAtCursor);
		}, false);

		this.schedulerControl.element.addEventListener("mouseout", (e) => {
			this.clearResourceHightlight(this.prevHoveredResource);
		}, false);
	}

	protected hightlightResource(resourceAtCursor: SchedulerResourceModel) {
		if (this.prevHoveredResource?.id !== resourceAtCursor?.id) {
			this.clearResourceHightlight(this.prevHoveredResource);
		}
		if (!resourceAtCursor?.id) return;
		const element = this.getResourceElement(resourceAtCursor);
		element?.setAttribute("qp-sch-dragged-over", "true");
		this.prevHoveredResource = resourceAtCursor;
	}

	protected clearResourceHightlight(prevHoveredResource: SchedulerResourceModel) {
		if (!prevHoveredResource?.id) return;
		const element = this.getResourceElement(prevHoveredResource);
		element?.removeAttribute("qp-sch-dragged-over");
		this.prevHoveredResource = null;
	}

	protected getResourceElement(resource: SchedulerResourceModel) {
		return document.querySelector<HTMLElement>(`.b-grid-row[data-id="${resource.id}"]`);
	}

	protected getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord): AppointmentEntity {
		if (record) {
			return this.searchAppointments.getEntry(record.id);
		}
		return this.appointments.getAssignmentOrUnassignedAppointment(assignmentRecord.id, eventRecord.id);
	}

	protected getMenuItems() {
		return {
			copyEvent: false,
			cutEvent: false,
			splitEvent: false,
			removeRow: false,
			editEvent: { text: Labels.ViewAppointment, onItem: this.onViewAppointment.bind(this), cls: "qp-sch-menu", icon: "" },
			deleteEvent: { text: Labels.DeleteAppointment, onItem: this.onDeleteAppointment.bind(this), cls: "qp-sch-menu", icon: "" },
			cloneEvent: { text: Labels.CloneAppointment, onItem: this.onCloneAppointment.bind(this), cls: "qp-sch-menu", icon: "" },
			unassignEvent: { text: Labels.Unassign, onItem: this.onUnassignResource.bind(this), cls: "qp-sch-menu", icon: "" },
		};
	}

	protected processMenuItems({record, eventRecord, resourceRecord, assignmentRecord, items}) {
		const entry = this.getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord);

		items.editEvent.text = Labels.ViewAppointment;
		items.validate = entry.isLocked ? false : { text: entry.isValidatedByDispatcher ? Labels.ClearValidation : Labels.ValidateByDispatcher,
			onItem: this.onValidateAppointment.bind(this), cls: "qp-sch-menu" };
		items.confirm = entry.isLocked ? false : { text: entry.isConfirmed ? Labels.Unconfirm : "Confirm",
			onItem: this.onConfirmAppointment.bind(this), cls: "qp-sch-menu" };
		items.unassignEvent.hidden = entry instanceof SearchAppointmentModel
			|| entry.isLocked || entry.resourceId === AppointmentEmployeeModel.unassignedId;
		items.deleteEvent.hidden = entry.isLocked;

		if (!this.DeleteEnabled()) {
			items.deleteEvent.hidden = true;
		}
		if (!this.UpdateEnabled()) {
			items.validate.hidden = true;
			items.confirm.hidden = true;
			items.unassignEvent.hidden = true;
		}
		if (!this.CloneEnabled()) {
			items.cloneEvent.hidden = true;
		}
	}

	protected async addAppointment() {
		this.dragCreateResourceIDsSet = new Set();
		this.popups.open("new", null, null, "edit");
	}

	protected async onViewAppointment({ record, eventRecord, resourceRecord, assignmentRecord, targetElement, cellElement }) {
		if (eventRecord && assignmentRecord) {
			this.popups.open(eventRecord.id, assignmentRecord.id, targetElement);
			return;
		}

		if (!record) return;

		const searchAppointment = this.searchAppointments.getEntry(record.id);
		if (searchAppointment) {
			await this.popups.open(searchAppointment.appointmentID, searchAppointment.assignmentID, cellElement);
		}
	}

	// TODOL This is not used anymore. Any plans to use it in the future?
	protected async onEditAppointment({ record, eventRecord, resourceRecord, assignmentRecord }) {
		const item = this.getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord);

		this.AppointmentFilter.AppointmentID.updateValue(Number(item.appointmentID));
		let res:ICommandUpdateResult;
		try {
			// Sync the service order type
			res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false, views: [nameof("SelectedAppointment")] }));
		}
		finally {
			this.AppointmentFilter.AppointmentID.updateValue(0);
		}

		this.apiClient.openAppointmentEditor(this.screenID, this.SelectedAppointment.RefNbr.viewName, item.refNbr);
	}

	protected async onCloneAppointment({ record, eventRecord, resourceRecord, assignmentRecord }) {
		const item = this.getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord);
		await this.cloneAppointment(item.appointmentID);
	}

	protected async cloneAppointment(appointmentID: string) {
		if (!this.CloneEnabled()) {
			return false;
		}
		const appointment = this.getAppointment(appointmentID);
		this.MainAppointmentFilter.RefNbr.updateValue(appointment.refNbr);
		this.MainAppointmentFilter.SrvOrdType.updateValue(appointment.srvOrdType);
		try {
			const res = await this.screenService.update(new ServerCommand("CloneAppointment"), new ScreenUpdateParams({ blockPage: false, views: [] }));
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected async onDeleteAppointment({ record, eventRecord, resourceRecord, assignmentRecord }) {
		const item = this.getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord);
		return await this.deleteAppointment(item.appointmentID);
	}

	protected async deleteAppointment(appointmentID: string) {
		if (!this.DeleteEnabled()) {
			return false;
		}
		this.UpdatedAppointment.AppointmentID.updateValue(Number(appointmentID));

		const canAffectSearchResults = this.searchAppointments.getEntry(appointmentID);
		const views = canAffectSearchResults
			? [nameof("ServiceOrders"), nameof("SearchAppointments")]
			: [nameof("ServiceOrders")];

		try {
			const res = await this.screenService.update(new ServerCommand("DeleteAppointment"), new ScreenUpdateParams({ blockPage: false, views: views }));
			if (res.succeeded) {
				this.appointments.removeAppointment(appointmentID);
				if (this.currentAppointment?.appointmentID === appointmentID) {
					await this.deselectCurrentEntity(); // this calls updateCalendar() internally
				}
				else {
					await this.updateCalendar();
				}
			}
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected async onUnassignResource({ eventRecord, resourceRecord, assignmentRecord }) {
		return await this.unassignResource(assignmentRecord.id);
	}

	protected async unassignResource(assignmentID: string) {
		const assignment = this.appointments.getAssignment(assignmentID);
		const res = await this.sendUpdatedAppointment({
			appointmentID: assignment.appointmentID, oldResourceID: assignment.resourceId, newResourceID: null });
		if (!res) return false;

		this.appointments.removeAssignment(assignment.assignmentID);
		await this.updateCalendar();
		return true;
	}

	protected async onConfirmAppointment({ record, eventRecord, resourceRecord, assignmentRecord }) {
		const item = this.getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord);
		return await this.confirmAppointment(item.appointmentID, !item.isConfirmed);
	}

	protected async confirmAppointment(appointmentID: string, confirmed: boolean) {
		return await this.sendUpdatedAppointment({ appointmentID: appointmentID, confirmed: confirmed });
	}

	protected async onValidateAppointment({ record, eventRecord, resourceRecord, assignmentRecord }) {
		const item = this.getEntryFromMenuCommand(record, eventRecord, resourceRecord, assignmentRecord);
		return await this.validateAppointment(item.appointmentID, !item.isValidatedByDispatcher);
	}

	protected async validateAppointment(appointmentID: string, validatedByDispatcher: boolean) {
		return await this.sendUpdatedAppointment({ appointmentID: appointmentID, validatedByDispatcher: validatedByDispatcher });
	}

	protected async onBeforeEventResizeFinalize({ source, context }) {
		context.async = true;
		let res = false;
		this.calendarRedrawSuppressed = true; // prevent excessive flickering
		try {
			res = await this.sendUpdatedAppointment({
				appointmentID: context.eventRecord.id, newBegin: context.startDate, newEnd: context.endDate });
		}
		finally {
			this.calendarRedrawSuppressed = false;
		}
		context.finalize(res);
		if (!res) return;
	}

	protected async onBeforeEventDropFinalize({ source: scheduler, context}) {
		if (!isAppointmentChanged(context.eventRecord, context)) return;

		context.async = true;
		const oldResourceID = context.resourceRecord.id;
		const newResourceID = context.newResource.id;

		this.calendarRedrawSuppressed = true; // prevent excessive flickering

		let res = false;
		try {
			res = await this.sendUpdatedAppointment({
				appointmentID: context.eventRecord.id, newBegin: context.startDate, newEnd: context.endDate,
				newResourceID: newResourceID, oldResourceID: oldResourceID});

			if (newResourceID !== oldResourceID) {
				this.calendarRedrawSuppressed = false; // we need to redraw the calendar to remove the old assignment
				this.updateCalendar();
			}
		}
		finally {
			this.calendarRedrawSuppressed = false;
		}
		context.finalize(res);

		function isAppointmentChanged(event: EventModel, context) {
			if (context.resourceRecord.id !== context.newResource.id) return true;
			if ((event.startDate as Date).toISOString() !== (context.startDate as Date).toISOString()) return true;
			if ((event.endDate as Date).toISOString() !== (context.endDate as Date).toISOString()) return true;
			return false;
		}
	}

	protected async assignUnassignedAppointment(entity: DraggableEntity, resourceId: number, dateBegin: Date, dateEnd: Date) {
		const eventId = (entity as AppointmentEmployeeModel).appointmentID;

		const res = await this.sendUpdatedAppointment({
			appointmentID: eventId,
			newBegin: dateBegin,
			newEnd: dateEnd,
			newResourceID: Number.isNaN(resourceId) ? undefined : resourceId
		});

		if (!res) return false;

		if	(!Number.isNaN(resourceId)) {
			this.appointments.removeFromUnassigned(eventId.toString());
		}
		this.updateCalendar();
		return true;
	}

	protected async addResourceToAppointment(resourceId: number | string, eventId: number | string) {
		return await this.sendUpdatedAppointment({ appointmentID: eventId, newResourceID: resourceId });
	}

	protected async sendUpdatedAppointment(
		request: {
			appointmentID: number | string;
			newBegin?: any;
			newEnd?: any;
			newResourceID?: number | string;
			oldResourceID?: number | string;
			confirmed?: boolean;
			validatedByDispatcher?: boolean;
		}
	) {
		if (!this.UpdateEnabled()) {
			return false;
		}
		const appointment = this.getAppointment(request.appointmentID.toString());

		this.UpdatedAppointment.AppointmentID.updateValue(Number(appointment.appointmentID));
		this.UpdatedAppointment.NewResourceID.updateValue(Number(request.newResourceID ?? 0));
		this.UpdatedAppointment.OldResourceID.updateValue(Number(request.oldResourceID ?? 0));
		this.UpdatedAppointment.NewBegin.updateValue((request.newBegin as Date)?.fromView());
		this.UpdatedAppointment.NewEnd.updateValue((request.newEnd as Date)?.fromView());
		this.UpdatedAppointment.Confirmed.updateValue(request.confirmed);
		this.UpdatedAppointment.ValidatedByDispatcher.updateValue(request.validatedByDispatcher);

		const canAffectSearchResults = this.searchAppointments.getEntry(appointment.appointmentID);
		const views = canAffectSearchResults
			? [nameof("LastUpdatedAppointment"), nameof("LastUpdatedAppointmentFilter"), nameof("SearchAppointments")]
			: [nameof("LastUpdatedAppointment"), nameof("LastUpdatedAppointmentFilter")];
		try {
			const res = await this.screenService.update(new ServerCommand("UpdateAppointment"), new ScreenUpdateParams({ blockPage: false, views: views }));
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected getAppointment(id: string) {
		const appointment = this.appointments.getAppointment(id);
		if (appointment) return appointment;

		return this.searchAppointments.getEntry(id);
	}

	protected async createAppointmentFromSO(entity: ServiceOrderModel, resourceId: number, dateBegin: Date, dateEnd: Date, fromDetail = false) {
		this.MainAppointmentFilter.fieldNames.forEach(fieldName =>
			this.screenService.registerFieldChange(this.MainAppointmentFilter.name,
				fieldName, null, this.MainAppointmentFilter[fieldName]?.value));

		const needRestoreCurrentEntity = this.currentEntity instanceof ServiceOrderModel && this.currentEntity?.orderId === entity.orderId;

		this.MainAppointmentFilter.OnHold.updateValue(false);
		this.MainAppointmentFilter.OpenEditor.updateValue(false);

		this.MainAppointmentFilter.SrvOrdType.updateValue(entity.SrvOrdType?.cellText);
		this.MainAppointmentFilter.SOID.updateValue(Number(entity.SOID?.cellText ?? 0));
		this.MainAppointmentFilter.SODetID.updateValue(fromDetail ? Number(entity.FSSODet__SODetID?.cellText) : 0);
		this.MainAppointmentFilter.ScheduledDateTimeBegin_Date.updateValue(dateBegin.fromView());
		this.MainAppointmentFilter.ScheduledDateTimeBegin_Time.updateValue(dateBegin.fromView());
		this.MainAppointmentFilter.Duration.updateValue(TimeConverter.minutesTohMM((dateEnd.fromView().getTime() - dateBegin.fromView().getTime()) / 1000 / 60)); // eslint-disable-line @typescript-eslint/no-magic-numbers
		this.MainAppointmentFilter.Description.updateValue(fromDetail ? entity.FSSODet__TranDesc?.cellText : entity.DocDesc?.cellText);

		if (!Number.isNaN(resourceId)) {
			this.MainAppointmentFilter.Resources.updateValue(resourceId.toString());
		}

		try {
			this.LastUpdatedAppointmentFilter.AppointmentID.updateValue(0);
			const res = await this.screenService.update(new ServerCommand("ScheduleAppointment"), new ScreenUpdateParams({ blockPage: false,
				views: [nameof("MainAppointmentFilter"), nameof("EditedAppointmentEmployees"), nameof("LastUpdatedAppointment"),
					nameof("LastUpdatedAppointmentFilter")]
			}));
			const appointmentId = this.LastUpdatedAppointmentFilter?.AppointmentID?.value;
			if (!appointmentId) {
				this.reportErrorsFromEditedAppointment();
				return 0;
			}

			this.serviceOrders.scheduleEntry(fromDetail ? entity.serviceId : entity.orderId);
			this.updateSOPane(false);
			if (!fromDetail && needRestoreCurrentEntity) {
				const appointment = this.appointments.getAssignmentsByAppointmentId(appointmentId.toString())[0];
				if (appointment) {
					await this.ReleaseUIControl();
					await this.selectCurrentEntity(appointment);
				}
			}

			return appointmentId;
		}
		catch (error) {
			this.reportErrorsFromEditedAppointment();
			return 0;
		}
	}

	protected async reportErrorsFromEditedAppointment() {
		const fields = Object.values(this.MainAppointmentFilter);
		fields.forEach(field => {
			if (field.error?.length > 0) {
				showInformer(field.error, "error");
			}
		});
	}

	protected async createApointmentFromPopup(putOnHold = false, openEditor = false) {
		await this.ReleaseUIControl();
		this.LastUpdatedAppointmentFilter.AppointmentID.updateValue(0);
		this.MainAppointmentFilter.OnHold.updateValue(putOnHold);
		this.MainAppointmentFilter.OpenEditor.updateValue(openEditor);
		const res = await this.screenService.update(new ServerCommand("ScheduleAppointment"), new ScreenUpdateParams({ blockPage: false,
			views: [nameof("MainAppointmentFilter"), nameof("LastUpdatedAppointment"), nameof("LastUpdatedAppointmentFilter")]
		}));
		if (openEditor) {
			this.popups.close();
			this.popups.resetCreateAppointmentForm();
			return 0;
		}
		const appointmentId = this.LastUpdatedAppointmentFilter?.AppointmentID?.value;
		if (!appointmentId) return 0;

		this.popups.close();
		return appointmentId;
	}

	protected async onBranchChanged() {
		//
	}

	protected async ReleaseUIControl() {
		await new Promise(resolve => setTimeout(resolve, 1));
	}

	private CloneEnabled() : boolean {
		return this.CloneAppointment && this.CloneAppointment.enabled;
	}

	private DeleteEnabled() : boolean {
		return this.DeleteAppointment && this.DeleteAppointment.enabled;
	}

	private UpdateEnabled() : boolean {
		return this.UpdateAppointment && this.UpdateAppointment.enabled;
	}

	private CreateEnabled() : boolean {
		return this.ScheduleAppointment && this.ScheduleAppointment.enabled;
	}
}


export const nameof = (name: Extract<keyof FS300300, string>): string => name;

export class DragHelperEventInfo {
	name: string;
	entity?: DraggableEntity;
	date?: Date;
}

type SplitterState = "collapsed-first" | "collapsed-second" | "normal";

class SplitterPreferences {
	state?: SplitterState;
	position?: number;
	toString() { return `s: ${this.state} p: ${this.position}`; }

	constructor(preferences: SplitterPreferences = null) {
		if (preferences === null) return;
		this.state = preferences.state;
		this.position = preferences.position;
	}
}

class PreferenceData {
	horizontalModeSplitter = new SplitterPreferences();
	verticalModeSplitter = new SplitterPreferences();
	periodKind = PeriodKind.Day;
	toString() { return `h: (${this.horizontalModeSplitter.toString()}) v: (${this.verticalModeSplitter.toString()})`; }

	constructor(preferences: PreferenceData = null) {
		if (preferences === null) return;
		this.horizontalModeSplitter = new SplitterPreferences(preferences.horizontalModeSplitter);
		this.verticalModeSplitter = new SplitterPreferences(preferences.verticalModeSplitter);
		this.periodKind = preferences.periodKind;
	}
	// TODO: add vert/hor mode
	// TODO: add business hours/normal
	// TODO: add day/month/week filter???
}

class FS300300_Preferences extends PreferenceBase {
	preferences = new PreferenceData();

	constructor(preferences: PreferenceData = null) {
		super();
		this.type = "FS300300";
		if (preferences === null) return;
		this.preferences = new PreferenceData(preferences);
	}
}

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
