import {
	createSingle,
	createCollection,
	graphInfo,
	viewInfo,
	PXActionState,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	PXDatetimeFieldState} from "client-controls";
import { SYInsertFrom, SYMapping, SYMappingField, SYMappingCondition } from "./views";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({graphType: "PX.Api.SYExportMaint", primaryView: "Mappings"})
export class SM207025 extends PXScreenWithSiteMapSupport {
	fillSource: PXActionState;
	fillDestination: PXActionState;

	@viewInfo({containerName: "Choose scenario to insert steps from"})
	InsertFromFilter = createSingle(SYInsertFrom);

	@viewInfo({containerName: "Scenario Summary"})
	Mappings = createSingle(SYMapping);
	@viewInfo({containerName: "Mapping"})
	FieldMappings = createCollection(SYMappingField);
	@viewInfo({containerName: "Source Restrictions"})
	MatchingConditions = createCollection(SYMappingCondition);

	@handleEvent(CustomEventType.RowSelected, {view: "FieldMappings"})
	onSYMappingFieldSelected(args: RowSelectedHandlerArgs<PXViewCollection<SYMappingField>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.rowInsert.enabled = row != null;
	}

	@handleEvent(CustomEventType.RowSelected, {view: "MatchingConditions"})
	onSYMappingConditionRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<SYMappingCondition>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
			activeRow.Value2?.to(PXDatetimeFieldState).showRelativeDates();
		}
	}
}
