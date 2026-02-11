import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	GridColumnType,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign
} from "client-controls";

export class PMTranType {
	OrigDocType: PXFieldState;
}

// Views

export class ProformaLinkFilter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	LineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	Module: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	quickFilterFields: ["RefNbr", "Description"],
	syncPosition: true,
	topBarItems: {
		AddTransactions: {
			index: 0,
			config: {
				commandName: "AddTransactions",
				images: { normal: "main@AddNew" }
			}
		},
		RemoveTransaction: {
			index: 1,
			config: {
				commandName: "RemoveTransaction",
				images: { normal: "main@RecordDel" }
			}
		}
	}
})
export class PMTran extends PXView {
	AddTransactions: PXActionState;
	RemoveTransaction: PXActionState;
	ProformaLineNbr: PXFieldState;
	TranType: PXFieldState;
	PMRegister: PMTranType;
	@linkCommand("ViewBill")
	OrigRefNbr: PXFieldState;
	OrigLineNbr: PXFieldState;
	@linkCommand("ViewVendor")
	@columnConfig({
		displayMode: GridColumnDisplayMode.Both,
		width: 200
	})
	BAccountID: PXFieldState;
	Date: PXFieldState;
	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	TranCuryAmount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TranCuryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	RefNbr: PXFieldState;
	BatchNbr: PXFieldState;
	UOM: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	Qty: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	BillableQty: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	TranCuryUnitRate: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox
	})
	Billable: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	@linkCommand("ViewTransaction")
	TranID: PXFieldState;
}

export class TranFilter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	Module: PXFieldState<PXFieldOptions.CommitChanges>;
	OrigDocType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrigRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class PMTran2 extends PXView {
	@columnConfig({ type: GridColumnType.CheckBox })
	Selected: PXFieldState;
	TranType: PXFieldState;
	PMRegister: PMTranType;
	@linkCommand("ViewBill")
	OrigRefNbr: PXFieldState;
	OrigLineNbr: PXFieldState;
	@linkCommand("ViewVendor")
	@columnConfig({
		displayMode: GridColumnDisplayMode.Both,
		width: 200
	})
	BAccountID: PXFieldState;
	Date: PXFieldState;
	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	TranCuryAmount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TranCuryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	RefNbr: PXFieldState;
	BatchNbr: PXFieldState;
	AccountGroupID: PXFieldState;
	UOM: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	Qty: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	BillableQty: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	TranCuryUnitRate: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox
	})
	Billable: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	@linkCommand("ViewTransaction")
	TranID: PXFieldState;
}
