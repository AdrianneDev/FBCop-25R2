import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, controlConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridColumnDisplayMode, GridPreset, handleEvent, CustomEventType, RowCssHandlerArgs, CellCssHandlerArgs,
	PXViewCollection,
	GridAutoGrowMode,
	QpGridEventArgs,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.PaymentMethodMaint", primaryView: "PaymentMethod", })
export class CA204000 extends PXScreen {

	@viewInfo({ containerName: "Payment Method Summary" })
	PaymentMethod = createSingle(PaymentMethod);

	PaymentMethodCurrent = createSingle(PaymentMethod2);

	@viewInfo({ containerName: "Allowed Cash Accounts" })
	CashAccounts = createCollection(PaymentMethodAccount);

	@viewInfo({ containerName: "Payment Method Details" })
	DetailsForReceivable = createCollection(PaymentMethodDetail);

	@viewInfo({ containerName: "Payment Method Details" })
	DetailsForVendor = createCollection(PaymentMethodDetail2);

	@viewInfo({ containerName: "Remittance Settings" })
	DetailsForCashAccount = createCollection(PaymentMethodDetail3);

	@viewInfo({ containerName: "Processing Centers" })
	ProcessingCenters = createCollection(CCProcessingCenterPmntMethod);

	@viewInfo({ containerName: "Overrides by Branch" })
	BranchProcessingCenters = createCollection(CCProcessingCenterPmntMethodBranch);

	@viewInfo({ containerName: "Selection" })
	PlugInFilter = createSingle(PlugInFilter);

	@viewInfo({ containerName: "Plug-In Settings" })
	aCHPlugInParameters = createCollection(ACHPlugInParameter);

	@viewInfo({ containerName: "Plug-In Settings" })
	PlugInParameters = createCollection(ACHPlugInParameter2);

	activeRowIsFormula(args: QpGridEventArgs) {
		const isFormulaColumn = args.grid.getColumn("IsFormula");
		const isFormulaCell = args.grid.getCell(isFormulaColumn, args.activeRow);
		return args.grid.getTypedCellValue(isFormulaCell, isFormulaColumn);
	}

	onGetCellEditorTypeHandler(args: QpGridEventArgs) {
		if (this.activeRowIsFormula(args)) return "qp-formula-editor";
		return undefined;
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "aCHPlugInParameters" })
	getTransactionsRowCss(args: RowCssHandlerArgs<PXViewCollection<ACHPlugInParameter>>) {
		const row = args?.selector?.row;
		return row?.IsGroupHeader?.value === true ? "bold-highlight-row" : undefined;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "aCHPlugInParameters", column: "ParameterCode" })
	getTransactionsCellCss(args: CellCssHandlerArgs<PXViewCollection<ACHPlugInParameter>>) {
		const row = args?.selector?.row;
		return row?.Required?.value === true ? "cell-asterisk" : undefined;
	}
}

// Views

export class PaymentMethod extends PXView  {
	PaymentMethodID: PXFieldState;
	HasProcessingCenters: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;
	IsUsingPlugin: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	ContainsPersonalData: PXFieldState;
	PaymentType: PXFieldState<PXFieldOptions.CommitChanges>;
	DirectDepositFileFormat: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	ExternalPaymentProcessorID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForAP: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	UseForAR: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	UseForPR: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	PaymentDateToBankDate: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	UseForCA: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
}

