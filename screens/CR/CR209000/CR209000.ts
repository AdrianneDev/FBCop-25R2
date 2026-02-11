import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
	viewInfo,
	GridAutoGrowMode,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

import { CSAttributeGroup } from "src/screens/CR/common/tabs/tab-attributes/views";

@graphInfo({ graphType: "PX.Objects.CR.CROpportunityClassMaint", primaryView: "OpportunityClass", showActivitiesIndicator: true })
export class CR209000 extends PXScreen {
	@viewInfo({ containerName: "Opportunity Class" })
	OpportunityClass = createSingle(CROpportunityClass);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);

	@viewInfo({ containerName: "Opportunity Class Stages" })
	OpportunityProbabilities = createCollection(CROpportunityProbability);
}

export class CROpportunityClass extends PXView {
	CROpportunityClassID: PXFieldState;
	IsInternal: PXFieldState;
	Description: PXFieldState;
	DefaultOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetContactClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetBAccountClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultEMailAccountID: PXFieldState;
	ShowContactActivities: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class CROpportunityProbability extends PXView {
	IsActive: PXFieldState;
	StageCode: PXFieldState;
	Name: PXFieldState;
	Probability: PXFieldState<PXFieldOptions.CommitChanges>;
	SortOrder: PXFieldState;
}
