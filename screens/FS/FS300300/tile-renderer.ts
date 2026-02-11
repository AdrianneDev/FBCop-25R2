/* eslint-disable @stylistic/brace-style */
import { StringHelper } from "@bryntum/schedulerpro";
import { bindable } from "aurelia-framework";
import { DragHelperEventInfo, Labels, Captions, nameof } from "./FS300300";
import { AppointmentEmployeeModel, DraggableEntity, SearchAppointmentModel, ServiceOrderModel } from "./view-models";
import { DataFieldDescriptor, QpFieldsetCustomElement, QpHyperIconCustomElement } from "client-controls";
import { AppointmentsDataHandler } from "./data-handlers/appointments-data-handler";
import { SODataHandler } from "./data-handlers/so-data-handler";
import { SearchAppointmentsDataHandler } from "./data-handlers/search-appointments-data-handler";
import { AppointmentData } from "../FS404080/FS404080";

export class TileRendererConfig {
	appointments: AppointmentsDataHandler;
	searchAppointments: SearchAppointmentsDataHandler;
	serviceOrders: SODataHandler;
	getCurrentAppointmentId: () => string;
	getCurrentServiceOrderId: () => string;
	getServiceOrdersFastFilter: () => HTMLInputElement;
	getSearchAppointmentsFastFilter: () => HTMLInputElement;
}

export class TileRenderer {
	@bindable iconPriorityHigh!: QpHyperIconCustomElement;
	@bindable iconPriorityMedium!: QpHyperIconCustomElement;
	@bindable iconPriorityLow!: QpHyperIconCustomElement;
	@bindable iconSeverityHigh!: QpHyperIconCustomElement;
	@bindable iconSeverityMedium!: QpHyperIconCustomElement;
	@bindable iconSeverityLow!: QpHyperIconCustomElement;
	@bindable iconPriorityDarkHigh!: QpHyperIconCustomElement;
	@bindable iconPriorityDarkMedium!: QpHyperIconCustomElement;
	@bindable iconPriorityDarkLow!: QpHyperIconCustomElement;
	@bindable iconSeverityDarkHigh!: QpHyperIconCustomElement;
	@bindable iconSeverityDarkMedium!: QpHyperIconCustomElement;
	@bindable iconSeverityDarkLow!: QpHyperIconCustomElement;
	@bindable iconMultiEmployee!: QpHyperIconCustomElement;
	@bindable iconMultiEmployeeDark!: QpHyperIconCustomElement;
	@bindable iconVendor!: QpHyperIconCustomElement;
	@bindable iconEmployee!: QpHyperIconCustomElement;

	@bindable serviceOrdersBrickLeft!: QpFieldsetCustomElement;
	@bindable serviceOrdersBrickRight!: QpFieldsetCustomElement;
	@bindable appointmentsBrickLeft!: QpFieldsetCustomElement;
	@bindable appointmentsBrickRight!: QpFieldsetCustomElement;
	@bindable searchAppointmentBrickLeft!: QpFieldsetCustomElement;
	@bindable searchAppointmentBrickRight!: QpFieldsetCustomElement;

	protected resourceColors = new Map<string | number, string>();

	private get appointments() { return this.config.appointments; }
	private get searchAppointments() { return this.config.searchAppointments; }
	private get serviceOrders() { return this.config.serviceOrders; }
	private get currentAppointmentId() { return this.config.getCurrentAppointmentId(); }
	private get currentServiceOrderId() { return this.config.getCurrentServiceOrderId(); }
	private get serviceOrdersFastFilter() { return this.config.getServiceOrdersFastFilter(); }
	private get searchAppointmentsFastFilter() { return this.config.getSearchAppointmentsFastFilter(); }

	public constructor(private config: TileRendererConfig) { }

	public setColors(colors: Map<string | number, string>) {
		this.resourceColors.clear();
		this.resourceColors = colors;
	}

