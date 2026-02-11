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
	graphType: "PX.Objects.PO.WMS.ReceivePutAway+Host",
	primaryView: "HeaderView",
})
export class PO302020 extends BarcodeProcessingScreen {
	ViewOrder: PXActionState;

	@viewInfo({ containerName: "Scan Header" })
	HeaderView = createSingle(ScanHeader);

	@viewInfo({ containerName: "Receipt" })
	Document = createSingle(Receipt);
}

export class ScanHeader extends ScanHeaderBase {
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	TransferRefNbr: PXFieldState<PXFieldOptions.Disabled>;
	CartID: PXFieldState<PXFieldOptions.Disabled>;
	Remove: PXFieldState<PXFieldOptions.Disabled>;
	CartLoaded: PXFieldState<PXFieldOptions.Disabled>;

	ShowReceive: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowReturn: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowPutAway: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
	ShowLog: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
}

export class Receipt extends PXView {
	WMSSingleOrder: PXFieldState<PXFieldOptions.Disabled>;
}
