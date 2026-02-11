import {
	PXView,
	PXFieldState,
	readOnly,
	controlConfig,
	gridConfig,
	GridPreset,
	columnConfig,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	adjustPageSize: true,
	allowStoredFilters: true
})
export class Case extends PXView {
	@readOnly @columnConfig({ allowFilter: false }) @controlConfig({ linkCommand: "viewCase", displayMode: "id", allowEdit: true }) CaseCD: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) Subject: PXFieldState;
	@readOnly CreatedDateTime: PXFieldState;
	@readOnly Status: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) Resolution: PXFieldState;
	@readOnly Severity: PXFieldState;
	@readOnly Priority: PXFieldState;
	@readOnly LastActivity: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) LastMessage: PXFieldState;
	@readOnly @controlConfig({ displayMode: "text", allowEdit: false, allowFilter: false  }) CaseClassID: PXFieldState;
	@readOnly @controlConfig({ displayMode: "text", allowEdit: false  }) ContactID: PXFieldState;
	@readOnly @controlConfig({ displayMode: "text", allowEdit: false  }) OwnerID: PXFieldState;
	@readOnly SPCRActivity__Incoming: PXFieldState;
	@readOnly SPCRActivity__ClassID: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) SPCRActivity__Subject: PXFieldState;
	@readOnly SPCRActivity__StartDate: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) SPCRActivity__Owner: PXFieldState;


	readonly ClassIDTask = 0; // eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly ClassIDEvent = 1; // eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly ClassIDActivity = 2; // eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly ClassIDEmail = 4; // eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly ClassIDEmailRouting = -2; // eslint-disable-line @typescript-eslint/no-magic-numbers
	readonly ClassIDOldEmails = -3; // eslint-disable-line @typescript-eslint/no-magic-numbers

	public get activityStyle() {
		if (!!this.SPCRActivity__Incoming.value) {
			return "sp-activity-class-email-sent";
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDEvent) {
			return "sp-activity-class-appointment";
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDTask) {
			return "sp-activity-class-task";
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDActivity) {
			return "sp-activity-class-activity";
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDEmail) {
			return "sp-activity-class-email";
		}
		return { normal: "svg:sp@chat" };
	}

	public get activityIcon()  {
		if (!!this.SPCRActivity__Incoming.value) {
			return { normal: "svg:sp@emailSent" };
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDEvent) {
			return { normal: "svg:sp@appointment" };
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDTask) {
			return { normal: "svg:sp@task" };
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDActivity) {
			return { normal: "svg:sp@chat" };
		}
		if (this.SPCRActivity__ClassID.value === this.ClassIDEmail) {
			return { normal: "svg:sp@emailUnread" };
		}
		return { normal: "svg:sp@chat" };
	}
}

