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


@graphInfo({ graphType: "PX.Objects.CR.CRContactClassMaint", primaryView: "Class", showActivitiesIndicator: true })
export class CR205000 extends PXScreen {
	@viewInfo({ containerName: "Contact Class" })
	Class = createSingle(CRContactClass);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);
}

export class CRContactClass extends PXView {
	ClassID: PXFieldState;
	IsInternal: PXFieldState;
	Description: PXFieldState;
	DefaultOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetLeadClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetBAccountClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TargetOpportunityClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetOpportunityStage: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultEMailAccountID: PXFieldState;
}