export class PaymentMethod2 extends PXView  {
	ARIsProcessingRequired: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	IsAccountNumberRequired: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ARVoidOnDepositAccount: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ARHasBillingInfo: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	ARDefaultVoidDateToDocumentDate: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	APAdditionalProcessing: PXFieldState<PXFieldOptions.CommitChanges>;
	APCheckReportID: PXFieldState<PXFieldOptions.CommitChanges>;
	APStubLines: PXFieldState<PXFieldOptions.CommitChanges>;
	APPrintRemittance: PXFieldState<PXFieldOptions.CommitChanges>;
	APRemittanceReportID: PXFieldState<PXFieldOptions.CommitChanges>;
	APBatchExportMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	APBatchExportSYMappingID: PXFieldState<PXFieldOptions.CommitChanges>;
	APBatchExportPlugInTypeName: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipPaymentsWithZeroAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireBatchSeqNum: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipExport: PXFieldState<PXFieldOptions.CommitChanges>;
	APRequirePaymentRef: PXFieldState<PXFieldOptions.CommitChanges>;
	PRProcessing: PXFieldState<PXFieldOptions.CommitChanges>;
	PRCheckReportID: PXFieldState<PXFieldOptions.CommitChanges>;
	PRBatchExportSYMappingID: PXFieldState<PXFieldOptions.CommitChanges>;
	PRSkipPaymentsWithZeroAmounts: PXFieldState<PXFieldOptions.CommitChanges>;
	SendPaymentReceiptsAutomatically: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	UseDetailedPayStubReport: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class PaymentMethodAccount extends PXView  {
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID_CashAccount_Descr: PXFieldState;

	@columnConfig({hideViewLink: true})
	CashAccount__BranchID: PXFieldState;
	UseForAP: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForPR: PXFieldState<PXFieldOptions.CommitChanges>;
	APIsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	APAutoNextNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APLastRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APBatchLastRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	APQuickBatchGeneration: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForAR: PXFieldState<PXFieldOptions.CommitChanges>;
	ARIsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	ARIsDefaultForRefund: PXFieldState<PXFieldOptions.CommitChanges>;
	ARAutoNextNbr: PXFieldState;
	ARLastRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class PaymentMethodDetail extends PXView  {
	@columnConfig({allowShowHide: GridColumnShowHideMode.Server})
	PaymentMethodID: PXFieldState;
	DetailID: PXFieldState;
	Descr: PXFieldState;
	IsRequired: PXFieldState;
	IsEncrypted: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.Server})
	IsIdentifier: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowShowHide: GridColumnShowHideMode.Server})
	IsExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	IsCVV: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.Server})
	IsOwnerName: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowShowHide: GridColumnShowHideMode.Server})
	IsCCProcessingID: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderIndex: PXFieldState;
	EntryMask: PXFieldState;
	ValidRegexp: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.Server})
	DisplayMask: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class PaymentMethodDetail2 extends PXView  {
	DetailID: PXFieldState;
	Descr: PXFieldState;
	IsRequired: PXFieldState;
	OrderIndex: PXFieldState;
	EntryMask: PXFieldState;
	ValidRegexp: PXFieldState;
	ControlType: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultValue: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class PaymentMethodDetail3 extends PXView  {
	DetailID: PXFieldState;
	Descr: PXFieldState;
	IsRequired: PXFieldState;
	OrderIndex: PXFieldState;
	EntryMask: PXFieldState;
	ValidRegexp: PXFieldState;
	ControlType: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultValue: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CCProcessingCenterPmntMethod extends PXView {
	@columnConfig({ hideViewLink: true })
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
	FundHoldPeriod: PXFieldState;
	ReauthDelay: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class CCProcessingCenterPmntMethodBranch extends PXView {
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID_Branch_AcctName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PlugInFilter extends PXView  {
	ShowAllSettings: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowOffsetSettings: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class ACHPlugInParameter extends PXView {

	ParameterID: PXFieldState;
	ParameterCode: PXFieldState;
	Description: PXFieldState;

	@columnConfig({width: 1})
	IsFormula: PXFieldState;

	@columnConfig({
		allowSort: false,
		fullState: true,
		displayMode: GridColumnDisplayMode.Value
	})
	Value: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false })
	Required: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False, visible: false})
	IsGroupHeader: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class ACHPlugInParameter2 extends PXView  {
	ParameterID: PXFieldState;
	ParameterCode: PXFieldState;
	Value: PXFieldState;
	Order: PXFieldState;
	UsedIn: PXFieldState;
	Type: PXFieldState;
	Required: PXFieldState;
	Visible: PXFieldState;
	IsGroupHeader: PXFieldState;
	IsAvailableInShortForm: PXFieldState;
	IsFormula: PXFieldState;
}
