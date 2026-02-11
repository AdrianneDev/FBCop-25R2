import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { IN305000 } from "../IN305000";

export interface IN305000_GeneratorSettings extends IN305000 { }
export class IN305000_GeneratorSettings {
	@viewInfo({ containerName: "Generate Physical Count" })
	GeneratorSettings = createSingle(PIGeneratorSettings);
}

export class PIGeneratorSettings extends PXView {
	PIClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Method: PXFieldState<PXFieldOptions.Disabled>;
}