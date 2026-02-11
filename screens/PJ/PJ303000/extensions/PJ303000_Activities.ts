import { PXFieldState, columnConfig, GridColumnShowHideMode, placeAfterProperty, linkCommand } from "client-controls";
import { ActivitiesBase, CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { PJ303000 } from "../PJ303000";

export interface PJ303000_Activities extends PJ303000, ActivitiesBase {}
export class PJ303000_Activities extends ActivitiesBase {}

export interface PJ303000_CRActivity extends CRActivity {}
export class PJ303000_CRActivity extends CRActivity {

	@placeAfterProperty("CreatedDateTime")
	CategoryID: PXFieldState;

	@placeAfterProperty("CategoryID")
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
	WorkgroupID: PXFieldState<any, any>;
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
