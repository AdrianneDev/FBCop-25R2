import {
	PXScreen,
	PXActionState,
	createSingle,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
	controlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.TX.ManageExemptCustomer",
	primaryView: "Filter"
})
export class TX505000 extends PXScreen {
	viewCustomer: PXActionState;
	Filter = createSingle(ExemptCustomerFilter);
	CustomerList = createCollection(ExemptCustomer);
}

export class ExemptCustomerFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ multiSelect: true, valueSeparator: ",", valueTemplate: "" })
	CompanyCode: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class ExemptCustomer extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowSort: false
	})
	Selected: PXFieldState;

	@linkCommand("ViewCustomer")
	CustomerID: PXFieldState;

	CustomerName: PXFieldState;
	CustomerTaxRegistrationID: PXFieldState;
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	State: PXFieldState;
	PostalCode: PXFieldState;
	CountryID: PXFieldState;
	PrimaryContact: PXFieldState;
	PhoneNumber: PXFieldState;
	Email: PXFieldState;
	Fax: PXFieldState;
	EcmCompanyCode: PXFieldState;
}
