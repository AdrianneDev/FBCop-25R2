import {
	PXScreen,
	PXView,
	PXFieldState,

	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INSubItemMaint",
	primaryView: "SubItemRecords",
})
export class IN205000 extends PXScreen {
	@viewInfo({ containerName: "Subitems" })
	SubItemRecords = createCollection(INSubItem);
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class INSubItem extends PXView {
	SubItemID: PXFieldState;
	SubItemCD: PXFieldState;
	Descr: PXFieldState;
}