import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, QpGridCustomElement, QpGridEventArgs } from "client-controls";
import { EPTimeCard, CRActivity, EPTimeCardSummary, PMTimeActivity, EPTimeCardItem, TimeLog } from "./views";

@graphInfo({graphType: "PX.Objects.EP.TimeCardMaint", primaryView: "Document", bpEventsIndicator: true, showActivitiesIndicator: true, showUDFIndicator: true })
export class EP305000 extends PXScreen {
	PreloadFromTimeLog: PXActionState;
	PreloadFromTasks: PXActionState;
	preloadFromTasks: PXActionState;
	PreloadFromPreviousTimecard: PXActionState;
	PreloadHolidays: PXActionState;
	NormalizeTimecard: PXActionState;

   	@viewInfo({containerName: "Document Summary"})
	Document = createSingle(EPTimeCard);

	@viewInfo({ containerName: "Preload from Tasks" })
	Tasks = createCollection(CRActivity);

	@viewInfo({ containerName: "Summary" })
	Summary = createCollection(EPTimeCardSummary);

	@viewInfo({ containerName: "Details" })
	Activities = createCollection(PMTimeActivity);

	@viewInfo({ containerName: "Time Log" })
	TimeLogs = createCollection(TimeLog);

	@viewInfo({ containerName: "Materials" })
	Items = createCollection(EPTimeCardItem);

	@handleEvent(CustomEventType.RowSelected, { view: "Activities" })
	onActivitiesChanged(args: RowSelectedHandlerArgs<PXViewCollection<PMTimeActivity>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.View) model.View.enabled = !!ar?.IsActivityExists.value;
	}

	protected async onSummaryGridDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const defaultTotal = "00:00";
		const fieldName = 0;
		const fieldValue = 1;
		const totals = [
			["Sun", this.Document.SunTotal?.value],
			["Mon", this.Document.MonTotal?.value],
			["Tue", this.Document.TueTotal?.value],
			["Wed", this.Document.WedTotal?.value],
			["Thu", this.Document.ThuTotal?.value],
			["Fri", this.Document.FriTotal?.value],
			["Sat", this.Document.SatTotal?.value],
			["TimeSpent", this.Document.WeekTotal?.value]
		];
		totals.forEach((total) => {
			const column = grid.getColumn(total[fieldName]);
			if (column) column.footerText = this.formatTime(total[fieldValue] ?? defaultTotal);
		});
	}

	private formatTime(totalMinutes: number): string {
		const minLength = 2;
		const negative = "-";
		const oneHour = 60;
		const separator = ":";
		const zeroChar = "0";
		const zeroMinutes = 0;
		const totalMinutesAbs = Math.abs(totalMinutes ?? zeroMinutes);
		const hours = Math.floor(totalMinutesAbs / oneHour) ;
		const minutes = Math.floor(totalMinutesAbs - (hours * oneHour));
		let formattedTime = hours.toString().padStart(minLength, zeroChar) + separator + minutes.toString().padStart(minLength, zeroChar);
		if (totalMinutes < zeroMinutes) formattedTime = negative + formattedTime;
		return formattedTime;
	}
}
