import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	PXActionState,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
} from "client-controls";
import {
	SYMappingSimpleProperty,
	SYMapping,
	SYData,
	SYMappingField,
	SYHistory,
	SYMappingDetails,
	SYImportOperation,
	SYReplace,
	SYSubstitutionInfo,
} from "./views";

@graphInfo({graphType: "PX.Api.SYImportProcessSingle", primaryView: "MappingsSingle", identifyingField: "Name"})
export class SM206036 extends PXScreen {
	replaceOneValue: PXActionState;
	replaceAllValues: PXActionState;
	saveSubstitutions: PXActionState;
	closeSubstitutions: PXActionState;

	@viewInfo({containerName: "Provide New Scenario Properties"})
	NewScenarioProperties = createSingle(SYMappingSimpleProperty);
	@viewInfo({containerName: "Selection"})
	MappingsSingle = createSingle(SYMapping);
	@viewInfo({containerName: "Prepared Data"})
	PreparedData = createCollection(SYData);

	@viewInfo({containerName: "Mapping"})
	MappingsSimple = createCollection(SYMappingField);

	@viewInfo({containerName: "History"})
	History = createCollection(SYHistory);

	@viewInfo({containerName: "Details"})
	MappingsSingleDetails = createSingle(SYMappingDetails);
	@viewInfo({containerName: "Details"})
	Operation = createSingle(SYImportOperation);
	@viewInfo({containerName: "Replace"})
	ReplacementProperties = createSingle(SYReplace);
	@viewInfo({containerName: "Add Substitution"})
	SubstitutionInfo = createCollection(SYSubstitutionInfo);

	@handleEvent(CustomEventType.RowSelected, { view: "PreparedData" })
	onSyDataRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<SYData>>) {
		const model = args.viewModel;
		const row = args.viewModel?.activeRow;

		model.addSubstitution.enabled = !!row?.CanAddSubstitutions?.value;
		model.replace.enabled = !!row;
		model.switchActivation.enabled = !!row;
		model.switchActivationUntilError.enabled = !!row;
		model.switchProcessing.enabled = !!row;
	}
}
