/* eslint-disable @stylistic/brace-style */

import { bindable, BindingEngine } from "aurelia-framework";
import { Popup } from "@bryntum/schedulerpro";
import { Labels, Messages, nameof } from "./AM215555";
import {
	QpToolBarCustomElement, ScreenService, ScreenUpdateParams,
	NewMenuButton
} from "client-controls";
import { SelectionFilter, WCResource, Operation, Order as Order, MachineResource, AMProdItem } from "./view-models";

export class PopupHandlerConfig {
	element: Element;
	bindingEngine: BindingEngine;
	selectedProdItem: () => AMProdItem;
	getScreenService: () => ScreenService;
	selectionFilter: SelectionFilter;
}

export class PopupHandler {
	@bindable orderToolBar!: QpToolBarCustomElement;
	@bindable operationToolBar!: QpToolBarCustomElement;

	public topBarOrderConfig: any;

	public orderPopupInner!: HTMLElement;
	public orderPopupInnerHolder!: HTMLElement;
	public operationPopupInner!: HTMLElement;
	public operationPopupInnerHolder!: HTMLElement;
	public histogramPopupInner!: HTMLElement;
	public histogramPopupInnerHolder!: HTMLElement;

	private operationPopup: Popup | null = null;
	private entityId: string | number;
	private entity: Order | Operation;
	private popupSizeObserver: ResizeObserver;
	private updatingObservedItem = false;

	private get element() { return this.config.element; }
	private get screenService() { return this.config.getScreenService(); }
	private get selectionFilter() { return this.config.selectionFilter; }
	private get selectedProdItem() { return this.config.selectedProdItem(); }

	public constructor(private config: PopupHandlerConfig) { }

	public getEntity() { return this.entity; }

	public async openEntityPopup(entity: Operation | Order, element: Element) {
		if (entity instanceof Operation) {
			await this.openOperationPopup(entity, element);
		}
		else if (entity instanceof Order) {
			await this.openOrderPopup(entity, element);
		}
	}

	public async openHistogramDetailsPopup(resource: WCResource | MachineResource, dateFrom: Date, dateTo: Date, element: Element) {
		const isWC = resource instanceof WCResource;
		const entityId = resource.getFullId(dateFrom, dateTo);
		const neededViews = [nameof("SelectionFilter"),
			isWC ? nameof("SchdDetailsForShiftAndPeriod") : nameof("SchdDetailsForMachine")];

		document.querySelector("#WcIDFieldID")?.classList.toggle("hidden", !isWC);
		document.querySelector("#ShiftCDFieldID")?.classList.toggle("hidden", !isWC);
		document.querySelector("#MachIDFieldID")?.classList.toggle("hidden", isWC);
		document.querySelector("#schdWCDetailsFormID")?.classList.toggle("hidden", !isWC);
		document.querySelector("#schdMachineDetailsFormID")?.classList.toggle("hidden", isWC);

		await this.open(
			entityId,
			element,
			this.histogramPopupInner,
			this.histogramPopupInnerHolder,
			neededViews,
			() => {
				if (isWC) {
					this.selectionFilter.WcID.updateValue(resource.WcID.cellText);
					this.selectionFilter.ShiftCD.updateValue(resource.Shift.cellText);
				}
				else {
					this.selectionFilter.MachID.updateValue(resource.Id.value);
				}
				this.selectionFilter.DateFrom.updateValue(dateFrom);
				this.selectionFilter.DateTo.updateValue(dateTo);
			},
		);
	}

	public initialize() {
		this.topBarOrderConfig =  {
			id: "topBarAppointmentConfigID",
			items: {
				save: { config: {
					...NewMenuButton("save"),
					commandName: "save",
					images: {normal: "main@Save"},
					toolTip: Labels.Save,
					text: Labels.Save,
					disabled: true,
					isSystem: true, showInToolbar: true, target: this.element,
				}},
				select: { config: {
					id: "select",
					text: Labels.Select,
					commandName: "select",
					showInToolbar: true, target: this.element, hidden: false
				}},
				deselect: { config: {
					id: "deselect",
					text: Labels.Deselect,
					commandName: "deselect",
					showInToolbar: true, target: this.element, hidden: false
				}},
				firm: { config: {
					id: "firm",
					text: Labels.FirmOrder,
					commandName: "firm",
					showInToolbar: true, target: this.element, hidden: false
				}},
				unfirm: { config: {
					id: "unfirm",
					text: Labels.UndoFirmOrder,
					commandName: "unfirm",
					showInToolbar: true, target: this.element, hidden: false
				}},
				schedule: { config: {
					id: "schedule",
					text: Labels.ScheduleOrder,
					commandName: "schedule",
					showInToolbar: true, target: this.element, hidden: false } },
			}
		};
	}

	public close(event: PointerEvent = null) {
		if (!this.entityId) return true;
		const targetClassList = (event?.target as HTMLElement)?.classList;
		if (targetClassList?.contains("qp-menu-spacer") || targetClassList?.contains("qp-menu-item")) {
			event.stopPropagation();
			return true;
		}

		this.operationPopup.close();
		this.entityId = undefined;
		return true;
	}

	public isOpenFor(entityId: string) { return this.entityId === entityId; }

	public get hasUnsavedData() {
		const items = this.topBarOrderConfig.items;
		return !items.save.config.disabled;
	}

	public clearSave() {
		const items = this.topBarOrderConfig.items;
		items.save.config.disabled = true;
		this.orderToolBar.setupViewModel();
	}

