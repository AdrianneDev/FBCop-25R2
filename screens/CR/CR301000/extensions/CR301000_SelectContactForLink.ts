import { CR301000 } from "../CR301000";
import {
	createCollection,
	PXFieldState,
	PXView,
	columnConfig,
	gridConfig,
	GridFilterBarVisibility,
	GridPagerMode,
	viewInfo,
	GridPreset,
	GridAutoGrowMode,
} from "client-controls";

export interface CR301000_SelectContactForLink extends CR301000 {}
export class CR301000_SelectContactForLink {
	@viewInfo({ containerName: "Dialog: Select Contact for Lead" })
	Link_SelectEntityForLink = createCollection(EntityForLink);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFilterBar: GridFilterBarVisibility.False,
	fastFilterByAllFields: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pagerMode: GridPagerMode.InfiniteScroll,
	showTopBar: false,
})
export class EntityForLink extends PXView {
	DisplayName: PXFieldState;
	Salutation: PXFieldState;
	EMail: PXFieldState;
	Phone1: PXFieldState;
	IsPrimary: PXFieldState;
}
