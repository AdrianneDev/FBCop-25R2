import { createCollection, createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType } from "client-controls";
import { OwnedFilter, PMTimeActivity } from "./views";

@graphInfo({graphType: "PX.Objects.EP.EmployeeActivitiesEntry", primaryView: "Filter" })
export class EP307000 extends PXScreen {
	Filter = createSingle(OwnedFilter);
	Activity = createCollection(PMTimeActivity);

	// Load the PDF when a grid row is selected
	@handleEvent(CustomEventType.RowSelected, { view: "Activity" })
	onActivityRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<PMTimeActivity>>) {
		const model = args.viewModel;
		if (model.View) {
			model.View.enabled = !!args.viewModel.activeRow?.id;
		}
	}
}
