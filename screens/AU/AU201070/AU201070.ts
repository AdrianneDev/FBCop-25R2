import { createCollection, createSingle, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, PXViewCollection, CurrentRowChangedHandlerArgs, PXDatetimeFieldState } from "client-controls";
import { RowPageTitle, WorkflowRecordBase, WorkflowRecordBase2, WorkflowRecordBase3 } from "./views";
import { AuPanelViewChangesScreen } from "../common/au-panel-view-changes";

@graphInfo({graphType: "PX.SM.AUWorkflowEventHandlersMaint", primaryView: "AUMaintBaseParamsView", })
export class AU201070 extends AuPanelViewChangesScreen {
	actionEdit: PXActionState;

	ViewPageTitle = createSingle(RowPageTitle);
	ViewHandlers = createCollection(WorkflowRecordBase);
	@viewInfo({containerName: "Event Handler Properties"})
	FilterHandlerEdit = createSingle(WorkflowRecordBase2);
	@viewInfo({containerName: "Event Handler Properties"})
	HandlerFieldsPerHandler = createCollection(WorkflowRecordBase3);

	prevRowId?: string = undefined;
	@handleEvent(CustomEventType.RowSelected, { view: "HandlerFieldsPerHandler" })
	onHandlerFieldsPerHandlerChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<WorkflowRecordBase3>>) {
		const model = args.viewModel;
		if (!model.activeRow) return;

		if (this.prevRowId && this.prevRowId !== model.activeRow.rowId) {
			this.screenService.update();
		}
		this.prevRowId = model.activeRow.rowId;

		model.activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
	}
}
