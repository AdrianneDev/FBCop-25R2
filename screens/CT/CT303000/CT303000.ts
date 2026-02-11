import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	GridPreset,
	controlConfig,
	columnConfig,
	viewInfo,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CT.UsageMaint", primaryView: "Filter" })
export class CT303000 extends PXScreen {
	Filter = createSingle(UsageFilter);

    @viewInfo({ syncAlways: true })
    CurrentContract = createSingle(Contract);

    // we split DAC into 2 classes to show in different grids
    UnBilled = createCollection(PMTran);
    Billed = createCollection(PMTran2);
}

export class UsageFilter extends PXView {
    @controlConfig({ allowEdit: true })
    ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
    InvFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class Contract extends PXView {
	ContractID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	initNewRow: true,
})
export class PMTran extends PXView {
    @columnConfig({ hideViewLink: true })
    BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

    @columnConfig({ hideViewLink: true })
    InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

    Description: PXFieldState;

    @columnConfig({ hideViewLink: true })
    UOM: PXFieldState;

    BillableQty: PXFieldState;
    Date: PXFieldState;

    @controlConfig({ allowEdit: true })
    CRCase__CaseCD: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
})
export class PMTran2 extends PXView {
    @columnConfig({ hideViewLink: true })
    BranchID: PXFieldState;

    @columnConfig({ hideViewLink: true })
    InventoryID: PXFieldState;

    Description: PXFieldState;

    @columnConfig({ hideViewLink: true })
    UOM: PXFieldState;

    BillableQty: PXFieldState;
    StartDate: PXFieldState;
    EndDate: PXFieldState;
    Date: PXFieldState;
    ARTranType: PXFieldState;
    ARRefNbr: PXFieldState;
    BilledDate: PXFieldState;
    CRCase__CaseCD: PXFieldState;
}
