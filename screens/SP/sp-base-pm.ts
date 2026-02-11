import { bindable} from "aurelia-framework";
import { PXFieldState, localizable, ScreenUpdateParams, columnConfig, linkCommand, createCollection, gridConfig, GridPreset, QpGridCustomElement, PXActionState } from "client-controls";
import { PayMethodViewBase } from "./sp-paymethod";
import { PortalScreen } from "./sp-base";
import { Messages as SysMessages } from "client-controls/services/messages";
import { MenuButton } from "client-controls/controls/compound/tool-bar/qp-tool-bar";

@localizable
class Messages {
	static Delete = "Delete";
	static DeletePaymentMethod = "Delete Payment Method";
	static MakeDefault = "Set as Default";
	static Default = "Default";
	static Exp = "Exp. Date";
	static DeletePopUpMessage = "Are you sure you want to delete this payment method?";

}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pageSize: 20,
	adjustPageSize: true,
	syncPosition: true,
})
export class PaymentMethodView extends PayMethodViewBase {
	@columnConfig({allowCheckAll: true, allowNull: false, allowUpdate: true }) Selected: PXFieldState;
	@linkCommand("viewDetails") Descr: PXFieldState;
	ExpirationDate: PXFieldState;
	CardType: PXFieldState;
	IsPortalDefault: PXFieldState;
	PMInstanceID: PXFieldState;
	PaymentMethodID: PXFieldState;
	CashAccountID: PXFieldState;

	get PayMethodDescr() {
		return this.Descr;
	}

	get expiration() {
		if (!this.ExpirationDate?.value) return "";
		return `${Messages.Exp} ${this.ExpirationDate.value}`;
	}
}

export abstract class PayMethodsPortalScreen extends PortalScreen {
	SysMessages = SysMessages;
	PaymentMethods = createCollection(PaymentMethodView);
	PMbaseMessages = Messages;
	AddNewCard: PXActionState;
	AddNewBankAccount: PXActionState;

	@bindable PaymentMethodsGrid!: QpGridCustomElement;

	private screen = this; // to use in the menu commands, as this is set to PaymentMethodView

	protected paymentMethodCommands(item: PaymentMethodView)  {
		const deleteCommand = new MenuButton("DeletePayMenthod", { text: Messages.Delete, images: { normal: "svg:main@recycle" } });
		const setDefaultCommand = new MenuButton("SetDefaultPayMethod", { text: Messages.MakeDefault, images: { normal: "svg:main@doneMark" } });

		const commands = [deleteCommand];
		if (!item?.IsPortalDefault?.value) {
			commands.push(setDefaultCommand);
		}

		return {
			images: { normal: "svg:main@dots" },
			hideOpener: true,
			tabIndex: -1,
			options: commands,
		};
	}

	protected async processPaymentMethodMenuCommand(item: PaymentMethodView, ev: CustomEvent) {
		const index = this.screen.PaymentMethods.getRowIndex(item);
		if (this.screen.PaymentMethodsGrid) {
			this.screen.PaymentMethodsGrid.setActiveRowIndex(index); // TODO: hack to overcome a bug in Platform
		}
		else {
			this.screen.PaymentMethods.setActiveRow(item);
		}
		try {
			return await this.screenService.executeCommand(ev.detail.id, new ScreenUpdateParams({ blockPage: false, views: null }));
		}
		finally {
			if (this.screen.PaymentMethodsGrid) {
				this.screen.PaymentMethodsGrid.setActiveRowIndex(undefined);
			}
			else {
				this.screen.PaymentMethods.setActiveRow(undefined);
			}
		}
	}
}
