import { BindingEngine } from "aurelia-framework";
import {
	treeConfig,
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	GridPreset,
	viewInfo,
	ControlParameter
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.WFStageMaint",
	primaryView: "Filter",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS202100 extends PXScreen {
	Filter = createSingle(WFStageFilter);
	Nodes = createCollection(Nodes);

	@viewInfo({ parameters: [ new ControlParameter("parent", "Nodes", "WFStageID") ] })
	Items = createCollection(FSWFStage);
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "WFStageID",
	textField: "WFStageCD",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	autoRepaint: ["Items"],
	syncPosition: true,
	openedLayers: 1,
	topBarItems: {
		Refresh: { index: 0, config: { commandName: "Refresh", text: "Refresh Stages", images: { normal: "main@Refresh" } } },
	}
})
export class Nodes extends PXView {
	WFStageID: PXFieldState;
	WFStageCD: PXFieldState;
}

export class WFStageFilter extends PXView {
	WFID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class FSWFStage extends PXView {
	Up: PXActionState;
	Down: PXActionState;
	WFStageCD: PXFieldState;
	AllowComplete: PXFieldState;
	AllowCancel: PXFieldState;
	AllowReopen: PXFieldState;
	AllowClose: PXFieldState;
	AllowModify: PXFieldState;
	AllowDelete: PXFieldState;
	Descr: PXFieldState;
}
