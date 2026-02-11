/* eslint-disable @stylistic/brace-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { bindable } from "aurelia-framework";
import { DependencyModel, DependencyModelConfig, DomConfig, DomHelper, EventModel, EventSegmentModel, Grid, Rectangle, ResourceModel, Scheduler, SchedulerEventModel, SchedulerPro, StringHelper } from "@bryntum/schedulerpro";
import {
	QpFieldsetCustomElement, QpHyperIconCustomElement,
	DataFieldDescriptor
} from "client-controls";
import { DataHandler } from "./data-handler";
import { Order, Operation } from "./view-models";
import { AM215555_PreferenceData, ColorScheme } from "./AM215555";
import { EventRenderData } from "../AM215580/Descriptors";

export class RendererConfig {
	data: DataHandler;
	isPeriodMonth: () => boolean;
	getScheduler: () => SchedulerPro;
	getActiveEntity: () => Order | Operation;
	getUnscheduledFastFilter: () => HTMLInputElement;
	getSearchFastFilter: () => HTMLInputElement;
	preferences: AM215555_PreferenceData;
}

export type EntityRole = "order" | "operation" | "search";

export class Renderer {
	@bindable productBrickLeft!: QpFieldsetCustomElement;
	@bindable productBrickRight!: QpFieldsetCustomElement;
	@bindable ordersBrickLeft!: QpFieldsetCustomElement;
	@bindable ordersBrickRight!: QpFieldsetCustomElement;
	@bindable operationsBrickLeft!: QpFieldsetCustomElement;
	@bindable operationsBrickRight!: QpFieldsetCustomElement;
	@bindable unscheduledBrickLeft!: QpFieldsetCustomElement;
	@bindable unscheduledBrickRight!: QpFieldsetCustomElement;
	@bindable searchBrickLeft!: QpFieldsetCustomElement;
	@bindable searchBrickRight!: QpFieldsetCustomElement;

	@bindable iconPriorityHigh!: QpHyperIconCustomElement;
	@bindable iconPriorityMedium!: QpHyperIconCustomElement;
	@bindable iconPriorityLow!: QpHyperIconCustomElement;
	@bindable iconSelected!: QpHyperIconCustomElement;
	@bindable iconLackOfMaterials!: QpHyperIconCustomElement;
	@bindable iconFirmLock!: QpHyperIconCustomElement;
	@bindable iconLate!: QpHyperIconCustomElement;
	@bindable iconOnTime!: QpHyperIconCustomElement;
	@bindable iconEarly!: QpHyperIconCustomElement;
	@bindable iconCollapse: QpHyperIconCustomElement;
	@bindable iconExpand: QpHyperIconCustomElement;

	public eventObservers: Map<string, IntersectionObserver[]>;

	private static colorsSchema = {
		darkBlue: "#0B72B9",
		lightBlue: "#3DB0F1",
		lightGreen: "#56E28E",
		darkGreen: "#47A824",
		red: "#E23C44",
		orange: "#FD7100",
		paleYellow: "#F8B200",
		lghtBrown: "#AD6E2E",
		purple: "#AC4DCE",
		darkGrey: "#5E5E5E",
		lightGrey: "#D0D0D0",
		arcticBlue: "#D6EFFF",
		white: "#FFFFFF"
	};

	private static statusColorSchema = {
		darkBlue: "var(--status-dark-blue-color)",
		lightBlue: "#3DB0F1",
		lightGreen: "var(--status-green-color)",
		darkGreen: "var(--status-dark-green-color)",
		red: "#E23C44",
		orange: "var(--status-orange-color)",
		darkOrange: "var(--status-dark-orange-color)",
		paleYellow: "#F8B200",
		lghtBrown: "#AD6E2E",
		purple: "var(--status-purple-color)",
		darkPurple: "var(--status-dark-purple-color)",
		darkGrey: "var(--status-dark-gray-color)",
		lightGrey: "var(--status-gray-color)",
		arcticBlue: "#D6EFFF",
		white: "#FFFFFF"
	};

	private static statusColors = {
		R: {
			dark: Renderer.statusColorSchema.darkBlue,
			light: Renderer.statusColorSchema.lightBlue
		},
		P: {
			dark: Renderer.statusColorSchema.darkPurple,
			light: Renderer.statusColorSchema.purple
		},
		I: {
			dark: Renderer.statusColorSchema.darkGreen,
			light: Renderer.statusColorSchema.lightGreen
		},
		H: {
			dark: Renderer.statusColorSchema.darkOrange,
			light: Renderer.statusColorSchema.orange
		},
		X: {
			dark: Renderer.statusColorSchema.darkGrey,
			light: Renderer.statusColorSchema.lightGrey
		},
		M: {
			dark: Renderer.statusColorSchema.darkGrey,
			light: Renderer.statusColorSchema.lightGrey
		},
		C: {
			dark: Renderer.statusColorSchema.darkGrey,
			light: Renderer.statusColorSchema.lightGrey
		},
		L: {
			dark: Renderer.statusColorSchema.darkOrange,
			light: Renderer.statusColorSchema.orange
		}
	};

	public static eventSegments = {
		product: "product",
		earlySegment: "earlySegment",
		productEarlySegment: "product - earlySegment",
		onTimeSegment: "onTimeSegment",
		productOnTimeSegment: "product - onTimeSegment",
		event: "event"
	};

	private _preferences: AM215555_PreferenceData;

	public constructor(private config: RendererConfig) {
		this._preferences = config.preferences;
		this.eventObservers = new Map();
	}

	private get activeEntity() { return this.config.getActiveEntity(); }
	private get unscheduledFastFilter() { return this.config.getUnscheduledFastFilter(); }
	private get searchFastFilter() { return this.config.getSearchFastFilter(); }
	private get data() { return this.config.data; }
	private get scheduler() { return this.config.getScheduler(); }
	private get isPeriodMonth() { return this.config.isPeriodMonth(); }

	public set preferences(value: AM215555_PreferenceData) {
		this._preferences = value;
	}

	public calendarResourceRenderer({ record, cellElement, grid }: { cellElement: HTMLElement; grid: Grid; record: ResourceModel }) {
		const resource = record as ResourceModel;

		const childLevel = resource?.childLevel ? resource.childLevel + 1 : 1;
		const collapseBtnOffsetPx = resource?.descendantCount > 0 ? 16 + 5 : 0; // Account for the gap between flex items too
		const indent = childLevel * 1.7;
		const container = DomHelper.createElement({
			tag: "div",
			className: "b-tree-cell-inner b-text-value",
			style: `padding-inline-start: calc(${indent}em - ${collapseBtnOffsetPx}px);`
		}) as HTMLElement;

		let expandedState = resource?.isExpanded(resource?.getCalendar()?.resourceStore);
		if (typeof expandedState !== "boolean") expandedState = resource.expanded;

		if (resource?.descendantCount > 0) {
			let collapseBtn: SVGSVGElement;
			if (expandedState) {
				collapseBtn = this.getIconHtml(this.iconCollapse) as SVGSVGElement;
			} else {
				collapseBtn = this.getIconHtml(this.iconExpand) as SVGSVGElement;
			}
			collapseBtn?.classList?.add("qp-chevron-icon");
			if (collapseBtn?.style?.cursor !== undefined) collapseBtn.style.cursor = "pointer";
			if (collapseBtn) container.appendChild(collapseBtn);
		}

		container.appendChild(DomHelper.createElement({ tag: "span", html: resource.name }) as HTMLElement);
		return container;
	}

	public calendarOrderRenderer({ eventRecord, resourceRecord, renderData }) {
		const event = eventRecord as EventModel;
		const order = this.data.getOrder(eventRecord.id);
		if (!order) return { children: [] };

		renderData.width = Math.max(16 + 4 /* Accounting for the inline padding set in CSS */, renderData.width);

		const dateToPos = (date) => this.scheduler.timeAxisViewModel.getPositionFromDate(new Date(date));
		const orderPos = this.getCalcedPos(new Date(event.startDate));
		const lateDate = order?.RequestedOn?.value;

		const createSegmentDiv = (left: number, width: number, color: string, className = "") => {
			const div = document.createElement("div");
			div.style.insetInlineStart = `${left}px`;
			div.style.width = `${width}px`;
			if (color) div.style.backgroundColor = color;
			if (className) div.className = className;
			return div;
		};

		if (event.id.toString().includes(Renderer.eventSegments.earlySegment)) {
			if (lateDate && order.endDate < lateDate) {
				const start = dateToPos(order.endDate > this.scheduler.endDate ? this.scheduler.endDate : order.endDate);
				const end = dateToPos(lateDate < this.scheduler.endDate ? lateDate : this.scheduler.endDate);
				const width = end - start;
				const left = start - orderPos;
				renderData.style = `background-color: ${Renderer.colorsSchema.lightGreen}`;
				return { children: [createSegmentDiv(left, width, Renderer.colorsSchema.lightGreen)] };
			}
		}

		if (event.id.toString().includes(Renderer.eventSegments.onTimeSegment)) {
			if (order.endDate < event.endDate) {
				const start = dateToPos(order.endDate > this.scheduler.endDate ? this.scheduler.endDate : order.endDate);
				const end = dateToPos(event.endDate < this.scheduler.endDate ? event.endDate : this.scheduler.endDate);
				const width = end - start;
				const left = start - orderPos;
				renderData.style = `background-color: ${Renderer.colorsSchema.paleYellow}`;
				return { children: [createSegmentDiv(left, width, Renderer.colorsSchema.paleYellow)] };
			}
		}

		if (event.id.toString().includes(Renderer.eventSegments.product)) {
			const productChildren: HTMLElement[] = [];
			const renderedHtml = this.renderProductEvent(order, renderData, orderPos);
			if (Array.isArray(renderedHtml)) {
				renderedHtml.forEach(el => {
					if (el instanceof HTMLElement) productChildren.push(el);
				});
			} else if ((<any>renderedHtml) instanceof HTMLElement) {
				productChildren.push(renderedHtml);
			}
			return productChildren;
		}

		const rendered = this.renderEntityWithStatusBar(order, renderData, "order", event);
		let stripeOverlayForLate = "";
		if (order.isUnscheduled) {
			stripeOverlayForLate = "qp-sch-not-confirmed qp-sch-not-assigned";
			stripeOverlayForLate = "";
		}

		let lateSegment: HTMLElement | null = null;
		const isUngroupedProduct = order.isProduct && this.data.getProductTree(order)?.length === 1;
		if (lateDate && order.endDate > lateDate && lateDate < this.scheduler.endDate && isUngroupedProduct && order.isLate) {
			const start = dateToPos(lateDate < this.scheduler.startDate ? this.scheduler.startDate : lateDate);
			const end = dateToPos(order.endDate > this.scheduler.endDate ? this.scheduler.endDate : order.endDate);
			const width = end - start;
			const left = start - orderPos - this.getOperationRowMargin();
			lateSegment = createSegmentDiv(left, width, "", `qp-sch-late-segment ${stripeOverlayForLate}`);
		}

		const children: HTMLElement[] = [];
		if (Array.isArray(rendered)) {
			rendered.forEach(el => {
				if (el instanceof HTMLElement) children.push(el);
			});
		} else if ((<any> rendered) instanceof HTMLElement) {
			children.push(rendered);
		}

		if (renderData?.width > 20) {
			const overlayDiv = document.createElement("div");
			overlayDiv.className = "qp-sch-overlay";
			if (lateSegment) overlayDiv.appendChild(lateSegment);
			children.push(overlayDiv);
		}

		return children;
	}

	public orderDependenciesRenderer({ dependencyRecord: dependency, domConfig, fromBox, toBox, ...renderData }: { dependencyRecord: DependencyModel; domConfig: DomConfig; fromBox: Rectangle; toBox: Rectangle }) {
		const fromEvent = dependency.fromEvent;
		const fromOrderID = this.data.getPartialId(fromEvent.toString());
		const toEvent = dependency.toEvent;
		const toOrderID = this.data.getPartialId(toEvent.toString());
		if (!fromOrderID || !toOrderID) return;

		domConfig.class["qp-sch-search-dimmed"] = this.activeEntity == null || this.activeEntity?.orderID !== fromOrderID && this.activeEntity?.orderID !== toOrderID;
		if (domConfig.d) domConfig.d = this.getAdjustedToDependencyPath(domConfig.d, dependency.fromEvent as EventModel, fromBox, dependency.toEvent as EventModel, toBox);
	}

	public static orderDependencyLineConfig(fromOrder: Order, toOrder: Order) : Partial<DependencyModelConfig> {
		let toSide: "top" | "left" | "bottom" | "right" ;
		let fromSide: "top" | "left" | "bottom" | "right";

		if (fromOrder.endDate < toOrder.endDate) {
			fromSide = "right";
			toSide = "bottom";
		}
		else {
			fromSide = "right";
			toSide = "right";
		}
		return { fromSide: fromSide, toSide: toSide};
	}

	public getCalcedPos(date) {
		// Calc the position for out of range date using binary search
		// Bryntum doesn't provide this functionality somehow

		const pos = this.scheduler.timeAxisViewModel.getPositionFromDate(date);
		if (pos >= 0) return pos;

		const timeAxis = this.scheduler.timeAxisViewModel;
		let curPos = -100000;
		let step = 50000;

		while (step > 0) {
			const curDate = timeAxis.getDateFromPosition(curPos, "floor", true);
			const curDateCeil = timeAxis.getDateFromPosition(curPos, "ceil", true);
			if (curDate.getTime() === date.getTime() && curDateCeil.getTime() === date.getTime()) return curPos;
			if (curDate.getTime() < date.getTime()) curPos += step;
			else curPos -= step;
			step = Math.floor(step / 2);
		}
		return curPos;
	}

	public operationRenderer({ eventRecord, resourceRecord, renderData }) {
		const operation = this.data.getOperation(eventRecord.id);
		if (!operation) return { children: [] };
		const rendered = this.renderEntityWithStatusBar(operation, renderData, "operation");

		const order = this.data.getOrder(operation.orderID);

		const dateToPos = (date) => this.scheduler.timeAxisViewModel.getPositionFromDate(date);
		const operationPos = this.getCalcedPos(new Date(operation.operationStart));

		let lateSegment: HTMLElement | null = null;
		const lateDate = order?.RequestedOn?.value;
		if (lateDate && operation.operationEnd > lateDate && lateDate < this.scheduler.endDate) {
			const start = dateToPos(lateDate < this.scheduler.startDate ? this.scheduler.startDate : lateDate);
			const end = dateToPos(operation.operationEnd > this.scheduler.endDate ? this.scheduler.endDate : operation.operationEnd);
			const width = end - start;
			const left = start - operationPos - this.getOperationRowMargin();
			lateSegment = document.createElement("div");
			lateSegment.className = "qp-sch-late-segment";
			lateSegment.style.insetInlineStart = `${left}px`;
			lateSegment.style.width = `${width}px`;
		}

		const overlayDiv = document.createElement("div");
		overlayDiv.className = "qp-sch-overlay";
		if (lateSegment) overlayDiv.appendChild(lateSegment);

		const children: HTMLElement[] = [];
		if (Array.isArray(rendered)) {
			rendered.forEach(el => {
				if (el instanceof HTMLElement) children.push(el);
			});
		} else if ((<any>rendered) instanceof HTMLElement) {
			children.push(rendered);
		}
		children.push(overlayDiv);

		return children;
	}

	protected getEntityHtmlPart(templateLeft: QpFieldsetCustomElement, templateRight: QpFieldsetCustomElement, getFieldHtml: (entity: DataFieldDescriptor) => HTMLSpanElement): HTMLDivElement {
		const fieldsLeft = templateLeft.Fields?.filter(x => templateLeft.getFieldVisibility(true, x));
		const fieldsRight = templateRight.Fields?.filter(x => templateRight.getFieldVisibility(true, x));
		const container = document.createElement("div");
		if (!fieldsLeft?.length) return container;

		const leftHtmls = fieldsLeft.map(field => getFieldHtml(field));
		const rightHtmls = fieldsRight.map(field => getFieldHtml(field));

		let leftFieldNum = 0;
		let rightFieldNum = 0;
		while (leftFieldNum < fieldsLeft.length || rightFieldNum < fieldsRight.length) {
			const rowDiv = document.createElement("div");

			const leftAddOn: HTMLSpanElement[] = [];
			const iconsAddOn: HTMLSpanElement[] = [];
			let iconsNum = 0;
			let leftHtml: HTMLSpanElement | null = null;
			let nextLeftHtml: HTMLSpanElement | null = null;
			do {
				leftHtml = leftFieldNum < fieldsLeft.length ? leftHtmls[leftFieldNum] : null;
				nextLeftHtml = leftFieldNum + 1 < fieldsLeft.length ? leftHtmls[leftFieldNum + 1] : null;
				if (leftHtml && leftHtml.innerHTML && !leftHtml.innerHTML.startsWith("<svg")) {
					leftAddOn.push(leftHtml);
				}
				if (leftHtml && leftHtml.innerHTML && leftHtml.innerHTML.startsWith("<svg")) {
					iconsNum += 1;
					iconsAddOn.push(leftHtml);
				}
				leftFieldNum++;
			} while (
				leftHtml != null &&
				(nextLeftHtml?.innerHTML.startsWith("<svg") || nextLeftHtml == null || !nextLeftHtml?.innerHTML)
			);

			let leftPart: HTMLElement | null = null;
			if (leftAddOn.length === 0 && iconsAddOn.length === 0) {
				leftPart = null;
			} else if (iconsAddOn.length === 0) {
				const span = document.createElement("span");
				leftAddOn.forEach(el => span.appendChild(el));
				if (span.innerHTML) leftPart = span;
			} else {
				const outerDiv = document.createElement("div");
				const textDiv = document.createElement("div");
				leftAddOn.forEach(el => textDiv.appendChild(el));
				outerDiv.appendChild(textDiv);

				const iconDiv = document.createElement("div");
				iconDiv.className = "qp-sch-tile-icon";
				iconDiv.style.maxWidth = `max(0px, calc((100% - ${iconsNum * 16 + Math.max(iconsNum - 1, 0) * 6 + 10}px)*999))`;
				const emptySpan = document.createElement("span");
				iconDiv.appendChild(emptySpan);
				const iconsSpan = document.createElement("span");
				iconsAddOn.forEach(el => iconsSpan.appendChild(el));
				iconDiv.appendChild(iconsSpan);
				outerDiv.appendChild(iconDiv);
				leftPart = outerDiv;
			}

			const rightAddOn: HTMLSpanElement[] = [];
			let rightHtml: HTMLSpanElement | null = null;
			let nextRightHtml: HTMLSpanElement | null = null;
			let rightIconsNum = 0;
			let rightTextsNum = 0;
			do {
				rightHtml = rightFieldNum < fieldsRight.length ? rightHtmls[rightFieldNum] : null;
				nextRightHtml = rightFieldNum + 1 < fieldsRight.length ? rightHtmls[rightFieldNum + 1] : null;
				if (rightHtml && rightHtml.innerHTML) {
					rightAddOn.push(rightHtml);
					if (rightHtml.innerHTML.startsWith("<svg")) rightIconsNum++;
					else rightTextsNum++;
				}
				rightFieldNum++;
			} while (nextRightHtml != null);

			let rightPart: HTMLElement | null = null;
			if (rightAddOn.length > 0) {
				const iconDiv = document.createElement("div");
				iconDiv.className = "qp-sch-tile-icon";
				const iconsMaxWidth = rightIconsNum * 16 + Math.max(rightIconsNum - 1, 0) * 6 + 10;
				const textsMaxWidth = rightTextsNum * 25 + Math.max(rightTextsNum - 1, 0) * 6 + 10;
				iconDiv.style.maxWidth = `max(0px, calc((100% - ${iconsMaxWidth + textsMaxWidth}px)*999))`;
				rightAddOn.forEach(el => iconDiv.appendChild(el));
				rightPart = iconDiv;
			}

			if (leftPart) rowDiv.appendChild(leftPart);
			if (rightPart) rowDiv.appendChild(rightPart);
			if (rowDiv.innerHTML) container.appendChild(rowDiv);
		}

		container.className = "qp-sch-event-info";
		return container;
	}

	public getOperationRowMargin() {
		return 2;
	}

	public getOrderBrickHeight() {
		return this.calcBrickHeight(this.ordersBrickLeft, this.ordersBrickRight);
	}

	public getProductBrickHeight() {
		return this.getProductBarHeight() + 9;
	}

	public getProductBarHeight() {
		return 1 * 16 + 4 * 2;
	}

	public getOperationBrickHeight() {
		return this.calcBrickHeight(this.operationsBrickLeft, this.operationsBrickRight);
	}

	public unscheduledRenderer({ record, row, expanderElement, rowElement, region, cellElement }) {
		const order = this.data.unscheduled.getEntry(record.id);
		let cls = `b-sch-event ${this.getEntityClass(order)}`;
		if (this.activeEntity?.orderID === order.orderID) {
			cls = `${cls} qp-sch-search-highlight`;
		}

		const rendered = this.renderEntityWithStatusBar(order, null, "search");
		const children: HTMLElement[] = [];

		const outerDiv = document.createElement("div");
		outerDiv.className = `${cls} qp-sch-not-confirmed qp-sch-not-assigned`;

		const contentDiv = document.createElement("div");
		contentDiv.className = "b-sch-event-content";

		if (Array.isArray(rendered)) {
			rendered.forEach(el => {
				if (el instanceof HTMLElement) contentDiv.appendChild(el);
			});
		} else if ((<any>rendered) instanceof HTMLElement) {
			contentDiv.appendChild(rendered);
		}

		outerDiv.appendChild(contentDiv);
		children.push(outerDiv);

		return children;
	}

	public searchRenderer({ record, row, expanderElement, rowElement, region }) {
		const order = this.data.search.getEntry(record.id);
		let cls = `b-sch-event ${this.getEntityClass(order)}`;
		if (this.activeEntity?.orderID === order.orderID) {
			cls = `${cls} qp-sch-search-highlight`;
		}
		const rendered = this.renderEntityWithStatusBar(order, null, "search");
		const children: HTMLElement[] = [];

		const outerDiv = document.createElement("div");
		outerDiv.className = cls;

		const contentDiv = document.createElement("div");
		contentDiv.className = "b-sch-event-content";

		if (Array.isArray(rendered)) {
			rendered.forEach(el => {
				if (el instanceof HTMLElement) contentDiv.appendChild(el);
			});
		} else if ((<any>rendered) instanceof HTMLElement) {
			contentDiv.appendChild(rendered);
		}

		outerDiv.appendChild(contentDiv);
		children.push(outerDiv);

		return children;
	}

	protected calcBrickHeight(leftElement: QpFieldsetCustomElement, rightElement: QpFieldsetCustomElement) {
		const fieldsLeft = getRegularFields(leftElement);
		const fieldsRight = getRegularFields(rightElement);
		const maxRows = Math.max(fieldsLeft.length, fieldsRight.length);
		return Math.min(maxRows - 1) * 16 + 22 + 22;

		function getRegularFields(fieldset: QpFieldsetCustomElement) {
			return fieldset.Fields
				?.filter(x => fieldset.getFieldVisibility(true, x))
				?.filter(x => !["SchPriority", "IsLate", "IsOnTime", "IsEarly", "Selected", "LackOfMaterials", "FirmSchedule"].includes(x.name)) ?? [];
		}
	}

	protected getSchemeColor(entity: Order | Operation, scheme: ColorScheme = "Status") {
		let color = Renderer.colorsSchema[0];
		const colorScheme = scheme ?? this._preferences.colorScheme;
		switch (colorScheme) {
			case "Status":
				const statusKey = (entity instanceof Operation ? entity.OperationStatus : entity.StatusID).value.toUpperCase();
				color = Renderer.statusColors[statusKey]?.dark;
				break;
		}
		return color;
	}

	protected get isStatusColorScheme() {
		return this._preferences.colorScheme === "Status";
	}

	protected hasDarkBackground(entity: Order | Operation) {
		return false;
	}

	protected getEntityClass(entity: Order | Operation) {
		if (entity.isFilteredOut) {
			return "qp-sch-filtered-out";
		}

		if (entity.isCompleted && this.isStatusColorScheme) {
			return "qp-sch-locked";
		}
		return "";
	}

	protected renderEntityWithStatusBar(entity: Order | Operation, renderData: EventRenderData = null, role: EntityRole, event: EventModel = undefined) {
		const statusColor = this.getSchemeColor(entity, "Status") ?? "#000000"; // TODO: black is hardcoded as not visible
		const isFilteredOut = entity.isFilteredOut;

		const rendered = this.getEntityHtml(entity, isFilteredOut, role);
		const activeID = this.activeEntity?.orderID;
		const statusId = entity?.StatusID?.value;
		if (activeID) {
			if (activeID === entity.orderID) {
				(<any>renderData)?.cls.add("qp-sch-search-highlight");
			}
			else if (activeID !== entity.productID) (<any>renderData)?.cls.add("qp-sch-search-dimmed");
		}

		if (entity.isDimmed && activeID !== entity.orderID) {
			(<any>renderData)?.cls.add("qp-sch-search-dimmed");
		}

		if (entity.isUnscheduled) {
			(<any>renderData)?.cls.add("qp-sch-not-confirmed");
			(<any>renderData)?.cls.add("qp-sch-not-assigned");
		}

		(<any>renderData)?.cls.add(this.getEntityClass(entity));

		if (renderData?.width <= 70) {
			renderData.cls["qp-small-event"] = true;
			rendered.style.marginInlineStart = `${renderData.width - 10}px`;
			rendered.style.width = "max-content";
		}

		const statusBarFixedElement = document.createElement("div");
		statusBarFixedElement.classList.add("qp-sch-event-status-bar-fixed");
		statusBarFixedElement.setAttribute("event-background-dark", statusId);

		let statusBarHighlightStyle = "";
		if (role === "search") {
			statusBarHighlightStyle += "position: initial;";
			statusBarFixedElement.setAttribute("style", `${statusBarHighlightStyle}`);
			return [statusBarFixedElement, rendered];
		}

		const isEventMinWidth = renderData?.width <= 20;
		if (isEventMinWidth) statusBarHighlightStyle += "position: initial;";
		if (activeID && activeID === entity.orderID && !isEventMinWidth) statusBarHighlightStyle += "height: calc(100% - 4.8px);"; // border 3px shows 2.4px
		if (activeID && activeID === entity.orderID && isEventMinWidth) statusBarHighlightStyle += `width: ${(renderData.width - 6) / 2}px`;

		statusBarFixedElement.setAttribute("style", `${statusBarHighlightStyle}`);

		if (isEventMinWidth) return [statusBarFixedElement, rendered];

		const statusBarStickyElement = document.createElement("div");
		statusBarStickyElement.classList.add("qp-sch-event-status-bar");
		statusBarStickyElement.setAttribute("event-background-dark", statusId);

		if (renderData) {
			this.eventObservers.get(renderData.eventId)?.forEach(o => o.disconnect());
			const thisEventObservers = [];
			this.eventObservers.set(renderData.eventId, []);

			const statusWidthAsMaxThreshold = renderData.width <= 70 ? 1 : (9 / renderData.width);
			const thresholds = [];
			for (let i = statusWidthAsMaxThreshold; i <= 1; i += 0.1) {
				thresholds.push(Math.round(i * 10) / 10);
			}
			thresholds.push(1);
			const observer = new IntersectionObserver((entries, observer) => {
				entries?.forEach(entry => {
					const targetPos = entry.target.getBoundingClientRect();
					const stickyTargetPos = statusBarStickyElement.getBoundingClientRect();
					const isScrolling = targetPos?.left !== 0 && stickyTargetPos?.left !== 0
						&& (targetPos?.left + 9 < stickyTargetPos?.left);
					entry.target.classList?.toggle("scrolling", isScrolling);
					statusBarStickyElement?.classList?.toggle("scrolling", isScrolling);
				});
			}, { threshold: [0, 1] });

			thisEventObservers.push(observer);
			observer.observe(statusBarFixedElement);

			if (renderData.width <= 70) {
				statusBarFixedElement.classList?.toggle("scrolling", false);
				statusBarStickyElement.classList?.toggle("scrolling", false);
			} else if (this.scheduler) {
				const { startDate: minDate } = this.scheduler.visibleDateRange;
				const eventStartDate = renderData.eventRecord?.startDate as Date;
				if (minDate?.getTime() > eventStartDate?.getTime()) {
					statusBarFixedElement.classList?.toggle("scrolling", false);
					statusBarStickyElement.classList?.toggle("scrolling", true);
				}
			}
		}

		return [statusBarFixedElement, statusBarStickyElement, rendered];
	}

	protected renderProductEvent(entity: Order, renderData: any = null, eventStartPos: number = 0) {
		const minDate = entity.childMinStartDate;
		const maxDate = entity.childMaxEndDate;
		const dateToPos = (date) => this.scheduler.timeAxisViewModel.getPositionFromDate(date);
		const startPos = dateToPos(minDate < this.scheduler.startDate ? this.scheduler.startDate : minDate);
		const endPos = dateToPos(maxDate < this.scheduler.endDate ? maxDate : this.scheduler.endDate);
		let width = 0;
		if (this.activeEntity && this.activeEntity?.orderID === entity?.orderID) width = Math.max(19, endPos - startPos);
		else width = Math.max(16, endPos - startPos);
		const left = startPos - eventStartPos;

		let outerCls = "";
		let borderOffset = 0;
		let eventInfoStyle = "";
		if (this.activeEntity && this.activeEntity?.orderID === entity?.orderID) {
			outerCls += "qp-sch-search-highlight";
			borderOffset = 3;
		}
		else if (this.activeEntity && this.activeEntity.orderID !== entity?.orderID) outerCls += "qp-sch-search-dimmed";

		const orderBrickHeight = this.getProductBrickHeight() + borderOffset; // 33 + 3
		const orderBarHeight = this.getProductBarHeight() + borderOffset; // 24 + 3
		const jawsHeight = Math.max(orderBrickHeight - orderBarHeight + borderOffset * 2, 9 + borderOffset * 2);
		const barOffsetY = Number.isNaN(renderData?.height) ? 0 : Math.max(0, renderData?.height - orderBrickHeight);

		if (renderData) {
			renderData.width = Math.max(16, width ?? renderData.width);
		}

		eventInfoStyle += ` height: ${orderBarHeight}px;`;
		if (width <= 70) {
			eventInfoStyle += ` left: ${width}px;`;
			renderData.cls["qp-small-event"] = true;
		}
		const innerHtml = this.getProductEventHtml(entity);
		innerHtml.setAttribute("style", eventInfoStyle);
		const unscheduled = entity?.isUnscheduled ? "qp-sch-not-confirmed qp-sch-not-assigned " : "";

		const statusId = entity.StatusID?.value;
		if (renderData) {
			renderData.wrapperStyle += `height: ${orderBrickHeight}px;`;
			renderData.style += `top: ${Math.max(barOffsetY / 2, 0)}px; background-color: unset; border-radius: 0;`;
		}
		outerCls += ` ${this.getEntityClass(entity)}`;

		const lateDate = entity.requestedDate;
		const lateColor = "var(--qp-late-color-dark)";
		let lateSegment = undefined;
		let offsetLateSegmentX = 0;
		if (entity.isLate && lateDate?.getTime() && entity.endDate?.getTime() > lateDate?.getTime() && lateDate?.getTime() < this.scheduler.endDate?.getTime()) {
			const startPos = dateToPos(lateDate?.getTime() < this.scheduler.startDate?.getTime() ? this.scheduler.startDate : lateDate);
			const endPos = dateToPos(entity.endDate?.getTime() > this.scheduler.endDate?.getTime() ? this.scheduler.endDate : entity.endDate);
			const width = endPos - startPos;
			const left = startPos - eventStartPos;
			offsetLateSegmentX = Math.max(0, left);
			lateSegment = document.createElement("div");
			lateSegment.classList.add("qp-sch-late-segment");
			lateSegment.setAttribute("style", `left: ${left}px; width: ${width}px;`);
		}

		const productEventContainer = document.createElement("div");
		productEventContainer.className = "qp-product-event-container";
		productEventContainer.style.insetInlineStart = `${left}px`;
		productEventContainer.style.width = `${width}px`;

		const productEventBar = document.createElement("div");
		productEventBar.className = `qp-product-event-bar  ${outerCls} ${unscheduled}`;
		productEventBar.setAttribute("event-background-dark", statusId);
		productEventBar.setAttribute("style", `height: ${orderBarHeight}px;`);
		if (lateSegment) productEventBar.appendChild(lateSegment);

		const productEventJaws = document.createElement("div");
		productEventJaws.setAttribute("style", `height: ${jawsHeight}px`);
		productEventJaws.className = "qp-product-event-jaws";

		const productEventJawLeft = document.createElement("div");
		productEventJawLeft.className = `qp-product-event-jaw ${outerCls}`;
		if (entity.isLate && lateDate?.getTime() < minDate?.getTime() && offsetLateSegmentX <= 10) {
			productEventJawLeft.setAttribute("style", `color: ${lateColor} !important;`);
		} else {
			productEventJawLeft.setAttribute("event-background-dark", statusId);
		}

		const productEventJawRight = document.createElement("div");
		productEventJawRight.className = `qp-product-event-jaw ${outerCls}`;
		if (entity.isLate && lateDate?.getTime() < maxDate?.getTime()) {
			productEventJawRight.setAttribute("style", `color: ${lateColor} !important; transform: scaleX(-1);`);
		} else {
			productEventJawRight.setAttribute("style", `transform: scaleX(-1);`);
			productEventJawRight.setAttribute("event-background-dark", statusId);
		}

		productEventJaws.appendChild(productEventJawLeft);
		productEventJaws.appendChild(productEventJawRight);

		productEventContainer.appendChild(productEventBar);
		productEventContainer.appendChild(productEventJaws);

		return [productEventContainer, innerHtml];
	}

	protected getProductEventHtml(entity: Order): HTMLDivElement {
		const templateLeft = this.productBrickLeft;
		const templateRight = this.productBrickRight;
		const fieldsText = this.getEntityHtmlPart(
			templateLeft,
			templateRight,
			(field) => this.getEntityFieldHtml(field, entity, false, false)
		);
		fieldsText.setAttribute("resource-event-type", "product");

		return fieldsText;
	}

	protected renderEarlySegment(entity: Order, renderData: Object = null) {
		const div = document.createElement("div");
		div.className = "qp-sch-early-segment";

		const activeID = this.activeEntity?.orderID;
		if (entity.isDimmed && activeID !== entity.orderID) {
			(<any>renderData)?.cls.add("qp-sch-search-dimmed");
		}

		const bgColor = Renderer.colorsSchema.lightGreen;
		if (renderData) (<any>renderData).style = `background-color: ${bgColor}`;

		(<any>renderData)?.cls.add(this.getEntityClass(entity));

		return div;
	}

	protected getUnscheduledHtml(entity: Order): HTMLDivElement {
		const templateLeft = this.unscheduledBrickLeft;
		const templateRight = this.unscheduledBrickRight;
		const fieldsText = this.getEntityHtmlPart(templateLeft, templateRight, (field) => this.getUnscheduledFieldHtml(field, entity));
		fieldsText.setAttribute("resource-event-type", "search");

		return fieldsText;
	}

	protected getEntityHtml(entity: Order | Operation, isFilteredOut = false, role: EntityRole) {
		const useMarks = role === "search";
		let templateLeft: QpFieldsetCustomElement;
		let templateRight: QpFieldsetCustomElement;
		switch (role) {
			case "order":
				templateLeft = this.ordersBrickLeft;
				templateRight = this.ordersBrickRight;
				break;
			case "operation":
				templateLeft = this.operationsBrickLeft;
				templateRight = this.operationsBrickRight;
				break;
			case "search":
				templateLeft = this.searchBrickLeft;
				templateRight = this.searchBrickRight;
				break;
		}
		const fieldsText = this.getEntityHtmlPart(templateLeft, templateRight, (field) => this.getEntityFieldHtml(field, entity, useMarks, isFilteredOut));
		fieldsText.setAttribute("resource-event-type", role);

		return fieldsText;
	}

	protected getUnscheduledFieldHtml(field: DataFieldDescriptor, entity: Order): HTMLSpanElement {
		let cellText = "";
		const value = entity[field.name];
		const colorStyle = "";
		const fieldFullName = `${field.viewName}.${field.name}`;

		if (["SchPriority", "IsLate", "IsOnTime", "IsEarly", "Selected", "LackOfMaterials"].includes(field.name)) {
			return this.getIconCode(field, entity, fieldFullName, value?.value ?? cellText);
		}

		cellText = cellText || (value?.cellText ?? "");
		let linkClass = "";
		if (fieldFullName === "SelectedWCOperation.ProdOrdID") {
			cellText = entity.orderID || cellText;
			linkClass = "qp-sch-popup-link";
		}
		const escapedValue = StringHelper.xss`${cellText}`;
		const valueWithMarks = this.applyMarks(escapedValue, this.unscheduledFastFilter?.value);

		const span = document.createElement("span");
		if (colorStyle) {
			span.setAttribute("style", colorStyle);
		}
		if (linkClass) {
			span.setAttribute("class", linkClass);
		}

		span.setAttribute("sch-field", fieldFullName);
		span.setAttribute("sch-value", value?.value ?? cellText);

		const innerSpan = document.createElement("span");
		if (/<[a-z][\s\S]*>/i.test(valueWithMarks)) {
			innerSpan.innerHTML = valueWithMarks;
		} else {
			innerSpan.textContent = valueWithMarks;
		}
		span.appendChild(innerSpan);

		return span;
	}

	protected getIconCode(field: DataFieldDescriptor, entity: Order | Operation, fieldName: string, value: any, overwriteWhiteBG = undefined): HTMLSpanElement {
		const valueText = (field.name === "Selected") ? entity.isSelected : value;
		const iconUrl = this.getIconUrl(field.name, valueText);
		if (!iconUrl) return document.createElement("span");

		const span = document.createElement("span");

		const svgNS = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(svgNS, "svg");
		svg.setAttribute("class", "qp-sch-tile-icon");

		svg.setAttribute("sch-field", fieldName);
		svg.setAttribute("sch-value", value);

		const use = document.createElementNS(svgNS, "use");
		use.setAttribute("href", iconUrl);
		svg.appendChild(use);

		span.appendChild(svg);

		if (["SchPriority", "IsLate", "IsEarly", "IsOnTime", "Selected"].includes(field.name)) {
			const tooltip = document.createElement("qp-tooltip");
			tooltip.textContent = value?.text ?? `${field.name}: ${valueText}`;
			span.appendChild(tooltip);
		}

		return span;
	}

	protected getEntityFieldHtml(field: DataFieldDescriptor, entity: Order | Operation, useMarks: boolean, isFilteredOut = false): HTMLSpanElement {
		let cellText = "";
		let caption = "";
		const value = entity[field.name];
		let colorStyle = "";
		if (field.name === "StatusID") {
			colorStyle = this.getSchemeColor(entity, "Status");
			colorStyle = colorStyle !== "" ? `color: ${colorStyle};` : "";
			cellText = entity.prodSchdStatus;
		}

		const fieldFullName = `${field.viewName}.${field.name}`;

		if (["SchPriority", "IsLate", "IsEarly", "IsOnTime", "Selected", "LackOfMaterials", "FirmSchedule"].includes(field.name)) {
			return this.getIconCode(field, entity, fieldFullName, value?.value ?? cellText);
		}

		cellText = cellText || (value?.cellText ?? "");
		let linkClass = "";
		if (fieldFullName === "SelectedWCOperation.ProdOrdID") {
			cellText = entity.orderID || cellText;
			linkClass = "qp-sch-popup-link";
		}

		if (field.name === "QtytoProd") {
			caption = value?.displayName ? `${value.displayName}: ` : "";
		}
		const escapedValue = StringHelper.xss`${cellText}`;
		const valueWithMarks = useMarks
			? this.applyMarks(escapedValue, this.searchFastFilter?.value)
			: escapedValue;
		const renderedValue = isFilteredOut ? "" : valueWithMarks;

		const span = document.createElement("span");
		if (colorStyle) {
			span.setAttribute("style", colorStyle);
		}
		if (linkClass) {
			span.setAttribute("class", linkClass);
		}

		span.setAttribute("sch-field", fieldFullName);
		span.setAttribute("sch-value", value?.value ?? cellText);

		if (caption) {
			const captionSpan = document.createElement("span");
			captionSpan.textContent = caption;
			span.appendChild(captionSpan);
		}

		const valueSpan = document.createElement("span");
		if (/<[a-z][\s\S]*>/i.test(renderedValue)) {
			valueSpan.innerHTML = renderedValue;
		} else {
			valueSpan.textContent = renderedValue;
		}
		span.appendChild(valueSpan);

		return span;
	}

	protected applyMarks(field: string, search: string) {
		if (!search) return field;

		const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
		const regExp = new RegExp(escapedSearch, "gi");
		return field.replace(regExp, (match) => `<mark>${match}</mark>`);
	}

	protected getIconUrl(field: string, value: any) {
		switch (field) {
			case "SchPriority": {
				const numValue = value ? Number(value) : DataHandler.defaultSchPriority;
				switch (true) {
					case (numValue < 5): return this.iconPriorityHigh.SvgUrl;
					case (numValue === 5): return this.iconPriorityMedium.SvgUrl;
					case (numValue > 5): return this.iconPriorityLow.SvgUrl;
				}
			}
			case "IsLate":
				if (!value) return null;
				return this.iconLate.SvgUrl;
			case "IsEarly":
				if (!value) return null;
				return this.iconEarly.SvgUrl;
			case "IsOnTime":
				if (!value) return null;
				return this.iconOnTime.SvgUrl;
			case "Selected":
				if (!value) return null;
				return this.iconSelected.SvgUrl;
			case "LackOfMaterials":
				if (!value) return null;
				return this.iconLackOfMaterials.SvgUrl;
			case "FirmSchedule":
				if (!value) return null;
				return this.iconFirmLock.SvgUrl;
		}
		return "";
	}

	protected getIconHtml(iconRef: QpHyperIconCustomElement) {
		if (!iconRef) return undefined;
		const svgNS = "http://www.w3.org/2000/svg";
		const iconElem = document.createElementNS(svgNS, "svg");
		iconElem.classList.add("qp-sch-tile-icon");
		const useElem = document.createElementNS(svgNS, "use");
		useElem.setAttribute("href", iconRef.SvgUrl);
		iconElem.appendChild(useElem);
		return iconElem;
	}

	protected getAdjustedToDependencyPath(originalSvgPath: string, fromEvent: EventModel, fromBox: Rectangle, toEvent: EventModel, toBox: Rectangle) {
		if (fromEvent && toEvent && fromEvent?.endDate > toEvent?.startDate) return originalSvgPath;
		if (!fromBox || !toBox) return originalSvgPath;

		const horizontalLineOffset = 27;
		const originalHorizontalLineWidth = toBox.x - fromBox.right + (toBox.width / 2);
		const minHorizontalLineWidth = toBox.x - fromBox.right;
		const updatedHorizontalLine = this.findDependencyMinimumWidth(minHorizontalLineWidth, originalHorizontalLineWidth, horizontalLineOffset);

		return originalSvgPath?.replace(`h${originalHorizontalLineWidth}`, `h${updatedHorizontalLine}`);
	}

	protected findDependencyMinimumWidth(minX: number, maxX: number, offSet: number) {
		if ((minX + offSet) < maxX) return minX + offSet;
		if ((maxX - offSet) < minX) return minX + (maxX - minX) / 2;
		return this.findDependencyMinimumWidth(minX, maxX - offSet, offSet);
	}
}
