import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

import { CSAttributeGroup } from "src/screens/CR/common/tabs/tab-attributes/views";

@graphInfo({ graphType: "PX.Objects.CR.CRLeadClassMaint", primaryView: "Class", showActivitiesIndicator: true })
export class CR207000 extends PXScreen {
	@viewInfo({ containerName: "Lead Class" })
	Class = createSingle(CRLeadClass);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);
}

export class CRLeadClass extends PXView {
	ClassID: PXFieldState;
	IsInternal: PXFieldState;
	Description: PXFieldState;
	DefaultSource: PXFieldState;
	DefaultOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetContactClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetBAccountClassID: PXFieldState;
	RequireBAccountCreation: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetOpportunityClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetOpportunityStage: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultEMailAccountID: PXFieldState;
}
