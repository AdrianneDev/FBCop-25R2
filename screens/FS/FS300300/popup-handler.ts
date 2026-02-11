/* eslint-disable brace-style */
import { autoinject, bindable, BindingEngine } from "aurelia-framework";

import { Popup, SchedulerEventModel, SchedulerPro } from "@bryntum/schedulerpro";
import { Labels, Messages, nameof } from "./FS300300";
import {
	ICommandUpdateResult, PXFieldState, PXViewCollection, ScreenService, ScreenUpdateParams,
	NewMenuButton, QpToolBarCustomElement
} from "client-controls";
import { TimeConverter } from "./data-handlers/time-converter";
import { AppointmentsDataHandler } from "./data-handlers/appointments-data-handler";
import { SearchAppointmentsDataHandler } from "./data-handlers/search-appointments-data-handler";
import { AppointmentFilterModel, EmployeeModel, MainAppointmentFilterModel, SelectedAppointmentModel, SOFilterModel } from "./view-models";

export class PopupHandlerConfig {
	element: Element;

	getScreenService: () => ScreenService;
	bindingEngine: BindingEngine;

	appointments: AppointmentsDataHandler;
	searchAppointments: SearchAppointmentsDataHandler;

	getBacklog: () => SchedulerPro;
	getScheduler: () => SchedulerPro;

	MainAppointmentFilter: MainAppointmentFilterModel;
	AppointmentFilter: AppointmentFilterModel;
	SelectedAppointment: SelectedAppointmentModel;
	SelectedAppointmentEmployees: PXViewCollection<EmployeeModel>;
	SOFilter: SOFilterModel;
}

export class PopupHandlerAccessConfig {
	cloneEnabled: boolean;
	createEnabled: boolean;
	updateEnabled: boolean;
	deleteEnabled: boolean;
}

export class PopupHandler {
	@bindable appointmentToolBar!: QpToolBarCustomElement;
	@bindable newAppointmentToolBar!: QpToolBarCustomElement;

	public serviceOrderPopupInner!: HTMLElement;
	public serviceOrderPopupInnerHolder!: HTMLElement;
	public appointmentPopupInner!: HTMLElement;
	public appointmentPopupInnerHolder!: HTMLElement;
	public editPopupInner!: HTMLElement;
	public editPopupInnerHolder!: HTMLElement;
	public appointmentPopupEmployeesForm!: HTMLElement;
	public editedAppointmentPopupEmployeesForm!: HTMLElement;
	public serviceOrderEmployeesForm!: HTMLElement;
	public appointmentPopupEmployees!: HTMLElement;

	public topBarAppointmentConfig: any;
	public topBarNewAppointmentConfig: any;

	private eventPopup: Popup | null = null;
	private entityId: string | number;
	private assignmentId: string | number;
	private dragCreateResourceIDsSet: Set<string>;
	private createdEventRecord: SchedulerEventModel | null = null;
	private defaultSrvOrdType: string | null = null;
	private popupSizeObserver: ResizeObserver;
	private accessConfig: PopupHandlerAccessConfig;

	private updatingObservedItem = false;
	private mouseIsOver = false;
	private openedViaHover = false;

	private get element() { return this.config.element; }
	private get screenService() { return this.config.getScreenService(); }
	private get appointments() { return this.config.appointments; }
	private get searchAppointments() { return this.config.searchAppointments; }
	private get backlogControl() { return this.config.getBacklog(); }
	private get schedulerControl() { return this.config.getScheduler(); }
	private get MainAppointmentFilter() { return this.config.MainAppointmentFilter; }
	private get AppointmentFilter() { return this.config.AppointmentFilter; }
	private get SelectedAppointment() { return this.config.SelectedAppointment; }
	private get SelectedAppointmentEmployees() { return this.config.SelectedAppointmentEmployees; }
	private get SOFilter() { return this.config.SOFilter; }

	public constructor(private config: PopupHandlerConfig) { }

	public getEntityId() {
		return this.entityId.toString();
	}

	public getAssignmentId() {
		return this.assignmentId.toString();
	}

