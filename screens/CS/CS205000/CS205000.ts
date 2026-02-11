import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig,
	PXFieldOptions, columnConfig, GridColumnType, TextAlign, GridPreset, GridFastFilterVisibility
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.CSAttributeMaint", primaryView: "Attributes", })
export class CS205000 extends PXScreen {
  @viewInfo({ containerName: "Attribute Summary"})
  Attributes = createSingle(CSAttribute);

  @viewInfo({ containerName: "Attribute Details" })
  AttributeDetails = createCollection(CSAttributeDetail);
}


export class CSAttribute extends PXView  {
	AttributeID: PXFieldState;
	Description: PXFieldState;
	ControlType: PXFieldState<PXFieldOptions.CommitChanges>;
	IsInternal: PXFieldState;
	ContainsPersonalData: PXFieldState;
	EntryMask: PXFieldState;
	RegExp: PXFieldState;
	Precision: PXFieldState;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False,
})
export class CSAttributeDetail extends PXView  {
	ValueID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Right })
	SortOrder: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Disabled: PXFieldState;
}
