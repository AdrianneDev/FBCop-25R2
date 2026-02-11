import {
	PXScreen, createCollection, graphInfo, PXView, gridConfig, GridPreset,
	PXFieldState, PXActionState,
	columnConfig, linkCommand,
} from "client-controls";

@gridConfig({ preset: GridPreset.Processing })
export class FARegister extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	BranchID: PXFieldState;

	@linkCommand("Docs_refNbr_ViewDetails")
	RefNbr: PXFieldState;

	DocDate: PXFieldState;

	Origin: PXFieldState;

	DocDesc: PXFieldState;

	Hold: PXFieldState;

	IsEmpty: PXFieldState;

}

@graphInfo({
	graphType: "PX.Objects.FA.DeleteDocsProcess", primaryView: "Docs",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class FA508000 extends PXScreen {
	Docs = createCollection(FARegister);

	Docs_refNbr_ViewDetails: PXActionState;
}
