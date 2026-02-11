import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	createCollection,
	gridConfig,
	GridPreset,
	columnConfig,
	linkCommand,
	GridColumnShowHideMode,
	PXActionState,
	GridAutoGrowMode,
	GridPagerMode,
} from "client-controls";

import { Messages } from "src/screens/CR/common/messages";

export abstract class ActivitiesBase {

	@viewInfo({ containerName: "Activities" })
	Activities = createCollection(CRActivity);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	blankFilterHeader: Messages.ActivitiesFilterHeader,
})
export class CRActivity extends PXView {
	RemoveActivity: PXActionState;
	newTask: PXActionState;
	NewEvent: PXActionState;
	newMailActivity: PXActionState;
	NewActivity: PXActionState;
	TogglePinActivity: PXActionState;

	@columnConfig({ width: 35 })
	IsPinned: PXFieldState;
	@columnConfig({ width: 35, allowFilter: false, allowSort: false  })
	IsCompleteIcon: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ width: 35, allowFilter: false, allowSort: false  })
	PriorityIcon: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ width: 35, allowFilter: false, allowSort: false  })
	CRReminder__ReminderIcon: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ width: 35, allowFilter: false, allowSort: false  })
	ClassIcon: PXFieldState<PXFieldOptions.Hidden>;
	ClassInfo: PXFieldState;
	@linkCommand("ViewActivity")
	Subject: PXFieldState;
	UIStatus: PXFieldState;
	Released: PXFieldState<PXFieldOptions.Hidden>;
	StartDate: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ format: "g" })
	CompletedDate: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ format: "g" })
	CreatedDateTime: PXFieldState;
	TimeSpent: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByID_Creator_Username: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	OwnerID: PXFieldState;
	Source: PXFieldState<PXFieldOptions.Hidden>;
	BAccountID: PXFieldState<PXFieldOptions.Hidden>;
	ContactID: PXFieldState<PXFieldOptions.Hidden>;
	ProjectID: PXFieldState<PXFieldOptions.Hidden>;
	ProjectTaskID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	Body: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ fullState: true })
	RefNoteID: PXFieldState<PXFieldOptions.Hidden>;
}
