import { autoinject } from "aurelia-framework";
import {
	createSingle,
	graphInfo,
	PXFieldState,
	PXView,
	PXScreen,
	PXFieldOptions,
	PXActionState,
	localizable,
	controlConfig
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-person/form-contact-person";

@localizable
class Message {
	static NEWPlaceholder = "<NEW>";
}

export class ContactHeader extends PXView {
	@controlConfig({ nullText: Message.NEWPlaceholder, displayMode: "text" })
	ContactID: PXFieldState;

	Status: PXFieldState<PXFieldOptions.CommitChanges>;
}

@graphInfo({
	graphType: "PX.ExternalCarriersHelper.BrokerMaint",
	primaryView: "Brokers",
	bpEventsIndicator: false
})

@autoinject
export class SO303500 extends PXScreen {
	Brokers = createSingle(ContactHeader);
	BrokerCurrent = createSingle(Contact);
	AddressCurrent = createSingle(Address);
}
