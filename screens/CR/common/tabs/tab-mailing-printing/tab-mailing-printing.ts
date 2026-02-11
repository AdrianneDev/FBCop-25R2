import {
	createCollection,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	GridPagerMode,
	viewInfo,
} from "client-controls";

export abstract class MailingPrintingBase {

	@viewInfo({ containerName: "Mailings" })
	NotificationSources = createCollection(NotificationSource);

	@viewInfo({ containerName: "Recipients" })
	NotificationRecipients = createCollection(NotificationRecipient);
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoRepaint: ["NotificationRecipients"],
	keepPosition: true,
})
export class NotificationSource extends PXView {
	Active: PXFieldState;
	OverrideSource: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	SetupID: PXFieldState<PXFieldOptions.CommitChanges>;
	NBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	EMailAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ReportID: PXFieldState<PXFieldOptions.CommitChanges>;
	NotificationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	RecipientsBehavior: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class NotificationRecipient extends PXView {
	Active: PXFieldState;
	ContactType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ fullState: true })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Email: PXFieldState;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	AddTo: PXFieldState;
}
