import { CR302000 } from "../CR302000";
import {
	PXView,
	PXFieldState,
	PXActionState,
	linkCommand,
	createCollection,
	createSingle,
	PXFieldOptions,
	gridConfig,
	viewInfo,
	columnConfig,
	GridPagerMode,
	GridPreset,
	fieldConfig,
	controlConfig,
	ISelectorControlConfig,
	GridAutoGrowMode,
} from "client-controls";

export interface CR302000_UserInfo extends CR302000 {}
export class CR302000_UserInfo {
	@viewInfo({ containerName: "User Info" })
	User = createSingle(Users);

	Roles = createCollection(EPLoginTypeAllowsRole);
}

export class Users extends PXView {
	ResetPasswordOK: PXActionState;
	ResetPassword: PXActionState;
	ActivateLogin: PXActionState;
	EnableLogin: PXActionState;
	DisableLogin: PXActionState;
	UnlockLogin: PXActionState;

	State: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LoginTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({ controlType: "qp-mask-editor" })
	Username: PXFieldState<PXFieldOptions.CommitChanges>;
	Password: PXFieldState;
	GeneratePassword: PXFieldState<PXFieldOptions.CommitChanges>;
	NewPassword: PXFieldState;
	ConfirmPassword: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoAdjustColumns: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class EPLoginTypeAllowsRole extends PXView {
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	Rolename: PXFieldState<PXFieldOptions.Disabled>;
	Rolename_Roles_descr: PXFieldState<PXFieldOptions.Disabled>;
}
