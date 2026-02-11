import { ReportScreen } from "./ReportScreen";
import { noView } from "aurelia-framework";
import {
	IDataComponent, IDataComponentParams, PXScreen, ReportSettings
} from "client-controls";

@noView
export class ReportScreenDataComponent implements IDataComponent {
	constructor(private screenVM: PXScreen) {
	}

	getQueryParams(): IDataComponentParams {
		return {};
	}

	setComponentData(result: ReportSettings): void {
		const screen = this.screenVM as ReportScreen;
		screen.setReportDefaults(result);
	}
}
