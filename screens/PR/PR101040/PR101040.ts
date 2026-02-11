import {
	PXActionState,
	PXScreen,
	createSingle,
	graphInfo
} from "client-controls";

import {
	Locations,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";

@graphInfo({
	graphType: "PX.Objects.PR.WorkLocationsMaint",
	primaryView: "Locations"
})
export class PR101040 extends PXScreen {
	ViewOnMap: PXActionState;

	Locations = createSingle(Locations);
	Address = createSingle(Address);
}

