import { BaseApiClient } from "client-controls";
import { autoinject } from "aurelia-framework";
import { ISchedulerApiClient } from "./scheduler-types";

const RESOURCE_ROUTE = "fs/screen/{0}/scheduler";

@autoinject
export class SchedulerApiClient implements ISchedulerApiClient {
	constructor(private client: BaseApiClient) {
	}

	public async openAppointmentEditor(screenId: string, dataMember: string, value: string) {
		await this.client.fetchExt(`ui/screen/${screenId}/selector/edit-screen`, { View: dataMember, Value: value });
	}
}

