import { PXFieldState, columnConfig, GridColumnShowHideMode, placeAfterProperty, gridConfig, GridPreset, linkCommand } from "client-controls";
import { ActivitiesBase, CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { PJ306000 } from "../PJ306000";

export interface PJ306000_Activities extends PJ306000, ActivitiesBase {}
export class PJ306000_Activities extends ActivitiesBase {}

export interface PJ306000_CRActivity extends CRActivity {}
@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PJ306000_CRActivity extends CRActivity {

	@placeAfterProperty("Subject")
	IsFinalAnswer: PXFieldState;

	@placeAfterProperty("CreatedDateTime")
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
