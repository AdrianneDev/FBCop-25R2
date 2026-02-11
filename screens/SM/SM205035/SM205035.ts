import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, 	IGridColumn } from "client-controls";
import { ExecFilter, AUScheduleExecution, AUScheduleHistory } from "./views";

@graphInfo({ graphType: "PX.SM.AUScheduleExecutionMaint", primaryView: "Filter" })
export class SM205035 extends PXScreen {
	ViewScreen: PXActionState;
	ViewSchedule: PXActionState;
	ViewTotal: PXActionState;
	ViewEntity: PXActionState;

	Filter = createSingle(ExecFilter);
	Executions = createCollection(AUScheduleExecution);

	@viewInfo({ containerName: "Processing Results1" })
	Histories = createCollection(AUScheduleHistory);

	onFilterHistoryColumns(col: IGridColumn) {
		col.allowFilter = col.field === "ExecutionStatus" || col.field === "ExecutionResult";
		return true;
	}

}