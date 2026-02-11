import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	CustomEventType,
	handleEvent,
	PXViewCollection,
	RowSelectedHandlerArgs
} from "client-controls";

import {
	PRTaxFormsFilter,
	PREmployee,
	PRTaxFormDiscrepancy
} from "./views";

@graphInfo({ graphType: "PX.Objects.PR.PRPrepareTaxFormsMaint", primaryView: "Filter" })
export class PR502000 extends PXScreen {
	ViewTaxFormBatch: PXActionState;

	// to remove the button from the screen toolbar
	Schedule: PXActionState;

	Filter = createSingle(PRTaxFormsFilter);
	EmployeesWithPaychecksList = createCollection(PREmployee);
	@viewInfo({ containerName: "View Discrepancies" })
	TaxFormDiscrepancies = createCollection(PRTaxFormDiscrepancy);
	pdfSubscription: any;

	// Load the PDF & Set the status of the ViewDiscrpecnies button when a grid row is selected
	@handleEvent(CustomEventType.RowSelected, { view: "EmployeesWithPaychecksList" })
	onEmployeesWithPaychecksRowChange(args: RowSelectedHandlerArgs<PXViewCollection<PREmployee>>) {
		const model = args.viewModel;

		if (!args?.viewModel?.activeRow) {
			model.ViewDiscrepancies.enabled = false;
		}
		else {
			model.ViewDiscrepancies.enabled = !!args.viewModel.activeRow.HasDiscrepancies.value;
		}

		if (!args?.viewModel?.activeRow?.BAccountID?.value) {
			this.ClearPDFViewer();
			return;
		}

		// The ViewDiscrepancies button should only be enabled when there are disrepancies
		model.ViewDiscrepancies.enabled = !!args.viewModel.activeRow.HasDiscrepancies.value;

		// Load in the PDF
		this.GeneratePDF(args.viewModel.activeRow.BAccountID.value);
	}

	// Load the PDF based on EmployeeID
	GeneratePDF(employeeId: number) {
		this.baseApiClient.fetchExt(`ui/screen/PR502000/lob`, {
			Command: "GeneratePdfDocument",
			Parameters: {
				employeeID: employeeId,
			}
		}).then(e => {
			const iframe = document.getElementById("iframe-pdfHolder");
			if (e) {
				iframe.setAttribute("src", `data:application/pdf;base64,${e}`);
			}
			else {
				iframe.setAttribute("src", "");
			}
		});
	}

	ClearPDFViewer() {
		const iframe = document.getElementById("iframe-pdfHolder");
		if (iframe) {
			iframe.setAttribute("src", "");
		}
	}
}
