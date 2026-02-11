import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnType,
	PXActionState,
	TextAlign,
	graphInfo,
	PXScreen,
	viewInfo,
	createSingle,
	fieldConfig,
	createCollection,
	PXPageLoadBehavior,
	treeConfig,
	GridPreset,
	GridColumnDisplayMode,
	handleEvent,
	PXViewCollection,
	CustomEventType,
	RowSelectedHandlerArgs,
	GridPagerMode,
	controlConfig,
	ISelectorControlConfig,
	ITreeSelectorConfig,
} from "client-controls";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({ graphType: "PX.Objects.EP.EPAssignmentMapMaint", primaryView: "AssigmentMap", pageLoadBehavior: PXPageLoadBehavior.InsertRecord })
export class EP205010 extends PXScreen {
	Up: PXActionState;
	Down: PXActionState;
	DeleteRoute: PXActionState;

	@viewInfo({ containerName: "Assignment Rules Summary" })
	AssigmentMap = createSingle(EPAssignmentMap);
	@viewInfo({ containerName: "Rules" })
	NodesTree = createCollection(EPRule);
	@viewInfo({ containerName: "Conditions" })
	CurrentNode = createSingle(EPRule2);
	@viewInfo({ containerName: "Conditions" })
	Rules = createCollection(EPRuleCondition);

	@handleEvent(CustomEventType.RowSelected, { view: "NodesTree" })
	onEPRuleSelected(args: RowSelectedHandlerArgs<PXViewCollection<EPRule>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.Up) {
			model.Up.enabled = !!ar;
		}

		if (model?.Down) {
			model.Down.enabled = !!ar;
		}

		if (model?.DeleteRoute) {
			model.DeleteRoute.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Rules" })
	onEPRuleConditionSelected(args: RowSelectedHandlerArgs<PXViewCollection<EPRuleCondition>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.ConditionInsert) {
			model.ConditionInsert.enabled = !!ar;
		}

		if (model?.ConditionUp) {
			model.ConditionUp.enabled = !!ar;
		}

		if (model?.ConditionDown) {
			model.ConditionDown.enabled = !!ar;
		}
	}
}

export class EPAssignmentMap extends PXView {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New })
	AssignmentMapID: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	GraphType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "RuleID",
	textField: "ExtName",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	keepPosition: true,
	hideToolbarSearch: true,
})
export class EPRule extends PXView {
	AddRule: PXActionState;
	Up: PXActionState;
	Down: PXActionState;
	DeleteRoute: PXActionState;

	RuleID: PXFieldState;
	ExtName: PXFieldState;
}

export class EPRule2 extends PXView {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	RuleType: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
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
		allowEditValue: true
	})
	OwnerSource: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
		treeConfig: {
			idField: "WorkgroupID",
			valueField: "Description",
			dataMember: "_EPCompanyTree_Tree_",
			textField: "Description",
			iconField: "Icon",
			mode: "single",
			hideRootNode: true
		}
	})
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	keepPosition: true,
	keepPositionFields: ["UiNoteID"],
	pagerMode: GridPagerMode.InfiniteScroll,
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
})
export class EPRuleCondition extends PXView {
	ConditionInsert: PXActionState;
	ConditionUp: PXActionState;
	ConditionDown: PXActionState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsActive: PXFieldState;
	@columnConfig({ allowSort: false, allowNull: false })
	OpenBrackets: PXFieldState;
	@columnConfig({ allowSort: false, fullState: true, editorType: "qp-drop-down" })
	Entity: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, editorType: "qp-drop-down" })
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, allowNull: false })
	Condition: PXFieldState;
	@columnConfig({ allowSort: false, fullState: true })
	Value: PXFieldState;
	@columnConfig({ allowSort: false, fullState: true })
	Value2: PXFieldState;
	@columnConfig({ allowSort: false, allowNull: false })
	CloseBrackets: PXFieldState;
	@columnConfig({ allowSort: false, allowNull: false })
	Operator: PXFieldState;
	UiNoteID: PXFieldState;
}
