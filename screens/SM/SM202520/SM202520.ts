import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	PXPageLoadBehavior,
	customDataHandler,
} from "client-controls";
import { ClearDateFilter, GetLinkFilterType, FilesFilter, UploadFile } from "./views";

@graphInfo({graphType: "PX.SM.UploadFileInq", primaryView: "Filter", })
export class SM202520 extends PXScreen {

	@viewInfo({containerName: "Choose date"})
	ClearingFilter = createSingle(ClearDateFilter);
	@viewInfo({containerName: "File Link"})
	GetFileLinkFilter = createSingle(GetLinkFilterType);
	@viewInfo({containerName: "Selection"})
	Filter = createSingle(FilesFilter);
	Files = createCollection(UploadFile);

	@customDataHandler((screen: SM202520) => {
		const parsedParams = new URLSearchParams(window.location.search);
		return {
			Note: parsedParams.get("note") ?? undefined,
		};
	})
	SM202520Handler() {
		// backend handler
		return;
	}
}
