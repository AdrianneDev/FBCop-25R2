import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	PXActionState,
	GridPreset,
	GridFastFilterVisibility
} from "client-controls";

export class CABatch extends PXView {
	BatchNbr: PXFieldState;
	TranDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	TranDesc: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	actionsConfig: {
		AddPayment: {
			images: {
				normal: "main@RecordAdd"
			}
		},
		DeleteBatchDetails: {
			images: {
				normal: "main@RecordDel"
			}
		}
	}
})
export class CABatchDetail extends PXView {
	AddPayment: PXActionState;
	DeleteBatchDetails: PXActionState;

	OrigDocType: PXFieldState;

	@linkCommand("ViewPRDocument")
	PRPayment__RefNbr: PXFieldState;

	PRPayment__Status: PXFieldState;
	PRPayment__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PRPayment__EmployeeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PRPayment__PayGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })

	PRPayment__PayPeriodID: PXFieldState;

	PRDirectDepositSplit__Amount: PXFieldState;
}

@gridConfig({
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.ReadOnly
})
export class PRPaymentBatchExportHistory extends PXView {
	ShowExportDetails: PXActionState;

	UserID_Description: PXFieldState;

	@columnConfig({ format: "g" })
	ExportDateTime: PXFieldState;

	Reason: PXFieldState;
	BatchTotal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False
})
export class PRPayment extends PXView {
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	EmployeeID_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayPeriodID: PXFieldState;

	TransactionDate: PXFieldState;
}

export class PRPaymentBatchFilter extends PXView {
	PaymentBatchStatus: PXFieldState<PXFieldOptions.Disabled>;
	BatchTotal: PXFieldState<PXFieldOptions.Disabled>;
	ExportReason: PXFieldState<PXFieldOptions.CommitChanges>;
	OtherExportReason: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintReason: PXFieldState<PXFieldOptions.CommitChanges>;
	OtherPrintReason: PXFieldState<PXFieldOptions.CommitChanges>;
	NextCheckNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False
})
export class PRPayment2 extends PXView {
	Selected: PXFieldState;
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState;
	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	EmployeeID_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayPeriodID: PXFieldState;

	NetAmount: PXFieldState;
}

export class PRPaymentBatchExportHistory2 extends PXView {
	UserID_Description: PXFieldState;
	ExportDateTime: PXFieldState;
	Reason: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class PRPaymentBatchExportDetails extends PXView {
	DocType: PXFieldState;
	RefNbr: PXFieldState;
	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState;

	EmployeeID_description: PXFieldState;
	PayGroupID: PXFieldState;
	PayPeriodID: PXFieldState;
	NetAmount: PXFieldState;
	ExtRefNbr: PXFieldState;
}

export class PRPaymentBatchExportHistory3 extends PXView {
	ExportDateTime: PXFieldState;
}
