import {
	createCollection,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	WeatherProcessingLogs
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.DailyFieldReports.PJ.Graphs.ClearWeatherProcessingLogProcess",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	primaryView: "WeatherProcessingLogs"
})
export class PJ504010 extends PXScreen {
	ViewEntity: PXActionState;
	WeatherProcessingLogs = createCollection(WeatherProcessingLogs);
}
