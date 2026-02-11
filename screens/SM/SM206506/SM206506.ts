import {
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	commitChanges,
	QpEventManager,
	UpdateFilesGridEvent,
} from "client-controls";
import { delegationStrategy } from "aurelia-binding";
import { PLATFORM } from "aurelia-pal";

@graphInfo({
	graphType: "PX.SM.ScanJobInfoMaint",
	primaryView: "ScanJobInfoRecord",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	showUDFIndicator: false,
	bpEventsIndicator: false,
	showActivitiesIndicator: false,
})
export class SM206506 extends PXScreen {
	ScanJobInfoRecord = createSingle(SMScanJobInfo);

	afterConstructor() {
		super.afterConstructor();

		this.subscribers.push(this.eventManager.addEventListener(window, "pagehide", (e: BeforeUnloadEvent) => {
			const win = PLATFORM.global;
			const parentScreenEventManager = win.legacyUIService.getScreenService().container.get(QpEventManager);
			parentScreenEventManager.publish(new UpdateFilesGridEvent());
		}, delegationStrategy.none, true));
	}
}

export class SMScanJobInfo extends PXView {
	@commitChanges
	ScannerID: PXFieldState;
	PaperSource: PXFieldState;
	PixelType: PXFieldState;
	Resolution: PXFieldState;
	FileType: PXFieldState;
	FileName: PXFieldState;
}
