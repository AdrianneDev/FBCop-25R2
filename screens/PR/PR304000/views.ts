import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	PXActionState,
	TextAlign,
	GridPreset,
	GridAutoGrowMode
} from "client-controls";

export class PRTaxFormBatch extends PXView {
	BatchID: PXFieldState;
	FormType: PXFieldState;
	Year: PXFieldState;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProvinceOfEmployment: PXFieldState;
	DocType: PXFieldState;
	DownloadedAt: PXFieldState;
	NumberOfEmployees: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class PREmployeeTaxForm extends PXView {
	Publish: PXActionState;
	Unpublish: PXActionState;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PREmployee__AcctCD: PXFieldState;

	PREmployee__AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PREmployee__ParentBAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PREmployee__PayGroupID: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Published: PXFieldState;

	@linkCommand("ViewTaxFormBatch")
	PublishedFrom: PXFieldState;

	@columnConfig({ visible: false, type: GridColumnType.CheckBox, allowShowHide: GridColumnShowHideMode.False })
	NotPublished: PXFieldState<PXFieldOptions.Hidden>;
}

export class EmployeeSlipAlreadyPublished extends PXView {
	Message: PXFieldState<PXFieldOptions.Disabled>;
}