	protected async openOperationPopup(operation: Operation, element: Element) {
		this.entity = operation;
		const neededViews = [nameof("SelectionFilter"), nameof("SelectedProdItem"), nameof("SelectedSchdItem"), nameof("SelectedProdOper"),
			nameof("SelectedSchdOper")];

		const isWC = operation.id.startsWith("wc");
		document.querySelector("#WcIDFieldID")?.classList.toggle("hidden", !isWC);

		await this.open(
			operation.fullId,
			element,
			this.operationPopupInner,
			this.operationPopupInnerHolder,
			neededViews,
			() => {
				this.selectionFilter.ProdOrdID.updateValue(operation.ProdOrdID.cellText);
				this.selectionFilter.OrderType.updateValue(operation.OrderType.cellText);
				this.selectionFilter.OperationID.updateValue(Number(operation.OperationID.cellText));
				this.selectionFilter.SchdID.updateValue(Number(operation.SchdID.cellText));
			},
		);
	}

	protected async openOrderPopup(order: Order, element: Element) {
		this.entity = order;
		const neededViews = [nameof("SelectionFilter"), nameof("SelectedProdItem"), nameof("SelectedSchdItem")];

		await this.open(
			order.fullId,
			element,
			this.orderPopupInner,
			this.orderPopupInnerHolder,
			neededViews,
			() => {
				this.selectionFilter.ProdOrdID.updateValue(order.ProdOrdID.cellText);
				this.selectionFilter.OrderType.updateValue(order.OrderType.cellText);
			},
		);
	}

	protected async open(
		entityId: string,
		element: Element,
		popupInner: HTMLElement,
		popupInnerHolder: HTMLElement,
		neededViews: string[],
		preUpdate: () => void,
	) {
		if (!!this.entityId) {
			this.operationPopup?.close();
		}
		if (this.entityId === entityId) {
			this.entityId = undefined;
			return;
		}
		this.entityId = entityId;

		const rect = popupInner.getBoundingClientRect();
		this.operationPopup = new Popup({
			forElement: element as HTMLElement, // it can be an SVGRectElement as well - but Bryntum requires an HTMLElement
			align: "l-r",
			cls: `qp-sch-popup qp-sch-view-popup`,
			autoShow: true,
			autoClose: false,
			monitorResize: true,
			scrollAction: "realign",
			onBeforeHide: () => {
				popupInnerHolder.appendChild(popupInner);
				this.entityId = 0;
			},
			hideWhenEmpty: false,
			floating: true,
			anchor: true,
			html: `
				<div class="event-info" style="width:${rect.width}px; height:${rect.height}px">
					<div class="splash loading"></div>
				</div>`,
		});

		document.getElementById("page-caption").onpointerdown = (event) => {
			this.close(event);
		};
		document.getElementById("customizationMenu_menu").onpointerdown = (event) => {
			event.stopPropagation();
		};

		preUpdate();
		const res = await this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false, views: neededViews }));
		this.clearSave();

		const popupOuter = this.operationPopup.element.getElementsByClassName("event-info")[0] as HTMLElement;
		if (!res?.succeeded) {
			popupOuter.innerHTML = Messages.ErrorLoadingData;
			return;
		}

		popupOuter.innerHTML = "";
		popupOuter.appendChild(popupInner);

		if (this.popupSizeObserver != null) {
			this.popupSizeObserver.disconnect();
		}
		this.popupSizeObserver = new ResizeObserver(() => {
			const rect = popupInner.getBoundingClientRect();
			popupOuter.style.width = `${rect.width}px`;
			popupOuter.style.height = `${rect.height}px`;
			this.operationPopup.element.style.height = ``;
			console.log(`new height: ${rect.height}`);
		});
		this.popupSizeObserver.observe(popupInner);

		if (!this.entity) return;

		const items = this.topBarOrderConfig.items;
		items.save.config.hidden = this.entity.isReadOnly;
		items.schedule.config.hidden = this.entity.isFirm || !this.entity.isSchedulable;
		items.firm.config.hidden = this.entity.isFirm || this.entity.isUnscheduled || !this.entity.isSchedulable;
		items.unfirm.config.hidden = !this.entity.isFirm || this.entity.isUnscheduled || !this.entity.isSchedulable;
		items.select.config.hidden = this.entity.isUnscheduled || this.entity.isSelected;
		items.deselect.config.hidden = this.entity.isUnscheduled || !this.entity.isSelected;
		this.orderToolBar.setupViewModel();
		this.operationToolBar.setupViewModel();

		this.setupObservers();
	}

	protected setupObservers() {
		[ this.selectedProdItem.ConstDate,
			this.selectedProdItem.SchedulingMethod,
			this.selectedProdItem.SchPriority,
		].forEach(field => {
			this.observeEditPanelChange(field);
		});
	}

	protected observeEditPanelChange(obj: object) {
		this.config.bindingEngine.propertyObserver(obj, "value").subscribe((newValue: any, oldValue: any) => {
			if (!newValue || newValue === oldValue || newValue?.id && oldValue?.id && newValue?.id === oldValue?.id) return;
			if (this.updatingObservedItem) return;
			if (!this.entityId) return; // the update came not from UI, ignore

			const items = this.topBarOrderConfig.items;
			if (items.save.config.disabled) {
				items.save.config.disabled = false;
				this.orderToolBar.setupViewModel();
			}

			// TODO: Uncomment when/if we have field-checking on server side
			// this.updatingObservedItem = true;
			// // TODO: replace html element with an array of views
			// this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false }, this.editPopupInner))
			// 	.finally(() => {
			// 		this.updatingObservedItem = false;
			// 	});
		});
	}
}
