import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import { ODataPreferences, SMDeletedRecordsTrackingTables } from "./views";

@graphInfo({graphType: "PX.Data.DeletedRecordsTracking.DeletedRecordsTrackingMaint", primaryView: "Preferences", })
export class SM207010 extends PXScreen {

   	@viewInfo({containerName: "Preferences"})
	Preferences = createSingle(ODataPreferences);
   	@viewInfo({containerName: "Tables"})
	Tables = createCollection(SMDeletedRecordsTrackingTables);
}
