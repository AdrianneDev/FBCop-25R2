import { createCollection, createSingle, PXScreen, graphInfo, viewInfo } from "client-controls";
import {
	GetLinkFilterType,
	SYProviderObject,
	SYProviderField,
	SYProvider,
	SYProviderParameter,
	SYProviderObjectDetail,
	SYProviderFieldDetail,
} from "./views";

@graphInfo({graphType: "PX.Api.SYProviderMaint", primaryView: "Providers", })
export class SM206015 extends PXScreen {
	@viewInfo({containerName: "Attached File Link"})
	GetFileLinkFilter = createSingle(GetLinkFilterType);
	@viewInfo({containerName: "Object Command Editor"})
	CurrentObject = createSingle(SYProviderObject);
	@viewInfo({containerName: "Field Command Editor"})
	CurrentField = createSingle(SYProviderField);
	@viewInfo({containerName: "Provider Summary"})
	Providers = createSingle(SYProvider);
	@viewInfo({containerName: "Parameters"})
	Parameters = createCollection(SYProviderParameter);
	@viewInfo({containerName: "Source Objects"})
	Objects = createCollection(SYProviderObjectDetail);
	@viewInfo({containerName: "Source Fields"})
	Fields = createCollection(SYProviderFieldDetail);
}