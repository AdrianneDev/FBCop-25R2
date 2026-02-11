import {
	PXScreen,
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
	linkCommand,
	PXPageLoadBehavior,
	PXActionState,
	GridNoteFilesShowMode,
} from "client-controls";
import { Labels } from "../common/localization";

@graphInfo({ graphType: "PX.Objects.AM.CTPProcess", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AM515000 extends PXScreen {
	QtyAvailable: PXActionState;

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(Filter);
	@viewInfo({ containerName: "Documents" })
	ProcessingRecords = createCollection(ProcessingRecords);
	@viewInfo({ containerName: "Quantity Available" })
	QtyAvailableFilter = createSingle(QtyAvailableFilter);
}

export class Filter extends PXView {
	ProcessAction: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class ProcessingRecords extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true }) OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;
	InventoryID: PXFieldState;
	@columnConfig({ nullText: Labels.Split }) SubItemID: PXFieldState;
	TranDesc: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	@columnConfig({ hideViewLink: true }) UOM: PXFieldState;
	@linkCommand("QtyAvailable") OpenQty: PXFieldState;
	RequestDate: PXFieldState;
	ShipDate: PXFieldState;
	AMCTPOrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	CTPDate: PXFieldState;
	@columnConfig({ editorType: "qp-text-editor" })	ManualProdOrdID: PXFieldState;
	AMCTPAccepted: PXFieldState;
	AMOrigRequestDate: PXFieldState;
}

export class QtyAvailableFilter extends PXView {
	RequestQty: PXFieldState;
	QtyAvail: PXFieldState;
	QtyHardAvail: PXFieldState;
	SupplyAvail: PXFieldState;
	ProdAvail: PXFieldState;
	TotalAvail: PXFieldState;
}
