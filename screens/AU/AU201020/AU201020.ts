import { createCollection, createSingle, graphInfo, PXActionState, viewInfo } from "client-controls";
import { WorkflowDefinition, WorkflowRecordBase, RowExtendWorkflow, WorkflowConflict } from "./views";
import { AuPanelViewChangesScreen } from "../common/au-panel-view-changes";

@graphInfo({ graphType: "PX.SM.AUWorkflowDefinitionMaint", primaryView: "AUMaintBaseParamsView" })
export class AU201020 extends AuPanelViewChangesScreen {
	navigateWorkflow: PXActionState;

	Definition = createSingle(WorkflowDefinition);
	Workflows = createCollection(WorkflowRecordBase);
   	@viewInfo({containerName: "Add Workflow"})
	DlgExtendWorkflow = createSingle(RowExtendWorkflow);
   	@viewInfo({containerName: "Upgrade conflicts"})
	Conflicts = createCollection(WorkflowConflict);
}