	public initialize(accessConfig : PopupHandlerAccessConfig) {
		this.accessConfig = accessConfig;

		// TODO: Review these - check that labels are displayed and StringCompare test is passing
		this.topBarAppointmentConfig =  {
			id: "topBarAppointmentConfigID",
			items: {
				// TODO: there's a bug in qp-tool-bar that hides the menu opener if it wasn't needed the previous time
				confirm: { config: {
					id: "confirm",
					text: "Confirm",
					commandName: "confirm",
					connotation: "Success",
					showInToolbar: true, target: this.element, hidden: !this.accessConfig.updateEnabled
				}},
				unconfirm: { config: {
					id: "unconfirm",
					text: Labels.Unconfirm,
					commandName: "unconfirm",
					showInToolbar: true, target: this.element, hidden: !this.accessConfig.updateEnabled
				}},
				validate: { config: {
					id: "validate",
					text: Labels.ValidateByDispatcher,
					commandName: "validate",
					showInToolbar: true, target: this.element, hidden: !this.accessConfig.updateEnabled
				}},
				invalidate: { config: {
					id: "invalidate",
					text: Labels.ClearValidation,
					commandName: "invalidate",
					showInToolbar: true, target: this.element, hidden: !this.accessConfig.updateEnabled
				}},
				unassign: { config: {
					id: "unassign",
					text: Labels.Unassign,
					commandName: "unassign",
					showInToolbar: true, target: this.element, hidden: !this.accessConfig.updateEnabled
				}},
				clone: { config: {
					id: "clone",
					text: Labels.CloneAppointment,
					commandName: "clone",
					showInToolbar: true, target: this.element, hidden: !this.accessConfig.cloneEnabled
				}},
				delete: { config: {
					...NewMenuButton("delete"),
					id: "delete",
					text: Labels.DeleteAppointment,
					commandName: "delete",
					target: this.element,
					showInToolbar: true, hidden: !this.accessConfig.deleteEnabled, visibleOnToolbar: false
				}},
			}
		};

		this.topBarNewAppointmentConfig = {
			id: "topBarNewAppointmentConfigID",
			items: {
				reset: { config: {
					...NewMenuButton("reset"),
					commandName: "reset",
					images: { normal: "main@Cancel" },
					toolTip: Labels.DiscardChanges,
					isSystem: false, toggleMode: false, showInToolbar: true, target: this.element, pushed: false,
				}},
				create: { config: {
					text: Labels.CreateAppointment,
					commandName: "create",
					connotation: "Success",
					showInToolbar: true,
					target: this.element,
				}},
			}
		};
	}

	public afterInitialize() {
		this.setupObservers();
	}

