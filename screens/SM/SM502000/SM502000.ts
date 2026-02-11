import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { NotificationEvent, PushNotificationsFailedToSend } from "./views";

@graphInfo({graphType: "PX.PushNotifications.UI.FailedToSendPushNotificationsProcess", primaryView: "FailedToSend", })
export class SM502000 extends PXScreen {

   	@viewInfo({containerName: "Notification Event"})
	PopupDefinition = createSingle(NotificationEvent);

   	FailedToSend = createCollection(PushNotificationsFailedToSend);
}