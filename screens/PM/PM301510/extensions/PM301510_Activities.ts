import { PXFieldState, PXFieldOptions, columnConfig, GridColumnShowHideMode, linkCommand, gridConfig, GridPreset, placeAfterProperty } from "client-controls";
import { ActivitiesBase, CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { PM301510 } from "../PM301510";

export interface PM301510_Activities extends PM301510, ActivitiesBase {}
export class PM301510_Activities extends ActivitiesBase {}

export interface PM301510_CRActivity extends CRActivity {}
@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	actionsConfig: {
		NewEvent: { hidden: true }
	}
})
export class PM301510_CRActivity extends CRActivity {

	@placeAfterProperty("ClassInfo")
	@linkCommand("ViewActivity")
	Summary: PXFieldState;

	@placeAfterProperty("Summary")
	DisplayStatus: PXFieldState;

	@placeAfterProperty("StartDate")
	CategoryID: PXFieldState;

	@placeAfterProperty("CategoryID")
	IsBillable: PXFieldState;

	@placeAfterProperty("IsBillable")
	TimeSpent: PXFieldState;

	@placeAfterProperty("TimeSpent")
	OvertimeSpent: PXFieldState;

	@placeAfterProperty("OvertimeSpent")
	TimeBillable: PXFieldState;

	@placeAfterProperty("TimeBillable")
	OvertimeBillable: PXFieldState;

	@placeAfterProperty("WorkgroupID")
	@linkCommand("OpenActivityOwner")
	TimeActivityOwner: PXFieldState;

	@placeAfterProperty("TimeActivityOwner")
	ProjectTaskID: PXFieldState;

	// override and hide
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	CompletedDate: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	Subject: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	UIStatus: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	ProjectID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	CreatedDateTime: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	OwnerID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	Source: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	BAccountID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	ContactID: PXFieldState;
}
