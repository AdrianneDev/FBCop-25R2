import { controlConfig, GridCell, PXView, readOnly } from "client-controls";

import "./sp-paymethod.scss";

export abstract class PayMethodViewBase extends PXView {
	get PayMethodDescr(): GridCell | null {
		return null;
	}
	get PayMethodID(): GridCell | null {
		return null;
	}

	get paymentMethod() {
		const descr = this.PayMethodDescr?.value;
		if (!descr) return this.PayMethodID?.cellText?.toLowerCase() ?? "";
		// keep last [****-1234] part of the card number
		return descr.includes("****") ? descr.substr(descr.length - 9) : descr; // eslint-disable-line @typescript-eslint/no-magic-numbers
	}

	get isCard() {
		const descr = this.PayMethodDescr?.value;
		return descr?.includes("****") ?? false;
	}

	get cardIcon() {
		const card = this.PayMethodDescr?.value;
		if (!card) return "";
		if (card.startsWith ("Visa")) return "svg:sp@visa";
		if (card.startsWith ("MasterCard")) return "svg:sp@mastercard";
		if (card.startsWith ("American Express")) return "svg:sp@amex";
		if (card.startsWith ("Discover")) return "svg:sp@discover";
		return "svg:sp@emptycard";
	}
}

