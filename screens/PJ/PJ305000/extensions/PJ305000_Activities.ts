import { PXFieldState, PXFieldOptions, columnConfig, GridColumnShowHideMode, placeAfterProperty, linkCommand } from "client-controls";
import { ActivitiesBase, CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { PJ305000 } from "../PJ305000";

export interface PJ305000_Activities extends PJ305000, ActivitiesBase {}
export class PJ305000_Activities extends ActivitiesBase {}

export interface PJ305000_CRActivity extends CRActivity {}
export class PJ305000_CRActivity extends CRActivity {

	@placeAfterProperty("CreatedDateTime")
	CategoryID: PXFieldState;

	@placeAfterProperty("CategoryID")
	@linkCommand("OpenActivityOwner")
	OwnerID: PXFieldState;

	@placeAfterProperty("OwnerID")
	@columnConfig({visible: true})
	CreatedByID_Creator_Username: PXFieldState;

	@placeAfterProperty("CreatedByID_Creator_Username")
	IsBillable: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("IsBillable")
	TimeSpent: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("TimeSpent")
	OvertimeSpent: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("OvertimeSpent")
	TimeBillable: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("TimeBillable")
	OvertimeBillable: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("OvertimeBillable")
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("OvertimeBillable")
	ProjectID: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("ProjectID")
	ProjectTaskID: PXFieldState<PXFieldOptions.Hidden>;

	@placeAfterProperty("ProjectTaskID")
	Released: PXFieldState<PXFieldOptions.Hidden>;

	// override and hide
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	CompletedDate: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	Source: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	BAccountID: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	ContactID: PXFieldState;
}
