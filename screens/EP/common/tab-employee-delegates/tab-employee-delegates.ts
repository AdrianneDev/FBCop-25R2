import {
	PXView,
	PXFieldState,
	createCollection,
	gridConfig,
	GridPreset,
	viewInfo,
	PXFieldOptions,
	GridFilterBarVisibility
} from "client-controls";

export abstract class EmployeeDelegatesBase {
	@viewInfo({ containerName: "Delegates" })
	Delegates = createCollection(EPWingman);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class EPWingman extends PXView {
	DelegationOf: PXFieldState<PXFieldOptions.CommitChanges>;
	WingmanID: PXFieldState<PXFieldOptions.CommitChanges>;
	WingmanID_EPEmployee_acctName: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	StartsOn: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpiresOn: PXFieldState<PXFieldOptions.CommitChanges>;
}
