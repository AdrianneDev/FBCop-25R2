import {
	PXScreen,
	graphInfo,
	PXView,
	createCollection,
	PXFieldState,
	gridConfig,
	PXActionState,
	GridPreset,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
	columnConfig,
	linkCommand,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.EP.ReassignDelegatedActivitiesProcess",
	primaryView: "Records",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class EP503020 extends PXScreen {
	Records = createCollection(EPApprovalWingmanFilter);
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	initNewRow: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class EPApprovalWingmanFilter extends PXView {
	Selected: PXFieldState;
	DelegationOf: PXFieldState;
	OrigOwnerID: PXFieldState;
	OwnerID: PXFieldState;
	DelegatedToContactID: PXFieldState;
	IsActive: PXFieldState;
	StartsOn: PXFieldState;
	ExpiresOn: PXFieldState;
	DocType: PXFieldState;
	@columnConfig({ fullState: true })
	@linkCommand("EditDetail")
	RefNoteID: PXFieldState;
	CreatedDateTime: PXFieldState;
	Descr: PXFieldState;
}
