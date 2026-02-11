import { PortalScreen } from "../sp-base";
import { Case } from "../sp-cases";
import "../sp-common.scss";
import "./SP401010.scss";
import { createCollection, graphInfo } from "client-controls";

@graphInfo({ graphType: "PX.Objects.Portals.SPCasesMaint", primaryView: "Cases" })
export class SP401010 extends PortalScreen {
	Cases = createCollection(Case);
}
