import {
	graphInfo,
	gridConfig,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.SkillMaint",
	primaryView: "SkillRecords",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS200600 extends PXScreen {
	SkillRecords = createCollection(FSSkill);
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class FSSkill extends PXView {
	SkillCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	IsDriverSkill: PXFieldState;
}