	public searchAppointmentRenderer({ record, row, expanderElement, rowElement, region }) {
		const appointment = this.searchAppointments.getEntry(record.id);
		let cls = `b-sch-event ${getAppointmentClass(appointment)}`;
		if (this.currentAppointmentId === appointment.appointmentID) {
			cls = `${cls} qp-sch-current`;
		}
		return `
			<div class="${cls}">
				<div class="b-sch-event-content">
					${this.renderAppointmentWithStatusBar(appointment, null, true)}
				</div>
			</div>`;

		function getAppointmentClass(assignment: SearchAppointmentModel) {
			if (assignment.isLocked) {
				return "qp-sch-locked";
			}
			const isConfirmed = appointment.Confirmed?.value || appointment.ValidatedByDispatcher?.value;
			const confirmedClass = isConfirmed ? "" : "qp-sch-not-confirmed";
			const assignedClass = appointment.StaffCntr.value ? "" : "qp-sch-not-assigned";
			return `${confirmedClass} ${assignedClass}`;
		}
	}

	public serviceOrderRenderer({ record, expanderElement, rowElement, region }) {
		const serviceOrder = this.serviceOrders.getEntry(record.id);
		const children = this.serviceOrders.getChildren(serviceOrder.orderId);
		const onlyChild = children?.filter(x => !x.isScheduled).length === 1;
		const needShowChildren = children?.length > 0;
		const testHelperScripts = `
			onPointerEnter = "this.classList.toggle('qp-sch-hover', true);"
			onPointerLeave = "this.classList.toggle('qp-sch-hover', false);"
		`;

		const serviceParts = needShowChildren
			? this.serviceOrders.getChildren(serviceOrder.orderId)?.map(service =>
				`
				<div ${testHelperScripts} class="qp-sch-event-info qp-sch-service-info
					${onlyChild ? "only-child" : ""}
					${service.isScheduled ? "scheduled" : ""}"
					${onlyChild ? "" : `entryId="${service.serviceId}"`}><div><ul><li>
					<span>${this.applyMarks(StringHelper.xss `${service.FSSODet__TranDesc.cellText}`, this.serviceOrdersFastFilter?.value)}</span>
					</li></ul></div>
				</div>
				`
			)
			: [];
		const servicePartsHtml = serviceParts ? `<div><div></div>${serviceParts.join("")}</div>` : ""; // empty <div> is needed to make '+ .qp-sch-service-info' css selector work

		const currentCls = this.currentServiceOrderId === serviceOrder.orderId ? "qp-sch-current" : "";
		return `
			<div class="qp-sch-not-assigned qp-sch-so ${currentCls}" entryId="${serviceOrder.orderId}">
				${this.getServiceOrderHtml(serviceOrder)}
				${servicePartsHtml}
			</div>
			`;
	}

	public getAppointmentBrickHeight() {
		const fieldsLeft = getRegularFields(this.appointmentsBrickLeft);
		const fieldsRight = getRegularFields(this.appointmentsBrickRight);
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return Math.max(fieldsLeft.length, fieldsRight.length) * 16 + 22;

		function getRegularFields(fieldset: QpFieldsetCustomElement) {
			return fieldset.Fields
				?.filter(x => fieldset.getFieldVisibility(true, x))
				?.filter(x => !["Priority", "Severity", "StaffCntr"].includes(x.name)) ?? [];
		}
	}

	public unassignedRenderer({ eventRecord, resourceRecord, renderData }) {
		const appointment = this.appointments.getUnassignedAppointment(eventRecord.id);
		return this.renderAppointmentWithStatusBar(appointment, renderData);
	}

	public assignmentRenderer({ eventRecord, resourceRecord, renderData }) {
		// We need to be able to render the following types of objects:
		// - Event in calendar (assignment)
		//          assignment = renderData.assignment
		// - Projection of a new assignment: Resource dragged to an existing appointment
		//          existing appointment (where?)
		// - Projection of a new assignment: External object dragged onto a Resource
		//          external object - from backlog
		//          external object - from SO / SODet
		// - New appointment (being created via drag-creating)

		// If cases of New appointment or Resource, we override the standard rendering

		const assignment = this.appointments.getAssignment(renderData.assignment.id);
		const eventInfo = eventRecord.get("eventInfo") as DragHelperEventInfo;
		const entity = assignment ?? eventInfo?.entity;
		return this.renderAppointmentWithStatusBar(entity, renderData);
	}

