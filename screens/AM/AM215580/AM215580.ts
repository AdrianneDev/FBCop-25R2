/* eslint-disable @stylistic/brace-style */
/* eslint-disable @typescript-eslint/member-ordering */

import { ColumnStore, ColumnStoreConfig, DateHelper, EventModel, GridColumnConfig, MenuItemConfig, PresetManager, PresetStore, ProjectModel, ResourceModel, SchedulerPro, SchedulerProConfig, TreeColumnConfig, ViewPresetConfig, ViewPresetHeaderRow } from "@bryntum/schedulerpro";
import { Aurelia, autoinject, bindable, BindingEngine, TemplatingEngine, Disposable, ElementEvents, computedFrom } from "aurelia-framework";
import {
	createCollection, createSingle, graphInfo, PXPageLoadBehavior, PXScreen, QpButtonCustomElement, QpGridCustomElement, QpPanelCustomElement,
	QpGridEventArgs,
	ISplitterConfig, QpSplitterCustomElement,
	NewMenuButton, QpToolBarCustomElement,
	IQpDialogConfig,
	ContainerRepaintedEvent, GridFastFilterVisibility, GridFilterBarVisibility, GridPagerMode, GridPreset, IButtonControlConfig,
	ICheckBoxControlConfig, ICommandUpdateResult, IGridViewCollectionConfig,
	IToolBarControlConfig, PXActionState, PXView, PXViewCollectionClass, ScreenUpdateParams
} from "client-controls";
import { DataHandler } from "./data-handler";
import { Renderer } from "./renderer";
import { ProdOrder, PeriodKind, ProdOpersMatls, ProdOrderCalendarEvent, ProdOrderCalendarResource, ResourceEventType, SelectionFilter, AMProdItemPopup } from "./view-models";
import { Formats, Labels, nameof } from "./Descriptors";


