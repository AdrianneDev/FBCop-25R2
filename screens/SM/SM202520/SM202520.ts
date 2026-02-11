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
	customDataHandler, autoinject,
	Params, SessionUrlSerializer
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

	@autoinject
	public urlSerializer: SessionUrlSerializer;

	@customDataHandler((screen: SM202520) => {
		const parsedParams = <Params>screen.urlSerializer.parseQueryParams(window.location.search);
		return {
			Note: parsedParams.note
		};
	})
	SM202520Handler() {
		// backend handler
		return;
	}
}
