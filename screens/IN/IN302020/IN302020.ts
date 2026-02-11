import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";
import { BarcodeProcessingScreen, ScanHeaderBase } from "../../common/barcode-processing/barcode-processing-screen";

@graphInfo({
	graphType: "PX.Objects.IN.WMS.INScanIssue+Host",
	primaryView: "HeaderView",
})
export class IN302020 extends BarcodeProcessingScreen {
	@viewInfo({ containerName: "Scan Header" })
	HeaderView = createSingle(ScanHeader);

	@viewInfo({ containerName: "Issue Lines"})
	transactions = createCollection(IssueLines);
}

export class ScanHeader extends ScanHeaderBase {
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	SiteID: PXFieldState<PXFieldOptions.Disabled>;
	Remove: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
})
export class IssueLines extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.Disabled>;
	TranDesc: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.Disabled>;

	ExpireDate: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	ReasonCode: PXFieldState<PXFieldOptions.Disabled>;

	Qty: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.Disabled>;
}
