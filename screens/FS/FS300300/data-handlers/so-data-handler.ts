/* eslint-disable brace-style */
import { EventModel, StringHelper } from "@bryntum/schedulerpro";
import { ServiceOrderModel } from "../view-models";
import { TimeConverter } from "./time-converter";

export class SODataHandler {

	protected source: ServiceOrderModel[] = [];

	protected serviceOrdersById: Map<string, ServiceOrderModel>;
	protected servicesByServiceOrderId: Map<string, Map<string, ServiceOrderModel>>;
	protected servicesById: Map<string, ServiceOrderModel>;

	public initializeWith(serviceOrders: ServiceOrderModel[]) {
		if (this.source.length === 0 && serviceOrders.length === 0) return false;
		this.source = serviceOrders.map(so => so);

		return true;
	}

	public createData() {
		this.serviceOrdersById = new Map(this.source.map(so => [so.orderId, so]));
		this.servicesById = new Map(this.source.map(so => [so.serviceId, so]));
		this.servicesByServiceOrderId = new Map<string, Map<string, ServiceOrderModel>>();
		this.source.forEach(so => {
			if (!this.servicesByServiceOrderId.has(so.orderId)) {
				this.servicesByServiceOrderId.set(so.orderId, new Map<string, ServiceOrderModel>());
			}
			const serviceOrderEntry = this.servicesByServiceOrderId.get(so.orderId);
			if (!serviceOrderEntry.has(so.FSSODet__LineNbr.cellText)) {
				serviceOrderEntry.set(so.FSSODet__LineNbr.cellText, so);
			}
		});

		const singleSOsById = new Map([...this.serviceOrdersById.values()].map(so => [so.orderId, so]));
		const events = [...singleSOsById.values()].map(so => new EventModel({
			id: so.orderId,
			name: StringHelper.xss`${so.orderId}`,
			cls: `${this.getEntryCls(so)}`,
		}));
		return events;
	}

	public getEntry(id: string) {
		return this.serviceOrdersById.get(id) ?? this.servicesById.get(id);
	}

	public scheduleEntry(entryId: string) {
		const service = this.servicesById.get(entryId);
		if (service) {
			service.isScheduled = true;
		} else {
			this.source = this.source.filter(so => so.orderId !== entryId);
		}
	}

	public getChildren(id: string) {
		return [...this.servicesByServiceOrderId.get(id).values()]
			.sort((a, b) => a.FSSODet__LineNbr.value - b.FSSODet__LineNbr.value);
	}

	public getEstimatedDurationMS(serviceOrder: ServiceOrderModel, isSODetails: boolean) {
		const duration = (isSODetails
			? TimeConverter.hMMtoMinutes(serviceOrder.FSSODet__EstimatedDuration.value)
			: this.getTotalEstimatedDurationMinutes(serviceOrder.orderId)
		) * 60 * 1000; // eslint-disable-line @typescript-eslint/no-magic-numbers
		if (duration > 0) {
			return duration;
		}
		return 60 * 60 * 1000; // eslint-disable-line @typescript-eslint/no-magic-numbers
	}


	protected getEntryCls(so: ServiceOrderModel) {
		const cls = "";
		return cls;
	}

	private getTotalEstimatedDurationMinutes(id: string) {
		const children = this.getChildren(id).filter(x => !x.isScheduled);
		return children.reduce((sum, current) => sum + TimeConverter.hMMtoMinutes(current.FSSODet__EstimatedDuration.value), 0);
	}

}
