import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	TextAlign,
	GridColumnType,
	gridConfig,
	GridPreset,
	treeConfig,
} from "client-controls";
import { Messages } from "src/screens/common/messages";

@graphInfo({ graphType: "PX.TM.CompanyTreeMaint", primaryView: "SelectedFolders" })
export class EP204061 extends PXScreen {
	ViewEmployee: PXActionState;


	SelectedFolders = createSingle(SelectedNode);
	@viewInfo({ containerName: "Company Tree" })
	Folders = createCollection(EPCompanyTree);
	@viewInfo({ containerName: "Workgroup Details" })
	CurrentWorkGroup = createSingle(EPCompanyTree2);
	@viewInfo({ containerName: "Members" })
	Members = createCollection(EPCompanyTreeMember);
	@viewInfo({ containerName: "Move Workgroup" })
	SelectedParentFolders = createSingle(SelectedParentNode);
	@viewInfo({ containerName: "Move Workgroup" })
	ParentFolders = createSingle(EPCompanyTree3);
}

export class SelectedNode extends PXView {
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "WorkGroupID",
	textField: "Description",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	keepPosition: true,
	hideToolbarSearch: true,
	openedLayers: 1,
	topBarItems: {
		AddWorkGroup: { config: { commandName: "AddWorkGroup", text: Messages.Add, images: { normal: "main@AddNew" } } },
		Up: { config: { commandName: "Up", text: Messages.Up, images: { normal: "main@ArrowUp" } } },
		Down: { config: { commandName: "Down", text: Messages.Down, images: { normal: "main@ArrowDown" } } },
		DeleteWorkGroup: { config: { commandName: "DeleteWorkGroup", text: Messages.Delete, images: { normal: "main@RecordDel" } } },
		MoveWorkGroup: { config: { commandName: "MoveWorkGroup", text: Messages.Move } },
	}
})
export class EPCompanyTree extends PXView {
	Up: PXActionState;
	Down: PXActionState;
	MoveWorkGroup: PXActionState;
	AddWorkGroup: PXActionState;
	DeleteWorkGroup: PXActionState;

	WorkGroupID: PXFieldState;
	Description: PXFieldState;
}

export class EPCompanyTree2 extends PXView {
	WorkGroupID: PXFieldState;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	allowUpdate: true,
	actionsConfig: {
		exportToExcel: { hidden: true }
	},
})
export class EPCompanyTreeMember extends PXView {
	@columnConfig({ hideViewLink: true, width: 250 })
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand<EP204061>("ViewEmployee")
	EPEmployee__AcctCD: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EPEmployee__AcctName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	EPEmployeePosition__PositionID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EPEmployee__DepartmentID: PXFieldState;
	MembershipType: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Active: PXFieldState;
}

export class SelectedParentNode extends PXView {
	WorkGroupID: PXFieldState;
}

export class EPCompanyTree3 extends PXView {
	WorkGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
}
