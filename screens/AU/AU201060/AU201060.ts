import { createCollection, createSingle, CurrentRowChangedHandlerArgs, CustomEventType, graphInfo, handleEvent, PXActionState, PXDatetimeFieldState, PXViewCollection, viewInfo } from "client-controls";
import { RowPageTitle, WorkflowRecordBase, WorkflowPropertyCombo, RowNewWorkflowFilter, RowNewWorkflowField } from "./views";
import { AuPanelViewChangesScreen } from "../common/au-panel-view-changes";

@graphInfo({graphType: "PX.SM.AUWorkflowFieldsMaint", primaryView: "AUMaintBaseParamsView", })
export class AU201060 extends AuPanelViewChangesScreen {
	AddFields: PXActionState;
	AddFieldsAndClose: PXActionState;
	CloseAddPanel: PXActionState;

	ViewPageTitle = createSingle(RowPageTitle);
	ViewFields = createCollection(WorkflowRecordBase);
	@viewInfo({containerName: "Combo Box Values"})
	Combos = createCollection(WorkflowPropertyCombo);
	@viewInfo({containerName: "Add Field"})
	FilterNewField = createSingle(RowNewWorkflowFilter);
	@viewInfo({containerName: "Add Field"})
	NewFields = createCollection(RowNewWorkflowField);

	@handleEvent(CustomEventType.RowSelected, { view: "ViewFields" })
	onStateActionParamsPerActionSelected(args: CurrentRowChangedHandlerArgs<PXViewCollection<WorkflowRecordBase>>) {
		const ar = args.viewModel.activeRow;
		if (ar) {
			ar.DefaultValue?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}
