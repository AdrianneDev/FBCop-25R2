import { createCollection, createSingle, PXScreen, graphInfo,
	PXActionState, viewInfo, PXPageLoadBehavior, PXView,
	PXFieldState, PXFieldOptions, gridConfig, columnConfig,
	TextAlign, GridColumnType, treeConfig, GridPreset,
	handleEvent, PXViewCollection, CustomEventType,
	RowSelectedHandlerArgs, ControlParameter,
	controlConfig, ISelectorControlConfig} from "client-controls";
import { Messages, NullTextValues } from "src/screens/common/messages";

@graphInfo({graphType: "PX.Objects.EP.EPAssignmentMaint", primaryView: "AssigmentMap", pageLoadBehavior: PXPageLoadBehavior.InsertRecord, showActivitiesIndicator: true})
export class EP205000 extends PXScreen {
	@viewInfo({ containerName: "Assignment Rules Summary" })
	AssigmentMap = createSingle(EPAssignmentMap);

	@viewInfo({ containerName: "Tree"})
	Nodes = createCollection(EPAssignmentRoute);

	@viewInfo({ containerName: "Conditions" })
	Rules = createCollection(EPAssignmentRule);

	@viewInfo({ containerName: "Rules", parameters: [ new ControlParameter("parent", "Nodes", "AssignmentRouteID") ]})
	Items = createCollection(EPAssignmentRoute2);

	@viewInfo({ containerName: "Rules", parameters: [ new ControlParameter("parent", "Items", "AssignmentRouteID") ]})
	CurrentItem = createSingle(EPAssignmentRoute3);

	@handleEvent(CustomEventType.RowSelected, { view: "Items" })
	onEPAssignmentRoute2Selected(args: RowSelectedHandlerArgs<PXViewCollection<EPAssignmentRoute2>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.Up) {
			model.Up.enabled = !!ar;
		}

		if (model?.Down) {
			model.Down.enabled = !!ar;
		}
	}
}

export class EPAssignmentMap extends PXView  {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New })
	AssignmentMapID: PXFieldState;
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	GraphType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "AssignmentRouteID",
	textField: "Name",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	autoRepaint: ["Rules"],
	hideToolbarSearch: true,
	openedLayers: 2,
})
export class EPAssignmentRoute extends PXView  {
	AssignmentRouteID: PXFieldState;
	Name: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	keepPosition: true,
	syncPosition: true,
	autoRepaint: ["Nodes", "Rules"],
	autoInsert: true,
	topBarItems: {
		Up: {index: 0, config: {commandName: "Up", text: Messages.Up, images: { normal: "main@ArrowUp"}}},
		Down: {index: 1, config: {commandName: "Down", text: Messages.Down, images: { normal: "main@ArrowDown"}}},
	},
	actionsConfig: {
		exportToExcel: { hidden: true }
	},
})
export class EPAssignmentRoute2 extends PXView  {
	Up: PXActionState;
	Down: PXActionState;
	@columnConfig({textAlign: TextAlign.Right})
	Sequence: PXFieldState;
	RouterType: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({textAlign: TextAlign.Left, textField: "RouteID_EPAssignmentRoute_Name"})
	RouteID: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Left,
		editorType: "qp-tree-selector",
		hideViewLink: true,
		editorConfig: {
			treeConfig: {
				idField: "WorkgroupID",
				dataMember: "_EPCompanyTree_Tree_",
				textField: "Description",
				valueField: "Description",
				iconField: "Icon",
				mode: "single",
				hideRootNode: true
			},
		}
	})
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	AssignmentRouteID: PXFieldState<PXFieldOptions.Hidden>;
	WaitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	EPEmployee__acctName: PXFieldState<PXFieldOptions.Hidden>;
	EPEmployee__departmentID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({
		hideViewLink: true,
		editorType: "qp-tree-selector",
		editorConfig: {
			treeConfig: {
				idField: "Key",
				dataMember: "EntityItems",
				textField: "Name",
				valueField: "Path",
				parentIdField: "Key",
				iconField: "Icon",
				mode: "single",
				hideRootNode: true
			},
			allowEditValue: true,
			appendSelectedValue: true,
		},
	})
	OwnerSource: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})	UseWorkgroupByOwner: PXFieldState;
}

export class EPAssignmentRoute3 extends PXView  {
	RuleType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	actionsConfig: {
		exportToExcel: { hidden: true }
	},
	parameters: (screen: EP205000) => ({
		"routeID": screen.Items.activeRow?.AssignmentRouteID.value?.id
	}),
})
export class EPAssignmentRule extends PXView  {
	@columnConfig({ editorType: "qp-drop-down" })
	Entity: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorType: "qp-drop-down" })
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	Condition: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldValue: PXFieldState;
}
