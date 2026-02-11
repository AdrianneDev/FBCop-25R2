import { PortalScreen } from "../sp-base";
import "../sp-common.scss";
import "./SP324010.scss";
import {
	graphInfo,
	PXView,
	PXFieldState,
	readOnly,
	controlConfig,
	createCollection,
	gridConfig,
	GridPreset,
	columnConfig
} from "client-controls";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	allowStoredFilters: true,
})
export class Statement extends PXView {
	@readOnly StatementDate: PXFieldState;
	@readOnly BranchID: PXFieldState;
	@readOnly @controlConfig({ linkCommand: "viewDetails" }) @columnConfig({ allowFilter: false }) StatementDateText: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) AcctName: PXFieldState;
	@readOnly CuryEndBalance_Text: PXFieldState;
	@readOnly EndBalance_Text: PXFieldState;
}

@graphInfo({ graphType: "PX.Objects.Portals.SPStatementsMaint", primaryView: "Statements" })
export class SP324010 extends PortalScreen {
	Statements = createCollection(Statement);
}
