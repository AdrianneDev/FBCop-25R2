import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, PXActionState, PXPageLoadBehavior, handleEvent, CustomEventType, CallbackCompletedHandlerArgs, gridConfig, GridPreset, TextAlign
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.Localizations.GB.HMRC.VATMaint", primaryView: "Period_Header", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class TX502020 extends PXScreen {

	Calculate: PXActionState;

	Period_Header = createSingle(VATPeriodFilter);
	Period_Details = createCollection(TaxReportLine);
	VATRows = createCollection(VATRow);

	async attached() {
		await super.attached();
		this.assignHeaders();
	}

	@handleEvent(CustomEventType.CallbackCompleted) onActionCompleted(args: CallbackCompletedHandlerArgs<any>) {
		if (args.actionName === "Cancel") this.assignHeaders();
	}

	assignHeaders(): void {
		const x = navigator.plugins.length; const txt = [];
		for (let i = 0; i < x; i++) {
			if ("name" in navigator.plugins[i]) {
				txt.push(navigator.plugins[i].name.replace(" ", "%20"));
			}
		}

		const scaling = 1;
		const clientScreens = `width=${window.screen.width}&height=${window.screen.height}&scaling-factor=${scaling}&colour-depth=${window.screen.colorDepth}`;
		const windowSize = `width=${window.innerWidth}&height=${window.innerHeight}`;
		let clientIP = "";

		fetch("https://api.ipify.org/").
			then(
				res => res.text()).
			then(
				res => {
					clientIP = res;
					executeCalculateCallback();
				},
				err => {
					clientIP = err.Status;
					executeCalculateCallback();
				}
			);

		const executeCalculateCallback = (): void => {
			const payload = JSON.stringify({
				"clientBrowserPlugins": txt.join().toString() || "Native%20Client",
				"clientScreens": clientScreens,
				"windowSize": windowSize,
				"clientPublicIP": clientIP
			});
			this.Period_Header.HeadersJSON.value = payload;
		};
	}
}

export class VATPeriodFilter extends PXView {
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionId: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	Start: PXFieldState<PXFieldOptions.Disabled>;
	End: PXFieldState<PXFieldOptions.Disabled>;
	Due: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Received: PXFieldState<PXFieldOptions.Disabled>;
	HeadersJSON: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class TaxReportLine extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.True })
	LineNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.True })
	SortOrder: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Right })
	ReportLineNbr: PXFieldState;
	Descr: PXFieldState;

	@linkCommand("ViewTaxDocument")
	TaxHistoryReleased__ReportFiledAmt: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class VATRow extends PXView {
	CheckVATReturn: PXActionState;
	TaxBoxNbr: PXFieldState;
	Descr: PXFieldState;
	Amt: PXFieldState;

}
