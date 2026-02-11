import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, QpTreeSelectorDialogCustomElement, QpTextEditorCustomElement, localizable, QpTreeSelectorCustomElement } from "client-controls";
import { MobileNotification, MobileNotification2, BPEvent, BPEventData } from "./views";

@localizable
export class LocalizableStrings {
	static btnPrevDataField_tooltip = "To use the previous value of the field, add this field to the Fields to Track tab on the Business Event (SM302050) form.";
	static DatafieldToolbarButton = "Datafield";
	static DatafieldPrevToolbarButton = "Previous Datafield";
}

@graphInfo({ graphType: "PX.BusinessProcess.UI.MobileNotificationMaint", primaryView: "Notifications", hideFilesIndicator: true, hideNotesIndicator: true })
export class SM204004 extends PXScreen {
	ViewBusinessEvent: PXActionState;
	CreateBusinessEvent: PXActionState;

	LocalizableStrings = LocalizableStrings;

	Notifications = createSingle(MobileNotification);
	CurrentNotification = createSingle(MobileNotification2);

	@viewInfo({ containerName: "Send by Events" })
	BusinessEvents = createCollection(BPEvent);

	@viewInfo({ containerName: "Create Business Event" })
	NewEventData = createSingle(BPEventData);

	EntityItemsTreeSelector: QpTreeSelectorDialogCustomElement;
	PreviousEntityItemsTreeSelector: QpTreeSelectorDialogCustomElement;
	BodyControl: QpTextEditorCustomElement;

	onHelpClick = (event: MouseEvent, isPrev: boolean): void => {
		const selector = isPrev ? this.PreviousEntityItemsTreeSelector : this.EntityItemsTreeSelector;
		const button = event.target as HTMLElement;
		selector.open(button, button.parentElement.dataset.selectorCaption).whenClosed((result) => {
			if (!result.wasCancelled) {
				const el = this.BodyControl.elemText;
				const text = el.value || "";
				const before = text.substr(0, el.selectionStart);
				const after = text.substr(el.selectionEnd);
				const selectedVal = (isPrev ? "PREV" : "") + result.output.value;
				this.CurrentNotification.Body.value = before + selectedVal + after;
			}
		});
	};
}
