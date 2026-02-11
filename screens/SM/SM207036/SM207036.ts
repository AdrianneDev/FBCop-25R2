import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
} from "client-controls";
import { SYMapping, SYHistory, SYData, SYMappingDetails, SYImportOperation } from "./views";

@graphInfo({graphType: "PX.Api.SYExportProcessSingle", primaryView: "MappingsSingle", })
export class SM207036 extends PXScreen {
	@viewInfo({containerName: "Selection"})
	MappingsSingle = createSingle(SYMapping);

	@viewInfo({containerName: "Prepared Data"})
	PreparedData = createCollection(SYData);
	@viewInfo({containerName: "History"})
	History = createCollection(SYHistory);

	@viewInfo({containerName: "Details"})
	MappingsSingleDetails = createSingle(SYMappingDetails);
	@viewInfo({containerName: "Details"})
	Operation = createSingle(SYImportOperation);
}