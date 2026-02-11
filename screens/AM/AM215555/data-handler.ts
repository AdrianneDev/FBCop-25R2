/* eslint-disable @stylistic/brace-style */
import { AssignmentModel, CalendarIntervalModel, CalendarModel, DependencyModel, EventModel, ProjectModel, ResourceModel, StringHelper, TimeSpan } from "@bryntum/schedulerpro";
import { DatesFilter, Order, CalendarResource, Operation, WCResource, MachineResource } from "./view-models";
import { GridCell } from "client-controls";
import { Renderer } from "./renderer";

export class DataHandlerConfig {
	getActiveEntity: () => Order | Operation;
	datesFilter: DatesFilter;
}

class TimePeriod {
	start: Date;
	end: Date;
}

export class DataHandler {
	public static minSchPriority = 0;
	public static maxSchPriority = 10; // eslint-disable-line @typescript-eslint/no-magic-numbers
	public static defaultSchPriority = 5; // eslint-disable-line @typescript-eslint/no-magic-numbers
	public static minEventLength = 15;  // eslint-disable-line @typescript-eslint/no-magic-numbers

	public minDate: Date = null;
	public maxDate: Date = null;
	public narrowDownFilter = false;

	private generation = 0;
	private lastTimeSpanId = 1;
	private ordersById: Map<string, Order>;
	private productChildren: Map<Order, Order[]>;
	private wCOperationsById: Map<string, Operation>;
	private wCResourcesById: Map<string, WCResource>;
	private machineOperationsById: Map<string, Operation>;
	private machineResourcesById: Map<string, MachineResource>;

	private _search = new GridOrderDataHandler();
	private _unscheduled = new GridOrderDataHandler();

	private workingHours = new Set<string>();

	public get search() { return this._search; }
	public get unscheduled() { return this._unscheduled; }

	public constructor(private config: DataHandlerConfig) {
	}

	public getFullAssignmentId(kind: "machine" | "wc" | "order", id: string) {
		return `${kind}_${id}=${this.generation}_assignment`;
	}
	public getFullId(kind: "machine" | "wc" | "order", id: string) {
		return `${kind}_${id}=${this.generation}`;
	}
	public getPartialId(id: string | number) {
		const stringId = id.toString();
		const afterPrefixId = stringId.substring(stringId.indexOf("_") + 1);
		return afterPrefixId.indexOf("=") > 0 ? afterPrefixId.substring(0, afterPrefixId.indexOf("=")) : afterPrefixId;
	}

	public getEventType(id: string, kind: "machine" | "wc" | "order") {
		const beforePrefix = id?.substring(0, id?.indexOf(kind));
		const prefix = beforePrefix?.substring(0, beforePrefix?.lastIndexOf(" - "));
		switch (prefix) {
			case Renderer.eventSegments.product:
				return Renderer.eventSegments.product;
			case Renderer.eventSegments.productEarlySegment:
				return Renderer.eventSegments.earlySegment;
			case Renderer.eventSegments.earlySegment:
				return Renderer.eventSegments.earlySegment;
			case Renderer.eventSegments.productOnTimeSegment:
				return Renderer.eventSegments.onTimeSegment;
			case Renderer.eventSegments.onTimeSegment:
				return Renderer.eventSegments.onTimeSegment;
			default:
				return Renderer.eventSegments.event;
		}
	}

	public startNextGeneration() {
		this.generation ++;
	}

