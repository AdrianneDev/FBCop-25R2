import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnType,
	PXActionState, TextAlign, GridPreset, GridPagerMode, localizable, GridNoteFilesShowMode, GridFastFilterVisibility
} from "client-controls";

@localizable
class Labels {
	static ViewTaxDetails = "View Tax Details";
	static ConfigureTaxSettings = "Configure Tax Settings";
}

export class PRTaxMaintenanceFilter extends PXView {
	FilterStates: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	syncPosition: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	fastFilterByAllFields: false,
	autoRepaint: ["TaxAttributes"],
	topBarItems: {
		ViewTaxDetails: {
			index: 0, config: { commandName: "ViewTaxDetails", text: Labels.ViewTaxDetails }
		}
	}
})
export class PRTaxCode extends PXView {
	ViewTaxDetails: PXActionState;

	@columnConfig({ hideViewLink: true })
	TaxCD: PXFieldState;

	@columnConfig({ width: 180 })
	Description: PXFieldState;

	@columnConfig({ width: 60, hideViewLink: true })
	TaxState: PXFieldState;

	@columnConfig({ width: 150 })
	TaxCategory: PXFieldState;

	@columnConfig({ width: 120, hideViewLink: true })
	BAccountID: PXFieldState;

	@columnConfig({ width: 120 })
	TaxInvDescrType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 70, hideViewLink: true })
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 70, hideViewLink: true })
	ExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 70, hideViewLink: true })
	LiabilityAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 70, hideViewLink: true })
	LiabilitySubID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	fastFilterByAllFields: false,
	syncPosition: true,
	topBarItems: {
		ConfigureTaxSettings: {
			index: 0, config: { commandName: "ConfigureTaxSettings", text: Labels.ConfigureTaxSettings }
		}
	}
})
export class PRTaxCodeAttribute extends PXView {
	ConfigureTaxSettings: PXActionState;

	@columnConfig({ width: 200 })
	Description: PXFieldState;

	@columnConfig({ width: 250 })
	AdditionalInformation: PXFieldState;

	SettingLevel: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 100 })
	Value: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Required: PXFieldState<PXFieldOptions.CommitChanges>;

	FormBox: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	fastFilterByAllFields: false,
	syncPosition: true,
	topBarItems: {
		ConfigureCompanyTaxSettings: {
			index: 0, config: { commandName: "ConfigureCompanyTaxSettings", text: Labels.ConfigureTaxSettings }
		}
	}
})
export class PRCompanyTaxAttribute extends PXView {
	ConfigureCompanyTaxSettings: PXActionState;

	@columnConfig({ width: 400 })
	Description: PXFieldState;

	AdditionalInformation: PXFieldState;
	SettingLevel: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 120 })
	State: PXFieldState;

	@columnConfig({ width: 200 })
	Value: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 80, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Required: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	UsedForTaxCalculation: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	UsedForGovernmentReporting: PXFieldState;

	FormBox: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	fastFilterByAllFields: false
})
export class PREmployee extends PXView {
	AcctCD: PXFieldState;
	AcctName: PXFieldState;
	EmployeeClassID: PXFieldState;
}

export class PRTaxCode2 extends PXView {
	VndInvDescr: PXFieldState;
	GovtRefNbr: PXFieldState;
	TaxTypeDescription: PXFieldState;
	TaxUniqueCode: PXFieldState;
	JurisdictionLevel: PXFieldState;
}

@gridConfig({
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.Details,
	syncPosition: true
})
export class PREntityTaxCodeAttribute extends PXView {
	OrganizationCD: PXFieldState;
	OrganizationName: PXFieldState;
	BranchCD: PXFieldState;
	BranchName: PXFieldState;
	EmployeeCD: PXFieldState;
	EmployeeName: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Branch: PXFieldState;
	Company: PXFieldState;
}

@gridConfig({
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.Details
})
export class PREntityCompanyTaxAttribute extends PXView {
	OrganizationCD: PXFieldState;
	OrganizationName: PXFieldState;
	BranchCD: PXFieldState;
	BranchName: PXFieldState;
	EmployeeCD: PXFieldState;
	EmployeeName: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Branch: PXFieldState;
	Company: PXFieldState;
}

@gridConfig({
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.Details
})
export class PRTaxRegistrationAttribute extends PXView {
	@columnConfig({ hideViewLink: true })
	TaxRegistrationID: PXFieldState<PXFieldOptions.CommitChanges>;

	Value: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
}
