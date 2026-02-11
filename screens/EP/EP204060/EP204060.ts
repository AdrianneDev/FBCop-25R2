import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	PXView,
	gridConfig,
	treeConfig,
	columnConfig,
	TextAlign,
	GridColumnShowHideMode,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	GridColumnType,
	GridPreset,
	ControlParameter,
	GridAutoGrowMode,
} from "client-controls";
import { Messages } from "src/screens/common/messages";

@graphInfo({graphType: "PX.TM.ImportCompanyTreeMaint", primaryView: "Items", })
export class EP204060 extends PXScreen {
	ViewEmployee: PXActionState;
	Left: PXActionState;
	Right: PXActionState;

	@viewInfo({containerName: "Company Tree"})
	Folders = createCollection(EPCompanyTree);
	@viewInfo({containerName: "List of Groups", parameters: [new ControlParameter("WorkGroupID", "Folders", "WorkGroupID")]})
	Items = createCollection(EPCompanyTree2);
	@viewInfo({containerName: "Group Members", parameters: [new ControlParameter("WorkGroupID", "Items", "WorkGroupID")]})
	Members = createCollection(EPCompanyTreeMember);
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "WorkGroupID",
	textField: "Description",
	modifiable: false,
	mode: "single",
	openedLayers: 1,
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	keepPosition: true,
	hideToolbarSearch: true,
	topBarItems: {
		Left: { config: { commandName: "Left", text: Messages.Left, images: { normal: "main@ArrowLeft" } } },
		Right: { config: { commandName: "Right", text: Messages.Right, images: { normal: "main@ArrowRight" } } },
	}
})
export class EPCompanyTree extends PXView  {
	WorkGroupID: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	autoRepaint: ["Members"],
	topBarItems: {
		Up: { config: { commandName: "Up", text: Messages.Up, images: { normal: "main@ArrowUp" } } },
		Down: { config: { commandName: "Down", text: Messages.Down, images: { normal: "main@ArrowDown" } } },
	},
	actionsConfig: {
		exportToExcel: { hidden: true }
	},
	autoGrowInHeight: GridAutoGrowMode.Fit,
})
export class EPCompanyTree2 extends PXView  {
	Up: PXActionState;
	Down: PXActionState;

	@columnConfig({visible: false, textAlign: TextAlign.Right, allowShowHide: GridColumnShowHideMode.False})
	WorkGroupID: PXFieldState<PXFieldOptions.Hidden>;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	actionsConfig: {
		exportToExcel: { hidden: true }
	},
})
export class EPCompanyTreeMember extends PXView  {
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand<EP204060>("ViewEmployee")
	EPEmployee__acctCD: PXFieldState;
	EPEmployee__acctName: PXFieldState;
	EPEmployeePosition__positionID: PXFieldState;
	EPEmployee__departmentID: PXFieldState;
	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsOwner: PXFieldState;
	@columnConfig({textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	Active: PXFieldState;
}