	public async createOrdersProject(
		filteredOrdersView : { records: Order[] },
		highlightedOrdersView : { records: Order[] },
	) {
		this.ordersById = new Map<string, Order>();
		this.productChildren = new Map<Order, Order[]>();
		this.minDate = (this.config?.datesFilter?.DateFrom?.value ?? new Date()).fromView();
		this.maxDate = (this.config?.datesFilter?.DateTo?.value ?? new Date()).toView();
		for (const curOrder of (filteredOrdersView?.records ?? []).sort((a, b) => Number(b.isProduct) - Number(a.isProduct))) {
			this.ordersById.set(curOrder.orderID, curOrder);

			this.minDate = this.minDate < curOrder.startDate ? this.minDate : curOrder.startDate;
			this.maxDate = this.maxDate > curOrder.endDate ? this.maxDate : curOrder.endDate;
			if (curOrder.isProduct) {
				this.productChildren.set(curOrder, [curOrder]);
				continue;
			}

			if (curOrder.isChild) {
				const product = this.ordersById.get(curOrder.productID);
				if (product) {
					this.productChildren.get(product)?.push(curOrder);
				} else {
					this.productChildren.set(curOrder, [curOrder]);
				}
			}
		}

		const sortedProductChildren = [...this.productChildren.keys()]
			.reduce((map, curKey) => {
				map.set(curKey, this.productChildren.get(curKey));
				return map;
			}, new Map<Order, Order[]>());
		this.productChildren = sortedProductChildren;
		let sortedOrders = (filteredOrdersView?.records ?? [])
			.reduce((arr, product) => {
				const children = this.productChildren.get(product);
				if (children) return [...arr, ...this.sortOrders(children)];
				return arr;
			}, <Order[]>[]);

		const highlightedOrders = (highlightedOrdersView.records ?? []);//.filter(order => order.startDate < end && order.endDate > start);
		const hightlighedIds = new Set(highlightedOrders.map(order => order.orderID));
		sortedOrders.forEach(order => {
			order.isDimmed = !hightlighedIds.has(order.orderID);
		});

		let resources: ResourceModel[] = [...this.productChildren.entries()]
			.map(([order, children]) => children.length > 1 ? new ResourceModel({
				id: `${Renderer.eventSegments.product} - ${this.getFullId("order", order.orderID)}`,
				name: StringHelper.xss`${order.caption}`,
				parentId: this.ordersById.get(order.parentID) ? this.getFullId("order", this.ordersById.get(order.parentID).orderID) : null,
				children: children
					.map(child => new ResourceModel({
						id: this.getFullId("order", child.orderID),
						name: StringHelper.xss`${child.caption}`,
						expanded: child.isEventExpanded
					})
					),
				expanded: order.isEventExpanded
			}) :
				new ResourceModel({
					id: `${this.getFullId("order", order.orderID)}`,
					name: StringHelper.xss`${order.caption}`,
					expanded: true
				})
			);

		if (this.narrowDownFilter) {
			sortedOrders = highlightedOrders;
			resources = resources.filter(resource => hightlighedIds.has(this.getPartialId(resource.id.toString())));
		}
		sortedOrders ??= [];
		const productEvents : EventModel[] = [];
		this.productChildren.forEach((_children, product) => {
			if (_children.length <= 1) return;
			const startDate = product.childMinStartDate;
			let endDate = product.childMaxEndDate;
			if (endDate.getTime() <= startDate.getTime()) {
				endDate = new Date(startDate);
				endDate.setMinutes(startDate.getMinutes() + DataHandler.minEventLength);
			}
			const eventID = this.getFullId("order", product.orderID);
			productEvents.push(new EventModel({
				id: `${Renderer.eventSegments.product} - ${eventID}`,
				startDate: startDate,
				// startDate: (start > startDate) ? dayBeforeStart : startDate,
				endDate: endDate,
				name: StringHelper.xss`${product.fullId}`,
				resizable: false,
				draggable: false,
				manuallyScheduled: true,
				schedulingMode: "FixedDuration",
				unscheduled: false,
				earlyStartDate: product.childMinStartDate ?? product.startDate,
				earlyEndDate: product.childMaxEndDate ?? product.endDate,
				stickyContents: true
			}));

			const extendedSegment = this.createExtendedEventSegment(product, true);
			if (extendedSegment) productEvents.push(extendedSegment);
		});

		const dependecies : DependencyModel[] = [];
		const eventModels = sortedOrders.reduce<EventModel[]>((prev, order) => {
			let endDate = order.endDate;
			if (endDate.getTime() <= order.startDate.getTime()) {
				endDate = new Date(order.startDate);
				endDate.setMinutes(order.startDate.getMinutes() + DataHandler.minEventLength);
			}

			const eventID = this.getFullId("order", order.orderID);
			const events : EventModel[] = [];
			const model = new EventModel({
				id: `${Renderer.eventSegments.event} - ${eventID}`,
				startDate: order.startDate,
				endDate: endDate,
				name: StringHelper.xss`${order.caption}`,
				resizable: false,
				draggable: false,
				manuallyScheduled: true,
				schedulingMode: "FixedDuration",
				unscheduled: false,
				stickyContents: true
			});
			events.push(model);

			const extendedSegment = this.createExtendedEventSegment(order, false);
			if (order.isProduct && this.productChildren.get(order)?.length === 1 && extendedSegment) events.push(extendedSegment);

			if (this.ordersById.has(order.parentID)) {
				const fromId = model.id;
				const toId = `${Renderer.eventSegments.event} - ${this.getFullId("order", order.parentID)}`;
				dependecies.push(new DependencyModel({
					id: `${fromId} - ${toId}`,
					from: fromId,
					to: toId,
					...Renderer.orderDependencyLineConfig(order, this.ordersById.get(order.parentID))
				}));
			}

			return [...prev, ...events];
		}, <EventModel[]>[]);

		const project = new ProjectModel({
			// resources: [new ResourceModel({
			// 	id: "all_orders",
			// 	name: "",
			// })],
			resourceStore: {
				tree: true,
				transformFlatData: true,
				autoTree: true,
				data: resources,
				autoLoad: true
			},
			events: [...productEvents, ...eventModels],
			assignments: [...productEvents, ...eventModels].map(event => {
				const eventID = event.id;
				const orderID = this.getPartialId(eventID);
				const resourcepPrefix = eventID.toString().includes(Renderer.eventSegments.product) ? `${Renderer.eventSegments.product} - ` : "";
				const resourceID = `${resourcepPrefix}${this.getFullId("order", orderID)}`;
				return new AssignmentModel({
					id: `${this.getEventType(eventID.toString(), "order")} - ${this.getFullAssignmentId("order", orderID)}`,
					eventId: eventID,
					resourceId: resourceID
				});
			}),
			dependencies: dependecies,
			timeRanges: this.getTimeProjectionRange(),
			hoursPerDay: 8,
			daysPerWeek: 7,
			dependenciesCalendar: "Project",
		});

		const result = await project.commitAsync();
		return project;
	}

