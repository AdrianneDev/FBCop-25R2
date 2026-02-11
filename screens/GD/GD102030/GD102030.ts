import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	viewInfo,
	GridColumnShowHideMode,
	linkCommand,
	GridPreset,
	GridFilterBarVisibility,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GDPR.GDPRRestoreProcess",
	primaryView: "Filter",
	bpEventsIndicator: false,
	udfTypeField: "",
})
export class GD102030 extends PXScreen {
	@viewInfo({ containerName: "Restore Options" })
	Filter = createSingle(RestoreType);
	ObfuscatedItems = createCollection(SMPersonalDataIndex);
}

export class RestoreType extends PXView {
	DeleteNonRestored: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false,
	fastFilterByAllFields: false,
})
export class SMPersonalDataIndex extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("OpenContact")
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
	})
	UIKey: PXFieldState;

	Content: PXFieldState;
	CreatedDateTime: PXFieldState;
}
