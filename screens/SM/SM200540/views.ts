import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, PXActionState, GridPreset, controlConfig, GridColumnGeneration, GridFastFilterVisibility } from "client-controls";


// Views

export class LangFilter extends PXView  {
	Language: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowLocalized: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowExcluded: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowUnboundOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowType: PXFieldState<PXFieldOptions.CommitChanges>;
	CreatedDateTime: PXFieldState<PXFieldOptions.CommitChanges>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoAdjustColumns: true,
	fastFilterByAllFields: false,
	generateColumns: GridColumnGeneration.AppendDynamic,
	generateColumnsAfterSelect: true,
	autoRepaint: ["ExceptionalResources"],
	adjustPageSize: true,
	allowImport: true,
})
export class LocalizationRecord extends PXView  {
	viewUsageDetails: PXActionState;

	Id: PXFieldState;
	@columnConfig({ allowFastFilter: true })
	NeutralValue: PXFieldState;
	@columnConfig({ width: 15 })
	IsNotLocalized: PXFieldState<PXFieldOptions.CommitChanges>;
	LocalizedValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoAdjustColumns: true,
	generateColumns: GridColumnGeneration.AppendDynamic,
	generateColumnsAfterSelect: true,
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
	fastFilterByAllFields: false,
})
export class LocalizationRecord2 extends PXView  {
	viewExceptionalUsageDetails: PXActionState;

	IdRes: PXFieldState;
	ResKey: PXFieldState;
	@columnConfig({width: 15})
	IsNotLocalized: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoAdjustColumns: true,
	generateColumns: GridColumnGeneration.AppendDynamic,
	generateColumnsAfterSelect: true,
	fastFilterByAllFields: false,
	autoRepaint: ["ExceptionalResourcesObsolete"],
	adjustPageSize: true,
	allowImport: true,
})
export class LocalizationRecord3 extends PXView  {
	viewUsageObsoleteDetails: PXActionState;
	deleteObsoleteStrings: PXActionState;

	Id: PXFieldState;
	@columnConfig({ allowFastFilter: true })
	NeutralValue: PXFieldState;
	@columnConfig({width: 15})
	IsNotLocalized: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoAdjustColumns: true,
	generateColumns: GridColumnGeneration.AppendDynamic,
	generateColumnsAfterSelect: true,
	adjustPageSize: true,
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
	fastFilterByAllFields: false,
})
export class LocalizationRecord4 extends PXView  {
	viewExceptionalUsageObsoleteDetails: PXActionState;

	IdRes: PXFieldState;
	ResKey: PXFieldState;
	@columnConfig({width: 15 })
	IsNotLocalized: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoAdjustColumns: true,
})
export class LocalizationResourceByScreen extends PXView  {
	ScreenID: PXFieldState;
	Title: PXFieldState;
}
