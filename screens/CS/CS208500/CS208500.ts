import {
	PXScreen,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	viewInfo,
	columnConfig,
	gridConfig,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.FOBPointMaint", primaryView: "FOBPoint", hideFilesIndicator: true, hideNotesIndicator: true })
export class CS208500 extends PXScreen {

	@viewInfo({ containerName: "FOB Points" })
	FOBPoint = createCollection(FOBPoint);
}

@gridConfig({
	preset: GridPreset.Primary
})
export class FOBPoint extends PXView {
	@columnConfig({ hideViewLink: true })
	FOBPointID: PXFieldState;
	Description: PXFieldState;
}
