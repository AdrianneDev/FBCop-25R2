import { observable } from "aurelia-binding";
import {
	createCollection, createSingle, graphInfo, PXActionState, viewInfo, QpTabbarCustomElement, ACTIVE_TAB_CHANGED_EVENT_NAME,
	CustomEventType, CurrentRowChangedHandlerArgs, PXViewCollection, handleEvent,
	TabChangedEvent, PXDatetimeFieldState
} from "client-controls";
import { RowPageTitle, RowWorkflowAction, RowWorkflowActionEdit, RowWorkflowActionNavigationParam, WorkflowActionField, WorkflowActionParam, WorkflowActionSequenceNext, WorkflowActionSequencePrevious, RowActionsFolder, RowActionOrder, RowWorkflowCategoryOrder, AddRowWorkflowCategory, WorkflowActionSequenceFormFieldValue, SelectedActionSequence } from "./views";
import { AuPanelViewChangesScreen } from "../common/au-panel-view-changes";

@graphInfo({graphType: "PX.SM.AUWorkflowActionsMaint", primaryView: "AUMaintBaseParamsView", })
export class AU201050 extends AuPanelViewChangesScreen {
	actionEdit: PXActionState;
	editActionSequenceFormFieldValues: PXActionState;

	ViewPageTitle = createSingle(RowPageTitle);
	ViewActionsWithoutCategories = createCollection(RowWorkflowAction);
	@viewInfo({containerName: "Action Properties"})
	FilterActionEdit = createSingle(RowWorkflowActionEdit);
	@viewInfo({containerName: "Action Properties", syncAlways: true})
	SelectedActionSequence = createSingle(SelectedActionSequence);
	@viewInfo({containerName: "Action Properties"})
	ViewActionParamsFiltered = createCollection(RowWorkflowActionNavigationParam);
	@viewInfo({containerName: "Action Properties"})
	StateActionFieldsPerAction = createCollection(WorkflowActionField);
	@viewInfo({containerName: "Action Properties"})
	StateActionParamsPerAction = createCollection(WorkflowActionParam);
	@viewInfo({containerName: "Action Properties"})
	NextActionsPerAction = createCollection(WorkflowActionSequenceNext);
	@viewInfo({containerName: "Action Properties"})
	PrevActionsPerAction = createCollection(WorkflowActionSequencePrevious);
	@viewInfo({containerName: "Reorder Actions"})
	FilterActionsFolder = createSingle(RowActionsFolder);
	@viewInfo({containerName: "Reorder Actions"})
	ViewActionsOrder = createCollection(RowActionOrder);
	@viewInfo({containerName: "Manage Categories"})
	ManageCategories = createCollection(RowWorkflowCategoryOrder);
	@viewInfo({containerName: "New Category"})
	AddCategoryRecord = createSingle(AddRowWorkflowCategory);
	@viewInfo({containerName: "Dialog Box Values"})
	FormFieldValuesPerActionSequence = createCollection(WorkflowActionSequenceFormFieldValue);

	@observable
	tabbarVM: QpTabbarCustomElement;

	StateActionFieldsPerActionPrevRowId?: string = undefined;
	NextActionsPerActionPrevRowId?: string = undefined;

	@handleEvent(CustomEventType.RowSelected, { view: "StateActionFieldsPerAction" })
	onStateActionFieldsPerActionChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<WorkflowActionField>>) {
		const model = args.viewModel;
		if (!model.activeRow) return;

		if (this.StateActionFieldsPerActionPrevRowId && this.StateActionFieldsPerActionPrevRowId !== model.activeRow.rowId) {
			this.screenService.update();
		}
		this.StateActionFieldsPerActionPrevRowId = model.activeRow.rowId;

		model.activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
	}

	@handleEvent(CustomEventType.RowSelected, { view: "NextActionsPerAction" })
	onNextActionsPerActionPrevChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<WorkflowActionSequenceNext>>) {
		const model = args.viewModel;
		if (!model.activeRow) return;

		if (this.NextActionsPerActionPrevRowId && this.NextActionsPerActionPrevRowId !== model.activeRow.rowId) {
			this.screenService.update();
		}
		this.NextActionsPerActionPrevRowId = model.activeRow.rowId;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "ViewActionParamsFiltered" })
	onStatePropertiesPerStateSelected(args: CurrentRowChangedHandlerArgs<PXViewCollection<RowWorkflowActionNavigationParam>>) {
		const ar = args.viewModel.activeRow;
		if (ar) {
			ar.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "StateActionParamsPerAction" })
	onStateActionParamsPerActionSelected(args: CurrentRowChangedHandlerArgs<PXViewCollection<WorkflowActionParam>>) {
		const ar = args.viewModel.activeRow;
		if (ar) {
			ar.Value?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}

	tabbarVMChanged() {
		if (this.tabbarVM) {
			document.body.addEventListener(ACTIVE_TAB_CHANGED_EVENT_NAME, (e: CustomEvent<TabChangedEvent>) =>
				this.activeTabIdChanged(e.detail.tabId));
		}
	}

	activeTabIdChanged(newId: string) {
		if (!this.SelectedActionSequence.SelectedTabIndex) return;
		switch (newId) {
			case "NextActionsPerAction_tab": {
				this.SelectedActionSequence.SelectedTabIndex.value = 3;
				break;
			}
			case "PrevActionsPerAction_tab": {
				this.SelectedActionSequence.SelectedTabIndex.value = 4;
				break;
			}
			default: {
				this.SelectedActionSequence.SelectedTabIndex.value = null;
				break;
			}
		}
	}
}
