import { PXFieldState, linkCommand, columnConfig, GridColumnShowHideMode, gridConfig, GridPreset, placeBeforeProperty, placeAfterProperty } from "client-controls";
import { ActivitiesBase, CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { PJ302000 } from "../PJ302000";

export interface PJ302000_Activities extends PJ302000, ActivitiesBase {}
export class PJ302000_Activities extends ActivitiesBase {}

export interface PJ302000_CRActivity extends CRActivity {}
@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	actionsConfig: {
		NewEvent: { hidden: true }
	}
})
export class PJ302000_CRActivity extends CRActivity {

	@placeBeforeProperty("UIStatus")
	CostCodeID: PXFieldState;

	@placeAfterProperty("CreatedDateTime")
	CategoryID: PXFieldState;

	@placeBeforeProperty("TimeSpent")
	IsBillable: PXFieldState;

	@placeAfterProperty("TimeSpent")
	OvertimeSpent: PXFieldState;

	@placeAfterProperty("OvertimeSpent")
	@columnConfig({ allowUpdate: false })
	TimeBillable: PXFieldState;

	@placeAfterProperty("TimeBillable")
	@columnConfig({ allowUpdate: false })
	OvertimeBillable: PXFieldState;

	@placeAfterProperty("WorkgroupID")
	@linkCommand("OpenActivityOwner")
	OwnerID: PXFieldState;

	// override and hide
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	CompletedDate: PXFieldState;
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
