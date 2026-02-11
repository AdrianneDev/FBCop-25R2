import {
	PXScreen,
	createSingle,
	createCollection,
	graphInfo
} from "client-controls";

import {
	ProjectManagementSetup,
	ProjectIssueTypes,
	DailyFieldReportCopyConfiguration,
	WeatherIntegrationSetup,
	SubmittalTypes,
	PhotoLogSetup,
	PhotoLogStatuses,
	PhotoLogAttributes,
	DrawingLogSetup,
	DrawingLogDisciplines,
	DrawingLogStatuses,
	DrawingLogAttributes
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PJ.ProjectManagement.PJ.Graphs.ProjectManagementSetupMaint",
	primaryView: "ProjectManagementSetup"
})
export class PJ101000 extends PXScreen {
	ProjectManagementSetup = createSingle(ProjectManagementSetup);
	ProjectIssueTypes = createCollection(ProjectIssueTypes);
	DailyFieldReportCopyConfiguration = createSingle(DailyFieldReportCopyConfiguration);
	WeatherIntegrationSetup = createSingle(WeatherIntegrationSetup);
	SubmittalTypes = createCollection(SubmittalTypes);
	PhotoLogSetup = createSingle(PhotoLogSetup);
	PhotoLogStatuses = createCollection(PhotoLogStatuses);
	PhotoLogAttributes = createCollection(PhotoLogAttributes);
	DrawingLogSetup = createSingle(DrawingLogSetup);
	DrawingLogDisciplines = createCollection(DrawingLogDisciplines);
	DrawingLogStatuses = createCollection(DrawingLogStatuses);
	DrawingLogAttributes = createCollection(DrawingLogAttributes);
}

