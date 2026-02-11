import {
	columnConfig,
	gridConfig,
	GridColumnShowHideMode,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

export class AccountGroup extends PXView {
	GroupCD: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	IsExpense: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	SortOrder: PXFieldState;
	IsActive: PXFieldState;
	RevenueAccountGroupID: PXFieldState;
	ReportGroup: PXFieldState;
}

export class AccountGroupProperties extends PXView {
	CreatesCommitment: PXFieldState;
	DefaultLineMarkupPct: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class Accounts extends PXView {
	@columnConfig({
		hideViewLink: true,
	})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({
		hideViewLink: true,
	})
	AccountClassID: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false,
})
export class Answers extends PXView {
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		allowShowHide: GridColumnShowHideMode.False,
		hideViewLink: true,
		width: 300,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({ width: 300 })
	Value: PXFieldState;
}
