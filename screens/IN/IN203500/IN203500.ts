import {
	PXScreen,
	graphInfo,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	createSingle,
} from "client-controls";
import {
	CreateMatrixHeaderBase,
} from "../common/matrix-items/panel-create-matrix-items/panel-create-matrix-items";

@graphInfo({
	graphType: "PX.Objects.IN.Matrix.Graphs.CreateMatrixItems",
	primaryView: "Header",
})
export class IN203500 extends PXScreen {
	@viewInfo({ containerName: "Header" })
	Header = createSingle(EntryHeader);
}

// Views

export class EntryHeader extends CreateMatrixHeaderBase {
	CreateUpdate: PXActionState;
	TemplateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
}