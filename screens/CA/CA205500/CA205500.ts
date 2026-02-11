import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions,
	columnConfig, PXActionState, headerDescription, GridPreset, GridAutoGrowMode, controlConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CABankFeedMaint", primaryView: "BankFeed", })
export class CA205500 extends PXScreen {
	SetDefaultMapping: PXActionState;
	CheckFileFolder: PXActionState;
	SetUpDataProvider: PXActionState;
	LoadTransactions: PXActionState;

	BankFeed = createSingle(CABankFeed);

	CurrentBankFeed = createSingle(CABankFeed2);

	@viewInfo({ containerName: "Cash Accounts" })
	BankFeedDetail = createCollection(CABankFeedDetail);

	@viewInfo({ containerName: "Corporate Cards" })
	BankFeedCorpCC = createCollection(CABankFeedCorpCard);

	@viewInfo({ containerName: "Expense Items" })
	BankFeedExpense = createCollection(CABankFeedExpense);

	@viewInfo({ containerName: "Custom Mapping Rules" })
	BankFeedFieldMapping = createCollection(CABankFeedFieldMapping);

	@viewInfo({ containerName: "Source File" })
	BankFeedFileFieldMapping = createCollection(CABankFeedFieldMapping2);

	@viewInfo({ containerName: "Categories" })
	BankFeedCategories = createCollection(BankFeedCategory);

	@viewInfo({ containerName: "Load File Manually" })
	LoadFileTransactions = createSingle(LoadFileTransactionsFilter);

	@viewInfo({ containerName: "Load Transactions in Test Mode" })
	ShowFileTransactions = createSingle(ShowFileTransactionsFilter);

	@viewInfo({ containerName: "Load Transactions in Test Mode" })
	BankFeedFileTransactions = createCollection(BankFeedFileTransaction);

	@viewInfo({ containerName: "Load Transactions in Test Mode" })
	BankFeedTransactions = createCollection(BankFeedTransaction);

	@viewInfo({ containerName: "Load Transactions in Test Mode" })
	Filter = createSingle(TransactionsFilter);
}

@gridConfig({ preset: GridPreset.Details, autoGrowInHeight: GridAutoGrowMode.Fill })
export class CABankFeedFieldMapping2 extends PXView {
	@columnConfig({ allowNull: false })
	Active: PXFieldState<PXFieldOptions.CommitChanges>;

