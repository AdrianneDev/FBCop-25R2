import {
	createCollection, createSingle, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs,
	PXViewCollection, PXPageLoadBehavior, ControlParameter, customDataHandler, PXDatetimeFieldState,
} from "client-controls";
import {
	RowPageTitle, WorkflowStateNode, WorkflowStateProperties, WorkflowStateProperty, WorkflowOnEnterStateField, WorkflowOnLeaveStateField, WorkflowStateAction, WorkflowStateEventHandler,
	WorkflowTransition, WorkflowTransitionField, AddPredefinedWorkflowState, AddWorkflowState, ChangeWorkflowStateParent, AddWorkflowTransition, WorkflowPropertyCombo, AddWorkflowAction, AddWorkflowEventHandler,
	WorkflowState, Workflow
} from "./views";
import { AuPanelViewChangesScreen } from "../common/au-panel-view-changes";

@graphInfo({ graphType: "PX.SM.AUWorkflowMaintNewUI", primaryView: "CurrentStateProperties", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AU201030 extends AuPanelViewChangesScreen {
	createAction: PXActionState;

	ViewPageTitle = createSingle(RowPageTitle);
	@viewInfo({containerName: "States and Transitions"})
	Items = createCollection(WorkflowStateNode);
	@viewInfo({ containerName: "State Properties"})
	CurrentStateProperties = createSingle(WorkflowStateProperties);
	@viewInfo({containerName: "Fields"})
	StatePropertiesPerState = createCollection(WorkflowStateProperty);
	@viewInfo({containerName: "Fields to Update on Entry"})
	OnEnterStateFieldsPerState = createCollection(WorkflowOnEnterStateField);
	@viewInfo({containerName: "Fields to Update on Exit"})
	OnLeaveStateFieldsPerState = createCollection(WorkflowOnLeaveStateField);
	@viewInfo({containerName: "Actions"})
	StateActionsPerState = createCollection(WorkflowStateAction);
	@viewInfo({containerName: "Handlers"})
	StateEventHandlersPerState = createCollection(WorkflowStateEventHandler);
	@viewInfo({containerName: "Transition Properties"})
	CurrentTransition = createSingle(WorkflowTransition);
	@viewInfo({containerName: "Fields to Update After Transition"})
	TransitionFieldsPerTransition = createCollection(WorkflowTransitionField);
	@viewInfo({containerName: "Add Predefined State"})
	AddPredefinedWorkflowState = createSingle(AddPredefinedWorkflowState);
	@viewInfo({containerName: "Add State"})
	AddWorkflowState = createSingle(AddWorkflowState);
	@viewInfo({containerName: "Change Parent State"})
	ChangeWorkflowStateParent = createSingle(ChangeWorkflowStateParent);
	@viewInfo({containerName: "Add Transition"})
	AddWorkflowTransition = createSingle(AddWorkflowTransition);
	@viewInfo({containerName: "Combo Box Values"})
	Combos = createCollection(WorkflowPropertyCombo);
	@viewInfo({containerName: "New Action"})
	AddWorkflowAction = createSingle(AddWorkflowAction);
	@viewInfo({containerName: "New Event Handler"})
	AddWorkflowEventHandler = createSingle(AddWorkflowEventHandler);
	@viewInfo({containerName: "State"})
	CurrentState = createSingle(WorkflowState);

	Workflow = createSingle(Workflow);
	CurrentTreeNode = createSingle(WorkflowStateNode);

	CurrentWorkflowIsReadonly: boolean;

	@customDataHandler()
	AU201030Handler(result: { CurrentWorkflowIsReadonly: boolean }) {
		this.CurrentWorkflowIsReadonly = result.CurrentWorkflowIsReadonly;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "TransitionFieldsPerTransition" })
	onTransitionFieldsPerTransitionSelected(args: RowSelectedHandlerArgs<PXViewCollection<WorkflowTransitionField>>) {
		const ar = args.viewModel.activeRow;
		if (!ar) return;

		ar.Value?.to(PXDatetimeFieldState).showRelativeDates();

		// check if workflow is readonly
		if (this.CurrentWorkflowIsReadonly) return;
		const arIndex = args.viewModel.records.findIndex(r => r === ar);
		args.viewModel.fieldMoveUp.enabled = (arIndex > 0);
		args.viewModel.fieldMoveDown.enabled = (arIndex < args.viewModel.records.length - 1);
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Items" })
	onItemsFieldsSelected(args: RowSelectedHandlerArgs<PXViewCollection<WorkflowStateNode>>) {
		const ar = args.viewModel.activeRow;
		if (!ar) return;
		if (this.CurrentWorkflowIsReadonly) return;
		const arIndex = args.viewModel.records.findIndex(r => r === ar);
		args.viewModel.moveUp.enabled = (arIndex > 0);
		args.viewModel.moveDown.enabled = (arIndex < args.viewModel.records.length - 1);
	}

	@handleEvent(CustomEventType.RowSelected, { view: "StatePropertiesPerState" })
	onStatePropertiesPerStateSelected(args: RowSelectedHandlerArgs<PXViewCollection<WorkflowStateProperty>>) {
		const ar = args.viewModel.activeRow;
		if (ar) {
			ar.DefaultValue?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "OnEnterStateFieldsPerState" })
	onOnEnterStateFieldsPerStateSelected(args: RowSelectedHandlerArgs<PXViewCollection<WorkflowOnEnterStateField>>) {
		const ar = args.viewModel.activeRow;
		if (ar) {
			ar.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "OnLeaveStateFieldsPerState" })
	onOnLeaveStateFieldsPerStateSelected(args: RowSelectedHandlerArgs<PXViewCollection<WorkflowOnLeaveStateField>>) {
		const ar = args.viewModel.activeRow;
		if (ar) {
			ar.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}
