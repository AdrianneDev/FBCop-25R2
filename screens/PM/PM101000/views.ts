import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridNoteFilesShowMode,
	GridPreset,
	controlConfig
} from "client-controls";

export class Setup extends PXView {
	TranNumbering: PXFieldState;
	BatchNumberingID: PXFieldState;
	ProformaNumbering: PXFieldState;
	ChangeOrderNumbering: PXFieldState;
	ChangeRequestNumbering: PXFieldState;
	QuoteNumberingID: PXFieldState;
	ProgressWorksheetNumbering: PXFieldState;
	CostProjectionNumbering: PXFieldState;
	WipAdjustmentNumbering: PXFieldState;
	IsActive: PXFieldState;
	NonProjectCode: PXFieldState;
	EmptyItemCode: PXFieldState;
	EmptyItemUOM: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultChangeOrderClassID: PXFieldState;
	@controlConfig({ addCommand: "AddNewProjectTemplate" })
	QuoteTemplateID: PXFieldState;
	ProformaAssignmentMapID: PXFieldState;
	ProformaAssignmentNotificationID: PXFieldState;
	CutoffDate: PXFieldState;
	OverLimitErrorLevel: PXFieldState;
	RevenueBudgetUpdateMode: PXFieldState;
	CostBudgetUpdateMode: PXFieldState;
	BudgetControl: PXFieldState;
	AutoPost: PXFieldState;
	AutoReleaseAllocation: PXFieldState;
	CostCommitmentTracking: PXFieldState;
	CalculateProjectSpecificTaxes: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludePendingChangeOrdersInCostProjections: PXFieldState<PXFieldOptions.CommitChanges>;
	UseBudgetForPlannedCostEstimationInWipAdjustments: PXFieldState<PXFieldOptions.CommitChanges>;
	MigrationMode: PXFieldState;
	VisibleInGL: PXFieldState;
	VisibleInAP: PXFieldState;
	VisibleInAR: PXFieldState;
	VisibleInSO: PXFieldState;
	VisibleInPO: PXFieldState;
	VisibleInIN: PXFieldState;
	VisibleInCA: PXFieldState;
	VisibleInCR: PXFieldState;
	VisibleInPROD: PXFieldState;
	VisibleInTA: PXFieldState;
	VisibleInEA: PXFieldState;
	RestrictProjectSelect: PXFieldState;
	ExpenseAccountSource: PXFieldState;
	ExpenseSubMask: PXFieldState;
	ExpenseAccrualAccountSource: PXFieldState;
	ExpenseAccrualSubMask: PXFieldState;
	DefaultPriceMarkupPct: PXFieldState;
	UnbilledRemainderAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnbilledRemainderSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnbilledRemainderOffsetAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnbilledRemainderOffsetSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DropshipExpenseAccountSource: PXFieldState;
	DropshipExpenseSubMask: PXFieldState;
	DropshipReceiptProcessing: PXFieldState<PXFieldOptions.CommitChanges>;
	DropshipExpenseRecording: PXFieldState<PXFieldOptions.CommitChanges>;
	AssignmentMapID: PXFieldState;
	ProformaApprovalMapID: PXFieldState;
	ChangeRequestApprovalMapID: PXFieldState;
	ChangeOrderApprovalMapID: PXFieldState;
	QuoteApprovalMapID: PXFieldState;
	CostProjectionApprovalMapID: PXFieldState;
	CostProjectionByDateApprovalMapID: PXFieldState;
	WipAdjustmentApprovalMapID: PXFieldState;
	ProgressWorksheetApprovalMapID: PXFieldState;
	AssignmentNotificationID: PXFieldState;
	ProformaApprovalNotificationID: PXFieldState;
	ChangeRequestApprovalNotificationID: PXFieldState;
	ChangeOrderApprovalNotificationID: PXFieldState;
	QuoteApprovalNotificationID: PXFieldState;
	CostProjectionApprovalNotificationID: PXFieldState;
	CostProjectionByDateApprovalNotificationID: PXFieldState;
	WipAdjustmentApprovalNotificationID: PXFieldState;
	ProgressWorksheetApprovalNotificationID: PXFieldState;
	WipAdjustmentOverbillingUnderbillingOption: PXFieldState;
	WipAdjustmentOverbillingAccountID: PXFieldState;
	WipAdjustmentOverbillingSubID: PXFieldState;
	WipAdjustmentUnderbillingAccountID: PXFieldState;
	WipAdjustmentUnderbillingSubID: PXFieldState;
	WipAdjustmentRevenueOption: PXFieldState;
	WipAdjustmentRevenueAccountID: PXFieldState;
	WipAdjustmentRevenueSubID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class Markups extends PXView {
	Type: PXFieldState;
	Description: PXFieldState;
	Value: PXFieldState;
}
