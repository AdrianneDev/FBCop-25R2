import {
	createCollection,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	GridFilterBarVisibility,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARPriceClassMaint",
	primaryView: "Records",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AR208000 extends PXScreen {

	Records = createCollection(ARPriceClass);
}

@gridConfig({
	preset: GridPreset.Primary,
	showFilterBar: GridFilterBarVisibility.OnDemand
})
export class ARPriceClass extends PXView  {

	PriceClassID: PXFieldState;
	Description: PXFieldState;
}
