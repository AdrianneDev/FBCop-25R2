import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	fieldConfig,
} from "client-controls";

export class Contact extends PXView { // IContact implementation
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;

	FullName: PXFieldState;
	Attention: PXFieldState;
	Phone1Type: PXFieldState;
	Phone1: PXFieldState;
	Phone2Type: PXFieldState;
	Phone2: PXFieldState;
	Phone3Type: PXFieldState<PXFieldOptions.Hidden>;
	Phone3: PXFieldState<PXFieldOptions.Hidden>;
	FaxType: PXFieldState;
	Fax: PXFieldState;

	@fieldConfig({ controlType: "qp-mail-editor" })
	Email: PXFieldState<PXFieldOptions.CommitChanges>;
}