	public async createOperationsProjects(
		kind: "wc" | "machine",
		mainProjectOnly: boolean,
		resourcesView: { records: WCResource[] | MachineResource[] },
		calendarResourcesView: { records: CalendarResource[] },
		allOperationsView : { records: Operation[] },
		filteredOperationsView : { records: Operation[] },
		highlightedOperationsView : { records: Operation[] },
	) {
		const [start, end] = this.getPeriodStartEndDates();
		const resources = resourcesView.records ?? [];
		let [allOperations, filteredOperations, highlightedOperations] = [allOperationsView, filteredOperationsView, highlightedOperationsView]
			.map(view => view.records ?? [])
			.map(operations => operations.filter(oper => oper.operationStart < end && oper.operationEnd > start));
		const calendar = calendarResourcesView?.records ?? [];

		if (kind === "wc") {
			const wcResources = resources as WCResource[];
			this.wCOperationsById = new Map(allOperations.map(operation => [operation.opId, operation]));
			this.wCResourcesById = new Map(wcResources.map(resource => [resource.Id.cellText, resource]));
		}
		else {
			const machineResources = resources as MachineResource[];
			this.machineOperationsById = new Map(allOperations.map(operation => [operation.opId, operation]));
			this.machineResourcesById = new Map(machineResources.map(resource => [resource.Id.cellText, resource]));
		}

		const filteredIds = new Set(filteredOperations.map(operation => operation.opId));
		const hightlighedIds = new Set(highlightedOperations.map(operation => operation.opId));
		allOperations.forEach(operation => {
			operation.isFilteredOut = !filteredIds.has(operation.opId)
				|| this.narrowDownFilter && !hightlighedIds.has(operation.opId);
			operation.isDimmed = !hightlighedIds.has(operation.opId);
		});
		if (this.narrowDownFilter) {
			filteredOperations = filteredOperations.filter(operation => hightlighedIds.has(operation.opId));
		}
		if (this.narrowDownFilter && this.config.getActiveEntity()) {
			filteredOperations = filteredOperations.filter(operation => operation.orderID === this.config.getActiveEntity().orderID);
		}

		const allOperationsProject = await this.createSingleOperationsProject(kind, resources, calendar, allOperations);
		const filteredOperationsProject = mainProjectOnly ? null : await this.createSingleOperationsProject(kind, resources, calendar, filteredOperations);
		// const highlightedOperationsProject = mainProjectOnly ? null : await this.createSingleOperationsProject(kind, resources, calendar, highlightedOperations);

		return [allOperationsProject, filteredOperationsProject]; //, highlightedOperationsProject];
	}

