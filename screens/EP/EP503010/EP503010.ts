import {
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXScreen,
	createCollection,
	PXFieldOptions,
	columnConfig,
	GridColumnType,
	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	GridPreset,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
	linkCommand,
	PXViewCollection,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.EP.EPApprovalProcess",
	primaryView: "Records",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class EP503010 extends PXScreen {
	Records = createCollection(EPApproval);

	@handleEvent(CustomEventType.GetRowCss, { view: "Records" })
	getRecordsRowCss(args: RowCssHandlerArgs<PXViewCollection<EPApproval>>) {
		const approval = args?.selector?.row;

		if (approval == null) {
			return undefined;
		}
		else if (approval.Escalated.value === true) {
			return "escalated";
		}

		return undefined;
	}
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	allowUpdate: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	defaultAction: "EditDetail",
})
export class EPApproval extends PXView {
	@columnConfig({ allowCheckAll: true, width: 35 })
	Selected: PXFieldState;
	Escalated: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	DocType: PXFieldState;
	@linkCommand("EditDetail")
	@columnConfig({ fullState: true })
	RefNoteID: PXFieldState;
	Descr: PXFieldState;
	CuryTotalAmount: PXFieldState;
	CuryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;
	BAccountID_BAccount_acctName: PXFieldState;
	DocDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DocumentOwnerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	OrigOwnerID: PXFieldState<PXFieldOptions.Hidden>;
	ApprovalID: PXFieldState<PXFieldOptions.Hidden>;
	AssignmentMapID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	RuleID: PXFieldState<PXFieldOptions.Hidden>;
	Reason: PXFieldState<PXFieldOptions.Hidden>;
	IgnoreDelegations: PXFieldState<PXFieldOptions.Hidden>;
}
