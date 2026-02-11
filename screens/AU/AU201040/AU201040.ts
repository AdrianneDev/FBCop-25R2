import { PXDatetimeFieldState, RowSelectedHandlerArgs, PXViewCollection, createCollection, createSingle, graphInfo, viewInfo, PXPageLoadBehavior, handleEvent, CustomEventType, ScreenUpdateParams } from "client-controls";
import { RowPageTitle, WorkflowRecordBase, WorkflowRecordFields, DialogBoxElementFields, RowWorkflowFormNew, RowWorkflowFormFieldEdit, WorkflowPropertyCombo } from "./views";
import { AuPanelViewChangesScreen } from "../common/au-panel-view-changes";

@graphInfo({graphType: "PX.SM.AUWorkflowFormsMaint", primaryView: "AUMaintBaseParamsView", pageLoadBehavior: PXPageLoadBehavior.SearchSavedKeys})
export class AU201040 extends AuPanelViewChangesScreen {
	ViewPageTitle = createSingle(RowPageTitle);
	@viewInfo({containerName: "Dialog Boxes"})
	ViewForms = createCollection(WorkflowRecordBase);
	ViewForm = createSingle(WorkflowRecordFields);
	@viewInfo({containerName: "Dialog Box Fields"})
	ViewFieldsPerForm = createCollection(DialogBoxElementFields);
	@viewInfo({containerName: "New Dialog Box"})
	FilterNewForm = createSingle(RowWorkflowFormNew);
	@viewInfo({containerName: "Combo Box Values"})
	ComboBoxSourceMode = createSingle(RowWorkflowFormFieldEdit);
	@viewInfo({containerName: "Combo Box Values"})
	Combos = createCollection(WorkflowPropertyCombo);

	prevRowId?: string = undefined;

	@handleEvent(CustomEventType.RowSelected, { view: "ViewFieldsPerForm" })
	onDialogBoxElementFieldsSelected(args: RowSelectedHandlerArgs<PXViewCollection<DialogBoxElementFields>>) {
		const model = args.viewModel;
		if (!model.activeRow) return;

		model.activeRow.DefaultValue?.to(PXDatetimeFieldState).showRelativeDates();

		if (this.prevRowId && this.prevRowId !== model.activeRow.rowId) {
			this.screenService.update(undefined, new ScreenUpdateParams({ views: ["ViewForm"] }));
		}
		this.prevRowId = model.activeRow.rowId;
	}
}