	public getOrder(id: string) {
		const normalizedId = this.getPartialId(id);
		return this.ordersById.get(normalizedId);
	}

	public getEntity(id: string) {
		if (!id) return null;
		const operation = this.getOperation(id);
		if (operation) return operation;
		return this.getOrder(id);
	}

	public constructResourceIDFromEventID(id: string,  kind: "wc" | "machine" | "order") {
		const pieces = id?.split(" - ");
		const orderId = this.getPartialId(id);
		const baseAssignmentId = this.getFullAssignmentId(kind, orderId);
		if (pieces.includes(Renderer.eventSegments.product)) {
			return `${Renderer.eventSegments.product} - ${baseAssignmentId}`;
		}
		return baseAssignmentId;
	}

	public getOperation(id: string) {
		const normalizedId = this.getPartialId(id);
		const operations = id.startsWith("machine") ?  this.machineOperationsById : this.wCOperationsById;
		return operations.get(normalizedId);
	}

	public getMachineOperation(id: string) {
		const normalizedId = this.getPartialId(id);
		return this.machineOperationsById.get(normalizedId);
	}

	public getOperationsByOrderId(id: string, kind: "wc" | "machine") {
		const normalizedId = this.getPartialId(id);

		// it's not most effecient (O(N) vs O(1)), but that's efficient enough for use in the UI, and it's easier to maintain
		return [...this.getAllOperations(kind).values()].filter(oper => oper.orderID === normalizedId).sort((a, b) => {
			const startDiff = a.operationStart.getTime() - b.operationStart.getTime();
			if (startDiff !== 0) return startDiff;
			return a.resourceId.localeCompare(b.resourceId);
		});
	}

	public getNonOperationalSegmentsForOrder(id: string) {
		const order = this.getOrder(id);
		const wCOperations = this.getOperationsByOrderId(id, "wc");
		const machineOperations = this.getOperationsByOrderId(id, "machine");
		const allOperations = [...wCOperations, ...machineOperations].sort((a, b) => a.operationStart.getTime() - b.operationStart.getTime());
		const segments = [];
		let lastEnd = order.startDate;
		for (const operation of allOperations) {
			if (operation.operationStart > lastEnd) {
				segments.push({ start: lastEnd, end: operation.operationStart });
			}
			lastEnd = operation.operationEnd;
		}
		if (lastEnd < order.endDate) {
			segments.push({ start: lastEnd, end: order.endDate });
		}
		return segments;
	}

	public hasWorkingCalendarSet() {
		return this.workingHours.size > 0;
	}

