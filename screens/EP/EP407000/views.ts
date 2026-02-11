import {
	columnConfig,
	gridConfig,
	linkCommand,
	PXFieldState,
	PXView,
	GridPreset
} from "client-controls";

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class Items extends PXView {
	@linkCommand("updateDetail")
	TimeCardCD: PXFieldState;
	@columnConfig({ hideViewLink: true })
	EquipmentID: PXFieldState;
	Status: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardSpentTotals__SetupTime: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardSpentTotals__RunTime: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardSpentTotals__SuspendTime: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardSpentTotals__TimeTotalCalc: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardBillableTotals__SetupTime: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardBillableTotals__RunTime: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardBillableTotals__SuspendTime: PXFieldState;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	EPEquipmentTimeCardBillableTotals__TimeTotalCalc: PXFieldState;
}
