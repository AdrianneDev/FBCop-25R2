import {
	createCollection, createSingle,
	PXScreen, PXActionState, PXView, PXFieldState,
	graphInfo, viewInfo, gridConfig, columnConfig, linkCommand,
	PXPageLoadBehavior, PXFieldOptions, GridPagerMode, GridColumnType, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARExpiringCardsProcess", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR512000 extends PXScreen {
	ViewCustomer: PXActionState;
	ViewPaymentMethod: PXActionState;

   	@viewInfo({containerName: "Selection"})
	Filter = createSingle(ARExpiringCardFilter);

   	@viewInfo({containerName: "Card List"})
	Cards = createCollection(CustomerPaymentMethod);
}

export class ARExpiringCardFilter extends PXView {
	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireXDays: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultOnly: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	fastFilterByAllFields: false,
	pagerMode: GridPagerMode.NextPrevFirstLast
})
export class CustomerPaymentMethod extends PXView {
	@columnConfig({ allowNull: false, allowCheckAll: true, type: GridColumnType.CheckBox })
	Selected: PXFieldState;

	@linkCommand("ViewCustomer")
	@columnConfig({ allowFastFilter: true })
	BAccountID: PXFieldState;

	@columnConfig({ allowUpdate: false, allowFastFilter: true })
	Customer__AcctName: PXFieldState;

	@columnConfig({ allowUpdate: false, allowFastFilter: true, hideViewLink: true, format: ">aaaaaaaaaa" })
	Customer__CustomerClassID: PXFieldState;

	@linkCommand("ViewPaymentMethod")
	@columnConfig({ allowFastFilter: true })
	PaymentMethodID: PXFieldState;

	@columnConfig({ allowUpdate: false, allowNull: false })
	Descr: PXFieldState;

	@columnConfig({ allowNull: false, type: GridColumnType.CheckBox })
	IsActive: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ExpirationDate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Contact__EMail: PXFieldState;

	@columnConfig({ allowUpdate: false, format: "CCCCCCCCCCCCCCCCCCCC" })
	Contact__Phone1: PXFieldState;

	@columnConfig({ allowUpdate: false, format: "CCCCCCCCCCCCCCCCCCCC" })
	Contact__Fax: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Contact__WebSite: PXFieldState;
}
