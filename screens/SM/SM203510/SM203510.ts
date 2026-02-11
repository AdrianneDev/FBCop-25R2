import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
} from "client-controls";
import {
	Version,
	LockoutFilter,
	UPLogFileFilter,
	VersionFilter,
	AvailableVersion,
	UPHistory,
	UPErrors,
} from "./views";

@graphInfo({ graphType: "PX.SM.UpdateMaint", primaryView: "VersionRecord" })
export class SM203510 extends PXScreen {
	@viewInfo({ containerName: "Current Version" })
	VersionRecord = createSingle(Version);
	@viewInfo({ containerName: "Schedule Lockout" })
	LockoutFilterRecord = createSingle(LockoutFilter);
	@viewInfo({ containerName: "Log" })
	LogFileFilterRecord = createSingle(UPLogFileFilter);
	@viewInfo({ containerName: "Updates" })
	VersionFilterRecord = createSingle(VersionFilter);
	@viewInfo({ containerName: "Available Updates" })
	AvailableVersions = createCollection(AvailableVersion);

	@viewInfo({ containerName: "Update History" })
	UpdateHistoryFullRecords = createCollection(UPHistory);

	@viewInfo({ containerName: "Update Errors" })
	UpdateErrorRecords = createCollection(UPErrors);

	@handleEvent(CustomEventType.RowSelected, { view: "AvailableVersions" })
	onAvailableVersionSelected(args: RowSelectedHandlerArgs<PXViewCollection<AvailableVersion>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.DownloadVersionCommand) {
			model.DownloadVersionCommand.enabled = !!ar;
		}

		if (model.ApplyVersionCommand) {
			model.ApplyVersionCommand.enabled = !!ar;
		}
	}
}
