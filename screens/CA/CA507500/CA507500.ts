import { createCollection, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, linkCommand, columnConfig, PXActionState, GridPreset } from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CA.CABankFeedImport", primaryView: "BankFeeds",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class CA507500 extends PXScreen {

	ViewBankFeed: PXActionState;
	EditBankFeed: PXActionState;

	BankFeeds = createCollection(CABankFeed);

}

@gridConfig({ preset: GridPreset.Processing })
export class CABankFeed extends PXView {

	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState;

	@linkCommand("ViewBankFeed")
	BankFeedID: PXFieldState;

	Type: PXFieldState;
	Descr: PXFieldState;
	Institution: PXFieldState;
	Status: PXFieldState;
	RetrievalStatus: PXFieldState;
	RetrievalDate: PXFieldState;
	ErrorMessage: PXFieldState;
	AccountQty: PXFieldState;
	UnmatchedAccountQty: PXFieldState;

}
