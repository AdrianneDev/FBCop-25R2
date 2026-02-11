import {
	CustomEventType,
	PXActionState,
	PXScreen,
	PXViewCollection,
	RowSelectedHandlerArgs,
	createCollection,
	createSingle,
	graphInfo,
	handleEvent
} from "client-controls";

import {
	PayrollEmployee,
	CurrentPayrollEmployee,
	Contact,
	WorkLocations,
	EmploymentHistory,
	EmployeePositions,
	EmployeeAttributes,
	EmployeeTax,
	EmployeeTaxAttributes,
	EmployeeEarning,
	EmployeeDeduction,
	PREmployeePTOBank,
	EmployeeDirectDeposit,
	CurrentDeduction,
	CreateEditPREmployeeFilter,
	PTOPaidHoursPopupFilter,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";

@graphInfo({
	graphType: "PX.Objects.PR.PREmployeePayrollSettingsMaint",
	primaryView: "PayrollEmployee"
})
export class PR203000 extends PXScreen {
	ViewPayCheck: PXActionState;
	ImportTaxes: PXActionState;
	GarnishmentDetails: PXActionState;

	PayrollEmployee = createSingle(PayrollEmployee);
	CurrentPayrollEmployee = createSingle(CurrentPayrollEmployee);
	Contact = createSingle(Contact);
	Address = createSingle(Address);
	WorkLocations = createCollection(WorkLocations);
	EmploymentHistory = createSingle(EmploymentHistory);
	EmployeePositions = createCollection(EmployeePositions);
	EmployeeAttributes = createCollection(EmployeeAttributes);
	EmployeeTax = createCollection(EmployeeTax);
	EmployeeTaxAttributes = createCollection(EmployeeTaxAttributes);
	EmployeeEarning = createCollection(EmployeeEarning);
	EmployeeDeduction = createCollection(EmployeeDeduction);
	EmployeePTOBanks = createCollection(PREmployeePTOBank);
	EmployeeDirectDeposit = createCollection(EmployeeDirectDeposit);
	CurrentDeduction = createSingle(CurrentDeduction);
	CreateEditPREmployeeFilter = createSingle(CreateEditPREmployeeFilter);
	PTOPaidHoursPopupFilter = createSingle(PTOPaidHoursPopupFilter);

	@handleEvent(CustomEventType.RowSelected, { view: "EmployeePTOBanks" })
	onPREmployeePTOBankChanged(args: RowSelectedHandlerArgs<PXViewCollection<PREmployeePTOBank>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.ViewAvailablePTOPaidHours) model.ViewAvailablePTOPaidHours.enabled = !!ar?.AllowViewAvailablePTOPaidHours.value;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "EmployeeDeduction" })
	onEmployeeDeductionChanged(args: RowSelectedHandlerArgs<PXViewCollection<EmployeeDeduction>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.GarnishmentDetails) model.GarnishmentDetails.enabled = !!ar?.IsGarnishment.value;
	}
}

