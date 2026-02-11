import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	PXDatetimeFieldState,
	QpGridCustomElement
} from "client-controls";
import { bindable } from "aurelia-framework";
import { RowPageTitle, AUScreenConditionState, AUScreenConditionState2, AUScreenConditionLineState } from "./views";
import { AuWorkflowBaseScreen } from "../common/au-workflow-maint-base";

@graphInfo({graphType: "PX.SM.AUScreenConditionMaint", primaryView: "AUMaintBaseParamsView", })
export class AU201010 extends AuWorkflowBaseScreen {
	actionEditCondition: PXActionState;
	ViewPageTitle = createSingle(RowPageTitle);

	@bindable ConditionsGridViewModel: QpGridCustomElement;

	@viewInfo({containerName: "Condition Properties"})
	SelectedCondition = createSingle(AUScreenConditionState2);
	@viewInfo({containerName: "Condition Properties"})
	Filters = createCollection(AUScreenConditionLineState);

	Conditions = createCollection(AUScreenConditionState);

	@handleEvent(CustomEventType.RowSelected, {view: "Conditions"})
	onAUScreenConditionStateRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<AUScreenConditionState>>) {
		const activeRow = args.viewModel.activeRow;

		if (!activeRow) {
			return;
		}

		const config = (this.ConditionsGridViewModel as any).screenService.getDataComponent(this.ConditionsGridViewModel.config.mergeToolbarWith).toolbar;

		config.items.delete.config.disabled = activeRow.CalcStatus.value === 'System Readonly';
		config.styleChanged = true;
	}

	@handleEvent(CustomEventType.RowSelected, {view: "Filters"})
	onAUScreenConditionLineStateRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<AUScreenConditionLineState>>) {

		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
			activeRow.Value2?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}
