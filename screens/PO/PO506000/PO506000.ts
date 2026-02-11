import {
	PXScreen,
	PXView,
	PXFieldState,

	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POLandedCostProcess",
	primaryView: "landedCostDocsList",
})
export class PO506000 extends PXScreen {
	@viewInfo({ containerName: "Documents" })
	landedCostDocsList = createCollection(POLandedCostDoc);
}

@gridConfig({
	preset: GridPreset.Processing,
	batchUpdate: true,
})
export class POLandedCostDoc extends PXView {
	@columnConfig({ allowCheckAll: true, allowShowHide: GridColumnShowHideMode.False })
	Selected: PXFieldState;

	RefNbr: PXFieldState;
	DocType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;
	VendorID_Vendor_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryLineTotal: PXFieldState;
	CuryTaxTotal: PXFieldState;
}
