import {
	createCollection, createSingle,
	PXScreen, PXActionState, CallbackCompletedEvent,
	graphInfo, viewInfo,
	CALLBACK_COMPLETED_EVENT, refreshMenu
} from "client-controls";

import {
	BAccount, BAccount2, State, LedgerCreateParameters, CommonSetup,
	Location,
	Organization, Company, Branch, EPEmployee, OrganizationLedgerLink,
	GroupOrganizationLink,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.CS.OrganizationMaint", primaryView: "BAccount", })
export class CS101500 extends PXScreen {
	ViewMainOnMap: PXActionState;
	ViewDefLocationAddressOnMap: PXActionState;
	AddLedger: PXActionState;
	ViewBranch: PXActionState;
	ViewContact: PXActionState;
	ViewLedger: PXActionState;

	@viewInfo({ containerName: "Company Summary" })
	BAccount = createSingle(BAccount);

	@viewInfo({ syncAlways: true, containerName: "Hidden Form for VisibleExp of Tab Items" })
	StateView = createSingle(State);

	@viewInfo({ containerName: "Main Address" })
	OrganizationView = createSingle(Organization);

	@viewInfo({ containerName: "Main Contact" })
	DefContact = createSingle(Contact);

	@viewInfo({ containerName: "Create Ledger" })
	CreateLedgerView = createSingle(LedgerCreateParameters);

	CurrentBAccount = createSingle(BAccount2);

	@viewInfo({ containerName: "Main Address" })
	DefAddress = createSingle(Address);

	@viewInfo({ containerName: "Company Details" })
	DefLocation = createSingle(Location);

	@viewInfo({ containerName: "Company Details" })
	commonsetup = createSingle(CommonSetup);

	@viewInfo({ containerName: "Company Details" })
	Company = createSingle(Company);

	@viewInfo({ containerName: "Branches" })
	BranchesView = createCollection(Branch);

	@viewInfo({ containerName: "Delivery Settings" })
	DefLocationContact = createSingle(Contact);

	@viewInfo({ containerName: "Delivery Settings" })
	DefLocationAddress = createSingle(Address);

	@viewInfo({ containerName: "Employees" })
	Employees = createCollection(EPEmployee);

	@viewInfo({ containerName: "Ledgers" })
	OrganizationLedgerLinkWithLedgerSelect = createCollection(OrganizationLedgerLink);

	@viewInfo({ containerName: "Company Groups" })
	Groups = createCollection(GroupOrganizationLink);

	afterConstructor() {
		super.afterConstructor();
		this.eventAggregator.subscribe(CALLBACK_COMPLETED_EVENT, (event: CallbackCompletedEvent) => {
			if (event?.command?.contains("Save") || event?.command?.contains("Delete")) refreshMenu();
		});
	}
}
