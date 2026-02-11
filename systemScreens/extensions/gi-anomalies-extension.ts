import {
	createSingle,
	ExecuteCommandEvent,
	fieldConfig,
	gridConfig,
	GridFilterRow,
	GridPreset,
	IGridRow,
	IScreenApiQuery,
	IScreenApiResult,
	Messages,
	PXFieldState,
	PXView,
	QpEventManager,
	ServerCommand,
} from "client-controls";
import { GI000000 } from "../GenericInquiry";

interface PickerValue {
	id: string;
	text: string;
}
export interface GI000000_anomalies_extension extends GI000000 {}
export class GI000000_anomalies_extension {
	MlGroupsAliases: string[];
	GIMLProcessingInfo = createSingle(GIMLProcessingInfo);

	protected async onAfterInitialize() {
		const eventManager = this.container.root.get(QpEventManager);
		const filterSubscr = eventManager.subscribe(ExecuteCommandEvent,
			(cmdEv: ExecuteCommandEvent) => {
				this.filterByGroupHandler(cmdEv);
			});
		this.subscribers.push(filterSubscr);
		const request = { data: [], viewsParams: { MlGroups: {} }, controlsParams: { MlGroups: { columns: [{ field: "giFieldAlias" }], resultType: "GridData", view: "MlGroups" } }} as IScreenApiQuery;
		const result = await this.screenService.screenApiClient.executeCallback(this.genericInquiryId, request);
		this.initFilterByGroupAction(result as IScreenApiResult);
	}

	private initFilterByGroupAction(apiResult: IScreenApiResult): void {
		const data = apiResult?.controlsData?.MlGroups?.rows as IGridRow[];
		if (data) {
			this.MlGroupsAliases = data.map((row) => row.cells.giFieldAlias.value);
		}
	}

	private async filterByGroupHandler(e: ExecuteCommandEvent): Promise<void> {
		const commandsToHandle = new ServerCommand();
		for (const serverCommand of e.Command) {
			if (serverCommand != null && serverCommand.name === "filterByGroup") {
				const selectedRow = this.Results.activeRow;
				if (selectedRow && this.MlGroupsAliases?.length) {
					const filterRows: GridFilterRow[] = this.MlGroupsAliases
						.filter(r => r != null && r.trim() !== "")
						.map(filterColName => {
							const filter = new GridFilterRow();
							filter.field = filterColName;
							const groupColValue = selectedRow.getValue(filterColName);
							filter.condition = groupColValue ? "EQ" : "ISNULL";
							if (groupColValue === null) {
								filter.value = null;
								filter.text = Messages.GridIsEmpty;
							}
							else if (this.isPickerValue(groupColValue)) {
								filter.value = groupColValue.id;
								filter.text = `= '${groupColValue.text}'`;
							}
							else {
								filter.value = groupColValue;
								filter.text = `= '${groupColValue}'`;
							}
							return filter;
						});
					await this.gridVM.setFilterRows(null, null, filterRows);
				}
				continue;
			}
			commandsToHandle.push(serverCommand);
		}
		if (!commandsToHandle.length) {
			e.stop();
		}
		else {
			e.Command = commandsToHandle;
		}
	}

	private isPickerValue(value: any): value is PickerValue {
		return value && value.hasOwnProperty("id") && value.hasOwnProperty("text");
	}
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class GIMLProcessingInfo extends PXView {
	@fieldConfig({ controlConfig: { readOnly: true } })
	mlTargetColumn: PXFieldState;
	@fieldConfig({ controlConfig: { readOnly: true } })
	mlTimeAxis: PXFieldState;
	@fieldConfig({ controlConfig: { readOnly: true } })
	groupFields: PXFieldState;
	@fieldConfig({ controlConfig: { readOnly: true } })
	mlReCalcIntervalType: PXFieldState;
	GIMLProcessing__importDate: PXFieldState;
	GIMLProcessing__nextRun: PXFieldState;
	GIMLProcessing__anomalySettings: PXFieldState;
}
