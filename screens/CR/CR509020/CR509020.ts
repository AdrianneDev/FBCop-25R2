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
	GridFilterBarVisibility,
	viewInfo,
} from "client-controls";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.Objects.CR.CRValidateAddressProcess",
	primaryView: "Filter",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class CR509020 extends PXScreen {
	viewDetails: PXActionState;

	@viewInfo({ containerName: "Filter" })
	Filter = createSingle(Filter);

	@viewInfo({ containerName: "Address" })
	AddressList = createCollection(DocumentAddresses);
}

export class Filter extends PXView {
	Country: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ nullText: NullTextValues.All })
	BAccountType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ nullText: NullTextValues.All })
	BAccountStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	IsOverride: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	wrapToolbar: true,
})
export class DocumentAddresses extends PXView {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;
	AcctCD: PXFieldState;
	AcctName: PXFieldState;
	Type: PXFieldState;
	Status: PXFieldState;
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	State: PXFieldState;
	PostalCode: PXFieldState;
	CountryID: PXFieldState;
}