	TargetField: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor"
	})
	SourceFieldOrValue: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CABankFeed extends PXView {
	@headerDescription
	BankFeedID: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	ImportStartDate: PXFieldState;
	@headerDescription
	Descr: PXFieldState;
	Institution: PXFieldState;
	CreateExpenseReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateReceiptForPendingTran: PXFieldState;
	MultipleMapping: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class CABankFeed2 extends PXView {

	DefaultExpenseItemID: PXFieldState;
	FolderPath: PXFieldState<PXFieldOptions.CommitChanges>;
	FileFormat: PXFieldState<PXFieldOptions.CommitChanges>;
	FolderLogin: PXFieldState<PXFieldOptions.CommitChanges>;
	FolderPassword: PXFieldState<PXFieldOptions.CommitChanges>;
	SshCertificateName: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	ProviderID: PXFieldState;

	FileAmountFormat: PXFieldState<PXFieldOptions.CommitChanges>;
	DebitLabel: PXFieldState<PXFieldOptions.CommitChanges>;
	CreditLabel: PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalUserID: PXFieldState;
	ExternalItemID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CABankFeedDetail extends PXView {
	Hidden: PXFieldState;
	AccountName: PXFieldState;
	AccountMask: PXFieldState;
	Descr: PXFieldState;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementStartDay: PXFieldState;
	ImportStartDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Currency: PXFieldState;
	AccountType: PXFieldState;
	AccountSubType: PXFieldState;
	RetrievalStatus: PXFieldState;
	RetrievalDate: PXFieldState;
	ErrorMessage: PXFieldState;
	AccountID: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class CABankFeedCorpCard extends PXView {
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchField: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchRule: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchValue: PXFieldState<PXFieldOptions.CommitChanges>;
	CorpCardID: PXFieldState<PXFieldOptions.CommitChanges>;
	CardNumber: PXFieldState;
	CardName: PXFieldState;
	EmployeeID: PXFieldState;
	EmployeeName: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class CABankFeedExpense extends PXView {
	showCategories: PXActionState;
	MatchField: PXFieldState;
	MatchRule: PXFieldState<PXFieldOptions.CommitChanges>;
	MatchValue: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryItemID: PXFieldState;
	DoNotCreate: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class CABankFeedFieldMapping extends PXView {
	SetDefaultMapping: PXActionState;

	@columnConfig({
		allowNull: false
	})
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetField: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor"
	})
	SourceFieldOrValue: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details })
export class BankFeedCategory extends PXView {
	Category: PXFieldState;
}

export class ShowFileTransactionsFilter extends PXView {
	FileName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class TransactionsFilter extends PXView {
	Date: PXFieldState;
	DateTo: PXFieldState;
	MaxTransactions: PXFieldState<PXFieldOptions.CommitChanges>;
	LineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LoadFileTransactionsFilter extends PXView {

	FileName: PXFieldState<PXFieldOptions.CommitChanges>;
	IgnoreDates: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details, allowDelete: false })
export class BankFeedTransaction extends PXView {

	TransactionID: PXFieldState;
	Date: PXFieldState;
	Amount: PXFieldState;
	IsoCurrencyCode: PXFieldState;
	Name: PXFieldState;
	Category: PXFieldState;
	Pending: PXFieldState;
	PendingTransactionID: PXFieldState;
	Type: PXFieldState;

	AccountID: PXFieldState;
	AccountOwner: PXFieldState;
	CheckNumber: PXFieldState;
	Memo: PXFieldState;
	CreatedAt: PXFieldState;
	PostedAt: PXFieldState;
	TransactedAt: PXFieldState;
	UpdatedAt: PXFieldState;
	AccountStringId: PXFieldState;
	CategoryGuid: PXFieldState;
	ExtendedTransactionType: PXFieldState;
	Id: PXFieldState;
	IsBillPay: PXFieldState;
	IsDirectDeposit: PXFieldState;
	IsExpense: PXFieldState;
	IsFee: PXFieldState;
	IsIncome: PXFieldState;
	IsInternational: PXFieldState;
	IsOverdraftFee: PXFieldState;
	IsPayrollAdvance: PXFieldState;
	IsRecurring: PXFieldState;
	IsSubscription: PXFieldState;
	@controlConfig({ allowNull: true }) Latitude: PXFieldState;
	LocalizedDescription: PXFieldState;
	LocalizedMemo: PXFieldState;
	@controlConfig({ allowNull: true }) Longitude: PXFieldState;
	MemberIsManagedByUser: PXFieldState;
	MerchantCategoryCode: PXFieldState;
	MerchantGuid: PXFieldState;
	MerchantLocationGuid: PXFieldState;
	Metadata: PXFieldState;
	OriginalDescription: PXFieldState;
	UserId: PXFieldState;
	AuthorizedDate: PXFieldState;
	AuthorizedDatetime: PXFieldState;
	DatetimeValue: PXFieldState;
	Address: PXFieldState;
	City: PXFieldState;
	Country: PXFieldState;
	PostalCode: PXFieldState;
	Region: PXFieldState;
	StoreNumber: PXFieldState;
	MerchantName: PXFieldState;
	PaymentChannel: PXFieldState;
	ByOrderOf: PXFieldState;
	Payee: PXFieldState;
	Payer: PXFieldState;
	PaymentMethod: PXFieldState;
	PaymentProcessor: PXFieldState;
	PpdId: PXFieldState;
	Reason: PXFieldState;
	ReferenceNumber: PXFieldState;
	PersonalFinanceCategory: PXFieldState;
	TransactionCode: PXFieldState;
	UnofficialCurrencyCode: PXFieldState;
	PartnerAccountID: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, allowDelete: false })
export class BankFeedFileTransaction extends PXView {
	TransactionID: PXFieldState;
	AccountName: PXFieldState;
	Amount: PXFieldState;
	CreditAmount: PXFieldState;
	DebitAmount: PXFieldState;
	Name: PXFieldState;
	Date: PXFieldState;
	debitCreditParameter: PXFieldState;
	CardNumber: PXFieldState;
	ExtRefNbr: PXFieldState;
	UserDesc: PXFieldState;
	InvoiceInfo: PXFieldState;
	PayeeName: PXFieldState;
	TranCode: PXFieldState;
}