	public async resetCreateAppointmentForm() {
		this.MainAppointmentFilter.fieldNames.forEach(fieldName =>
			this.screenService.registerFieldChange(this.MainAppointmentFilter.name,
				fieldName, null, this.MainAppointmentFilter[fieldName]?.value));
		this.MainAppointmentFilter.SrvOrdType.updateValue(this.defaultSrvOrdType || null);

		this.initCreateAppointmentForm();
		// TODO: replace html element with an array of views
		const res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false }, this.editPopupInner));
	}

	public isOpen() { return !!this.entityId; }

	public isOpenFor(entityId: string) { return this.entityId === entityId; }

	public async open(
		eventId: string,
		assignmentId: string,
		eventElement: HTMLElement,
		mode: "view" | "edit" = "view",
		kind: "appointment" | "serviceOrder" = "appointment",
		eventRecord: SchedulerEventModel = null,
		dragCreateResourceIDsSet: Set<string> = null,
	) {
		if (!!this.entityId) {
			this.eventPopup?.close();
		}
		if (eventRecord !== null) {
			this.createdEventRecord = eventRecord;
		}
		if (this.entityId === eventId) {
			this.entityId = undefined;
			return;
		}
		this.entityId = eventId;
		this.assignmentId = assignmentId;
		this.dragCreateResourceIDsSet = dragCreateResourceIDsSet;

		const popupInner = (mode === "edit") ?  this.editPopupInner
			: ((kind === "appointment") ? this.appointmentPopupInner : this.serviceOrderPopupInner);
		const popupInnerHolder = (mode === "edit") ? this.editPopupInnerHolder
			: ((kind === "appointment") ? this.appointmentPopupInnerHolder : this.serviceOrderPopupInnerHolder);

		let neededViews: string[];
		if (popupInner === this.appointmentPopupInner) {
			neededViews = [nameof("AppointmentFilter"), nameof("SelectedAppointment"), nameof("SelectedSO"), nameof("SelectedAppointmentEmployees")];
		}
		else if (popupInner === this.serviceOrderPopupInner) {
			neededViews = [nameof("SOFilter"), nameof("SelectedSO"), nameof("SelectedSOEmployees")];
		}
		else if (popupInner === this.editPopupInner) {
			neededViews = [nameof("MainAppointmentFilter"), nameof("EditedAppointmentEmployees")];
		}

		// TODO: Review this
		this.SelectedAppointment.ScheduledDateTimeBegin.displayMask = "g"; // TODO: it doesn't work ATM

		const rect = popupInner.getBoundingClientRect();
		this.eventPopup = new Popup({
			forElement: eventElement,
			align: "l-r",
			cls: `qp-sch-popup ${mode === "view" ? "qp-sch-view-popup" : "qp-sch-edit-popup"}`,
			autoShow: true,
			autoClose: false,
			monitorResize: true,
			scrollAction: "realign",
			onBeforeHide: () => {
				popupInnerHolder.appendChild(popupInner);
				this.entityId = 0;
				if (this.createdEventRecord != null) {
					this.schedulerControl.eventStore.remove(this.createdEventRecord);
					this.backlogControl.eventStore.remove(this.createdEventRecord);
				}
			},
			hideWhenEmpty: false,
			floating: true,
			anchor: true,
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			html: `
				<div class="event-info" style="width:${rect.width}px; height:${rect.height}px">
					<div class="splash loading"></div>
				</div>`,
		});

		document.getElementById("page-caption").onpointerdown = (event) => {
			this.close(event);
		};

		const customizationMenu = document.getElementById("customizationMenu_menu");
		if (customizationMenu) {
			customizationMenu.onpointerdown = (event) => {
				event.stopPropagation();
			};
		}

		if (mode === "edit") {
			this.initCreateAppointmentForm();
		}
		else if (kind === "appointment") {
			const appointmentId = this.appointments.getPartialId(eventId);
			const appointment = this.appointments.getAppointment(eventId);
			let sOId = appointment?.SchedulerServiceOrder__SOID.value;
			if (!appointment) {
				const searchRes = this.searchAppointments.getEntry(appointmentId);
				sOId = searchRes?.SchedulerServiceOrder__SOID.value;
			}
			this.AppointmentFilter.AppointmentID.updateValue(Number(appointmentId));
			this.SOFilter.SOID.updateValue(Number(sOId));
		}
		else if (kind === "serviceOrder") {
			this.SOFilter.SOID.updateValue(Number(eventId));
		}

		let res:ICommandUpdateResult;
		try {
			res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false, views: neededViews }));
		}
		finally {
			this.AppointmentFilter.AppointmentID.updateValue(0);
			this.SOFilter.SOID.updateValue(0);
		}

		this.defaultSrvOrdType ??= this.MainAppointmentFilter.SrvOrdType?.value?.id;

		const popupOuter = this.eventPopup.element.getElementsByClassName("event-info")[0] as HTMLElement;
		if (!res?.succeeded) {
			popupOuter.innerHTML = Messages.ErrorLoadingData;
			return;
		}

		popupOuter.innerHTML = "";
		popupOuter.appendChild(popupInner);

		if (this.popupSizeObserver != null) {
			this.popupSizeObserver.disconnect();
		}
		this.popupSizeObserver = new ResizeObserver((entries, observer) => {
			const rect = popupInner.getBoundingClientRect();
			popupOuter.style.width = `${rect.width}px`;
			popupOuter.style.height = `${rect.height}px`;
			this.eventPopup.element.style.height = ``;
			console.log(`new height: ${rect.height}`);
		});
		this.popupSizeObserver.observe(popupInner);

		if (popupInner === this.appointmentPopupInner) {
			const noEmployees = this.SelectedAppointmentEmployees.getRowModel(0) === undefined;
			const items = this.topBarAppointmentConfig.items;
			items.unassign.config.hidden = noEmployees || this.SelectedAppointment.isLocked || !this.accessConfig.updateEnabled;
			items.confirm.config.hidden = !this.SelectedAppointment.canConfirm || !this.accessConfig.updateEnabled;
			items.unconfirm.config.hidden = !this.SelectedAppointment.canUnconfirm || !this.accessConfig.updateEnabled;
			items.validate.config.hidden = !this.SelectedAppointment.canValidate || !this.accessConfig.updateEnabled;
			items.invalidate.config.hidden = !this.SelectedAppointment.canInvalidate || !this.accessConfig.updateEnabled;
			items.delete.config.hidden = this.SelectedAppointment.isLocked || !this.accessConfig.deleteEnabled;
			this.appointmentToolBar.setupViewModel();

			const employeeFieldset = document.querySelector("#groupAppointmentPopupEmployeesID") as HTMLElement;
			this.appointmentPopupEmployeesForm?.classList.toggle("hidden", noEmployees);
			employeeFieldset?.classList.toggle("hidden", noEmployees);

		}
		if (popupInner === this.editPopupInner) {
			const employeeFieldset = document.querySelector("#groupEditedAppointmentPopupEmployeesID") as HTMLElement;
			const noEmployees = (this.dragCreateResourceIDsSet?.size ?? 0) === 0;
			this.editedAppointmentPopupEmployeesForm?.classList.toggle("hidden", noEmployees);
			employeeFieldset?.classList.toggle("hidden", noEmployees);
		}
		if (popupInner === this.serviceOrderPopupInner) {
			const employeeFieldset = document.querySelector("#groupSOPopupEmployeesID") as HTMLElement;
		}
	}

	public close(event: PointerEvent = null) {
		if (!this.entityId) return true;
		const targetClassList = (event?.target as HTMLElement)?.classList;
		if (targetClassList?.contains("qp-menu-spacer") || targetClassList?.contains("qp-menu-item")) {
			event.stopPropagation();
			return true;
		}

		this.eventPopup.close();
		this.openedViaHover = false;
		this.entityId = undefined;
		return true;
	}

	public isMouseOver() {
		return this.mouseIsOver;
	}

	protected mouseIn() {
		this.mouseIsOver = true;
	}

	protected mouseOut() {
		this.mouseIsOver = false;
	}

	protected initCreateAppointmentForm() {
		if (this.createdEventRecord) {
			const startDate = (this.createdEventRecord.startDate as Date)?.fromView();
			this.MainAppointmentFilter.ScheduledDateTimeBegin_Date.updateValue(startDate);
			this.MainAppointmentFilter.ScheduledDateTimeBegin_Time.updateValue(startDate);
			this.MainAppointmentFilter.Duration.updateValue(TimeConverter.minutesTohMM(this.createdEventRecord.durationMS / 1000 / 60)); 	// eslint-disable-line @typescript-eslint/no-magic-numbers
			this.MainAppointmentFilter.Resources.updateValue([...this.dragCreateResourceIDsSet].join(","));
		}
		this.MainAppointmentFilter.SODetID.updateValue(0);
		console.log(`initCreateAppointmentForm: ${this.MainAppointmentFilter.Resources.value}`);
	}

	protected setupObservers() {
		[ this.MainAppointmentFilter.SrvOrdType,
			this.MainAppointmentFilter.SORefNbr,
			this.MainAppointmentFilter.CustomerID,
			this.MainAppointmentFilter.LocationID,
			this.MainAppointmentFilter.ContactID
		].forEach(field => {
			this.observeEditPanelChange(field);
		});
	}

	protected observeEditPanelChange(obj: object) {
		this.config.bindingEngine.propertyObserver(obj, "value").subscribe((newValue: any, oldValue: any) => {
			if (!newValue || newValue?.id === oldValue?.id) return;
			if (this.updatingObservedItem) return;
			if (!this.entityId) return; // the update came not from UI, ignore

			this.updatingObservedItem = true;
			// TODO: replace html element with an array of views
			this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false }, this.editPopupInner))
				.finally(() => {
					this.updatingObservedItem = false;
				});
		});
	}
}
