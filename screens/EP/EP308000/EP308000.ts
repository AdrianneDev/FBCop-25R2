import {
	PXScreen,
	createSingle,
	createCollection,
	graphInfo,
	viewInfo,
	QpGridCustomElement,
	QpGridEventArgs
} from "client-controls";

import {
	Document,
	DocumentProperties,
	Summary,
	Details,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.EquipmentTimeCardMaint",
	primaryView: "Document",
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class EP308000 extends PXScreen {
	Document = createSingle(Document);
	DocumentProperties = createSingle(DocumentProperties);
	Summary = createCollection(Summary);
	Details = createCollection(Details);

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

