/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { bindable } from "aurelia-framework";
import { DependencyModel, DependencyModelConfig, DomConfig, DomHelper, EventModel, Grid, Rectangle, ResourceModel, SchedulerPro, StringHelper } from "@bryntum/schedulerpro";
import { GridCell, IGridColumn, IGridRow, IGridViewCollectionConfig, PXViewCollection, QpGridCustomElement, QpHyperIconCustomElement } from "client-controls";
import { DataHandler } from "./data-handler";
import { ResourceEventType, ProdOpersMatls, ProdOrder } from "./view-models";
import { EventRenderData } from "./Descriptors";

export class RendererConfig {
	data: DataHandler;
	isPeriodMonth: () => boolean;
	getScheduler: () => SchedulerPro;
	getActiveEntity: () => ProdOrder | ProdOpersMatls;
	getActiveOrder: () => ProdOrder;
	ordersEventView: () => PXViewCollection<ProdOrder>;
	opersMatlsEventsView: () => PXViewCollection<ProdOpersMatls>;
}

export class Renderer {

	// #region Grid Configs representing Events
	readonly ordersTextBrickLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, fieldSeperator: ".",
		fontWeight: "bold",
		columns: [
			{ field: "ProdOrdID" }
		]
	};

	readonly orderIconsBrickLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, columns: [
			{ field: "SchPriority" },
			{ field: "FirmSchedule" },
			{ field: "LackOfMaterials" }
		]
	};

	readonly ordersTextBrickRightGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, fieldSeperator: ".",
		columns: [
			{ field: "ShippingDescr" }
		]
	};

	readonly ordersIconsBrickRightGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, columns: [
			{ field: "IsLate" },
			{ field: "IsEarly" },
			{ field: "IsOnTime" }
		]
	};

	readonly operationsBrickRow1TextLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, fieldSeperator: ".",
		fontWeight: "bold",
		columns: [
			{ field: "OrderType" },
			{ field: "ProdOrdID" }
		]
	};

	readonly operationsBrickRow1IconsLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, columns: [
			{ field: "OutsideProcess", visible: true },
			{ field: "LackOfMaterials", visible: true }
		]
	};

	readonly operationsBrickRow1TextRightGridConfig: IGridViewCollectionConfig | any = { hidden: true, showTopBar: false };

	readonly operationsBrickRow1IconsRightGridConfig: IGridViewCollectionConfig | any = { hidden: true, showTopBar: false };

	readonly operationsBrickRow2TextLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, fieldSeperator: ".",
		columns: [
			{ field: "OperationEventCD" }
		]
	};

	readonly operationsBrickRow2IconsLeftGridConfig: IGridViewCollectionConfig | any = { hidden: true, showTopBar: false };

	readonly operationsBrickRow2TextRightGridConfig: IGridViewCollectionConfig | any = { hidden: true, showTopBar: false };

	readonly operationsBrickRow2IconsRightGridConfig: IGridViewCollectionConfig | any = { hidden: true, showTopBar: false };

	readonly materialsBrickCol1IconsGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, columns: [
			{ field: "IsMatlRegularStockWBom" },
			{ field: "IsMatlRegularStockWOBom" },
			{ field: "IsMatlSubCWBomMFG" },
			{ field: "IsMatlSubCWOBomMFG" },
			{ field: "IsMatlRegularNS" },
			{ field: "IsMatlSubCNS" }]
	};

	readonly materialsBrickCol2Row1TextLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, fieldSeperator: ".",
		fontWeight: "bold",
		columns: [
			{ field: "MatlPOOrderNbr", viewName: "ProdOpersMatls", allowEdit: true },
			{ field: "MaterialCD" }
		]
	};

	readonly materialsBrickCol2Row2TextLeftGridConfig: IGridViewCollectionConfig | any = {
		hidden: true, showTopBar: false, fieldSeperator: ".",
		columns: [
			{ field: "MatlDescr" },
			{ field: "ReceivedDescr" },
			{ field: "IssuedDescr" }]
	};
	// #endregion

	@bindable ordersTextBrickLeft: QpGridCustomElement;
	@bindable ordersIconsBrickLeft: QpGridCustomElement;
	@bindable ordersTextBrickRight: QpGridCustomElement;
	@bindable ordersIconsBrickRight: QpGridCustomElement;
	@bindable operationsBrickRow1TextLeft: QpGridCustomElement;
	@bindable operationsBrickRow1IconsLeft: QpGridCustomElement;
	@bindable operationsBrickRow1TextRight: QpGridCustomElement;
	@bindable operationsBrickRow1IconsRight: QpGridCustomElement;
	@bindable operationsBrickRow2TextLeft: QpGridCustomElement;
	@bindable operationsBrickRow2IconsLeft: QpGridCustomElement;
	@bindable operationsBrickRow2TextRight: QpGridCustomElement;
	@bindable operationsBrickRow2IconsRight: QpGridCustomElement;
	@bindable materialsBrickCol1Icons: QpGridCustomElement;
	@bindable materialsBrickCol2Row1TextLeft: QpGridCustomElement;
	@bindable materialsBrickCol2Row2TextLeft: QpGridCustomElement;

	@bindable iconPriorityHigh: QpHyperIconCustomElement;
	@bindable iconPriorityMedium: QpHyperIconCustomElement;
	@bindable iconPriorityLow: QpHyperIconCustomElement;
	@bindable iconSelected: QpHyperIconCustomElement;
	@bindable iconLackOfMaterials: QpHyperIconCustomElement;
	@bindable iconFirmLock: QpHyperIconCustomElement;
	@bindable iconLate: QpHyperIconCustomElement;
	@bindable iconOnTime: QpHyperIconCustomElement;
	@bindable iconEarly: QpHyperIconCustomElement;
	@bindable iconMatlWBom: QpHyperIconCustomElement;
	@bindable iconMatlWOBom: QpHyperIconCustomElement;
	@bindable iconMatlSubCWBomMFG: QpHyperIconCustomElement;
	@bindable iconMatlSubCWOBomMFG: QpHyperIconCustomElement;
	@bindable iconMatlRegularNS: QpHyperIconCustomElement;
	@bindable iconMatlSubCNS: QpHyperIconCustomElement;
	@bindable iconProdOrder: QpHyperIconCustomElement;
	@bindable iconRegularOper: QpHyperIconCustomElement;
	@bindable iconOutsideOper: QpHyperIconCustomElement;
	@bindable iconCollapse: QpHyperIconCustomElement;
	@bindable iconExpand: QpHyperIconCustomElement;

	public eventObservers: Map<string, IntersectionObserver[]>;

	public static eventSegments = {
		product: "product",
		earlySegment: "earlySegment",
		productEarlySegment: "product - earlySegment",
		onTimeSegment: "onTimeSegment",
		productOnTimeSegment: "product - onTimeSegment",
		event: "event"
	};

	public constructor(private config: RendererConfig) {
		this.eventObservers = new Map();
	}

	private get activeEntity() { return this.config.getActiveEntity(); }
	private get activeOrder() { return this.config.getActiveOrder(); }
	private get data() { return this.config.data; }
	private get scheduler() { return this.config.getScheduler(); }

	// TODO : return HTMLELEMENT objects or DOM CONFIG Objects instead of string.
	// Helps take control of interactions with elements
	// See calendarResourceRenderer()
	public calendarEventRenderer({ eventRecord, resourceRecord, renderData }) {
		const event = eventRecord as EventModel;
		const eventEntity = this.data.getResourceEventEntity(event);
		const order = this.data.getOrder(eventEntity?.orderID);
		const eventType: ResourceEventType = this.data.getEventType(event);
		if (!order) return "";

		if (!renderData) renderData = {};
		renderData.style = {};
		renderData.wrapperStyle = {};
		renderData.eventStyle = renderData.eventStyle ?? "";
		renderData.eventColor = renderData.eventColor ?? "";

		switch (eventType) {
			case ResourceEventType.Order:
				const orderPos = this.getCalcedPos(new Date(event.startDate));
				return this.renderOrderEvent(order, renderData, orderPos);
			case ResourceEventType.Material:
				return this.renderMaterialEvent((<ProdOpersMatls>eventEntity), renderData);
			case ResourceEventType.Operation:
				return this.renderOperationEvent((<ProdOpersMatls>eventEntity), renderData);
			default:
				return "";
		}
	}

	public calendarResourceRenderer({ record, cellElement, grid }: { cellElement: HTMLElement; grid: Grid; record: ResourceModel }) {
		const resource = record as ResourceModel;
		const iconCode = this.data.getResourceIconCode(resource);

		const childLevel = resource?.childLevel ? resource.childLevel + 1 : 1;
		const collapseBtnOffsetPx = resource?.descendantCount > 0 ? 16 + 5 : 0; // Account for the gap between flex items too
		const indent = childLevel * 1.7;
		const container = DomHelper.createElement({ tag: "div",
			className: "b-tree-cell-inner b-text-value",
			style: `padding-inline-start: calc(${indent}em - ${collapseBtnOffsetPx}px);` }) as HTMLElement;

		let expandedState = resource?.isExpanded(resource?.getCalendar()?.resourceStore);
		if (typeof expandedState !== "boolean") expandedState = resource.expanded;

		if (resource?.descendantCount > 0) {
			let collapseBtn : SVGSVGElement;
			if (expandedState) {
				collapseBtn = this.getIconHtmlFromCode("svg:qp_tree@CollapseL") as SVGSVGElement;
			} else {
				collapseBtn = this.getIconHtmlFromCode("svg:qp_tree@ExpandL") as SVGSVGElement;
			}
			collapseBtn?.classList?.add("qp-chevron-icon");
			if (collapseBtn?.style?.cursor !== undefined) collapseBtn.style.cursor = "pointer";
			if (collapseBtn) container.appendChild(collapseBtn);
		}

		if (iconCode) {
			const iconElement = this.getIconHtmlFromCode((<string>iconCode)) as SVGSVGElement;
			if (iconElement) {
				container.appendChild(iconElement);
			}
		}

		container.appendChild(DomHelper.createElement({ tag: "span", html: resource.name }) as HTMLElement);
		return container;
	}

	public eventDependencyRenderer({ dependencyRecord: dependency, domConfig, fromBox, toBox, ...renderData}: { dependencyRecord: DependencyModel; domConfig: DomConfig; fromBox: Rectangle; toBox: Rectangle }) {
		if (domConfig.d) domConfig.d = this.getAdjustedToDependencyPath(domConfig.d, dependency.fromEvent as EventModel, fromBox, dependency.toEvent as EventModel, toBox);
	}

	public static orderDependencyLineConfig(from: { startDate: Date; endDate: Date }, to: { startDate: Date; endDate: Date }) : Partial<DependencyModelConfig> {
		let toSide: "top" | "left" | "bottom" | "right" ;
		let fromSide: "top" | "left" | "bottom" | "right";

		if (from.endDate < to.endDate) {
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

	public getOperationRowMargin() {
		return 2;
	}

	public getOrderBrickHeight() {
		return this.getOrderBarHeight() + 9;
	}

	public getOrderBarHeight() {
		return 1 * 16 + 4 * 2 ;
	}

	public getOperationBrickHeight() {
		return this.calcBrickHeight(2);
	}

	public getMaterialBrickHeight() {
		return this.calcBrickHeight(2);
	}

	protected calcBrickHeight(maxRows: number) {
		return maxRows * 16 + (Math.max(maxRows - 1, 0) * 4) + 7 * 2;
	}

	protected hasDarkBackground(entity: ProdOrder | ProdOpersMatls) {
		return false;
	}

	protected getEntityClass(entity: ProdOrder | ProdOpersMatls) {
		if (entity.isFilteredOut) {
			return "qp-sch-filtered-out";
		}

		if (entity.isCompleted) {
			return "qp-sch-locked";
		}
		return "";
	}

	protected getIconCode(cell: GridCell, col: IGridColumn, template: QpGridCustomElement, overwriteWhiteBG = undefined) {
		const valueText = cell?.cellText;
		const value = cell?.value?.id || cell?.value?.value || cell?.value;
		const iconUrl = this.getIconUrl(col?.field, value);
		if (!iconUrl) return undefined;
		const fieldFullName = `${template?.getViewName() || col?.viewName || cell?.viewName}.${col?.field || cell?.name}`;
		const fieldContainer = document.createElement("span");

		const svgNS = "http://www.w3.org/2000/svg";
		const iconElem = document.createElementNS(svgNS, "svg");
		iconElem.classList.add("qp-sch-tile-icon");
		iconElem.setAttribute("sch-field", fieldFullName);
		iconElem.setAttribute("sch-value", value);
		const useElem = document.createElementNS(svgNS, "use");
		useElem.setAttribute("href", iconUrl);
		iconElem.appendChild(useElem);

		fieldContainer.appendChild(iconElem);

		if (["SchPriority", "IsLate", "IsEarly", "IsOnTime", "Selected"].includes(cell.name)) {
			const tooltipElem = document.createElement("qp-tooltip");
			tooltipElem.textContent = `${value.text ?? cell.name}: ${valueText}`;
			fieldContainer.appendChild(tooltipElem);
		}

		return fieldContainer;
	}

	protected getIconHtmlFromCode(iconCode: string) {
		const allIcons = [ this.iconPriorityHigh,
			this.iconPriorityMedium,
			this.iconPriorityLow,
			this.iconSelected,
			this.iconLackOfMaterials,
			this.iconFirmLock,
			this.iconLate,
			this.iconOnTime,
			this.iconEarly,
			this.iconMatlWBom,
			this.iconMatlWOBom,
			this.iconMatlSubCWBomMFG,
			this.iconMatlSubCWOBomMFG,
			this.iconMatlRegularNS,
			this.iconMatlSubCNS,
			this.iconProdOrder,
			this.iconRegularOper,
			this.iconOutsideOper,
			this.iconCollapse,
			this.iconExpand
		];

		const found = allIcons.find(icon => icon?.images?.normal === iconCode || icon?.images?.disabled === iconCode || icon?.images?.hover === iconCode || icon?.images?.pushed === iconCode);
		if (!found) return undefined;
		const svgNS = "http://www.w3.org/2000/svg";
		const iconElem = document.createElementNS(svgNS, "svg");
		iconElem.classList.add("qp-sch-tile-icon");
		const useElem = document.createElementNS(svgNS, "use");
		useElem.setAttribute("href", found.SvgUrl);
		iconElem.appendChild(useElem);
		return iconElem;
	}

	protected getEntityFieldHtml(field: GridCell, col: IGridColumn, template: QpGridCustomElement) {
		const value = field?.cellText || field?.value?.text || field?.value?.id || field?.value;

		if (value === "" || typeof value === "object") return undefined;
		let linkClass = "";
		if (field?.href && field.href !== "") {
			linkClass = "qp-sch-popup-link";
		}

		const fieldFullName = `${template?.getViewName() || col?.viewName || field?.viewName}.${col?.field || field?.name}`;
		const renderedValue = StringHelper.xss`${value}`;
		const fieldContainer = document.createElement("span");
		fieldContainer.className = linkClass;
		fieldContainer.setAttribute("sch-field", fieldFullName);
		fieldContainer.setAttribute("sch-value", value);
		const fieldValue = document.createElement("span");
		fieldValue.innerHTML = renderedValue;
		fieldContainer.appendChild(fieldValue);
		return fieldContainer;
	}

	protected generateEntityTextualHtml(template: QpGridCustomElement, row: IGridRow) {
		template?.fillVisibleColumns();
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const columns : IGridColumn[] = template["visibleCols"] ?? [];
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const seperator = template?.config["fieldSeperator"];
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const fontWeight = template?.config["fontWeight"];
		if (!columns?.length) return undefined;

		const htmls = document.createElement("span");
		let i = 0;
		let prevFieldHtml = null;
		for (const col of columns) {
			const cell : GridCell = template.getCell(col, row);
			const htmlField = this.getEntityFieldHtml(cell, col, template);
			if (htmlField) {
				const textWeight = Number.isNaN(fontWeight) ? "normal" : fontWeight;
				if (htmlField?.firstElementChild) {
					const firstChild = htmlField.firstElementChild as HTMLElement;
					if (firstChild) firstChild.style.fontWeight = textWeight;
					else htmlField.style.fontWeight = textWeight;
				} else {
					htmlField.style.fontWeight = textWeight;
				}

				if (i !== 0 && prevFieldHtml && seperator) {
					const seperatorElem = document.createElement("span");
					seperatorElem.setAttribute("field-seperator", "true");
					seperatorElem.innerHTML = seperator;
					htmls.appendChild(seperatorElem);
				}
				htmls.appendChild(htmlField);
				prevFieldHtml = htmlField;
			}
			i++;
		}
		return htmls;
	}

	protected generateEntityIconsHtml(template: QpGridCustomElement, row: IGridRow) {
		template?.fillVisibleColumns();
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const columns : IGridColumn[] = template["visibleCols"] ?? [];
		if (!columns?.length) return undefined;

		const htmls = document.createElement("span");
		for (const col of columns) {
			const cell : GridCell = template.getCell(col, row);
			const iconElem = this.getIconCode(cell, col, template);
			if (iconElem) htmls.appendChild(iconElem);
		}
		return htmls;
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
			case "IsMatlRegularStockWBom":
				if (!value) return null;
				return this.iconMatlWBom.SvgUrl;
			case "IsMatlRegularStockWOBom":
				if (!value) return null;
				return this.iconMatlWOBom.SvgUrl;
			case "IsMatlSubCWBomMFG":
				if (!value) return null;
				return this.iconMatlSubCWBomMFG.SvgUrl;
			case "IsMatlSubCWOBomMFG":
				if (!value) return null;
				return this.iconMatlSubCWOBomMFG.SvgUrl;
			case "IsMatlRegularNS":
				if (!value) return null;
				return this.iconMatlRegularNS.SvgUrl;
			case "IsMatlSubCNS":
				if (!value) return null;
				return this.iconMatlSubCNS.SvgUrl;
			case "OutsideProcess":
				if (!value) return null;
				return this.iconOutsideOper.SvgUrl;
		}
		return "";
	}

	// #region Event Renderer
	protected getOrderEventHtml(entity: ProdOrder, style: string = "") {
		const view = this.config?.ordersEventView();
		if (!view) return undefined;
		const rowIndex = view?.getRowIndex(entity);
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const gridRow : IGridRow | undefined = rowIndex >= 0 ? view["rowsData"][rowIndex] : undefined;
		if (!gridRow) return undefined;

		const row1TextLeft = this.generateEntityTextualHtml(this.ordersTextBrickLeft, gridRow);
		const row1TextRight = this.generateEntityTextualHtml(this.ordersTextBrickRight, gridRow);
		const row1IconsLeft = this.generateEntityIconsHtml(this.ordersIconsBrickLeft, gridRow);
		const row1IconsRight = this.generateEntityIconsHtml(this.ordersIconsBrickRight, gridRow);
		const eventInfoElem = document.createElement("div");
		eventInfoElem.setAttribute("style", style);
		eventInfoElem.classList.add("qp-sch-event-info");
		eventInfoElem.setAttribute("resource-event-type", ResourceEventType.Order);

		const row1 = document.createElement("div");
		const row1Col1 = document.createElement("div");
		const row1Col2 = document.createElement("div");

		if (row1TextLeft) row1Col1.appendChild(row1TextLeft);
		if (row1IconsLeft) row1Col1.appendChild(row1IconsLeft);
		if (row1TextRight) row1Col2.appendChild(row1TextRight);
		if (row1IconsRight) row1Col2.appendChild(row1IconsRight);
		row1.appendChild(row1Col1);
		row1.appendChild(row1Col2);
		eventInfoElem.appendChild(row1);

		return eventInfoElem;
	}

	protected renderOrderEvent(entity: ProdOrder, renderData: any = null, eventStartPos: number = 0) {
		const minDate = entity.startDate;
		const maxDate = entity.endDate;
		const dateToPos = (date) => this.scheduler.timeAxisViewModel.getPositionFromDate(date);

		let outerCls = "";
		let borderOffset = 0;
		let eventInfoStyle = "";
		if (this.activeEntity && this.activeEntity?.orderID === entity?.orderID && this.activeEntity instanceof ProdOrder) {
			outerCls += "qp-sch-search-highlight";
			borderOffset = 3;
			eventInfoStyle += " bottom: 3px;";
		}
		else if (this.activeOrder && this.activeOrder.orderID !== entity?.orderID) outerCls += "qp-sch-search-dimmed";

		const orderBrickHeight = this.getOrderBrickHeight() + borderOffset; // 33 + 3
		const orderBarHeight = this.getOrderBarHeight() + borderOffset; // 24 + 3
		const jawsHeight = Math.max(orderBrickHeight - orderBarHeight + borderOffset * 2, 9 + borderOffset * 2);
		const barOffsetY = Number.isNaN(renderData?.height) ? 0 : Math.max(0, renderData?.height - orderBrickHeight);

		if (renderData) {
			let width = 0;
			if (this.activeEntity && this.activeEntity?.orderID === entity?.orderID && this.activeEntity instanceof ProdOrder) width = Math.max(19, renderData.width);
			else width = Math.max(16, renderData.width);
			renderData.width = width;
		}

		eventInfoStyle += ` height: ${orderBarHeight}px;`;
		if (renderData?.width <= 70) {
			eventInfoStyle += ` left: ${renderData.width}px;`;
			renderData.cls["qp-small-event"] = true;
		}
		const innerHtml = this.getOrderEventHtml(entity, eventInfoStyle);
		const unscheduled = entity?.isUnscheduled ? "qp-sch-not-confirmed qp-sch-not-assigned " : "";

		const statusId = entity.StatusID?.value;
		if (renderData) {
			renderData.wrapperStyle.height = orderBrickHeight;
			renderData.style.top = Math.max(barOffsetY / 2, 0);
			renderData.style["background-color"] = "unset";
			renderData.style["border-radius"] = "0";
			renderData.eventStyle += ` background-color: unset;`;
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
		productEventContainer.className = `qp-product-event-container`;

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

	protected getOperationEventHtml(entity: ProdOpersMatls, renderData: any = null) {
		const view = this.config?.opersMatlsEventsView();
		if (!view) return undefined;
		const rowIndex = view?.getRowIndex(entity);
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const gridRow : IGridRow | undefined = rowIndex >= 0 ? view["rowsData"][rowIndex] : undefined;
		if (!gridRow) return undefined;

		let smallEventOffsetStyle = "";
		if (renderData?.width <= 70) {
			renderData.cls["qp-small-event"] = true;
			smallEventOffsetStyle = `margin-inline-start: ${renderData.width - 10}px;`;
		}

		const row1TextLeft = this.generateEntityTextualHtml(this.operationsBrickRow1TextLeft, gridRow);
		const row1TextRight = this.generateEntityTextualHtml(this.operationsBrickRow1TextRight, gridRow);
		const row1IconsLeft = this.generateEntityIconsHtml(this.operationsBrickRow1IconsLeft, gridRow);
		const row1IconsRight = this.generateEntityIconsHtml(this.operationsBrickRow1IconsRight, gridRow);
		const row2TextLeft = this.generateEntityTextualHtml(this.operationsBrickRow2TextLeft, gridRow);
		const row2TextRight = this.generateEntityTextualHtml(this.operationsBrickRow2TextRight, gridRow);
		const row2IconsLeft = this.generateEntityIconsHtml(this.operationsBrickRow2IconsLeft, gridRow);
		const row2IconsRight = this.generateEntityIconsHtml(this.operationsBrickRow2IconsRight, gridRow);

		const eventInfoElem = document.createElement("div");
		eventInfoElem.setAttribute("style", smallEventOffsetStyle);
		eventInfoElem.classList.add("qp-sch-event-info");
		eventInfoElem.setAttribute("resource-event-type", ResourceEventType.Operation);

		const row1 = document.createElement("div");
		const row2 = document.createElement("div");
		const row1Col1 = document.createElement("div");
		const row1Col2 = document.createElement("div");
		const row2Col1 = document.createElement("div");
		const row2Col2 = document.createElement("div");

		if (row1TextLeft) row1Col1.appendChild(row1TextLeft);
		if (row1IconsLeft) row1Col1.appendChild(row1IconsLeft);
		if (row1TextRight) row1Col2.appendChild(row1TextRight);
		if (row1IconsRight) row1Col2.appendChild(row1IconsRight);
		row1.appendChild(row1Col1);
		row1.appendChild(row1Col2);

		if (row2TextLeft) row2Col1.appendChild(row2TextLeft);
		if (row2IconsLeft) row2Col1.appendChild(row2IconsLeft);
		if (row2TextRight) row2Col2.appendChild(row2TextRight);
		if (row2IconsRight) row2Col2.appendChild(row2IconsRight);
		row2.appendChild(row2Col1);
		row2.appendChild(row2Col2);

		eventInfoElem.appendChild(row1);
		eventInfoElem.appendChild(row2);

		return eventInfoElem;
	}

	protected renderOperationEvent(eventEntity: ProdOpersMatls, renderData: EventRenderData = null) {
		if (renderData) {
			renderData.wrapperStyle.height = this.getOperationBrickHeight();
			const barOffsetY = Number.isNaN(renderData?.height) ? 0 : Math.max(0, renderData?.height - renderData.wrapperStyle.height);
			renderData.style.top = Math.max(barOffsetY / 2, 0);
			renderData.width = Math.max(16, renderData.width);
		}

		const statusId = eventEntity?.StatusID?.value;
		const rendered = this.getOperationEventHtml(eventEntity, renderData);
		const order = this.data.getOrder(eventEntity.orderID);

		if (this.activeOrder && this.activeOrder.orderID !== order?.orderID) {
			renderData.cls["qp-sch-search-dimmed"] = true;
		}

		let statusBarHighlightStyle = "";
		if (this.activeEntity && this.activeEntity instanceof ProdOpersMatls
				&& this.activeEntity.operMatlLineID === eventEntity?.operMatlLineID) {
			renderData.cls["qp-sch-search-highlight"] = true;
			statusBarHighlightStyle = "height: 44px; margin-left: 0px !important; margin-block: 3px;";
		}

		const statusBarFixedElement = document.createElement("div");
		statusBarFixedElement.classList.add("qp-sch-event-status-bar-fixed");
		statusBarFixedElement.setAttribute("event-background-dark", statusId);
		statusBarFixedElement.setAttribute("style", `${statusBarHighlightStyle}`);

		const statusBarStickyElement = document.createElement("div");
		statusBarStickyElement.classList.add("qp-sch-event-status-bar");
		statusBarStickyElement.setAttribute("event-background-dark", statusId);
		statusBarStickyElement.setAttribute("style", `${statusBarHighlightStyle}`);

		if (renderData?.width <= 70) {
			statusBarFixedElement?.classList?.toggle("scrolling", false);
			statusBarStickyElement?.classList?.toggle("scrolling", false);
		} else {
			const { startDate: minDate } = this.scheduler?.visibleDateRange;
			const eventStartDate = renderData?.eventRecord?.startDate as Date;
			if (minDate?.getTime() > eventStartDate?.getTime()) {
				statusBarFixedElement?.classList?.toggle("scrolling", false);
				statusBarStickyElement?.classList?.toggle("scrolling", true);
			}
		}

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

		return [ statusBarFixedElement, statusBarStickyElement, rendered ];
	}

	protected getMaterialEventHtml(entity: ProdOpersMatls, renderData: any = null) {
		const view = this.config?.opersMatlsEventsView();
		if (!view) return undefined;
		const rowIndex = view?.getRowIndex(entity);
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const gridRow : IGridRow | undefined = rowIndex >= 0 ? view["rowsData"][rowIndex] : undefined;
		if (!gridRow) return undefined;

		let smallEventOffsetStyle = "";
		const materialVisible = renderData?.width > 50;
		if (renderData?.width <= 70 && renderData.width !== 0) {
			renderData.cls["qp-small-event"] = true;
			smallEventOffsetStyle = `margin-inline-start: ${materialVisible ? Math.max(10, renderData.width - 34) : renderData.width - 10}px;`;
		}

		const col1IconsLeft = materialVisible ? this.generateEntityIconsHtml(this.materialsBrickCol1Icons, gridRow) : undefined;
		const col2Row1TextLeft = this.generateEntityTextualHtml(this.materialsBrickCol2Row1TextLeft, gridRow);
		const col2Row1IconsLeft = undefined;
		const col2Row1TextRight = undefined;
		const col2Row1IconsRight = undefined;
		const col2Row2TextLeft = this.generateEntityTextualHtml(this.materialsBrickCol2Row2TextLeft, gridRow);
		const col2Row2IconsLeft = undefined;
		const col2Row2TextRight = undefined;
		const col2Row2IconsRight = undefined;

		const eventInfoElem = document.createElement("div");
		if (!materialVisible) eventInfoElem.setAttribute("style", smallEventOffsetStyle);
		eventInfoElem.classList.add("qp-sch-event-info");
		eventInfoElem.setAttribute("resource-event-type", ResourceEventType.Material);

		const col1 = document.createElement("div");
		if (col1IconsLeft) col1.appendChild(col1IconsLeft);

		const col2 = document.createElement("div");
		if (materialVisible) col2.setAttribute("style", smallEventOffsetStyle);

		const col2Row1 = document.createElement("div");
		const col2Row1Col1 = document.createElement("div");
		const col2Row1Col2 = document.createElement("div");

		if (col2Row1TextLeft) col2Row1Col1.appendChild(col2Row1TextLeft);
		if (col2Row1IconsLeft) col2Row1Col1.appendChild(col2Row1IconsLeft);
		if (col2Row1TextRight) col2Row1Col2.appendChild(col2Row1TextRight);
		if (col2Row1IconsRight) col2Row1Col2.appendChild(col2Row1IconsRight);
		col2Row1.appendChild(col2Row1Col1);
		col2Row1.appendChild(col2Row1Col2);

		const col2Row2 = document.createElement("div");
		const col2Row2Col1 = document.createElement("div");
		const col2Row2Col2 = document.createElement("div");

		if (col2Row2TextLeft) col2Row2Col1.appendChild(col2Row2TextLeft);
		if (col2Row2IconsLeft) col2Row2Col1.appendChild(col2Row2IconsLeft);
		if (col2Row2TextRight) col2Row2Col2.appendChild(col2Row2TextRight);
		if (col2Row2IconsRight) col2Row2Col2.appendChild(col2Row2IconsRight);
		col2Row2.appendChild(col2Row2Col1);
		col2Row2.appendChild(col2Row2Col2);

		col2.appendChild(col2Row1);
		col2.appendChild(col2Row2);

		eventInfoElem.appendChild(col1);
		eventInfoElem.appendChild(col2);

		return eventInfoElem;
	}

	protected renderMaterialEvent(eventEntity: ProdOpersMatls, renderData: any = null) {
		let color = "#EDF7EA";
		if (eventEntity?.isMatlSubcontract) {
			color = "#F0E9FF";
		}

		if (renderData) {
			renderData.wrapperStyle.height = this.getMaterialBrickHeight();
			const barOffsetY = Number.isNaN(renderData?.height) ? 0 : Math.max(0, renderData?.height - renderData.wrapperStyle.height);		renderData.style.top = Math.max(barOffsetY / 2, 0);
			renderData.width = Math.max(16, renderData.width);
			renderData.style.top = Math.max(barOffsetY / 2, 0);
			renderData.style["background-color"] = color;
		}

		const order = this.data.getOrder(eventEntity.orderID);
		const rendered = this.getMaterialEventHtml(eventEntity, renderData);

		if (this.activeOrder && this.activeOrder.orderID !== order?.orderID) {
			renderData.cls["qp-sch-search-dimmed"] = true;
		}

		if (this.activeEntity && this.activeEntity instanceof ProdOpersMatls
			&& this.activeEntity.operMatlLineID === eventEntity?.operMatlLineID) {
			renderData.cls["qp-sch-search-highlight"] = true;
			if (rendered) rendered.style.marginLeft = "0px !important";
		}

		return rendered || "";
	}
	// #endregion

	protected getAdjustedToDependencyPath(originalSvgPath: string, fromEvent: EventModel, fromBox: Rectangle, toEvent: EventModel, toBox: Rectangle) {
		if (fromEvent &&  toEvent && fromEvent?.endDate > toEvent?.startDate) return originalSvgPath;
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