@graphInfo({ graphType: "PX.Objects.AM.ProdOrderDiagram", primaryView: "SelectionFilter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
@autoinject
export class AM215580 extends PXScreen {
	// #region Element IDs
	readonly ordersBrickLeftID = "ordersBrickLeftID";
	readonly ordersBrickRightID = "ordersBrickRightID";
	readonly refreshButtonID = "prodOrdersSelectedGridId_topBarrefresh";
	readonly allRecordsFilter = "00000000-0000-0000-0000-000000000000";
	readonly orderFilterPopupPanelID = "orderFilterPanelId";
	readonly orderPopupID = "ProdItemPopup";
	// #endregion

	// #region Server Actions
	readonly selectOrderActionName = "selectOrder";
	readonly processPopupActionName = "processPopup";
	readonly saveOrderActionName = "SaveOrder";
	readonly scheduleOrderActionName = "ScheduleOrder";
	readonly firmOrderActionName = "FirmOrder";

	SaveOrder: PXActionState;
	ScheduleOrder: PXActionState;
	FirmOrder: PXActionState;
	RedirectPO: PXActionState;
	// #endregion

	// #region Element Configs
	private rightToolBarConfig: Partial<IToolBarControlConfig> = {
		id: "rightToolBarConfigID",
		items: {
			periodDay: {
				config: {
					text: Labels.Hours, commandName: "periodHour", cssClass: "qp-sch-time-period qp-sch-period-hour",
					toggleMode: this.currentPeriodKind === PeriodKind.Hour
				}
			},
			periodWeek: {
				config: {
					text: Labels.Days, commandName: "periodDay", cssClass: "qp-sch-time-period qp-sch-period-day",
					toggleMode: this.currentPeriodKind === PeriodKind.Day
				}
			},
			periodMonth: {
				config: {
					text: Labels.Weeks, commandName: "periodWeek", cssClass: "qp-sch-time-period qp-sch-period-week",
					toggleMode: this.currentPeriodKind === PeriodKind.Week
				}
			},
		}
	};

	private displayMatlRemainingChkBoxConfig: Partial<ICheckBoxControlConfig> = {
		label: Labels.DisplayMatlRemaining,
		textAlign: "right",
		enabled: true,
		hidden: false
	};

	private orderFilterBtnConfig: IButtonControlConfig = {
		id: `order_filter_btn`,
		enabled: true,
		displayIconAndText: true,
		images: {
			normal: "svg:main@search"
		},
		action: this.selectOrderActionName
	};

	private popupToolBarConfig: Partial<IToolBarControlConfig | { actionsAttached: boolean }> = {
		id: "orderPopupToolBarID",
		canOverflow: false,
		autoPostBack: true,
		actionsAttached: false,
		items: {
			SaveOrder: {
				config: {
					...NewMenuButton(this.saveOrderActionName),
					commandName: this.saveOrderActionName,
					images: { normal: "main@Save" },
					toolTip: Labels.Save,
					text: Labels.Save,
					isSystem: true,
					showInToolbar: true,
					target: this.element,
					hidden: false,
				}
			},
			FirmOrder: {
				config: {
					...NewMenuButton(this.firmOrderActionName),
					commandName: this.firmOrderActionName,
					text: Labels.FirmOrder,
					showInToolbar: true,
					target: this.element,
					hidden: false,
					isSystem: true
				}
			},
			ScheduleOrder: {
				config: {
					...NewMenuButton(this.scheduleOrderActionName),
					commandName: this.scheduleOrderActionName,
					text: Labels.ScheduleOrder,
					showInToolbar: true,
					target: this.element,
					hidden: false
				}
			},
		}
	};

	private orderFilterPopupConfig: Partial<IQpDialogConfig> = {
		id: "orderFilterPanelId",
		hideMaximizer: true,
		hideCloseButton: true,
		context: this,
		height: "300px",
		templateId: "orderFilterPanelId"
	};

	private ordersSplitterConfig: ISplitterConfig = {
		split: "height",
		initialSplit: "50%",
		initialState: "normal",
		firstHeader: Labels.OrdersAndOpers,
		secondHeader: Labels.OpersAndMatls,
		fading: true,
	};

	private ordersGridSettings: IGridViewCollectionConfig = {
		allowFilter: true,
		showFilterBar: GridFilterBarVisibility.OnDemand,
		allowStoredFilters: true,
		pageSize: 0,
		hidden: false,
		showFastFilter: GridFastFilterVisibility.False,
		fastFilterByAllFields: false,
		allowRowSelect: true
	};

	private opersAndMatlsGridSettings: IGridViewCollectionConfig = {
		preset: GridPreset.ReadOnly,
		actionsConfig: {
			adjust: { hidden: false },
			exportToExcel: { hidden: false },
			refresh: { hidden: true }
		},
		pagerMode: GridPagerMode.InfiniteScroll,
		allowStoredFilters: false,
		pageSize: 0,
		showFastFilter: GridFastFilterVisibility.False,
		fastFilterByAllFields: false,
		hidden: false,
		allowRowSelect: true,
		syncPosition: true,
		allowSort: false
	};
	// #endregion

	// #region Element Refs
	@bindable prodOrdersSelectedGrid: QpGridCustomElement;
	@bindable prodOperMatlsGrid: QpGridCustomElement;
	@bindable ordersSplitter: QpSplitterCustomElement;
	@bindable orderFilterBtn: QpButtonCustomElement;
	@bindable orderPopup: QpPanelCustomElement;
	@bindable orderPopupToolBar: QpToolBarCustomElement;

	orderContainer: HTMLElement;
	storedFilterBar: HTMLElement;
	// #endregion

	// #region Data Members
	SelectionFilter = createSingle(SelectionFilter);
	ProdOrdersSelected = createCollection(ProdOrder, this.ordersGridSettings);
	ProdOpersMatls = createCollection(ProdOpersMatls, this.opersAndMatlsGridSettings);
	SchedulerResources = createCollection(ProdOrderCalendarResource);
	SchedulerEvents = createCollection(ProdOrderCalendarEvent);

	OrderTemplate = createCollection(ProdOrder);
	OperationTemplate = createSingle(ProdOpersMatls);
	MaterialTemplate = createSingle(ProdOpersMatls);

	ProdItemPopup = createSingle(AMProdItemPopup);
	// #endregion

	// #region Scheduler Presets
	readonly HoursPresetID = "qp-hourAndDay";
	readonly DaysPresetID = "qp-weekAndDay";
	readonly WeeksPresetID = "qp-monthAndYear";

	protected getHoursPreset(): Partial<ViewPresetConfig> {
		return PresetManager.getById(this.HoursPresetID) ?? {
			displayDateFormat: "ll HH:mm",
			shiftIncrement: 1,
			shiftUnit: "hour",
			defaultSpan: 8,
			timeResolution: { unit: "minute", increment: 60 },
			headers: [
				{ unit: "day", dateFormat: Formats.TimeAxisDay, headerCellCls: "qp-time-axis-cell-hour-h1" },
				{ unit: "hour", dateFormat: Formats.TimeAxisHour, headerCellCls: "qp-time-axis-cell-hour-h2" }
			],
			id: this.HoursPresetID,
			base: "hourAndDay",
		};
	}

	protected getDaysPreset(): Partial<ViewPresetConfig> {
		return PresetManager.getById(this.DaysPresetID) ?? {
			displayDateFormat: "ll HH:mm",
			shiftIncrement: 1,
			shiftUnit: "day",
			defaultSpan: 8,
			timeResolution: { unit: "day", increment: 1 },
			headers: [
				{
					unit: "week", align: "start", headerCellCls: "qp-time-axis-cell-day-h1",
					renderer: (startDate: Date, endDate: Date) => {
						if (startDate.getMonth() === endDate.getMonth()) {
							const s1 = DateHelper.format(startDate, Formats.H1DateRangeSameMonthP1);
							const s2 = DateHelper.format(endDate, Formats.H1DateRangeSameMonthP2);
							return `${s1}-${s2}`;
						}
						const s1 = DateHelper.format(startDate, Formats.H1DateRangeDiffMonthP1);
						const s2 = DateHelper.format(endDate, Formats.H1DateRangeDiffMonthP2);
						return `${s1} - ${s2}`;
					}
				},
				{
					unit: "day", headerCellCls: "qp-time-axis-cell-day-h2",
					renderer: (startDate: Date) =>
						`<span><span>${startDate.getDate()}</span> ${DateHelper.format(startDate, Formats.WeekdayOnly)}</span>`
				},
			] as ViewPresetHeaderRow[],
			id: this.DaysPresetID,
			base: "dayAndWeek"
		};
	}

	protected getWeeksPreset(): Partial<ViewPresetConfig> {
		return PresetManager.getById(this.WeeksPresetID) ?? {
			displayDateFormat: "ll HH:mm",
			shiftIncrement: 1,
			shiftUnit: "week",
			defaultSpan: 8,
			timeResolution: { unit: "week", increment: 1 },
			headers: [
				{ unit: "month", dateFormat: Formats.MonthAndYear, headerCellCls: "qp-time-axis-cell-week-h1" },
				{
					unit: "week", headerCellCls: "qp-time-axis-cell-week-h2",
					renderer: (startDate: Date, endDate: Date) => {
						if (startDate.getMonth() === endDate.getMonth()) {
							return `${DateHelper.format(startDate, Formats.H2DateRangeSameMonthP1)}-${DateHelper.format(endDate, Formats.H2DateRangeSameMonthP2)}`;
						}
						return `${DateHelper.format(startDate, Formats.H2DateRangeDiffMonthP1)}-${DateHelper.format(endDate, Formats.H2DateRangeDiffMonthP2)}`;
					}
				},
			],
			id: this.WeeksPresetID,
			base: "weekAndMonth"
		};
	}
	private get isPeriodHour() { return this.currentPeriodKind === PeriodKind.Hour; }
	private get isPeriodDay() { return this.currentPeriodKind === PeriodKind.Day; }
	private get isPeriodWeek() { return this.currentPeriodKind === PeriodKind.Week; }
	private get currentPeriodKind() {
		const currentPresetId = (<PresetStore> this.orderCalendar?.presets)?.getAt(this.orderCalendar?.zoomLevel ?? 0)?.id;
		let kind = this.SelectionFilter?.periodKindValue;
		if (currentPresetId) {
			switch (currentPresetId) {
				case this.WeeksPresetID:
					kind = PeriodKind.Week;
					break;
				case this.DaysPresetID:
					kind = PeriodKind.Day;
					break;
				default:
					kind = PeriodKind.Hour;
					break;
			}
		}
		return kind;
	}
	private get currentPreset() {
		const kind = this.currentPeriodKind;
		return kind === PeriodKind.Hour ? this.getHoursPreset()
			: kind === PeriodKind.Day ? this.getDaysPreset()
				: this.getWeeksPreset();
	}

	protected async setHourPeriod() {
		if (this.isPeriodHour) return;
		this.SelectionFilter.viewController.fieldValueChanged("PeriodKind", PeriodKind.Hour, this.SelectionFilter.periodKindValue, "", true);
		this.orderCalendar.viewPreset = PresetManager.getById(this.getHoursPreset().id);
	}

	protected async setDayPeriod() {
		if (this.isPeriodDay) return;
		this.SelectionFilter.viewController.fieldValueChanged("PeriodKind", PeriodKind.Day, this.SelectionFilter.periodKindValue, "", true);
		this.orderCalendar.viewPreset = PresetManager.getById(this.getDaysPreset().id);
	}

	protected async setWeekPeriod() {
		if (this.isPeriodWeek) return;
		this.SelectionFilter.viewController.fieldValueChanged("PeriodKind", PeriodKind.Week, this.SelectionFilter.periodKindValue, "", true);
		this.orderCalendar.viewPreset = PresetManager.getById(this.getWeeksPreset().id);
	}

	protected async onPresetChange({ source: Scheduler, startDate, centerDate, endDate, from, to }) {
		[this.periodStart, this.periodEnd] = this.data.getPeriodStartEndDates();
		const [newStart, newEnd] = this.data.offsetStartEndDatesByZoomLevel(new Date(this.periodStart), new Date(this.periodEnd), this.currentPeriodKind);
		const calendar = this.orderCalendar;
		if (!calendar) return;
		calendar.setTimeSpan(newStart, newEnd);
		this.onPresetSwitch();
	}

	protected onPresetSwitch() {
		document.querySelector(".qp-sch-period-hour")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodHour);
		document.querySelector(".qp-sch-period-day")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodDay);
		document.querySelector(".qp-sch-period-week")?.classList.toggle("qp-sch-selected-time-period", this.isPeriodWeek);
	}
	// #endregion

	// #region Init
	constructor(
		public element: Element,
		private preferencesService: any,
		private bindingEngine: BindingEngine,
		private templatingEngine: TemplatingEngine,
		private au: Aurelia,
	) {
		super();
		PresetManager.registerPreset(this.HoursPresetID, this.getHoursPreset());
		PresetManager.registerPreset(this.DaysPresetID, this.getDaysPreset());
		PresetManager.registerPreset("qp-weekAndMonth", this.getWeeksPreset());
	}

	// PXScreen Implementation
	protected onAfterInitialize() {
		const toolBarConfig: any = this.popupToolBarConfig;
		toolBarConfig.items[this.saveOrderActionName].config.state = this.SaveOrder;
		toolBarConfig.items[this.scheduleOrderActionName].config.state = this.ScheduleOrder;
		toolBarConfig.items[this.firmOrderActionName].config.state = this.FirmOrder;
		this.attachToolbarHandling();
	}

	onActionsUpdate() {
		super.onActionsUpdate();
		this.syncOrderToolbarActions();
	}

	protected attachToolbarHandling() {
		this.domEvents = new ElementEvents(this.element);
		this.domEvents.subscribe("buttonpressed", (e: CustomEvent) => this.processToolBarClick(e));
	}

	protected syncOrderToolbarActions() {
		const toolBarConfig: any = this.popupToolBarConfig;
		if (!toolBarConfig) return;
		toolBarConfig.items[this.saveOrderActionName].config.disabled = !this.SaveOrder.enabled;
		toolBarConfig.items[this.saveOrderActionName].config.hidden = !this.SaveOrder.visible;
		toolBarConfig.items[this.scheduleOrderActionName].config.disabled = !this.ScheduleOrder.enabled;
		toolBarConfig.items[this.scheduleOrderActionName].config.hidden = !this.ScheduleOrder.visible;
		toolBarConfig.items[this.firmOrderActionName].config.disabled = !this.FirmOrder.enabled;
		toolBarConfig.items[this.firmOrderActionName].config.hidden = !this.FirmOrder.visible;
		toolBarConfig.items[this.firmOrderActionName].config.text = this.FirmOrder.text;
		this.orderPopupToolBar?.setupViewModel();
	}

	protected setFilterIconText() {
		const orderFilterBtnInner = document.querySelector(`#${this.orderFilterBtnConfig.id} .btn-inner`);
		if (!this.orderFilterBtn || !orderFilterBtnInner) return;
		const iconElem = orderFilterBtnInner.querySelector("qp-icon");
		const textElem : HTMLElement = orderFilterBtnInner.querySelector("span");
		if (!iconElem || !textElem) return;
		orderFilterBtnInner.removeChild(iconElem);
		orderFilterBtnInner.removeChild(textElem);
		textElem.textContent = this.SelectionFilter?.orderID;
		textElem.style.paddingInlineEnd = "10px";
		orderFilterBtnInner.append(textElem, iconElem);
	}

	async attached() {
		await super.attached();

		this.storedFilterBar = document.querySelector(".qp-sch-grid-container-inner .grid-right-toolbar-cont");
		this.onPresetSwitch();
		this.eventSubscriptions.push(this.eventAggregator.subscribe(
			ContainerRepaintedEvent.EventName,
			(callbackCompletedEvent?: ContainerRepaintedEvent) => {
				const toolBarConfig: any = this.popupToolBarConfig;
				const foundOrderPopup = callbackCompletedEvent?.element?.querySelector(`#${this.orderPopupID}`);
				if (foundOrderPopup && !!this.orderPopupToolBar) {
					this.orderPopupToolBar.config = toolBarConfig;
					this.orderPopupToolBar.setupViewModel();
				}
			}));

		this.setFilterIconText();
		this.bindingEngine.propertyObserver(this.SelectionFilter, "orderID").subscribe((newValue: any, oldValue: any) => {
			if (newValue === oldValue) return;
			this.setFilterIconText();
		});
	}

	detached() {
		super.detached();
		this.eventSubscriptions.forEach(s => s.dispose());
		this.domEvents?.disposeAll();
		this.renderer.eventObservers?.forEach(t => t?.forEach(y => y?.disconnect()));
	}
	// #endregion

	// #region Props
	eventSubscriptions: Disposable[] = [];
	private domEvents: ElementEvents;
	Labels = Labels;

	private periodStart: Date;
	private periodEnd: Date;

	// #region Scheduler Refs
	@computedFrom("focusedEntity")
	get focusedOrder() {
		if (this.focusedEntity == null || this.focusedEntity instanceof ProdOrder) return this.focusedEntity as ProdOrder | null;
		return this.data.getOrder(this.focusedEntity.orderID);
	}

	@bindable private focusedEntity: ProdOrder | ProdOpersMatls | null;
	async focusedEntityChanged(newVal: ProdOrder | null, oldVal: ProdOrder | null) {
		this.orderCalendar?.suspendEvents();
		this.orderCalendar?.resourceStore?.records?.forEach(record => {
			this.orderCalendar?.repaintEventsForResource(record as ResourceModel);
		});
		this.orderCalendar?.resumeEvents();
	}

	private orderCalendar: SchedulerPro | null;
	// #endregion

	private data = new DataHandler({
		getActiveEntity: () => this.focusedEntity,
		datesFilter: this.SelectionFilter,
		resourcesView: this.SchedulerResources,
		eventsView: this.SchedulerEvents,
		ordersView: this.ProdOrdersSelected,
		opersMatlsView: this.ProdOpersMatls
	});

	private renderer = new Renderer({
		data: this.data,
		isPeriodMonth: () => this.isPeriodWeek,
		getScheduler: () => this.orderCalendar,
		getActiveEntity: () => this.focusedEntity,
		getActiveOrder: () => this.focusedOrder,
		ordersEventView: () => this.ProdOrdersSelected,
		opersMatlsEventsView: () => this.ProdOpersMatls
	});
	// #endregion

	// #region Scheduler Init/Update
	protected getCalendarConfig(container: HTMLElement): Partial<SchedulerProConfig> {
		const [periodStartDate, periodEndDate] = this.data.getPeriodStartEndDates();
		const columns: ColumnStore | Partial<GridColumnConfig>[] | Partial<ColumnStoreConfig> | Partial<TreeColumnConfig> = [{
			type: "tree", field: "name", text: Labels.OrdersAndOpers, autoWidth: true,
			renderer: this.renderer.calendarResourceRenderer.bind(this.renderer)
		}];

		const config: Partial<SchedulerProConfig> = {
			appendTo: container,
			startDate: periodStartDate,
			endDate: periodEndDate,
			visibleDate: this.focusedOrder?.startDate ? { date: this.focusedOrder?.startDate, block: "center" } : null,
			snap: true,
			enableEventAnimations: false,
			createEventOnDblClick: false,
			cls: "qp-sch-events",
			barMargin: 5,
			resourceMargin: this.renderer.getOperationRowMargin(),
			columns: columns,
			presets: [this.getHoursPreset(), this.getDaysPreset(), this.getWeeksPreset()],
			viewPreset: this.currentPreset,
			timeAxis: { continuous: false, },
			onDragCreateStart: () => false,
			onBeforeEventAdd: () => false,
			onBeforeEventResize: () => false,
			onSelectionChange: () => false,
			onEventClick: this.onEventClick.bind(this),
			onEventDblClick: () => false,
			onBeforeCellEditStart: () => false,
			onGridRowBeforeDragStart: () => false,
			onCellClick: this.onResourceGridCellClick.bind(this),
			onPresetChange: this.onPresetChange.bind(this),
			zoomKeepsOriginalTimespan: true,
			selectionMode: {
				row: true
			},
			resourceColumns: {
				scrollable: true
			},
			project: new ProjectModel({}),
			milestoneLayoutMode: "default",
			features: {
				cellMenu: false,
				cellTooltip: false,
				cellCopyPaste: false,
				columnRename: false,
				eventMenu: {
					processItems: this.processMenuItems.bind(this),
				},
				headerMenu: false,
				resourceMenu: false,
				scheduleMenu: false,
				timeAxisHeaderMenu: false,
				nonWorkingTime: true,
				resourceTimeRanges: true,
				eventTooltip: false,
				eventEdit: false,
				eventDrag: false,
				eventDragCreate: {
					allowResizeToZero: false,
					showExactResizePosition: true,
					showTooltip: true,
				},
				eventResize: false,
				timeRanges: {
					showCurrentTimeLine: false,
					showHeaderElements: false,
					enableResizing: false
				},
				scheduleTooltip: false,
				stickyEvents: true,
				tree: true,
				dependencies: {
					disabled: false,
					allowCreate: false,
					highlightDependenciesOnEventHover: true,
					drawOnScroll: true,
					renderer: this.renderer.eventDependencyRenderer.bind(this.renderer)
				},
			},
			eventRenderer: this.renderer.calendarEventRenderer.bind(this.renderer)
		};
		return config;
	}

	protected async attachCalendar() {
		if (!this.SelectionFilter?.OrderTypeSelected || !this.SelectionFilter?.ProdOrdIDSelected) return; // still waiting for the data to load from the server

		const orderProject = await this.data.createOrdersProject();
		[this.periodStart, this.periodEnd] = this.data.getPeriodStartEndDates();

		const oldOrderCalendar = this.orderCalendar;
		const orderConfig = this.getCalendarConfig(this.orderContainer);
		this.orderCalendar = new SchedulerPro(orderConfig);
		this.orderCalendar.project = orderProject;

		const [newStart, newEnd] = this.data.offsetStartEndDatesByZoomLevel(new Date(this.periodStart), new Date(this.periodEnd), this.currentPeriodKind);
		this.orderCalendar.setTimeSpan(newStart, newEnd);
		oldOrderCalendar?.destroy();
	}

	protected async updateCalendar() {
		if (!this.orderCalendar) {
			this.attachCalendar();
		}
		else {
			this.data.startNextGeneration();

			const ordersProject = await this.data.createOrdersProject();
			const [newPeriodStart, newPeriodEnd] = this.data.getPeriodStartEndDates();

			const datesChanged = this.periodStart !== newPeriodStart || this.periodEnd !== newPeriodEnd;
			this.periodStart = newPeriodStart;
			this.periodEnd = newPeriodEnd;

			this.orderCalendar.suspendEvents();

			this.orderCalendar.project = ordersProject;

			if (datesChanged) {
				const [newStart, newEnd] = this.data.offsetStartEndDatesByZoomLevel(new Date(this.periodStart), new Date(this.periodEnd), this.currentPeriodKind);
				this.orderCalendar.setTimeSpan(newStart, newEnd);
			}
			if (this.orderCalendar.viewPreset !== this.currentPreset) {
				this.orderCalendar.viewPreset = this.currentPreset;
			}

			this.orderCalendar.renderContents();
			this.orderCalendar.resumeEvents();
		}
	}
	// #endregion

	// #region Elements Events
	protected onSplitterChanged(args: any = null) {
		const ordersSplitterCollapsed = this.ordersSplitter?.getSplitterState() === "collapsed-first";
		this.orderContainer.querySelector(".b-grid-header-container")?.classList.toggle("hidden", ordersSplitterCollapsed);
	}

	protected async opersMatlsDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!this.data || !this.renderer) return;
		if (!this.orderCalendar) {
			await this.attachCalendar();
			return;
		}

		await this.updateCalendar();
	}

	protected async onOrdersFilterChanged(args: QpGridEventArgs) {
		if (!this.data || !this.renderer) return;
		await this.performFullRefresh();
	}

	displayRemainingMaterialsChanged(changeEvent: Event) {
		this.SelectionFilter.DisplayMatlRemaining.updateValue((<any>changeEvent.target).checked || false);
		this.SelectionFilter.DisplayMatlRemaining.applyOptions();
	}

	protected async processToolBarClick(e: CustomEvent) {
		const btnConfig = e.detail?.config;
		const action = btnConfig?.commandName;
		let promise: Promise<boolean> | Promise<void> | Promise<boolean | void> | null = null;

		let processed = true;
		switch (action) {
			case "periodHour": promise = this.setHourPeriod(); break;
			case "periodDay": promise = this.setDayPeriod(); break;
			case "periodWeek": promise = this.setWeekPeriod(); break;
			case "refresh": promise = this.performFullRefresh(); break;
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
	// #endregion

	// #region Scheduler Events
	protected async processMenuItems({ resourceRecord, eventRecord, items, targetElement }: { items: Record<string, Partial<MenuItemConfig> | boolean | null>; eventRecord: EventModel; targetElement: HTMLElement; resourceRecord: ResourceModel }) {
		items.copyEvent = false;
		items.cutEvent = false;
		items.splitEvent = false;
		items.removeRow = false;
		items.deleteEvent = false;
		items.unassignEvent = false;
		items.editEvent = { text: Labels.ViewEvent, onItem: this.onViewEventClick.bind(this), cls: "qp-sch-menu", icon: "" };
		items.scheduleorder = { text: Labels.ScheduleOrder, onItem: this.onScheduleEventClick.bind(this), cls: "qp-sch-menu", icon: "" };
		items.firmorder = { text: Labels.FirmOrder, onItem: this.onFirmEventClick.bind(this), cls: "qp-sch-menu", icon: "" };

		this.updateActiveOrder(eventRecord);
		const eventEntity = this.data.getResourceEventEntity(eventRecord);
		const order = this.data.getOrder(eventEntity?.orderID);
		const isFirmed = order?.isFirm;
		const isScheduled = order?.isScheduled;
		const schedulable = order?.isSchedulable;
		const canSchedule = schedulable && !isFirmed;

		if (typeof items.scheduleorder === "object") {
			items.scheduleorder.hidden = !this.ScheduleOrder?.visible || eventEntity instanceof ProdOpersMatls;
			items.scheduleorder.disabled = !canSchedule || eventEntity instanceof ProdOpersMatls;
		}

		if (typeof items.firmorder === "object") {
			const text = isFirmed ? Labels.UndoFirmOrder : Labels.FirmOrder;
			items.firmorder.text = text;
			items.firmorder.hidden = !this.FirmOrder?.visible || eventEntity instanceof ProdOpersMatls;
			items.firmorder.disabled = !isScheduled || !schedulable || eventEntity instanceof ProdOpersMatls;
		}
	}

	protected async onViewEventClick({ record, eventRecord }) {
		const item = this.data.getResourceEventEntity(eventRecord);
		const eventType = this.data.getEventType(eventRecord);

		const action = this.processPopupActionName;
		let views = [];
		switch (eventType) {
			case ResourceEventType.Order:
				views = [nameof("ProdItemPopup")];
				break;
			case ResourceEventType.Operation:
				views = [nameof("OperationTemplate")];
				break;
			case ResourceEventType.Material:
				views = [nameof("MaterialTemplate")];
				break;
			default:
				return undefined;
		}

		this.SelectionFilter.PopupEventType.updateValue(eventType);
		this.SelectionFilter.PopupOrderType.updateValue(item?.getValue("OrderType"));
		this.SelectionFilter.PopupProdOrdID.updateValue(item?.getValue("ProdOrdID"));
		if (item instanceof ProdOpersMatls) {
			const operMatl = item as ProdOpersMatls;
			this.SelectionFilter.PopupOperMatlLineID.updateValue(operMatl?.getValue("OperMatlLineID"));
		}

		let res: ICommandUpdateResult;
		try {
			res = await this.screenService.update(action, new ScreenUpdateParams({ blockPage: false, views: views }));
		}
		finally {
			//
		}
		return res?.succeeded ?? false;
	}

	protected async onScheduleEventClick({ record, eventRecord }) {
		const item = this.data.getResourceEventEntity(eventRecord);
		const eventType = this.data.getEventType(eventRecord);

		this.SelectionFilter.PopupEventType.updateValue(ResourceEventType.Order);
		this.SelectionFilter.PopupOrderType.updateValue(item?.getValue("OrderType"));
		this.SelectionFilter.PopupProdOrdID.updateValue(item?.getValue("ProdOrdID"));
		this.SelectionFilter.PopupOperMatlLineID.updateValue(null);
		try {
			await this.performManualRefresh([nameof("SelectionFilter")]);
			this.ScheduleOrder.press();
		}
		finally { /* empty */ }
	}

	protected async onFirmEventClick({ record, eventRecord }) {
		const item = this.data.getResourceEventEntity(eventRecord);
		const eventType = this.data.getEventType(eventRecord);

		this.SelectionFilter.PopupEventType.updateValue(ResourceEventType.Order);
		this.SelectionFilter.PopupOrderType.updateValue(item?.getValue("OrderType"));
		this.SelectionFilter.PopupProdOrdID.updateValue(item?.getValue("ProdOrdID"));
		this.SelectionFilter.PopupOperMatlLineID.updateValue(null);
		try {
			await this.performManualRefresh([nameof("SelectionFilter")]);
			this.FirmOrder.press();
		}
		finally { /* empty */ }
	}

	protected async onEventClick({ eventRecord, event, resourceRecord }: { eventRecord: EventModel; event: MouseEvent; resourceRecord: ResourceModel }) {
		const targetElem = event?.target as HTMLElement;
		await this.updateActiveOrder(eventRecord);
		const resourceEvent = this.data.getResourceEventEntity(eventRecord);
		if (resourceEvent && this.focusedEntity !== resourceEvent) this.focusedEntity = resourceEvent;
		else this.focusedEntity = null;

		let fieldElement = targetElem?.hasAttribute("sch-field") ? targetElem : null;
		if (!fieldElement && targetElem?.parentElement?.hasAttribute("sch-field")) {
			fieldElement = targetElem.parentElement;
		}

		if (fieldElement) this.handleFieldClickOnEvent(fieldElement);

		this.scrollToEventView(resourceRecord);
	}

	protected async onResourceGridCellClick({ record, event }: { record: ResourceModel; event: MouseEvent }) {
		const target = event?.target as HTMLElement;

		const collapseBtn = target?.classList?.contains("qp-chevron-icon") ? target
			: target?.parentElement?.classList?.contains("qp-chevron-icon") ? target.parentElement : undefined;
		if (collapseBtn) {
			await this.toggleResourceCollapse(record, collapseBtn);
			return;
		}

		await this.updateActiveOrder(record);
		const resourceEvent = this.data.getResourceEventEntity(record);
		if (resourceEvent && this.focusedEntity !== resourceEvent) this.focusedEntity = resourceEvent;
		else this.focusedEntity = null;
		this.scrollToEventView(record);
	}

	protected async toggleResourceCollapse(resource : ResourceModel, collapseTarget: HTMLElement) {
		const isExpanded = resource.isExpanded(this.orderCalendar.resourceStore);
		this.data.toggleOrderCollapsedState(resource?.id?.toString(), !isExpanded);
		await this.orderCalendar.toggleCollapse(resource);
		await new Promise(resolve => setTimeout(resolve, 1));
	}

	protected async scrollToEventView(resource: ResourceModel) {
		const eventEntity = this.data?.getResourceEventEntity(resource);
		if (!eventEntity) return;

		const eventObj = this.orderCalendar?.eventStore?.getEventsForResource(resource)?.find(t => true);
		if (eventObj) await this.orderCalendar?.scrollResourceEventIntoView(resource, eventObj);
	}
	// #endregion

	// #region Helper Functions
	protected async updateActiveOrder(model: EventModel | ResourceModel) {
		const eventEntity = this.data.getResourceEventEntity(model);

		if (eventEntity instanceof ProdOpersMatls) {
			this.prodOperMatlsGrid?.setActiveRowIndex(this.prodOperMatlsGrid?.rows?.findIndex(t => t?.cells?.OperMatlLineID?.value === eventEntity.OperMatlLineID.value), true);
		}
	}

	protected setActivePOOrder(value : any = this.ProdOpersMatls?.activeRow?.MatlPOOrderNbr?.value) {
		if (!value) {
			this.SelectionFilter?.viewController?.fieldValueChanged("ActiveMatlPOOrderNbr", null, this.SelectionFilter?.ActiveMatlPOOrderNbr?.value, "", false);
			return;
		}
		this.SelectionFilter?.viewController?.fieldValueChanged("ActiveMatlPOOrderNbr", value, this.SelectionFilter?.ActiveMatlPOOrderNbr?.value, "", false);
	}

	protected handleFieldClickOnEvent(fieldTarget: HTMLElement) {
		const fieldNameFull = fieldTarget?.getAttribute("sch-field");
		const value = fieldTarget?.getAttribute("sch-value");
		if (!fieldNameFull || !value) return;

		const viewAndField = fieldNameFull.split(".");
		const viewName = viewAndField[0];
		if (!viewName || !(viewName in this) || !(this[viewName] instanceof PXViewCollectionClass || this[viewName] instanceof PXView)) return;

		const fieldName = viewAndField[1] ? viewAndField[1] : fieldNameFull;
		switch (viewName) {
			case this.ProdOpersMatls.getViewName():
				this.handleFieldClickOnProdOperMatl(fieldTarget, fieldName, value);
				break;
			default:
				break;
		}
	}

	protected async handleFieldClickOnProdOperMatl(fieldTarget: HTMLElement, fieldName: string, value: any) {
		switch (fieldName) {
			case "MatlPOOrderNbr":
				const orderNbr = value as string;
				this.setActivePOOrder(orderNbr);
				if (orderNbr) {
					this.RedirectPO?.press();
				}
			default:
				break;
		}
	}

	protected async performFullRefresh() {
		const views = [ nameof("ProdOrdersSelected"), nameof("ProdOpersMatls"), nameof("SchedulerResources"), nameof("SchedulerEvents") ];
		await this.performManualRefresh(views);
	}

	protected async performManualRefresh(views: string[]) {
		let res : ICommandUpdateResult;
		try {
			res = await this.screenService.update(undefined, new ScreenUpdateParams({ views: views, blockPage: false}));
		}
		finally { /* empty */ }
		return res?.succeeded ?? false;
	}
	// #endregion
}
