import { PXView, PXFieldState, gridConfig, linkCommand, columnConfig, GridPreset } from "client-controls";

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PRPayment extends PXView {
	TransactionDate: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("ViewStubReport")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayPeriodID: PXFieldState;

	NetAmount: PXFieldState;
	GrossAmount: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	TotalHours: PXFieldState;
	AverageRate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true
})
export class PRTaxFormBatch extends PXView {
	@linkCommand("ViewTaxForm")
	FormType: PXFieldState;

	Year: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrgBAccountID: PXFieldState;

	DocType: PXFieldState;
}

export class PayrollDocumentsFilter extends PXView {
	ShowTaxFormsTab: PXFieldState;
}
