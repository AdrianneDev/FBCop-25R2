import { PXView, createSingle, PXFieldState, PXFieldOptions, featureInstalled, viewInfo, handleEvent, CustomEventType, CallbackCompletedHandlerArgs } from "client-controls";
import { CS101500 } from "../CS101500";

export interface CS101500_CRA extends CS101500 {}
export class CS101500_CRA {
	TaxReportingAccount = createSingle(PRTaxReportingAccount);
	T5018Settings = createSingle(T5018OrganizationSettings);
}

export class T5018OrganizationSettings extends PXView {
	T5018ReportingYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ProgramNumber: PXFieldState;
	TransmitterNumber: PXFieldState;
}

export class PRTaxReportingAccount extends PXView {
	CRAPayrollAccountNumber: PXFieldState;
	T4ContactID: PXFieldState;
	RL1IdentificationNumber: PXFieldState;
	RL1FileNumber: PXFieldState;
	RL1QuebecEnterpriseNumber: PXFieldState;
	RL1QuebecTransmitterNumber: PXFieldState;
}

