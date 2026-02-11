import {
	createCollection,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	GridPagerMode,
	viewInfo,
	columnConfig,
} from "client-controls";

export abstract class MailingPrintingPreferencesBase {

	@viewInfo({ containerName: "Default Sources" })
	Notifications = createCollection(NotificationSetup);

	@viewInfo({ containerName: "Default Recipients" })
	Recipients = createCollection(NotificationSetupRecipient);
}


@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoRepaint: ["Recipients"],
	keepPosition: true,
})
export class NotificationSetup extends PXView {
	Active: PXFieldState;
	NotificationCD: PXFieldState;
	NBranchID: PXFieldState;
	EMailAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ReportID: PXFieldState<PXFieldOptions.CommitChanges>;
	NotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	RecipientsBehavior: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	DefaultPrinterID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class NotificationSetupRecipient extends PXView {
	Active: PXFieldState;
	ContactType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ fullState: true })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Email: PXFieldState;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	AddTo: PXFieldState;
}
