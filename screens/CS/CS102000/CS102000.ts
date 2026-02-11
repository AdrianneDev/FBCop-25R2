import {
	createCollection, createSingle,
	PXScreen, PXActionState, graphInfo, viewInfo,
	CALLBACK_COMPLETED_EVENT, CallbackCompletedEvent,
	refreshMenu,
} from "client-controls";

import {
	BAccount, BAccount2,
	Location,
	EPEmployee, Ledger
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.CS.BranchMaint", primaryView: "BAccount" })
export class CS102000 extends PXScreen {
	ViewMainOnMap: PXActionState;
	ViewDefLocationAddressOnMap: PXActionState;
	ViewContact: PXActionState;
	ViewLedger: PXActionState;

	@viewInfo({ containerName: "Branch Summary" })
	BAccount = createSingle(BAccount);

	CurrentBAccount = createSingle(BAccount2);

	@viewInfo({ containerName: "Main Contact" })
	DefContact = createSingle(Contact);

	@viewInfo({ containerName: "Main Address" })
	DefAddress = createSingle(Address);

	@viewInfo({ containerName: "Branch Details" })
	DefLocation = createSingle(Location);

	@viewInfo({ containerName: "Delivery Settings" })
	DefLocationContact = createSingle(Contact);

	@viewInfo({ containerName: "Delivery Settings" })
	DefLocationAddress = createSingle(Address);

	@viewInfo({ containerName: "Employees" })
	Employees = createCollection(EPEmployee);

	@viewInfo({ containerName: "Ledgers" })
	LedgersView = createCollection(Ledger);

	afterConstructor() {
		super.afterConstructor();
		this.eventAggregator.subscribe(CALLBACK_COMPLETED_EVENT, (event: CallbackCompletedEvent) => {
			if (event.command?.contains("Save") || event.command?.contains("Delete")) refreshMenu();
		});
	}
}
