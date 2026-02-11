import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	handleEvent,

	GridPreset,
	CustomEventType,
	RowCssHandlerArgs,
	PXViewCollection,
} from "client-controls";

export abstract class BarcodeProcessingScreen extends PXScreen {
	@viewInfo({ containerName: "Scan Information" })
	Info = createSingle(ScanInfo);

	@viewInfo({ containerName: "Scan Logs" })
	Logs = createCollection(ScanLogs);

	@handleEvent(CustomEventType.GetRowCss, { view: "Logs" })
	getLogsRowCss(args: RowCssHandlerArgs<PXViewCollection<ScanLogs>>) {
		if (args?.selector?.row?.MessageType.value === "ERR") {
			return "errorLog";
		}
		else if (args?.selector?.row?.MessageType.value === "WRN") {
			return "warningLog";
		}

		return undefined;
	}
}

export class ScanHeaderBase extends PXView {
	Barcode: PXFieldState; // must not have CommitChanges, because the related control has its own custom commit logic
	ProcessingSucceeded: PXFieldState<PXFieldOptions.Disabled>;
	Message: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Multiline | PXFieldOptions.NoLabel>;
}

export class ScanInfo extends PXView {
	Mode: PXFieldState<PXFieldOptions.Disabled>;
	ModeCaption: PXFieldState<PXFieldOptions.Disabled>;
	Message: PXFieldState<PXFieldOptions.Disabled>;
	MessageType: PXFieldState<PXFieldOptions.Disabled>;
	MessageSoundFile: PXFieldState<PXFieldOptions.Disabled>;
	PromptOnly: PXFieldState<PXFieldOptions.Disabled>;
	Question: PXFieldState<PXFieldOptions.Disabled>;
	Instructions: PXFieldState<PXFieldOptions.Disabled>;
	Prompt: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false
})
export class ScanLogs extends PXView {
	ScanTime: PXFieldState<PXFieldOptions.Disabled>;
	Mode: PXFieldState<PXFieldOptions.Disabled>;
	PromptCombined: PXFieldState<PXFieldOptions.Disabled>;
	Scan: PXFieldState<PXFieldOptions.Disabled>;
	Message: PXFieldState<PXFieldOptions.Disabled>;
	MessageType: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Hidden>;
}