	public isWorkingTime(start: Date, end: Date) {
		const startHour = new Date(start);
		startHour.setMinutes(0, 0, 0);
		for (let hour = startHour; hour < end; hour.setHours(hour.getHours() + 1)) {
			if (this.workingHours.has(hour.toISOString())) {
				return true;
			}
		}
		return false;
	}

	public getOperationResource(id: string, kind: "wc" | "machine") {
		if (!id) return null;
		const resources = kind === "wc" ? this.wCResourcesById : this.machineResourcesById;
		return kind === "wc" ? resources.get(id) as WCResource : resources.get(id) as MachineResource;
	}

	public getProductTree(product: Order) {
		const children = (this.productChildren ?? new Map<Order, Order[]>()).get(product);
		return children ?? [];
	}

	public getPeriodStartEndDates() {
		const filterStart = this.config?.datesFilter?.DateFrom?.value;
		const filterEnd = this.config?.datesFilter?.DateTo?.value;
		let start = !filterStart || filterStart > this.minDate ? this.minDate : filterStart;
		let end = filterEnd && filterEnd > this.maxDate ? filterEnd : this.maxDate;
		start = !start ? new Date() : start;
		end = !end ? new Date() : end;
		return [ new Date(start), new Date(end) ];
	}

	protected getAllOperations(kind: "wc" | "machine") {
		return kind === "wc" ? this.wCOperationsById : this.machineOperationsById;
	}

	protected getOperationsResources(initResources: { Id: GridCell; resourceName: string }[], kind: "wc" | "machine"): ResourceModel[] {
		const activeOrder = this.config.getActiveEntity();
		let resources = new Map((initResources ?? []).map(resource => [resource.Id.value, new ResourceModel({
			id: resource.Id.value,
			name: StringHelper.xss`${resource.resourceName}`,
			calendar: this.getFullId(kind, resource.Id.value),
		})]));

		// if (!activeOrder) {
		// 	return [...resources.values()];
		// }

		const activeOrderOperations = activeOrder?.orderID ? this.getOperationsByOrderId(activeOrder.orderID, kind) : [];
		const activeOrderResources = new Map(activeOrderOperations.map(oper => [oper.resourceId, new Date(oper.operationStart)]));
		activeOrderOperations.forEach(oper => {
			const start = new Date(oper.operationStart);
			const id = oper.resourceId;
			if (activeOrderResources.has(id) && start < activeOrderResources.get(id)) {
				activeOrderResources.set(id, start);
			}
		});
		let narrowedDownToActiveOrder = false;
		if (this.narrowDownFilter && activeOrder?.orderID) {
			resources = new Map([...resources.entries()].filter(resource => activeOrderResources.has(resource[0])));
			narrowedDownToActiveOrder = true;
		}

		const highlightedOperations = [...this.getAllOperations(kind).values()].filter(oper => !oper.isDimmed && !oper.isFilteredOut);
		const highlightedResources = new Map(highlightedOperations.map(oper => [oper.resourceId, new Date(oper.operationStart)]));
		highlightedOperations.forEach(oper => {
			const start = new Date(oper.operationStart);
			const id = oper.resourceId;
			if (highlightedResources.has(id) && start < highlightedResources.get(id)) {
				highlightedResources.set(id, start);
			}
		});
		if (this.narrowDownFilter && !narrowedDownToActiveOrder) {
			resources = new Map([...resources.entries()].filter(resource => highlightedResources.has(resource[0])));
		}

		const sortedResources = new Map([...resources.entries()].sort((a, b) => {
			const aActive = activeOrderResources.has(a[0]);
			const bActive = activeOrderResources.has(b[0]);
			const aHighlighted = highlightedResources.has(a[0]);
			const bHighlighted = highlightedResources.has(b[0]);
			if (aActive && !bActive) return -1;
			if (!aActive && bActive) return 1;
			if (aActive && bActive) {
				return activeOrderResources.get(a[0]).getTime() - activeOrderResources.get(b[0]).getTime();
			}
			if (this.narrowDownFilter) {
				if (aHighlighted && !bHighlighted) return -1;
				if (!aHighlighted && bHighlighted) return 1;
				// if (aHighlighted && bHighlighted) {
				// 	return highlightedResources.get(a[0]).getTime() - highlightedResources.get(b[0]).getTime();
				// }
			}
			return a[0].localeCompare(b[0]);
		}));
		return [...sortedResources.values()];
	}

