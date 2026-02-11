import { ImportSnapshotSettings, ExportSnapshotSettings, CopyCompanySettings, UPCompany, UPSnapshot, UPSnapshotHistory, Users } from "./views";
import { PXScreen, graphInfo, viewInfo, createSingle, createCollection, PXPageLoadBehavior, handleEvent, CustomEventType, CallbackCompletedHandlerArgs } from "client-controls";

@graphInfo({graphType: "PX.SM.CompanyMaint", primaryView: "Companies", pageLoadBehavior: PXPageLoadBehavior.SearchSavedKeys })
export class SM203520 extends PXScreen {

	@viewInfo({containerName: "Company Summary"})
	Companies = createSingle(UPCompany);

	@viewInfo({containerName: "Snapshots"})
	Snapshots = createCollection(UPSnapshot);

	@viewInfo({containerName: "Snapshot Restoration History"})
	SnapshotsHistory = createCollection(UPSnapshotHistory);

	@viewInfo({containerName: "Users"})
	Users = createCollection(Users);

	@viewInfo({containerName: "Restore Snapshot"})
	ImportSnapshotPanel = createSingle(ImportSnapshotSettings);
	@viewInfo({containerName: "Reset Data"})
	ReloadSnapshotPanel = createSingle(ImportSnapshotSettings);
	@viewInfo({containerName: "Create Snapshot"})
	ExportSnapshotPanel = createSingle(ExportSnapshotSettings);
	@viewInfo({containerName: "Copy Company"})
	CopyCompanyPanel = createSingle(CopyCompanySettings);

	@handleEvent(CustomEventType.CallbackCompleted)
	onCommandExecuted(args: CallbackCompletedHandlerArgs<any>) {
		if (args.actionName && args.actionName.toLowerCase() === "savecompanycommand") {
			(<any> window).savePerformed = true;
		}
	}
}
