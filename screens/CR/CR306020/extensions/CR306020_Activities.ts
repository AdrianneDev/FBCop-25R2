import {
	viewInfo,
	createCollection,
	gridConfig,
	GridPreset,
	PXFieldState,
	GridPagerMode,
} from "client-controls";
import { CRActivity } from "src/screens/CR/common/tabs/tab-activities/tab-activities";
import { CR306020 } from "../CR306020";
import { Messages } from "src/screens/CR/common/messages";

export interface CR306020_Activities extends CR306020 { }

export class CR306020_Activities {
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
}
