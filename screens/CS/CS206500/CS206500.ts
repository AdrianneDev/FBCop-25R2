import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, PXFieldOptions,
	gridConfig, GridPreset, columnConfig, TextAlign, headerDescription, GridAutoGrowMode, fieldConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.TermsMaint", primaryView: "TermsDef" })
export class CS206500 extends PXScreen {

	@viewInfo({ containerName: "Credit Terms" })
	TermsDef = createSingle(Terms);
	@viewInfo({ containerName: "Installments Schedule" })
	Installments = createCollection(TermsInstallments);
}

export class Terms extends PXView  {
	@headerDescription
	TermsID: PXFieldState;
	@headerDescription
	Descr: PXFieldState;
	VisibleTo: PXFieldState<PXFieldOptions.CommitChanges>;
	DueType: PXFieldState<PXFieldOptions.CommitChanges>;
	DayDue00: PXFieldState;
	DayFrom00: PXFieldState;
	DayTo00: PXFieldState<PXFieldOptions.CommitChanges>;
	DayDue01: PXFieldState<PXFieldOptions.CommitChanges>;
	DayFrom01: PXFieldState<PXFieldOptions.CommitChanges>;
	DayTo01: PXFieldState;
	DiscType: PXFieldState<PXFieldOptions.CommitChanges>;
	DayDisc: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscPercent: PXFieldState;
	PrepaymentRequired: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentPct: PXFieldState<PXFieldOptions.CommitChanges>;
	InstallmentType: PXFieldState<PXFieldOptions.CommitChanges>;
	InstallmentCntr: PXFieldState;
	InstallmentFreq: PXFieldState;
	InstallmentMthd: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	initNewRow: true,
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	autoInsert: true,
})
export class TermsInstallments extends PXView  {
	@columnConfig({ allowNull: false, width: 70, textAlign: TextAlign.Right })
	InstDays: PXFieldState;
	@fieldConfig({
		controlType: "qp-number-editor", controlConfig: {
			minValue: 0,
			maxValue: 100,
		}
	})
	InstPercent: PXFieldState;
}
