import {
	PXScreen,
	createSingle,
	createCollection,
	graphInfo,
	viewInfo,
	PXActionState,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	PXDatetimeFieldState,
	Messages as SysMessages,
} from "client-controls";
import {
	SYInsertFrom,
	SYMapping,
	SYMappingField,
	SYImportCondition,
	SYMappingCondition,
	BPEvent,
	BPEventData
} from "./views";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({graphType: "PX.Api.SYImportMaint", primaryView: "Mappings"})
export class SM206025 extends PXScreenWithSiteMapSupport {
	fillSource: PXActionState;
	fillDestination: PXActionState;
	viewBusinessEvent: PXActionState;
	SysMessages = SysMessages;

	@viewInfo({containerName: "Create Business Event"})
	NewEventData = createSingle(BPEventData);

	@viewInfo({containerName: "Choose scenario to insert steps from"})
	InsertFromFilter = createSingle(SYInsertFrom);

	@viewInfo({containerName: "Scenario Summary"})
	Mappings = createSingle(SYMapping);

	@viewInfo({containerName: "Mapping"})
	FieldMappings = createCollection(SYMappingField);

	@viewInfo({containerName: "Source Restrictions"})
	Conditions = createCollection(SYImportCondition);

	@viewInfo({containerName: "Target Restrictions"})
	MatchingConditions = createCollection(SYMappingCondition);

	@viewInfo({containerName: "Executed By Events"})
	BusinessEvents = createCollection(BPEvent);

	@handleEvent(CustomEventType.RowSelected, {view: "FieldMappings"})
	onSYMappingFieldSelected(args: RowSelectedHandlerArgs<PXViewCollection<SYMappingField>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.rowInsert.enabled = !!row;
		model.rowUp.enabled = !!row;
		model.rowDown.enabled = !!row;
	}

	@handleEvent(CustomEventType.RowSelected, {view: "Conditions"})
	onSYImportConditionRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<SYImportCondition>>) {
		const activeRow = args.viewModel.activeRow;

		if (activeRow) {
			activeRow.Value?.to(PXDatetimeFieldState).showRelativeDates();
			activeRow.Value2?.to(PXDatetimeFieldState).showRelativeDates();
		}
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
