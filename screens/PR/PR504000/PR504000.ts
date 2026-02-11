import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CallbackCompletedHandlerArgs, CustomEventType, ServerCommand, ScreenService, IntergrationFinished, IntergrationLaunched } from "client-controls";
import { PRGovernmentReportingFilter, PRGovernmentReport, PRGovernmentReport2 } from "./views";
import { autoinject } from "aurelia-framework";

declare global {
	interface Window {
		Aatrix: any;
	}
}

@graphInfo({ graphType: "PX.Objects.PR.PRGovernmentReportingProcess", primaryView: "Filter" })
@autoinject
export class PR504000 extends PXScreen {

	RunReport: PXActionState;

	Filter = createSingle(PRGovernmentReportingFilter);
	Reports = createCollection(PRGovernmentReport);

	@viewInfo({ containerName: "Run Report" })
	CurrentReport = createSingle(PRGovernmentReport2);

	AatrixUrl = "https://webforms.aatrix.com/public/external.js";

	Annually: string = "ANN";
	Quarterly: string = "QTR";
	Monthly: string = "MTH";
	DateRange: string = "DTR";

	@handleEvent(CustomEventType.CallbackCompleted)
	async onActionCompleted(args: CallbackCompletedHandlerArgs<any>) {
		if (args.actionName === "viewHistory") {
			await this.loadAndCallMethod(this.AatrixUrl);

			this.viewHistory();
		}
	}

	async loadAndCallMethod(src: string) {
		try {
			await new Promise((resolve, reject) => {
				const script = document.createElement("script");
				script.src = src;
				script.onload = resolve;
				script.onerror = reject;
				document.body.appendChild(script);
			});
		}
		catch (error) {
			console.error("Error loading script:", error);
		}
	}

	async viewHistory() {
		try {
			if (!this.Filter.TaxRegistrationID.value) {
				this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errEinMissing"]));
				return;
			}

			if (!this.Filter.AatrixVendorID.value) {
				this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errAatrixVendorIDMissing"]));
				return;
			}

			this.screenEventManager.publish(new IntergrationLaunched());

			// Call the method after the script is loaded
			window.Aatrix.WebForms.Ui.Integration.ClientSupport.ShowUiExisting(this.Filter.TaxRegistrationID.value.id, this.Filter.TaxRegistrationID.value.id, this.onComplete);
		}
		catch (error) {
			this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errException"]));
		}
	}

	async onComplete(completeStatus, paymentResponse) {
		this.screenEventManager.publish(new IntergrationFinished());
		return;
	}

	onAfterInitialize(): void {
		const urlParams = new URLSearchParams(window.location.search);
		const paramValue = urlParams.get("dbgDownloadAuf");
		if (paramValue === "true") {
			this.screenService.executeCommand(new ServerCommand("SetDownloadAuf"));
		}
	}

	async onUploadPermissionGranted(wfSessionId) {
		this.screenService.executeCommand(new ServerCommand("OnUploadPermissionGranted", [wfSessionId]));
	}

	async onRunReport() {
		await this.loadAndCallMethod(this.AatrixUrl);

		try {
			if (!this.CurrentReport.FormName || !this.CurrentReport.ReportingPeriod) {
				this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errSetup"]));
				return;
			}

			if (!this.validateSmartPanelInput(this.screenService, this.CurrentReport.ReportingPeriod.value)) {
				return;
			}

			if (!this.Filter.TaxRegistrationID.value) {
				this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errEinMissing"]));
				return;
			}

			if (!this.Filter.AatrixVendorID.value) {
				this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errAatrixVendorIDMissing"]));
				return;
			}

			await this.screenService.executeCommand(new ServerCommand("StartAufGeneration"));

			this.screenEventManager.publish(new IntergrationLaunched());

			// Call the method after the script is loaded
			window.Aatrix.WebForms.Ui.Integration.ClientSupport.ShowUiNew(
				this.Filter.TaxRegistrationID.value.id,
				this.CurrentReport.FormName.value,
				this.Filter.AatrixVendorID.value,
				this.onUploadPermissionGranted.bind(this), // added bind(this) to keep the context
				this.onComplete
			);

		}
		catch (error) {
			this.screenService.executeCommand(new ServerCommand("OnRunReportError", ["errException"]));
		}
	}

	validateSmartPanelInput = (screenService: ScreenService, reportingPeriod: any): boolean => {
		switch (reportingPeriod) {
			case this.Annually:
				if (this.CurrentReport.Year.value == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errYearMissing"]));

					return false;
				}

				break;

			case this.Quarterly:
				if (this.CurrentReport.Year.value == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errYearMissing"]));

					return false;
				}

				if (this.CurrentReport.Quarter.value == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errQuarterMissing"]));

					return false;
				}

				break;

			case this.Monthly:
				if (this.CurrentReport.Year.value == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errYearMissing"]));

					return false;
				}

				if (this.CurrentReport.Month.value == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errMonthMissing"]));

					return false;
				}

				break;

			case this.DateRange:
				const dateFrom = this.CurrentReport.DateFrom.value;
				const dateTo = this.CurrentReport.DateTo.value;

				if (dateFrom == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errDateFromMissing"]));

					return false;
				}

				if (dateTo == null) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errDateToMissing"]));

					return false;
				}

				if (dateFrom > dateTo) {
					screenService.executeCommand(new ServerCommand("OnRunReportError", ["errDateInconsistent"]));

					return false;
				}

				break;
		}

		return true;
	};
}
