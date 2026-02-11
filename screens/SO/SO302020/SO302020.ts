import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	graphInfo,
	viewInfo,
} from "client-controls";
import { BarcodeProcessingScreen, ScanHeaderBase } from "../../common/barcode-processing/barcode-processing-screen";

@graphInfo({
	graphType: "PX.Objects.SO.WMS.PickPackShip+Host",
	primaryView: "HeaderView",
})
export class SO302020 extends BarcodeProcessingScreen {
	ViewOrder: PXActionState;

	@viewInfo({ containerName: "Scan Header" })
	HeaderView = createSingle(ScanHeader);

	@viewInfo({ containerName: "Setup" })
	Setup = createSingle(PPSSetup);
}

export class ScanHeader extends ScanHeaderBase {
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	WorksheetNbr: PXFieldState<PXFieldOptions.Disabled>;
	SingleShipmentNbr: PXFieldState<PXFieldOptions.Disabled>;
	LastVisitedLocationID: PXFieldState<PXFieldOptions.Disabled>;
	CartID: PXFieldState<PXFieldOptions.Disabled>;
	Remove: PXFieldState<PXFieldOptions.Disabled>;
	CartLoaded: PXFieldState<PXFieldOptions.Disabled>;

	ShowPickWS: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowPick: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowPack: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowShip: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowReturn: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowLog: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;

	PackageLineNbrUI: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PPSSetup extends PXView {
	ShowPickTab: PXFieldState<PXFieldOptions.Disabled>;
	ShowPackTab: PXFieldState<PXFieldOptions.Disabled>;
	ShowShipTab: PXFieldState<PXFieldOptions.Disabled>;
	ShowReturningTab: PXFieldState<PXFieldOptions.Disabled>;
	ShowScanLogTab: PXFieldState<PXFieldOptions.Disabled>;
}
