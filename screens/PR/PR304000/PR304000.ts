import {
	PXScreen,
	graphInfo,
	PXActionState,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	autoinject,
	PXViewCollection,
	createSingle,
	createCollection,
	viewInfo
} from "client-controls";

import { PRTaxFormBatch, PREmployeeTaxForm, EmployeeSlipAlreadyPublished } from "./views";

@graphInfo({ graphType: "PX.Objects.PR.PRTaxFormBatchMaint", primaryView: "SubmissionDocument", })
@autoinject
export class PR304000 extends PXScreen {
	ViewTaxFormBatch: PXActionState;
	SubmissionDocument = createSingle(PRTaxFormBatch);
	BatchEmployees = createCollection(PREmployeeTaxForm);
	@viewInfo({ containerName: "Confirmation" })
	EmployeeSlipAlreadyPublished = createSingle(EmployeeSlipAlreadyPublished);
	previousEmployeeRowId: number;
	pdfSubscription: any;

	// Load the PDF when a grid row is selected
	@handleEvent(CustomEventType.RowSelected, { view: "BatchEmployees" })
	onEmployeesWithPaychecksRowChange(args: RowSelectedHandlerArgs<PXViewCollection<PREmployeeTaxForm>>) {
		if (!args?.viewModel?.activeRow?.EmployeeID?.value) return;
		if (this.previousEmployeeRowId === args.viewModel.activeRow.EmployeeID.value) return;

		// Load the PDF by employee ID of the selected row
		this.previousEmployeeRowId = args.viewModel.activeRow.EmployeeID.value;
		this.baseApiClient.fetchExt(`ui/screen/PR304000/lob`, {
			Command: "GeneratePdfDocument",
			Parameters: {
				employeeID: args.viewModel.activeRow.EmployeeID.value,
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
}
