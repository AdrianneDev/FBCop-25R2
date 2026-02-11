import {
	viewInfo,
	createCollection,
	gridConfig,
	GridPreset,
	PXFieldState,
	PXFieldOptions,
	GridPagerMode,
} from "client-controls";
import { CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { CR306030 } from "../CR306030";
import { Messages } from "src/screens/CR/common/messages";

export interface CR306030_Activities extends CR306030 { }

export class CR306030_Activities {
	@viewInfo({ containerName: "Activities" })
	Activities = createCollection(CRActivityExt);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	blankFilterHeader: Messages.ActivitiesFilterHeader,
})
export class CRActivityExt extends CRActivity {
	OvertimeBillable: PXFieldState;
	TimeBillable: PXFieldState;
	OvertimeSpent: PXFieldState;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}
