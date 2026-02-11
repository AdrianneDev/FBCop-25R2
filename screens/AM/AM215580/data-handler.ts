/* eslint-disable brace-style */
import { AssignmentModel, DependencyModel, EventModel, ProjectModel, ResourceModel, StringHelper, TimeSpan } from "@bryntum/schedulerpro";
import { SelectionFilter, ProdOrderCalendarResource, ProdOrderCalendarEvent, ResourceEventType, ProdOpersMatls, ProdOrder, PeriodKind } from "./view-models";
import { Renderer } from "./renderer";
import { PXViewCollection } from "client-controls";

export class DataHandlerConfig {
	getActiveEntity: () => ProdOrder | ProdOpersMatls;
	datesFilter: SelectionFilter;
	eventsView: PXViewCollection<ProdOrderCalendarEvent>;
	resourcesView: PXViewCollection<ProdOrderCalendarResource>;
	ordersView: PXViewCollection<ProdOrder>;
	opersMatlsView: PXViewCollection<ProdOpersMatls>;
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

	private generation = 0;
	private ordersById: Map<string, ProdOrder>;
	private parentChildren: Map<string, ProdOrder[]>;
	private resourceTree: Map<string, ProdOrderCalendarResource[]>;
	private resources: Map<string, ProdOrderCalendarResource>;
	private events: Map<string, ProdOrderCalendarEvent>;
	private resourceCollapsedStates: Map<string, boolean>; // Retain collapsed states of events when re-attaching calender

	public constructor(private config: DataHandlerConfig) {
	}

	public getFullAssignmentId(id: string) {
		return `order_${id}=${this.generation}_assignment`;
	}
	public getFullId(id: string) {
		return `order_${id}=${this.generation}`;
	}
	public getPartialId(id: string | number) {
		const stringId = id.toString();
		const afterPrefixId = stringId.substring(stringId.indexOf("_") + 1);
		return afterPrefixId.indexOf("=") > 0 ? afterPrefixId.substring(0, afterPrefixId.indexOf("=")) : afterPrefixId;
	}

	public startNextGeneration() {
		this.generation ++;
	}

	public async createOrdersProject() {
		this.ordersById = new Map<string, ProdOrder>();
		this.parentChildren = new Map<string, ProdOrder[]>();
		this.resources = new Map<string, ProdOrderCalendarResource>();
		let productResource: ProdOrderCalendarResource = null;
		this.events = new Map<string, ProdOrderCalendarEvent>();
		this.resourceTree = new Map<string, ProdOrderCalendarResource[]>();
		this.minDate = null;
		this.maxDate = null;
		let product: ProdOrder = null;

		const len = Math.max(Math.max(this.config.resourcesView?.records?.length ?? 0, this.config.eventsView?.records?.length ?? 0), this.config.ordersView?.records?.length ?? 0);
		let i = 0;

		while (i < len) {
			const curOrder = this.config.ordersView?.records[i] ?? undefined;
			if (curOrder && curOrder.ID) {
				this.ordersById.set(curOrder.ID, curOrder);
				if (curOrder.ParentOrdID?.value) {
					const tree = this.parentChildren.get(curOrder.parentID);
					if (tree) tree.push(curOrder);
					else this.parentChildren.set(curOrder.parentID, [curOrder]);
				}

				if (curOrder.isProduct) product = curOrder;
			}

			const resource = this.config.resourcesView?.records[i] ?? undefined;
			const orderResourceType = ResourceEventType.Order.toString();
			if (resource) {
				this.resources.set(resource.iD, resource);

				if (resource.ParentID?.value) {
					const tree = this.resourceTree.get(resource.ParentID.value);
					if (tree) tree.push(resource);
					else this.resourceTree.set(resource.ParentID.value, [resource]);
				}
				else if (resource.ResourceType?.value === orderResourceType) productResource = resource;
			}

			const event = this.config.eventsView?.records[i] ?? undefined;
			if (event) {
				this.minDate = this.minDate && this.minDate < event.startDate ? this.minDate : event.startDate;
				this.maxDate = this.maxDate && this.maxDate > event.endDate ? this.maxDate : event.endDate;
				this.events.set(event.iD, event);
			}

			i++;
		}

		let resources: any[] = [];
		// if (productResource) resources = [this.constructResources(productResource.iD)];
		if (productResource) {
			resources = this.config.resourcesView?.records?.sort((a, b) => a.sortOrder - b.sortOrder)?.map(r => (
				{ id: r.iD,
					name: r.Name.value,
					expanded: this.resourceCollapsedStates?.get(r.iD) ?? true,
					eventLayout: "pack",
					parentId: r.ParentID.value
				}
			));
		}

		const allEvents: EventModel[] = [];
		const dependecies: DependencyModel[] = [];
		this.config.eventsView?.records?.sort((a, b) => a.sortOrder - b.sortOrder).forEach(event => {
			const endDate = event.endDate;
			if (endDate.getTime() === event.startDate.getTime()) {
				endDate.setMilliseconds(endDate.getMilliseconds() + 1); // Otherwise zero duration will be regarded as a milestone.
			}
			allEvents.push(new EventModel({
				id: event.iD,
				resourceId: event.resourceId,
				startDate: event.startDate,
				// startDate: (start > startDate) ? dayBeforeStart : startDate,
				endDate: endDate,
				resizable: false,
				draggable: false,
				manuallyScheduled: true,
				schedulingMode: "FixedDuration",
				unscheduled: false,
				earlyStartDate: event.startDate,
				earlyEndDate: endDate,
				stickyContents: true,
				milestoneWidth: 16
			}));

			const fromId = event.iD;
			const toId = event.ToEventId?.value;
			if (toId) {
				const toEvent = this.events.get(toId);
				dependecies.push(new DependencyModel({
					id: `${fromId} - ${toId}`,
					from: fromId,
					to: toId,
					...Renderer.orderDependencyLineConfig({ startDate: event.startDate, endDate: event.endDate }, { startDate: toEvent?.startDate, endDate: toEvent?.endDate })
				}));
			}
		});

		const project = new ProjectModel({
			resourceStore: {
				tree: true,
				autoTree: true,
				data: resources,
				autoLoad: true,
				transformFlatData: true
			},
			events: allEvents,
			assignments: allEvents.map(event => new AssignmentModel({
				id: `${event.id}-${event.resourceId}`,
				eventId: event.id,
				resourceId: event.resourceId
			})),
			dependencies: dependecies,
			timeRanges: this.getTimeProjectionRange(),
			hoursPerDay: 8,
			daysPerWeek: 7,
			dependenciesCalendar: "Project",
		});

		const result = await project.commitAsync();
		return project;
	}