	public renderDraggedServiceOrder(entity: DraggableEntity, detailOnly = false) {
		const statusBar = "<div class='qp-sch-event-empty-status-bar'></div>";
		const appointmentHtml = this.getAppointmentHtml(entity, detailOnly);
		return `${statusBar}${appointmentHtml}`;
	}

	public renderAppointmentWithStatusBar(entity: DraggableEntity, renderData: Object = null, useMarks = false) {
		(<any>renderData)?.wrapperCls.add(`sch-generation-${this.appointments.getGeneration()}`);
		const appointment = (entity instanceof AppointmentEmployeeModel || entity instanceof SearchAppointmentModel) ? entity : null;
		const statusColor = appointment?.bandColor ?? "#000000"; // TODO: black is hardcoded as not visible
		const whiteStripe = "#FFFFFFB0";
		const isFilteredOut = (entity as AppointmentEmployeeModel)?.isFilteredOut;
		const statusBar = (statusColor === "#000000" || isFilteredOut) ? "<div class='qp-sch-event-empty-status-bar'></div>" : `
			<div class="qp-sch-event-status-bar" style=
				"background: repeating-linear-gradient(90deg, ${statusColor}, ${statusColor} 9px, ${whiteStripe} 9px, ${whiteStripe} 10px, transparent 10px, transparent);">
			</div>
			`;
		const appointmentHtml = entity ? this.getAppointmentHtml(entity, false, useMarks, isFilteredOut) : this.getNewAppointmentHtml();
		const currentID = this.currentAppointmentId;
		const isProjected = (entity instanceof AppointmentEmployeeModel) && renderData && (<any>renderData)?.resourceId !== entity?.resourceId;
		if (currentID && appointment && !isProjected) {
			(<any>renderData)?.cls.add(currentID === appointment.appointmentID
				? "qp-sch-current"
				: "qp-sch-search-dimmed");
		}
		return `${statusBar}${appointmentHtml}`;
	}

	public resourceHeaderRenderer({ record }) {
		let resourceStyle = "";
		let iconHtml = "";

		if (this.resourceColors.has(record?.id)) {
			resourceStyle = `color: ${this.resourceColors.get(record?.id)};`;
		}
		if (record?.iconCls === AppointmentsDataHandler.vendorClass) {
			iconHtml = `<div title="${Captions.Vendor}">
					<svg class="qp-sch-resource-header-icon" id="resource-icon-${record?.id}" style="${resourceStyle}">
						<use href="${this.iconVendor.SvgUrl}"></use>
					</svg>
				</div>`;
		}
		if (record?.iconCls === AppointmentsDataHandler.employeeClass) {
			iconHtml = `<div title="${Captions.Employee}">
					<svg class="qp-sch-resource-header-icon" id="resource-icon-${record?.id}" style="${resourceStyle}">
						<use href="${this.iconEmployee.SvgUrl}"></use>
					</svg>
				</div>`;
		}

		return `<div class="qp-sch-resource-header qp-sch-resource-id${record?.id}" role="presentation">
				${iconHtml}
				<div role="presentation">
					<div class="name" role="presentation">${record?.name}</div>
					<div class="label" role="presentation">${record?.label ?? ""}</div>
				</div>
			</div>`;
	}

	protected getServiceOrderHtml(entity: ServiceOrderModel, detailOnly = false) {
		const templateLeft = this.serviceOrdersBrickLeft;
		const templateRight = this.serviceOrdersBrickRight;
		const fieldsText = this.getEntityHtmlPart(templateLeft, templateRight, (field) =>  this.getServiceOrderFieldHtml(field, entity, detailOnly));
		return `<div class="qp-sch-event-info">${fieldsText}</div>`;
	}

