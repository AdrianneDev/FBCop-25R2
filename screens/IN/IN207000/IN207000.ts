import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INLotSerClassMaint",
	primaryView: "lotserclass",
})
export class IN207000 extends PXScreen {
	@viewInfo({containerName: "Lot/Serial Settings Summary"})
	lotserclass = createSingle(INLotSerClass);

	@viewInfo({ containerName: "Lot/Serial Settings" })
	CurrentLotSerClass = createSingle(INLotSerClassAttributeSettings);

	@viewInfo({containerName: "Numbering Settings"})
	lotsersegments = createCollection(INLotSerSegment);

	@viewInfo({ containerName: "Attributes" })
	Attributes = createCollection(LotSerialAttributes);
}

export class INLotSerClass extends PXView {
	LotSerClassID: PXFieldState;
	Descr: PXFieldState;
	LotSerTrack: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerTrackExpiration: PXFieldState;
	RequiredForDropship: PXFieldState;
	LotSerAssign: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerIssueMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerNumShared: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerNumVal: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoNextNbr: PXFieldState;
	AutoSerialMaxCount: PXFieldState;
}

export class INLotSerClassAttributeSettings extends PXView {
	UseLotSerSpecificDetails: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
})
export class INLotSerSegment extends PXView {
	SegmentID: PXFieldState;
	SegmentType: PXFieldState<PXFieldOptions.CommitChanges>;
	SegmentValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class LotSerialAttributes extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	CSAttribute__Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState<PXFieldOptions.CommitChanges>;
	CSAttribute__ControlType: PXFieldState;
}
