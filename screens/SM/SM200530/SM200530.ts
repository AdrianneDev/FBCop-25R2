import {
	PXScreen,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.SM.CertificateMaintenance",
	primaryView: "Certificates",
})
export class SM200530 extends PXScreen {
	Certificates = createCollection(Certificate);
}

@gridConfig({
	mergeToolbarWith: "ScreenToolbar",
	preset: GridPreset.Primary
})
export class Certificate extends PXView {
	Name: PXFieldState;
	Password: PXFieldState;
}
