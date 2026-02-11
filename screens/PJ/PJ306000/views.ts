import { Grid } from "@bryntum/schedulerpro";
import {
	columnConfig,
	gridConfig,
	headerDescription,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	controlConfig
} from "client-controls";

export class Submittals extends PXView {
	SubmittalID: PXFieldState;
	RevisionID: PXFieldState;
	Status: PXFieldState;
	Reason: PXFieldState;
	TypeID: PXFieldState;
	Summary: PXFieldState<PXFieldOptions.Multiline>;
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskId: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	SpecificationInfo: PXFieldState;
	SpecificationSection: PXFieldState;
	DateCreated: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DateOnSite: PXFieldState;
	DateClosed: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CurrentWorkflowItemContactID: PXFieldState;
	DaysOverdue: PXFieldState;
	@headerDescription
	FormCaptionDescription: PXFieldState;
}

export class CurrentSubmittal extends PXView {
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
	allowDelete: false,
	actionsConfig: {
		DeleteWorkflowItem: { images: { normal: "main@RecordDel" } }
	}
})
export class SubmittalWorkflowItems extends PXView {
	DeleteWorkflowItem: PXActionState;

	EmailTo: PXFieldState;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		width: 120,
		editorConfig: {
			allowEdit: true,
		}
	})
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Contact__FullName: PXFieldState;
	Contact__Salutation: PXFieldState;
	Role: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DaysForReview: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletionDate: PXFieldState;
	DateReceived: PXFieldState;
	DateSent: PXFieldState;
	Contact__EMail: PXFieldState;
	Contact__Phone1: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CanDelete: PXFieldState<PXFieldOptions.Hidden>;
}
