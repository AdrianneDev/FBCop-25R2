import {
	PXScreen, createCollection, graphInfo, PXView, createSingle, PXFieldState, PXFieldOptions, columnConfig, gridConfig, GridPreset, headerDescription,
	DimensionLookupMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.AllocationMaint", primaryView: "AllocationHeader", showUDFIndicator: true })
export class GL204500 extends PXScreen {

	AllocationHeader = createSingle(GLAllocation);
	Allocation = createSingle(GLAllocation2);

	Batches = createCollection(Batch);

	Destination = createCollection(GLAllocationDestination);
	Source = createCollection(GLAllocationSource);

}

export class GLAllocation extends PXView {

	GLAllocationID: PXFieldState;

	@headerDescription
	Descr: PXFieldState;

	Active: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	DataField: PXFieldState;

}

export class GLAllocation2 extends PXView {

	StartFinPeriodID: PXFieldState;
	EndFinPeriodID: PXFieldState;
	Recurring: PXFieldState;
	AllocCollectMethod: PXFieldState;
	AllocMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	AllocLedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceLedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	BasisLederID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllocateSeparately: PXFieldState<PXFieldOptions.CommitChanges>;
	SortOrder: PXFieldState;
	LastRevisionOn: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Details, allowInsert: false, allowDelete: false })
export class Batch extends PXView {

	Module: PXFieldState;
	BatchNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	DateEntered: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	Status: PXFieldState;
	CuryControlTotal: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class GLAllocationDestination extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AccountCD: PXFieldState<PXFieldOptions.CommitChanges>;

	SubCD: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BasisBranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BasisAccountCD: PXFieldState;

	BasisSubCD: PXFieldState;
	Weight: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class GLAllocationSource extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		hideViewLink: true,
		wildcard: "?",
		editorConfig: {
			wildcard: "?"
		}
	})
	AccountCD: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		wildcard: "?",
		editorConfig: {
			wildcard: "?"
		}
	})
	SubCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ContrAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ContrSubID: PXFieldState;

	LimitAmount: PXFieldState;
	LimitPercent: PXFieldState;

}
