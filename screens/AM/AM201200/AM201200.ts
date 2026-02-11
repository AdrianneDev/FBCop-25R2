import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	headerDescription,
	GridAutoGrowMode,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.MRPBucketMaint", primaryView: "CurrentBucket", showActivitiesIndicator: true, showUDFIndicator: true })
export class AM201200 extends PXScreen {
	@viewInfo({ containerName: "MRP Buckets" })
	CurrentBucket = createSingle(CurrentBucket);
	BucketRecords = createCollection(BucketRecords);
}

export class CurrentBucket extends PXView {
	BucketID: PXFieldState;
	ActiveFlg: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoAdjustColumns: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class BucketRecords extends PXView {
	Bucket: PXFieldState;
	Value: PXFieldState;
	Interval: PXFieldState;
}
