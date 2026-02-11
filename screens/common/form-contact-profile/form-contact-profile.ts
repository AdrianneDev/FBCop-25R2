import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	fieldConfig,
} from "client-controls";

export class DefaultContact extends PXView {
	@fieldConfig({ controlType: "qp-mail-editor", controlConfig: { action: "NewMailActivity" } })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({ controlType: "qp-link-editor" })
	WebSite: PXFieldState<PXFieldOptions.CommitChanges>;

	Phone1Type: PXFieldState;
	Phone1: PXFieldState;
	Phone2Type: PXFieldState;
	Phone2: PXFieldState;
	Phone3Type: PXFieldState;
	Phone3: PXFieldState;
	FaxType: PXFieldState;
	Fax: PXFieldState;
}

export class Contact extends PXView {
	FullName: PXFieldState;
	Attention: PXFieldState;

	@fieldConfig({ controlType: "qp-mail-editor" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({ controlType: "qp-link-editor" })
	WebSite: PXFieldState<PXFieldOptions.CommitChanges>;

	Phone1Type: PXFieldState;
	Phone1: PXFieldState;
	Phone2Type: PXFieldState;
	Phone2: PXFieldState;
	Phone3Type: PXFieldState;
	Phone3: PXFieldState;
	FaxType: PXFieldState;
	Fax: PXFieldState;
}
