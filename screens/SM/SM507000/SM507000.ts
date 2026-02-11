import {
	graphInfo, PXView, PXFieldState, gridConfig, PXScreen,
	createSingle, createCollection, PXFieldOptions,
	columnConfig, GridColumnShowHideMode, linkCommand, GridPreset }
	from "client-controls";

@graphInfo({graphType: "PX.SM.EmailProcessingMaint", primaryView: "Filter", hideFilesIndicator: true, hideNotesIndicator: true })
export class SM507000 extends PXScreen {
	Filter = createSingle(EmailProcessingFilter);
	FilteredItems = createCollection(SMEmail);
}

@gridConfig({
	preset: GridPreset.Processing,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
	allowStoredFilters: false,
	mergeToolbarWith: "ScreenToolbar",
})

export class SMEmail extends PXView {
	@columnConfig({allowCheckAll: true})Selected: PXFieldState;
	EMailAccount__Description: PXFieldState;
	@linkCommand("viewDetails")Subject: PXFieldState;
	MailFrom: PXFieldState;
	MailTo: PXFieldState;
	CRActivity__StartDate: PXFieldState;
	@columnConfig({hideViewLink: true})CRActivity__OwnerID: PXFieldState;
	MPStatus: PXFieldState;
}

export class EmailProcessingFilter extends PXView {
	Account: PXFieldState<PXFieldOptions.CommitChanges>;
	MyOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeFailed: PXFieldState;
}
