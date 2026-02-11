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

@graphInfo({ graphType: "PX.Objects.CR.CRCustomerClassMaint", primaryView: "CustomerClass", showActivitiesIndicator: true })
export class CR208000 extends PXScreen {
	@viewInfo({ containerName: "Customer Class" })
	CustomerClass = createSingle(CRCustomerClass);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);
}

export class CRCustomerClass extends PXView {
	CRCustomerClassID: PXFieldState;
	IsInternal: PXFieldState;
	Description: PXFieldState;
	DefaultOwner: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultEMailAccountID: PXFieldState;
	CuryID: PXFieldState;
	AllowOverrideCury: PXFieldState;
}
