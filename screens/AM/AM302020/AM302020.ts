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

@graphInfo({ graphType: "PX.Objects.AM.ScanLabor+Host", primaryView: "HeaderView", hideFilesIndicator: true, hideNotesIndicator: true, showUDFIndicator: true })
export class AM302020 extends BarcodeProcessingScreen {
	HeaderView = createSingle(ScanHeader);
	@viewInfo({ containerName: "Labor" })
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
	allowUpdate: true,
})
export class AMMTran extends PXView {
	LaborType: PXFieldState;
	@columnConfig({ hideViewLink: true }) LaborCodeID: PXFieldState;
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
	@columnConfig({ hideViewLink: true }) EmployeeID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ShiftCD: PXFieldState;
	LaborTime: PXFieldState<PXFieldOptions.CommitChanges>;
}
