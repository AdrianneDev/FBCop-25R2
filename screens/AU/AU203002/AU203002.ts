import { createCollection, createSingle, CurrentRowChangedHandlerArgs, CustomEventType, graphInfo, handleEvent, PXViewCollection, ServerCommand, viewInfo } from "client-controls";
import { RowPageTitle, RowFilter, RowDacField, RowFieldAttributes, RowAddField, WZAddField, RowSelectorColumn, RowAddSelectorColumn, RowFieldAttr, RowFieldProp } from "./views";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.SM.GraphTableEdit", primaryView: "Filter", })
export class AU203002 extends AuBaseScreen {

	ViewPageTitle = createSingle(RowPageTitle);
	Filter = createSingle(RowFilter);
	ViewFields = createCollection(RowDacField);
	ViewAttributes = createSingle(RowFieldAttributes);
   	@viewInfo({containerName: "Create New Field"})
	NewFieldWizard = createSingle(RowAddField);
   	@viewInfo({containerName: "Change Existing Field"})
	FieldWizard = createSingle(WZAddField);
   	@viewInfo({containerName: "Customize Selector Columns"})
	ViewSelectorCols = createCollection(RowSelectorColumn);
   	@viewInfo({containerName: "Add Columns to Selector"})
	ViewAddSelectorCols = createCollection(RowAddSelectorColumn);
   	@viewInfo({containerName: "Customize Attributes"})
	ViewListAttributes = createCollection(RowFieldAttr);
   	@viewInfo({containerName: "Customize Attributes"})
	ViewListProps = createCollection(RowFieldProp);

	private viewFieldsActiveRowId?: string;

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "ViewFields" })
	onRowDacFieldChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<RowDacField>>) {
		if (args.viewModel.activeRow?.id !== this.viewFieldsActiveRowId) {
			this.viewFieldsActiveRowId = args.viewModel.activeRow?.id;
			this.screenService.executeCommand(new ServerCommand("actionSelectField"));
		}
	}
}
