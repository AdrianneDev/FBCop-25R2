import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";
import { BarcodeProcessingScreen, ScanHeaderBase } from "../../common/barcode-processing/barcode-processing-screen";

@graphInfo({
	graphType: "PX.Objects.IN.WMS.INScanWarehousePath+Host",
	primaryView: "HeaderView",
})
export class IN204025 extends BarcodeProcessingScreen {
	@viewInfo({ containerName: "Scan Header" })
	HeaderView = createSingle(ScanHeader);

	@viewInfo({ containerName: "Location Path" })
	location = createCollection(LocationPath);
}

export class ScanHeader extends ScanHeaderBase {
	SiteID: PXFieldState<PXFieldOptions.Disabled>;
	NextPathIndex: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
})
export class LocationPath extends PXView {
	LocationCD: PXFieldState<PXFieldOptions.Disabled>;
	Descr: PXFieldState<PXFieldOptions.Disabled>;
	PathPriority: PXFieldState<PXFieldOptions.Disabled>;
}
