import {
    CurrentRowChangedHandlerArgs,
    CustomEventType,
    PXScreen,
    PXViewCollection,
    RowSelectedHandlerArgs,
    createCollection,
    createSingle,
    graphInfo,
    handleEvent,
    viewInfo
} from "client-controls";

import {
    PRCompanyTaxAttribute, PREmployee,
	PREntityTaxCodeAttribute,
	PREntityCompanyTaxAttribute,
    PRTaxCode,
    PRTaxCode2,
    PRTaxCodeAttribute,
	PRTaxMaintenanceFilter,
	PRTaxRegistrationAttribute
} from "./views";

@graphInfo({ graphType: "PX.Objects.PR.PRTaxMaintenance", primaryView: "Filter" })
export class PR208000 extends PXScreen {
	Filter = createSingle(PRTaxMaintenanceFilter);

	@viewInfo({ containerName: "Tax Codes" })
	Taxes = createCollection(PRTaxCode);

	@viewInfo({ containerName: "Tax Settings" })
	TaxAttributes = createCollection(PRTaxCodeAttribute);

	@viewInfo({ containerName: "Company Tax" })
	CompanyAttributes = createCollection(PRCompanyTaxAttribute);

	@viewInfo({ containerName: "Employees" })
	Employees = createCollection(PREmployee);

	@viewInfo({ containerName: "Tax Details" })
	CurrentTax = createSingle(PRTaxCode2);

	EntityTaxCodeAttribute = createCollection(PREntityTaxCodeAttribute);
	EntityCompanyTaxAttribute = createCollection(PREntityCompanyTaxAttribute);

	TaxRegistrationAttribute = createCollection(PRTaxRegistrationAttribute);

	@handleEvent(CustomEventType.RowSelected, { view: "TaxAttributes" })
	onTaxAttributesRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<PRTaxCodeAttribute>>) {
		const activeRow = args.viewModel.activeRow;

		if (!activeRow) return;

		activeRow.ConfigureTaxSettings.enabled = activeRow.SettingLevel.value !== "T";
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "TaxAttributes" })
	onTaxAttributesRowChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<PRTaxCodeAttribute>>) {
		const activeRow = args.viewModel.activeRow;

		if (!activeRow) return;

		activeRow.ConfigureTaxSettings.enabled = activeRow.SettingLevel.value !== "T";
	}

	@handleEvent(CustomEventType.RowSelected, { view: "CompanyAttributes" })
	onCompanyAttributesRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<PRCompanyTaxAttribute>>) {
		const activeRow = args.viewModel.activeRow;

		if (!activeRow) return;

		activeRow.ConfigureCompanyTaxSettings.enabled = activeRow.SettingLevel.value !== "T";
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "CompanyAttributes" })
	onCompanyAttributesRowChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<PRCompanyTaxAttribute>>) {
		const activeRow = args.viewModel.activeRow;

		if (!activeRow) return;

		activeRow.ConfigureCompanyTaxSettings.enabled = activeRow.SettingLevel.value !== "T";
	}
}
