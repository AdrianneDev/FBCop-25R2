import { autoinject } from "aurelia-framework";
import {
	PXFieldOptions,
	PXFieldState,
	PXScreen,
	PXView,
	createCollection,
	graphInfo,
	columnConfig,
	gridConfig,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.PR.PRPayGroupMaint", primaryView: "PayGroup", hideFilesIndicator: true, hideNotesIndicator: true })
@autoinject
export class PR205000 extends PXScreen {
	PayGroup = createCollection(PayGroup);
}

@gridConfig({
	preset: GridPreset.Primary,
	initNewRow: true
})
export class PayGroup extends PXView {
	@columnConfig({ hideViewLink: true })
	PayGroupID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	RoleName: PXFieldState;

	EarningsAcctID: PXFieldState;
	EarningsSubID: PXFieldState;
	DedLiabilityAcctID: PXFieldState;
	DedLiabilitySubID: PXFieldState;
	BenefitExpenseAcctID: PXFieldState;
	BenefitExpenseSubID: PXFieldState;
	BenefitLiabilityAcctID: PXFieldState;
	BenefitLiabilitySubID: PXFieldState;
	TaxExpenseAcctID: PXFieldState;
	TaxExpenseSubID: PXFieldState;
	TaxLiabilityAcctID: PXFieldState;
	TaxLiabilitySubID: PXFieldState;
	PTOExpenseAcctID: PXFieldState;
	PTOExpenseSubID: PXFieldState;
	PTOLiabilityAcctID: PXFieldState;
	PTOLiabilitySubID: PXFieldState;
	PTOAssetAcctID: PXFieldState;
	PTOAssetSubID: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}