	public getOrder(id: string) {
		let order = this.ordersById.get(id);
		if (order) return order;
		let entity: { OrderType: any; ProdOrdID: any } = this.events.get(id);
		if (!entity) entity = this.resources.get(id);
		const orderType = entity?.OrderType?.value;
		const prodOrdID = entity?.ProdOrdID?.value;
		order = this.ordersById.get(`${orderType}-${prodOrdID}`);
		return order;
	}

	public getResourceIconCode(resourceEvent: ResourceModel) {
		const entity = this.resources?.get(resourceEvent?.id?.toString());
		if (!entity) return "";
		return entity.icon;
	}

	public getResourceEventEntity(resourceEvent: EventModel | ResourceModel) {
		const id = resourceEvent?.id;
		let type = null;
		let schdEvent : ProdOrderCalendarEvent | ProdOrderCalendarResource = this.events.get(id?.toString());
		type = schdEvent?.EventType?.value;
		if (!schdEvent) {
			schdEvent = this.resources.get(id?.toString());
			type = schdEvent?.ResourceType?.value;
		}
		if (!schdEvent) return undefined;
		const isOrder = type === ResourceEventType.Order;
		if (isOrder) return this.ordersById.get(`${schdEvent.OrderType?.value}-${schdEvent.ProdOrdID?.value}`) ?? undefined;
		return this.config.opersMatlsView?.findRow(t => t.OperMatlLineID?.value === schdEvent?.OperMatlLineID?.value) ?? undefined;
	}

	public getEventType(resourceEvent: EventModel | ResourceModel) {
		const id = resourceEvent?.id;
		const schdEvent = this.events.get(id?.toString());
		if (!schdEvent) return undefined;
		return schdEvent.EventType?.value;
	}

	public constructResourceIDFromEventID(id: string) {
		const pieces = id?.split(" - ");
		const orderId = this.getPartialId(id);
		const baseAssignmentId = this.getFullAssignmentId(orderId);
		if (pieces.includes(Renderer.eventSegments.product)) {
			return `${Renderer.eventSegments.product} - ${baseAssignmentId}`;
		}
		return baseAssignmentId;
	}

	public parseResourceEventType(id: string) {
		const type = id.split("_")[0];
		if (!type) return undefined;
		return type;
	}

	public getProductTree(product: ProdOrder) {
		const children = (this.parentChildren ?? new Map<string, ProdOrder[]>()).get(product.ID);
		return children ?? [];
	}

	public getPeriodStartEndDates() {
		const start = this.minDate ?? new Date();
		const end = this.maxDate ?? new Date();
		return [ new Date(start), new Date(end) ];
	}

	public offsetStartEndDatesByZoomLevel(start: Date, end: Date, level: PeriodKind) {
		switch (level) {
			case PeriodKind.Hour:
				start?.setHours(start?.getHours() - 1);
				end?.setHours(end?.getHours() + 1);
				break;
			case PeriodKind.Day:
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				start?.setHours(start?.getHours() - 4);
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				end?.setHours(end?.getHours() + 4);
				break;
			case PeriodKind.Week:
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				start?.setDate(start?.getDate() - 1);
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				end?.setDate(end?.getDate() + 1);
				break;
			default:
				break;
		}
		return [start, end];
	}

	public toggleOrderCollapsedState(resourceId: string, forceState: boolean | null = null) {
		if (!this.resourceCollapsedStates) this.resourceCollapsedStates = new Map<string, boolean>();
		const resource = this.resources?.get(resourceId);
		if (!resource) return;
		const state = forceState ? forceState : !(this.resourceCollapsedStates.get(resourceId) ?? false);
		this.resourceCollapsedStates.set(resourceId, state);
	}

	public getCollapsedState(resourceId: string) {
		if (!this.resourceCollapsedStates) this.resourceCollapsedStates = new Map<string, boolean>();
		return this.resourceCollapsedStates.get(resourceId);
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

	private constructResources(startResourceID: string) {
		const resource = this.resources.get(startResourceID);
		if (!resource) return undefined;
		const children = (this.resourceTree.get(startResourceID) ?? []).sort((a, b) => a.sortOrder - b.sortOrder);
		const model = new ResourceModel({
			id: resource.iD,
			name: StringHelper.xss`${resource.Name?.value}`,
			children: children.length > 0 ? children
				.map(child => this.constructResources(child.iD)) : false,
			expanded: this.resourceCollapsedStates?.get(startResourceID) ?? true,
			eventLayout: "pack",
		});
		return model;
	}
}
