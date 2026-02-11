import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
	placeAfterProperty,
	linkCommand,
	controlConfig,
} from "client-controls";
import { SO301000, SOLine } from "../SO301000";

export interface SO301000_FieldServices extends SO301000 { }
export class SO301000_FieldServices {
	@viewInfo({ containerName: "Create Service Order" })
	CreateServiceOrderFilter = createSingle(CreateServiceOrderFilter);
}

export class CreateServiceOrderFilter extends PXView {
	@controlConfig({ allowEdit: true /*, displayMode: "text" Commented because of AC-321605*/ })
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true /*, displayMode: "text" Commented because of AC-321605*/ })
	AssignedEmpID: PXFieldState<PXFieldOptions.CommitChanges>;

	SLAETA_Date: PXFieldState;

	@controlConfig({timeMode: true })
	SLAETA_Time: PXFieldState<PXFieldOptions.NoLabel>;
}

export interface SOLineFS extends SOLine { }
export class SOLineFS {
	@placeAfterProperty("IsSpecialOrder")
	EquipmentAction: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeAfterProperty("IsSpecialOrder")
	Comment: PXFieldState;

	@placeAfterProperty("IsSpecialOrder")
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeAfterProperty("IsSpecialOrder")
	NewEquipmentLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeAfterProperty("IsSpecialOrder")
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeAfterProperty("IsSpecialOrder")
	EquipmentComponentLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeAfterProperty("IsSpecialOrder")
	@linkCommand("SOLine$RelatedDocument$Link")
	RelatedDocument: PXFieldState;

	@placeAfterProperty("IsSpecialOrder")
	SDSelected: PXFieldState<PXFieldOptions.CommitChanges>;
}