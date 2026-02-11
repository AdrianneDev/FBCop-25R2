import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Data.Archiving.ArchivalPolicyMaint",
	primaryView: "Setup"
})
export class SM200400 extends PXScreen {
	@viewInfo({ containerName: "Setup Header" })
	Setup = createSingle(Setup);

	Policies = createCollection(Policies);
}

export class Setup extends PXView {
	ArchivingProcessDurationLimitInHours: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: false,
	autoAdjustColumns: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class Policies extends PXView {
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	RetentionPeriodInMonths: PXFieldState<PXFieldOptions.CommitChanges>;
}
