import { PXFieldState, linkCommand, PXFieldOptions, PXActionState } from "client-controls";
import { ComplianceDocumentBase, ComplianceDocuments } from "src/screens/PM/common/tabs/tab-compliance/tab-compliance";
import { PM302000 } from "../PM302000";

export interface PM302000_Compliance extends PM302000, ComplianceDocumentBase {}
export class PM302000_Compliance extends ComplianceDocumentBase {
	ComplianceDocuments_Vendor_ViewDetails: PXActionState;
}

export interface PM302000_ComplianceDocuments extends ComplianceDocuments {}

export class PM302000_ComplianceDocuments extends ComplianceDocuments {

	@linkCommand("ComplianceDocuments_Vendor_ViewDetails")
	SecondaryVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
}