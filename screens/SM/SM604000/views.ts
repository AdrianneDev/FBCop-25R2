import {
	PXView,
	PXFieldState,
	gridConfig,
	headerDescription,
	ICurrencyInfo,
	disabled,

	PXFieldOptions,
	GridColumnDisplayMode,
	linkCommand,
	columnConfig,
	GridColumnShowHideMode,
	GridColumnType,
	PXActionState,
	GridPreset
} from "client-controls";

// Views

export class MainInformationFilterClass extends PXView {
	Banner: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.Readonly>;
	ResourceLevel: PXFieldState<PXFieldOptions.Readonly>;
	CommerceTransactionLimitMonthly: PXFieldState<PXFieldOptions.Readonly>;
	ERPTransactionLimitMonthly: PXFieldState<PXFieldOptions.Readonly>;
	DataIncluded: PXFieldState<PXFieldOptions.Readonly>;
	CommerceTransactionsLimitDaily: PXFieldState<PXFieldOptions.Readonly>;
	ERPTransactionsLimitDaily: PXFieldState<PXFieldOptions.Readonly>;
	maximumRecommendedERPUsers: PXFieldState<PXFieldOptions.Readonly>;
	WEBServicesAPIUsers: PXFieldState<PXFieldOptions.Readonly>;
	WebServiceProcessingUnits: PXFieldState<PXFieldOptions.Readonly>;
	WEBServicesAPIRequestsPerMinute: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfLinesPerTransaction: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfSerialNumbersPerDocument: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfPayrollEmployees: PXFieldState<PXFieldOptions.Readonly>;
	maximumNumberOfStaffMembersAndVehicles: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfAppointmentsPerMonth: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfExpenseReceiptsRecognizedPerMonth: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfDocumentsRecognizedPerMonth: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfBusinessCardsRecognizedPerMonth: PXFieldState<PXFieldOptions.Readonly>;
	MaximumNumberOfBankFeedAccounts: PXFieldState<PXFieldOptions.Readonly>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false
})
export class LicenseStatisticMonthlyView extends PXView {
	@columnConfig({
		allowUpdate: false,
	})
	MonthYearUserFriendly: PXFieldState;
	@linkCommand("actionMonthlyCommercialTransactionDetails")
	@columnConfig({
		allowUpdate: false,
	})
	CommerceTransacCountPercFromLimit: PXFieldState;
	@linkCommand("actionMonthlyERPTransactionDetails")
	@columnConfig({
		allowUpdate: false,
	})
	ERPTransacCountPercFromLimit: PXFieldState;
	RefreshStatistics: PXActionState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false
})
export class SMLicenseStatisticDailyView extends PXView {
	@columnConfig({
		allowUpdate: false,
	})
	Date: PXFieldState;
	@linkCommand("actionDailyCommercialTransactionDetails")
	@columnConfig({
		allowUpdate: false,
	})
	CommerceTransacCountPercFromLimit: PXFieldState;
	@linkCommand("actionDailyERPTransactionDetails")
	@columnConfig({
		allowUpdate: false,
	})
	ERPTransacCountPercFromLimit: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	MaximumAPIRequestsPerMinute: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	APIRequestsDeclinedStats: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	APITotalRequestsThrottledStats: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	APIRequestsThrottledDueToConcurrencyStats: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	APIRequestsThrottledDueToFrequencyStats: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false
})
export class SMLicenseViolations extends PXView {
	@columnConfig({
		allowUpdate: false,
	})
	StatusUserFriendly: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	Date: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	LimitTypeUserFriendly: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	TranTypeUserFriendly: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	Limit: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	CloseDate: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	Reason: PXFieldState;
}

export class HistoryFilterClass extends PXView {
	ShowPerTenant: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false
})
export class ConstraintHistoryView extends PXView {
	RecognitionHistory: PXActionState;

	@columnConfig({
		allowUpdate: false,
	})
	Date: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	CompanyID: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfPayrollEmployees: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfStaffAndVehicles: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfAppointments: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfDocumentsRecognized: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfExpenseReceiptsRecognized: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfBusinessCardsRecognized: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	NbrOfBankFeedAccounts: PXFieldState;
}

export class TransactionDataFilter extends PXView {
	TransactionPeriodType: PXFieldState<PXFieldOptions.CommitChanges>;
	TransactionType: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class TransactionData extends PXView {
	@columnConfig({
		allowUpdate: false,
	})
	TransactionPeriod: PXFieldState;
	@columnConfig({
		allowUpdate: false,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true
	})
	TransactionScreen: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	TransactionSource: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	TransactionCount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	autoRepaint: ["TranDocumentDetails"]
})
export class SMLicenseERPTranDetailsAction extends PXView {
	@columnConfig({
		allowUpdate: false,
	})
	Date: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	ScreenID: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	ActionName: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	TransactionType: PXFieldState;
	@columnConfig({
		allowUpdate: false,
	})
	TranCount: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false
})
export class ErpTranDocDetailsRecord extends PXView {
	@columnConfig({
		allowUpdate: false,
	})
	DocumentType: PXFieldState;
	@linkCommand("redirectToScreen")
	@columnConfig({
		allowUpdate: false,
	})
	DocumentLink: PXFieldState<PXFieldOptions.CommitChanges>;
}
