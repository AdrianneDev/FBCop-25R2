import {
	createSingle, PXScreen, graphInfo, viewInfo,
	PXView,
	PXFieldState
} from "client-controls";
import { RMDataSource, RMReport, RMStyle } from "../common/arm/arm-reports-views";

export class ParamFilter extends PXView {
	NewReportCode: PXFieldState;
}

@graphInfo({ graphType: "PX.CS.RMReportMaint", primaryView: "Report" })
export class CS206000 extends PXScreen {

	@viewInfo({ containerName: "Report" })
	Report = createSingle(RMReport);

	@viewInfo({ containerName: "Data Source" })
	CurrentDataSource = createSingle(RMDataSource);

	@viewInfo({ containerName: "Font Style" })
	CurrentStyle = createSingle(RMStyle);

	Parameter = createSingle(ParamFilter);
}
