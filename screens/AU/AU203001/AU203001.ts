import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo } from "client-controls";
import { RowFilter, RowTableDefinition, RowFilterCreateTable } from "./views";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.SM.GraphTableList", primaryView: "Filter", })
export class AU203001 extends AuBaseScreen {
	actionEdit: PXActionState;

	Filter = createSingle(RowFilter);
	ViewTables = createCollection(RowTableDefinition);
   	@viewInfo({containerName: "Select Existing Data Access Class"})
	TableSelectorDlg = createSingle(RowFilterCreateTable);
}
