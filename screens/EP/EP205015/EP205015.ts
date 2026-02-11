import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	PXPageLoadBehavior,
	treeConfig,
	PXFieldState,
	PXFieldOptions,
	PXView,
	gridConfig,
	TextAlign,
	GridColumnType,
	columnConfig,
	localizable,
	GridColumnDisplayMode,
	GridPreset,
	handleEvent,
	PXViewCollection,
	CustomEventType,
	RowSelectedHandlerArgs,
	fieldConfig,
	controlConfig,
	IMaskEditorControlConfig,
	ITreeSelectorConfig,
	ISelectorControlConfig,
} from "client-controls";
import { Messages, NullTextValues } from "src/screens/common/messages";

@localizable
class MessagesLocal {
	static AddStep = "Add Step";
	static AddRule = "Add Rule";
}

@graphInfo({
	graphType: "PX.Objects.EP.EPApprovalMapMaint",
	primaryView: "AssigmentMap",
	pageLoadBehavior: PXPageLoadBehavior.InsertRecord,
})
export class EP205015 extends PXScreen {

	@viewInfo({ containerName: "Assignment Rules Summary" })
	AssigmentMap = createSingle(EPAssignmentMap);

	@viewInfo({ containerName: "Steps" })
	NodesTree = createCollection(EPRule);

	CurrentNode = createSingle(EPRule2);

	@viewInfo({ containerName: "Conditions" })
	Rules = createCollection(EPRuleCondition);

	@viewInfo({ containerName: "Rule Actions" })
	EmployeeCondition = createCollection(EPRuleEmployeeCondition);

	RuleApprovers = createCollection(EPRuleApprover);

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
	syncPosition: true,
	hideToolbarSearch: true,
	openedLayers: 2,
	keepPosition: true,
	selectFirstNode: true,
	topBarItems: {
		/* TODO: to implement later in a calm pace
		Add: {
			type: "menu-options",
			config: {
				text: Messages.Add,
				images: {normal: "main@RecordAdd"},
				options: {
					AddStep: {
						text: MessagesLocal.AddStep,
						commandName: "AddStep"
					},
					AddRule: {
						text: MessagesLocal.AddRule,
						commandName: "AddRule"
					}
				},
				toolTip: "Add Step/Rule"
			}
		},
		*/
		AddStep: { config: { commandName: "AddStep", text: MessagesLocal.AddStep } },
		AddRule: { config: { commandName: "AddRule", text: MessagesLocal.AddRule, images: { normal: "main@RecordAdd" } } },
		Up: { config: { commandName: "Up", text: Messages.Up, images: { normal: "main@ArrowUp" } } },
		Down: { config: { commandName: "Down", text: Messages.Down, images: { normal: "main@ArrowDown" } } },
		DeleteRoute: { config: { commandName: "DeleteRoute", text: Messages.Delete, images: { normal: "main@RecordDel" } } }
	}
})
export class EPRule extends PXView {
	AddStep: PXActionState;
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
	EmptyStepType: PXFieldState<PXFieldOptions.CommitChanges>;
	ExecuteStep: PXFieldState<PXFieldOptions.CommitChanges>;
	RuleType: PXFieldState<PXFieldOptions.CommitChanges>;
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
		allowEditValue: true,
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
		},
	})
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowReassignment: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IMaskEditorControlConfig>({ emptyChar: "0" })
	WaitTime: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproveType: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonForApprove: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonForReject: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	adjustPageSize: true,
	keepPosition: true,
	keepPositionFields: ["UiNoteID"],
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
})
export class EPRuleCondition extends PXView {
	ConditionInsert: PXActionState;
	ConditionUp: PXActionState;
	ConditionDown: PXActionState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, allowNull: false })
	OpenBrackets: PXFieldState;
	@columnConfig({ allowSort: false, editorType: "qp-drop-down" })
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

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	fastFilterByAllFields: false,
	keepPosition: true,
	keepPositionFields: ["UiNoteID"]
})
export class EPRuleEmployeeCondition extends PXView {
	@columnConfig({ allowNull: false })
	OpenBrackets: PXFieldState;
	Entity: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorType: "qp-drop-down" })
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowNull: false })
	Condition: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsField: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ fullState: true })
	Value: PXFieldState;
	@columnConfig({ fullState: true })
	Value2: PXFieldState;
	@columnConfig({ allowNull: false })
	CloseBrackets: PXFieldState;
	@columnConfig({ allowNull: false })
	Operator: PXFieldState;
	UiNoteID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
})
export class EPRuleApprover extends PXView {
	@columnConfig({ width: 250 })
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CREmployee__AcctCD: PXFieldState;
	Contact__Salutation: PXFieldState;
	CREmployee__DepartmentID: PXFieldState;
}
