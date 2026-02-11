import { CR204000 } from "../CR204000";
import { createSingle, PXView, PXFieldState, PXFieldOptions, controlConfig, ISelectorControlConfig } from "client-controls";

export interface CR204000_AddMembersFromGI extends CR204000 {}
export class CR204000_AddMembersFromGI {
	AddMembersFromGIFilterView = createSingle(AddMembersFromGIFilter);
}

export class AddMembersFromGIFilter extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true, editCommand: "RedirectToGIInquiry"})
	GIDesignID: PXFieldState<PXFieldOptions.CommitChanges>;
	SharedGIFilter: PXFieldState<PXFieldOptions.CommitChanges>;
}
