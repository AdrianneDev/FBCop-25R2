import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	headerDescription,
	GridColumnShowHideMode,
} from "client-controls";
import { LSNullText } from "../../IN/common/line-splitting/views";

@graphInfo({
	graphType: "PX.Objects.IN.KitAssemblyEntry",
	primaryView: "Document",
	udfTypeField: "DocType",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class IN307000 extends PXScreen {
	@viewInfo({ containerName: "Kit Assembly Summary" })
	Document = createSingle(INKitRegisterHeader);

	@viewInfo({ containerName: "Kit Assembly Properties" })
	DocumentProperties = createSingle(INKitRegister);

	@viewInfo({ containerName: "Components" })
	Components = createCollection(INComponentTran);

	@viewInfo({ containerName: "Non-Stock Components" })
	Overhead = createCollection(INOverheadTran);
}

export class INKitRegisterHeader extends PXView {
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState;

	KitInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	KitRevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCode: PXFieldState;
	KitRequestDate: PXFieldState;

	@headerDescription
	TranTranDesc: PXFieldState;

	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class INKitRegister extends PXView {
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchBaseCuryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	statusField: "Availability",
})
export class INComponentTran extends PXView {
	INComponentLineSplittingExtension_ShowSplits: PXActionState; //Line Details button on Components tab

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Availability: PXFieldState;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	Qty: PXFieldState;

	@columnConfig({ allowNull: false })
	UnitCost: PXFieldState;

	ReasonCode: PXFieldState;
	TranDesc: PXFieldState;
	INKitSpecStkDet__DfltCompQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	INKitSpecStkDet__UOM: PXFieldState;

	INKitSpecStkDet__AllowQtyVariation: PXFieldState;
	INKitSpecStkDet__MinCompQty: PXFieldState;
	INKitSpecStkDet__MaxCompQty: PXFieldState;
	INKitSpecStkDet__DisassemblyCoeff: PXFieldState;
	INKitSpecStkDet__AllowSubstitution: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class INOverheadTran extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
    UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	Qty: PXFieldState;

	@columnConfig({ allowNull: false })
	UnitCost: PXFieldState;

	ReasonCode: PXFieldState;
	TranDesc: PXFieldState;
	INKitSpecNonStkDet__DfltCompQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	INKitSpecNonStkDet__UOM: PXFieldState;

	INKitSpecNonStkDet__AllowQtyVariation: PXFieldState;
	INKitSpecNonStkDet__MinCompQty: PXFieldState;
	INKitSpecNonStkDet__MaxCompQty: PXFieldState;
}
