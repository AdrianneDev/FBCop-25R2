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
	localizable,
	controlConfig
} from "client-controls";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.Objects.AR.ValidateARDocumentAddressProcess",
	primaryView: "Filter",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})

export class AR509010 extends PXScreen {
	ViewDocument: PXActionState;

	Filter = createSingle(Filter);
	DocumentAddresses = createCollection(DocumentAddresses);
}

export class Filter extends PXView {
	Country: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ nullText: NullTextValues.All })
	DocumentType: PXFieldState<PXFieldOptions.CommitChanges>;

	IsOverride: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class DocumentAddresses extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowSort: false
	})
	Selected: PXFieldState;

	@linkCommand("ViewDocument")
	DocumentNbr: PXFieldState;

	DocumentType: PXFieldState;
	Status: PXFieldState;
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	State: PXFieldState;
	PostalCode: PXFieldState;
	CountryID: PXFieldState;
}