	protected createCalendarModels(calendar: CalendarResource[], kind: "wc" | "machine") {
		const calendarMap = calendar?.reduce(function(map, item) {
			if (!map[item.Id.cellText]) {
				map[item.Id.cellText] = [];
			}
			map[item.Id.cellText].push(item);
			return map;
		}, {}) as Record<string, CalendarResource[]>;

		const calendarsData = calendarMap ? Object.keys(calendarMap).map(key => new CalendarModel({
			id: this.getFullId(kind, calendarMap[key][0].Id.cellText),
			name: calendarMap[key][0].Name.cellText,
			unspecifiedTimeIsWorking: calendarMap[key][0].UnspecifiedTimeIsWorking.value,
			intervals: calendarMap[key].map(entry => new CalendarIntervalModel({
				recurrentStartDate: entry.RecurrentStartDate.cellText,
				recurrentEndDate: entry.RecurrentEndDate.cellText,
				isWorking: entry.IsWorking.value,
			})),
		})) : [] as CalendarModel[];

		// calendarsData.push(new CalendarModel({
		// 	id: "workweek",
		// 	name: "work Week",
		// 	unspecifiedTimeIsWorking: false,
		// 	intervals: [{
		// 		recurrentStartDate: "at 0:00 on Mon",
		// 		recurrentEndDate: "at 0:00 on Sat",
		// 		isWorking: true,
		// 	}],
		// }));

		return calendarsData;
	}

	protected async createSingleOperationsProject(kind: "wc" | "machine", initResources: { Id: GridCell; resourceName: string }[], calendar: CalendarResource[], operations: Operation[]) {
		const calendarsData = this.createCalendarModels(calendar, kind);
		const resources = this.getOperationsResources(initResources, kind);

		const project = new ProjectModel({
			resources: resources,
			events: (operations ?? []).map(op => {
				let endDate = op.operationEnd;
				if (endDate.getTime() <= op.operationStart.getTime()) {
					endDate = new Date(op.operationStart);
					endDate.setMinutes(op.operationStart.getMinutes() + DataHandler.minEventLength);
				}
				const model = new EventModel({
					id: this.getFullId(kind, op.opId),
					startDate: op.operationStart,
					endDate: endDate,
					name: StringHelper.xss`${op.name}`,
					resizable: false,
					draggable: false,
					ignoreResourceCalendar: true,
					// cls: getUnassignedAppointmentClass(obj),
				});
				return model;
			}),
			assignments: (operations ?? []).map(op => new AssignmentModel({
				id: this.getFullAssignmentId(kind, op.opId),
				eventId: this.getFullId(kind, op.opId),
				resourceId: op.resourceId,
			})),
			// resourceTimeRanges: this.getOffWorkTimeRanges(calendar, resources),
			timeRanges: this.getTimeProjectionRange(),
			calendar: "workweek",
			calendarsData: calendarsData,
			hoursPerDay: 8,
			daysPerWeek: 5,
			dependenciesCalendar: "Project",
		});

		const result = await project.commitAsync();
		return project;
	}

	protected getTimeProjectionRange() {
		return [new TimeSpan({ id: 1, cls: "qp-sch-time-projection" })];
	}

