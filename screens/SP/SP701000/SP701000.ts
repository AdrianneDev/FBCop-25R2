import "./SP701000.scss";
import {
	PXScreen,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	localizable,
	PXFieldState,
	linkCommand,
	GridPreset,
	gridConfig
} from "client-controls";
import { PortalView } from "../sp-base";

@gridConfig({
	preset: GridPreset.Primary,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	syncPosition: true,
})
export class PortalUsersView extends PXView {
	Email: PXFieldState;
	@linkCommand("viewContact") DisplayName: PXFieldState;
	@linkCommand("viewBAccount") BAccount__AcctName: PXFieldState;
	RolesCSV: PXFieldState;
	Users__State: PXFieldState;
}

export class PortalCustomersView extends PXView {
	AcctName: PXFieldState;
}

@graphInfo({ graphType: "PX.Objects.Portals.SPPortalMaint", primaryView: "Portal" })
export class SP701000 extends PXScreen {
	Portal = createSingle(PortalView);

	PortalUsers = createCollection(PortalUsersView);
}