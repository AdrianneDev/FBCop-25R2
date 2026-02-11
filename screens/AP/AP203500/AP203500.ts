import { createCollection, createSingle, graphInfo, PXActionState, PXScreen } from "client-controls";
import { Schedule, APRegister, APRegister2 } from "./views";

@graphInfo({
	graphType: "PX.Objects.AP.APScheduleMaint", primaryView: "Schedule_Header",
	showUDFIndicator: true, showActivitiesIndicator: true,
})
export class AP203500 extends PXScreen {

	ViewDocument: PXActionState;
	ViewGenDocument: PXActionState;

	Schedule_Header = createSingle(Schedule);
	Document_Detail = createCollection(APRegister);
	Document_History = createCollection(APRegister2);

}
