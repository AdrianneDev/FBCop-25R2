import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { IN101000 } from "../IN101000";

export interface IN101000_TabMailingPrintingPreferences extends IN101000 { }
export class IN101000_TabMailingPrintingPreferences {
	@viewInfo({ containerName: "Default Sources" })
	Notifications = createCollection(Notifications);
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class Notifications extends PXView {
	NotificationCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	NBranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EMailAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DefaultPrinterID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReportID: PXFieldState<PXFieldOptions.CommitChanges>;

	NotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
}
