import {
	PXScreen, createSingle, createCollection, graphInfo, PXActionState, viewInfo, actionConfig
} from "client-controls";
import {
	FixedAsset,
	FixedAsset2,
	FADetails,
	FALocationHistory,
	FABookBalance,
	FAComponent,
	FAHistory,
	DeprBookFilter,
	FASheetHistory,
	FASetup,
	TranBookFilter,
	FATran,
	GLTranFilter,
	DsplFAATran,
	DisposeParams,
	SuspendParameters,
	ReverseDisposalInfo,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.FA.AssetMaint",
	primaryView: "Asset",
	udfTypeField: "AssetTypeID",
	showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true
})
export class FA303000 extends PXScreen {
	@actionConfig({
		popupCommand: "Cancel"
	})
	ViewDocument: PXActionState;
	ViewReconcileDocument: PXActionState;
	ViewBatch: PXActionState;
	ReduceUnreconCost: PXActionState;
	DisposalOK: PXActionState;


	@viewInfo({ containerName: "Fixed Assets" })
	Asset = createSingle(FixedAsset);

	@viewInfo({ containerName: "Current Asset" })
	CurrentAsset = createSingle(FixedAsset2);

	@viewInfo({ containerName: "Asset Details" })
	AssetDetails = createSingle(FADetails);

	@viewInfo({ containerName: "General -> Tracking Info" })
	AssetLocation = createSingle(FALocationHistory);

	@viewInfo({ containerName: "Balance" })
	AssetBalance = createCollection(FABookBalance);

	@viewInfo({ containerName: "Components" })
	AssetElements = createCollection(FAComponent);

	@viewInfo({ containerName: "Depreciation -> Book" })
	deprbookfilter = createSingle(DeprBookFilter);

	@viewInfo({ syncAlways: true })
	fasetup = createSingle(FASetup);

	@viewInfo({ containerName: "Depreciation -> Period" })
	AssetHistory = createCollection(FAHistory);

	@viewInfo({ containerName: "Depreciation" })
	BookSheetHistory = createCollection(FASheetHistory);

	@viewInfo({ containerName: "Transactions -> Book" })
	bookfilter = createSingle(TranBookFilter);

	@viewInfo({ containerName: "Transactions" })
	FATransactions = createCollection(FATran);

	@viewInfo({ containerName: "Locations" })
	LocationHistory = createCollection(FALocationHistory);

	@viewInfo({ containerName: "Reconciliation -> Reconciliation Type" })
	GLTrnFilter = createSingle(GLTranFilter);

	@viewInfo({ containerName: "Reconciliation" })
	DsplAdditions = createCollection(DsplFAATran);

	@viewInfo({ containerName: "Disposal Parameters -> Dispose Parameters" })
	DispParams = createSingle(DisposeParams);

	@viewInfo({ containerName: "Suspend Parameters -> Dispose Parameters" })
	SuspendParams = createSingle(SuspendParameters);

	@viewInfo({ containerName: "Reverse Disposal Info -> Reverse Disposal Info" })
	RevDispInfo = createSingle(ReverseDisposalInfo);
}