	protected getEntityHtmlPart(templateLeft: QpFieldsetCustomElement, templateRight: QpFieldsetCustomElement,
		getFieldHtml: (entity: DataFieldDescriptor) => string)
	{
		const fieldsLeft = templateLeft.Fields?.filter(x => templateLeft.getFieldVisibility(true, x));
		const fieldsRight = templateRight.Fields?.filter(x => templateRight.getFieldVisibility(true, x));
		if (!fieldsLeft?.length) return "";

		const leftHtmls = fieldsLeft.map(field => getFieldHtml(field));
		const rightHtmls = fieldsRight.map(field => getFieldHtml(field));

		let htmlPart = "";
		let leftFieldNum = 0;
		let rightFieldNum = 0;
		while (leftFieldNum < fieldsLeft.length || rightFieldNum < fieldsRight.length) {
			let [leftAddOn, rightAddOn] = ["", ""];
			leftAddOn = leftFieldNum < fieldsLeft.length ? leftHtmls[leftFieldNum] : null;
			leftFieldNum ++;

			let rightHtml = "";
			let nextRightHtml = "";
			let iconsNum = 0;
			do {
				rightHtml = rightFieldNum < fieldsRight.length ? rightHtmls[rightFieldNum] : null;
				nextRightHtml = rightFieldNum + 1 < fieldsRight.length ? rightHtmls[rightFieldNum + 1] : null;
				rightAddOn += rightHtml ?? "";
				rightFieldNum ++;
				iconsNum += rightHtml?.startsWith("<span><svg") ? 1 : 0;
			} while (nextRightHtml != null && (rightAddOn === "" || rightAddOn?.startsWith("<span><svg") && (nextRightHtml?.startsWith("<span><svg") || nextRightHtml === "")));

			const rightPart = !rightAddOn ? ""
				: !rightAddOn?.startsWith("<span><svg") ? `<span>${rightAddOn}</span>`
					// eslint-disable-next-line @typescript-eslint/no-magic-numbers
					: `	<div class="qp-sch-tile-icon" style="max-width: max(0px, calc((100% - ${iconsNum * 16 + Math.max(iconsNum - 1, 0) * 6 + 10}px)*999));">
							<span></span>
							<span>${rightAddOn}</span>
						</div>`;

			htmlPart += `<div>${leftAddOn}${rightPart}</div>`;
		}

		return htmlPart;
	}


	protected getServiceOrderFieldHtml(field: DataFieldDescriptor, entity: ServiceOrderModel, detailOnly) {
		let cellText = "";
		let value: any = null;
		let isIcon = false;

		if (field.name === "RefNbr") {
			cellText = detailOnly ? entity.serviceId : entity.orderId;
		}
		else if (field.viewName === nameof("SelectedSO")) {
			value = entity[field.name];
			isIcon = ["Priority", "Severity"].includes(field.name);
		}
		const fieldFullName = `${field.viewName}.${field.name}`;
		const fieldIDs = `sch-field="${fieldFullName}" sch-value="${value?.value ?? cellText}"`;

		if (isIcon) {
			const iconUrl = this.getIconUrl(field.name, value?.cellText);
			if (!iconUrl) return "";
			const tooltip = ["Priority", "Severity"].includes(field.name) ? `<qp-tooltip>${field.name}: ${value?.cellText}</qp-tooltip>` : "";
			return `<span><svg class="qp-sch-tile-icon" ${fieldIDs}> <use href="${iconUrl}"></use></svg>${tooltip}</span>`;
		}

		cellText = cellText || (value?.cellText ?? "");
		const escapedValue = StringHelper.xss `${cellText}`;
		const valueWithMarks = this.applyMarks(escapedValue, this.serviceOrdersFastFilter?.value);
		const linkClass = (fieldFullName === "SelectedSO.RefNbr") ? "class='qp-sch-popup-link'" : "";
		return `<span ${linkClass} ${fieldIDs}>${valueWithMarks}</span>`;
	}

	protected getAppointmentHtml(entity: DraggableEntity, detailOnly = false, useMarks = false, isFilteredOut = false) {
		const templateLeft = (entity instanceof SearchAppointmentModel) ? this.searchAppointmentBrickLeft : this.appointmentsBrickLeft;
		const templateRight = (entity instanceof SearchAppointmentModel) ? this.searchAppointmentBrickRight : this.appointmentsBrickRight;
		const fieldsText = this.getEntityHtmlPart(templateLeft, templateRight, (field) =>  this.getAppointmentFieldHtml(field, entity, useMarks, detailOnly, isFilteredOut));

		return `<div class="qp-sch-event-info">${fieldsText}</div>`;
	}