	protected dayOfWeekAndTimeFromFormat(format: string): [number, string] {
		// Format: "on Fri at 14:00"
		const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const dayOfWeek = format.substring(3, 6); // eslint-disable-line @typescript-eslint/no-magic-numbers
		const dayIndex = daysOfWeek.indexOf(dayOfWeek);
		const time = format.substring(10); // eslint-disable-line @typescript-eslint/no-magic-numbers

		return [dayIndex, time];
	}

	protected sortOrders(records: Order[]) {
		return (records ?? []).sort((a, b) => {
			if (a.startDate !== b.startDate) return b.startDate.getTime() - a.startDate.getTime();
			if (a.SchPriority.value !== b.SchPriority.value) return a.SchPriority.value - b.SchPriority.value;
			return a.endDate.getTime() - b.endDate.getTime();
		});
	}

	protected createExtendedEventSegment(order: Order, forProduct = false) {
		let isEarly = order.requestedDate && order.IsEarly?.value === true;
		let isOnTime = false;
		const segementStart = order.endDate;
		let segmentEnd = order.requestedDate;
		const eventID = this.getFullId("order", order?.orderID);
		if (order.requestedDate && order.IsOnTime?.value === true) {
			const maxRequestedDate = new Date(order.requestedDate);
			maxRequestedDate.clearHoursUTC();
			if (maxRequestedDate < order.endDate) maxRequestedDate.setDate(maxRequestedDate.getDate() + 1);
			isOnTime = true;
			isEarly = false;
			segmentEnd = maxRequestedDate;
			if (maxRequestedDate.getTime() === order.endDate.getTime()) isOnTime = false; // To Prevent UI glitch - duplicate event content
		}

		const { earlySegment, productEarlySegment, onTimeSegment, productOnTimeSegment } = Renderer.eventSegments;
		if (isEarly || isOnTime) {
			const segmentKey = isEarly ? (forProduct ? productEarlySegment : earlySegment) : (forProduct ? productOnTimeSegment : onTimeSegment);
			this.maxDate = this.maxDate > segmentEnd ? this.maxDate : segmentEnd;
			return new EventModel({
				id: `${segmentKey} - ${eventID}`,
				startDate: segementStart,
				endDate: segmentEnd,
				name: StringHelper.xss`${order.caption}`,
				eventStyle: "line",
				draggable: false,
				resizable: false,
				manuallyScheduled: true,
				schedulingMode: "FixedDuration",
				unscheduled: false,
				stickyContents: true
			});
		}

		return undefined;
	}
}


export class GridOrderDataHandler {

	protected source: Order[] = [];

	protected ordersById: Map<string, Order>;

	protected productChildren: Map<Order, Order[]>;

	public initializeWith(orders: Order[]) {
		if (this.source.length === 0 && orders.length === 0) return false;
		this.source = orders.map(appointment => appointment);
		this.ordersById = new Map<string, Order>();
		this.productChildren = new Map<Order, Order[]>();
		for (const curOrder of (orders ?? []).sort((a, b) => Number(b.isProduct ?? false) - Number(a.isProduct ?? false))) {
			this.ordersById.set(curOrder.orderID, curOrder);

			if (curOrder.isProduct) {
				this.productChildren.set(curOrder, [curOrder]);
				continue;
			}

			if (curOrder.isChild) {
				const product = this.ordersById.get(curOrder.productID);
				if (product) {
					this.productChildren.get(product)?.push(curOrder);
				} else {
					this.productChildren.set(curOrder, [curOrder]);
				}
			}
		}
		return true;
	}

	public createData() {
		const events = this.source.map(order => new EventModel({
			id: order.orderID,
			name: StringHelper.xss`${order.caption}`,
			cls: ``,
		}));
		return events;
	}

	public getEntry(id: string | number) {
		return this.ordersById?.get(id.toString());
	}

	public getFirstEntry() {
		return this.ordersById?.values().next().value;
	}

	public getProduct(order: Order) {
		return this.productChildren.get(this.getEntry(order.productID) ?? this.getEntry(order.orderID))?.find(t => t.isProduct);
	}
}
