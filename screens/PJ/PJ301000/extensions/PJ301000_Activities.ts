import { PXFieldState, columnConfig, GridColumnShowHideMode, gridConfig, GridPreset, placeBeforeProperty, placeAfterProperty, linkCommand } from "client-controls";
import { ActivitiesBase, CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { PJ301000 } from "../PJ301000";

export interface PJ301000_Activities extends PJ301000, ActivitiesBase {}
export class PJ301000_Activities extends ActivitiesBase {}

export interface PJ301000_CRActivity extends CRActivity {}
@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PJ301000_CRActivity extends CRActivity {

	@placeBeforeProperty("UIStatus")
	IsFinalAnswer: PXFieldState;

	@placeBeforeProperty("WorkgroupID")
	CategoryID: PXFieldState;

	@placeAfterProperty("WorkgroupID")
	@linkCommand("OpenActivityOwner")
	OwnerID: PXFieldState;

	// override and hide
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	CompletedDate: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	Released: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	TimeSpent: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	Source: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	BAccountID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	ContactID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	ProjectID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	ProjectTaskID: PXFieldState;
}
