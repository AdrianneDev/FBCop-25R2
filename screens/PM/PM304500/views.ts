import {
	columnConfig,
	controlConfig,
	gridConfig,
	headerDescription,
	GridColumnShowHideMode,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridColumnDisplayMode,
	IMailEditorControlConfig,
	GridAutoGrowMode,
} from "client-controls";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";

export class Quote extends PXView {
	QuoteNbr: PXFieldState;
	OpportunityID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	DocumentDate: PXFieldState;
	ExpirationDate: PXFieldState;
	ExternalRef: PXFieldState;
	Subject: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	@controlConfig({ addCommand: "AddNewProjectTemplate" })
	TemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectManager: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState;
	CuryID: PXFieldState;
	@controlConfig({editCommand: "ViewProject"})
	QuoteProjectID: PXFieldState<PXFieldOptions.Disabled>;
	QuoteProjectCD: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryLineTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryCostTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryGrossMarginAmount: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	GrossMarginPct: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	CuryQuoteTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	@headerDescription FormCaptionDescription: PXFieldState;
}

export class QuoteCurrent extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	CreatedByID_Creator_Username: PXFieldState;
	AllowOverrideContactAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalTaxExemptionNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	AvalaraCustomerUsageType: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "PasteLine",
})
export class Products extends PXView {
	AddNew: PXActionState;
	Copy: PXActionState;
	Paste: PXActionState;

	LineNbr: PXFieldState;
	@columnConfig({ allowDragDrop: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowDragDrop: true })
	Descr: PXFieldState;
	@columnConfig({ allowDragDrop: true })
	Quantity: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, allowDragDrop: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryUnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPct: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAmount: PXFieldState;
	DiscountID: PXFieldState;
	DiscountSequenceID: PXFieldState;
	ManualDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	TaskCD: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, allowDragDrop: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, allowDragDrop: true })
	ExpenseAccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	RevenueAccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class Tasks extends PXView {
	AddCommonTasks: PXActionState;

	TaskCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Type: PXFieldState;
	PlannedStartDate: PXFieldState;
	PlannedEndDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;
	isDefault: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class Taxes extends PXView {
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	TaxID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxUOM: PXFieldState;
	TaxableQty: PXFieldState;
	CuryTaxAmt: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__PendingTax: PXFieldState;
	Tax__ReverseTax: PXFieldState;
	Tax__ExemptTax: PXFieldState;
	Tax__StatisticalTax: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false,
})
export class Answers extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		width: 300,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({ width: 300 })
	Value: PXFieldState;
}

export class Quote_Contact extends Contact {
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IMailEditorControlConfig>({ action: "NewMailActivity" })
	EMail: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CopyQuoteInfo extends PXView {
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculatePrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ConvertQuoteInfo extends PXView {
	CreateLaborRates: PXFieldState<PXFieldOptions.CommitChanges>;
	ActivateProject: PXFieldState<PXFieldOptions.CommitChanges>;
	ActivateTasks: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyNotes: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyFiles: PXFieldState<PXFieldOptions.CommitChanges>;
	MoveActivities: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskCD: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class recalcdiscountsfilter extends PXView {
	RecalcTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
})
export class TasksForAddition extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	TaskCD: PXFieldState;
	Description: PXFieldState;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
	})
	ApproverID: PXFieldState;
	PMProject__NonProject: PXFieldState;
}
