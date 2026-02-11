import {
	GridColumnShowHideMode,
	GridColumnType,
	GridFastFilterVisibility,
	GridFilterBarVisibility,
	GridPagerMode,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	columnConfig,
	gridConfig,
	linkCommand,
	localizable,
} from "client-controls";
import { initActionsConfig, initTopBarItems } from "./documentRecognition/menu/menu-initializer";

@gridConfig({ preset: GridPreset.Primary })
export class APInvoice extends PXView {
	RecognizedRecordRefNbr: PXFieldState;
	RecognitionStatus: PXFieldState;
	DocType: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchId: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDate: PXFieldState;
	DueDate: PXFieldState;
	InvoiceNbr: PXFieldState;
	DocDesc: PXFieldState;
	CuryLineTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState;
	AllowFiles: PXFieldState<PXFieldOptions.Disabled>;
	AllowFilesMsg: PXFieldState<PXFieldOptions.Disabled>;
	AllowUploadFile: PXFieldState<PXFieldOptions.Disabled>;
	FileID: PXFieldState<PXFieldOptions.Disabled>;
	RecognizedDataJson: PXFieldState<PXFieldOptions.Disabled>;
	VendorTermIndex: PXFieldState<PXFieldOptions.Disabled>;
}

export class RecognizedRecord extends PXView {
	RefNbr: PXFieldState;
}

@localizable
export class ML301100Texts {
	static ClearTableText = "Clear Table";
	static ClearTableTooltipText = "Clear Table";
	static LinkPOText = "Link PO Line";
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: false,
	showFastFilter: GridFastFilterVisibility.False,
	showFilterBar: GridFilterBarVisibility.False,
	actionsConfig: initActionsConfig(),
	topBarItems: {
		DeleteAllTransactions: {
			config: {
				images: { normal: "svg:main@grid_delete" },
				commandName: "DeleteAllTransactions",
				text: ML301100Texts.ClearTableText,
				toolTip: ML301100Texts.ClearTableTooltipText,
				disabled: true
			},
		},
		LinkLine: { config: { text: ML301100Texts.LinkPOText, commandName: "LinkLine", disabled: true } },
		LinkSubcontractLine: { config: { commandName: "LinkSubcontractLine",  disabled: true} },
		...initTopBarItems(),
	},
})
export class APTran extends PXView {
	DeleteAllTransactions: PXActionState;
	LinkLine: PXActionState;
	LinkSubcontractLine: PXActionState;

	@columnConfig({ width: 110 })
	AlternateID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ViewItem")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RecognizedPONumber: PXFieldState;
	RecognizedPOLineNbr: PXFieldState;
	PONumberJson: PXFieldState;
	ReceiptType: PXFieldState;
	ReceiptNbr: PXFieldState;
	DocumentLink: PXFieldState;
	RecognizedSubcontractNumber: PXFieldState;
	RecognizedSubcontractLineNbr: PXFieldState;
	SubcontractNumberJson: PXFieldState;
}
export class LinkLineFilter extends PXView {
	POOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState;
	UOM: PXFieldState;
}
@gridConfig({
	preset: GridPreset.ReadOnly,
	quickFilterFields: ["POOrder__OrderNbr", "POOrder__VendorRefNbr", "TranDesc", "SiteID"],
})
export class POLineS extends PXView {
	@columnConfig({
		allowSort: false,
		allowCheckAll: false,
		allowResize: false,
		type: GridColumnType.CheckBox,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	POOrder__OrderNbr: PXFieldState;
	POOrder__OrderType: PXFieldState;
	LineNbr: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState;
	CostCodeID: PXFieldState;
	POOrder__VendorRefNbr: PXFieldState;
	SubItemID: PXFieldState;
	SiteID: PXFieldState;
	POOrder__CuryID: PXFieldState;
	OrderQty: PXFieldState;
	curyLineAmt: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryUnbilledAmt: PXFieldState;
	TranDesc: PXFieldState;
}
@gridConfig({
	preset: GridPreset.ReadOnly,
	quickFilterFields: ["PONbr", "ReceiptNbr", "POReceipt__InvoiceNbr", "TranDesc", "SiteID"],
})
export class POReceiptLineS extends PXView {
	@columnConfig({
		allowSort: false,
		allowCheckAll: false,
		allowResize: false,
		type: GridColumnType.CheckBox,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	PONbr: PXFieldState;
	POType: PXFieldState;
	ReceiptNbr: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState;
	CostCodeID: PXFieldState;
	POReceipt__InvoiceNbr: PXFieldState;
	SubItemID: PXFieldState;
	SiteID: PXFieldState;
	LineNbr: PXFieldState;
	CuryID: PXFieldState;
	ReceiptQty: PXFieldState;
	CuryExtCost: PXFieldState;
	UnbilledQty: PXFieldState;
	TranDesc: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class RecognizedRecordErrorHistory extends PXView {
	ErrorMessage: PXFieldState;
	CloudFileId: PXFieldState;

	@columnConfig({ format: "G" })
	CreatedDateTime: PXFieldState;
}

@gridConfig({ preset: GridPreset.Attributes })
export class BoundFeedback extends PXView {
	FieldBound: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	TableRelated: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
}

export class LinkSubcontractLineFilter extends PXView {
	POOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState;
	UOM: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	quickFilterFields: ["SubcontractNbr", "TranDesc", "SiteID"],
})
export class POLineSub extends PXView {
	@columnConfig({
		allowSort: false,
		allowCheckAll: false,
		allowResize: false,
		type: GridColumnType.CheckBox,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	SubcontractNbr: PXFieldState;
	LineNbr: PXFieldState;
	SiteID: PXFieldState;
	POOrder__CuryID: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState;
	CostCodeID: PXFieldState;
	CuryUnbilledAmt: PXFieldState;
	TranDesc: PXFieldState;
}
