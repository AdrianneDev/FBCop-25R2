import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnShowHideMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Filter extends PXView {
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	DisciplineId: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectIssueID: PXFieldState<PXFieldOptions.CommitChanges>;
	RFIID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsCurrentOnly: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
	allowInsert: false,
	allowImport: true,
	actionsConfig: {
		InsertDrawingLogInGrid: {
			images: {
				normal: "main@RecordAdd"
			}
		}
	}
})
export class DrawingLogs extends PXView {
	InsertDrawingLogInGrid: PXActionState;

	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("editDrawingLog")
	@columnConfig({width: 150})
	DrawingLogCd: PXFieldState<PXFieldOptions.CommitChanges>;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewEntity")
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	@linkCommand("ViewEntity")
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	Title: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true})
	DisciplineId: PXFieldState<PXFieldOptions.CommitChanges>;
	Revision: PXFieldState<PXFieldOptions.CommitChanges>;
	Sketch: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	Description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	StatusId: PXFieldState<PXFieldOptions.CommitChanges>;
	DrawingDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceivedDate: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	@linkCommand("DrawingLog$OriginalDrawingId$Link")
	OriginalDrawingId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true, width: 120})
	OwnerId: PXFieldState<PXFieldOptions.CommitChanges>;
}