	protected getAppointmentFieldHtml(field: DataFieldDescriptor, entity: DraggableEntity, useMarks, detailOnly, isFilteredOut = false) {
		const isAppointment = entity instanceof AppointmentEmployeeModel || entity instanceof SearchAppointmentModel;
		const darkBackground = isAppointment && !(entity.isConfirmed || entity.isValidatedByDispatcher);
		let cellText = "";
		let value: any = null;
		let isIcon = false;
		let colorStyle = "";
		if (field.name === "RefNbr") {
			cellText = detailOnly ? (entity as ServiceOrderModel).serviceId : entity.caption;
		}
		else {switch (field.viewName) {
			case nameof("SelectedAppointment"): {
				value = entity[`SchedulerAppointment__${field.name}`]
					?? entity[`FSSODet__${field.name}`]
					?? entity[field.name];
				if (field.name === "Status" && isAppointment && entity.bandColor !== "#000000") {
					colorStyle = entity.bandColor ?? "";
					colorStyle = colorStyle !== "" ? `style="color: ${colorStyle};"` : "";
				}
				isIcon = field.name === "StaffCntr";
				break;
			}
			case nameof("SelectedSO"): {
				value = entity[`SchedulerServiceOrder__${field.name}`]
					?? entity[field.name];
				isIcon = ["Priority", "Severity"].includes(field.name);
				break;
			}
		}}
		const fieldFullName = `${field.viewName}.${field.name}`;
		const fieldIDs = `sch-field="${fieldFullName}" sch-value="${value?.value ?? cellText}"`;

		if (isIcon) {
			const iconUrl = this.getIconUrl(field.name, value?.cellText, darkBackground);
			if (!iconUrl) return "";
			const tooltip = ["Priority", "Severity"].includes(field.name) ? `<qp-tooltip>${field.name}: ${value?.cellText}</qp-tooltip>` : "";
			return `<span><svg class="qp-sch-tile-icon" ${fieldIDs}> <use href="${iconUrl}"></use></svg>${tooltip}</span>`;
		}

		cellText = cellText || (value?.cellText ?? "");
		const escapedValue = StringHelper.xss `${cellText}`;
		const valueWithMarks = useMarks ? this.applyMarks(escapedValue, this.searchAppointmentsFastFilter?.value) : escapedValue;
		const renderedValue = isFilteredOut ? "" : valueWithMarks;
		const linkClass = (fieldFullName === "SelectedAppointment.RefNbr") ? "class='qp-sch-popup-link'" : "";
		const fieldSpan = `<span ${colorStyle} ${linkClass} ${fieldIDs}"><span>${renderedValue}</span></span>`;
		return fieldSpan;
	}

	protected getIconUrl(field: string, value: string, darkBackground = false) {
		switch (field) {
			case "Priority": {
				switch (value) {
					case "High": return darkBackground ? this.iconPriorityDarkHigh.SvgUrl : this.iconPriorityHigh.SvgUrl;
					case "Medium": return darkBackground ? this.iconPriorityDarkMedium.SvgUrl : this.iconPriorityMedium.SvgUrl;
					case "Low": return darkBackground ? this.iconPriorityDarkLow.SvgUrl : this.iconPriorityLow.SvgUrl;
				}
			}
			case "Severity": {
				switch (value) {
					case "High": return darkBackground ? this.iconSeverityDarkHigh.SvgUrl : this.iconSeverityHigh.SvgUrl;
					case "Medium": return darkBackground ? this.iconSeverityDarkMedium.SvgUrl : this.iconSeverityMedium.SvgUrl;
					case "Low": return darkBackground ? this.iconSeverityDarkLow.SvgUrl : this.iconSeverityLow.SvgUrl;
				}
			}
			case "StaffCntr":
				if (Number(value) > 1) {
					return darkBackground ? this.iconMultiEmployeeDark.SvgUrl : this.iconMultiEmployee.SvgUrl;
				}
		}
		return "";
	}

	protected getNewAppointmentHtml() {
		return StringHelper.xss`
			<div class="qp-sch-event-info"><div>
			<b>${Labels.NewAppointment}</b><br>
			</div></div>
			`;
	}

	protected applyMarks(field: string, search: string) {
		if (!search) return field;

		const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
		const regExp = new RegExp(escapedSearch, "gi");
		return field.replace(regExp, (match) => `<mark>${match}</mark>`);
	}

}
