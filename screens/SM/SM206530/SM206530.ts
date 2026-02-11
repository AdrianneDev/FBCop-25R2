import {
	createCollection,
	PXScreen,
	graphInfo,
	gridConfig,
	PXView,
	PXFieldState,
	GridPreset,
	columnConfig
} from "client-controls";

@graphInfo({graphType: "PX.SM.ScaleMaint", primaryView: "Scale"})
export class SM206530 extends PXScreen {

	Scale = createCollection(SMScale);
}

@gridConfig({
	preset: GridPreset.Primary
})
export class SMScale extends PXView  {
	DeviceHubID: PXFieldState;
	ScaleID: PXFieldState;
	Descr: PXFieldState;
	CompanyLastWeight: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CompanyUOM: PXFieldState;
	LastWeight: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}
