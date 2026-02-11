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
	graphType: "PX.Objects.IN.INPriceClassMaint",
	primaryView: "Records",
})
export class IN209000 extends PXScreen {
	@viewInfo({ containerName: "Price Class" })
	Records = createCollection(INPriceClass);
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class INPriceClass extends PXView  {
	PriceClassID: PXFieldState;
	Description: PXFieldState;
}