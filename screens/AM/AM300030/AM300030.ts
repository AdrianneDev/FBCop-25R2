import {
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";
import { BarcodeProcessingScreen, ScanHeaderBase } from "../../common/barcode-processing/barcode-processing-screen";

@graphInfo({ graphType: "PX.Objects.AM.ScanMaterial+Host", primaryView: "HeaderView", hideFilesIndicator: true, hideNotesIndicator: true, showUDFIndicator: true })
export class AM300030 extends BarcodeProcessingScreen {
	HeaderView = createSingle(ScanHeader);
	@viewInfo({ containerName: "Issue" })
	transactions = createCollection(AMMTran);
}

export class ScanHeader extends ScanHeaderBase {
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Remove: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
})
export class AMMTran extends PXView {
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	@columnConfig({ hideViewLink: true }) ProdOrdID: PXFieldState;
	@columnConfig({ hideViewLink: true }) OperationID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	TranDesc: PXFieldState;
	@columnConfig({ hideViewLink: true }) LotSerialNbr: PXFieldState;
	ExpireDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) LocationID: PXFieldState;
	Qty: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
}
