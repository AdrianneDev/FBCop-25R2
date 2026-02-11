import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	GridColumnType,
	gridConfig,
	columnConfig,
	GridPreset,
	headerDescription,
	CurrencyInfo,
	ScreenUpdateParams,
	fieldConfig,
} from "client-controls";
import { LSNullText } from "src/screens/IN/common/line-splitting/views";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.SO.SOShipmentEntry",
	primaryView: "Document",
	udfTypeField: "ShipmentType",
	bpEventsIndicator: true,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
})
export class SO302000 extends PXScreen {
	CalculateFreight: PXActionState;

	@viewInfo({ containerName: "Shipment Summary" })
	Document = createSingle(SOShipmentHeader);

	@viewInfo({ containerName: "Shipment Information" })
	CurrentDocument = createSingle(SOShipment);

	@viewInfo({ containerName: "Currency rate" })
	_SOShipment_CurrencyInfo_ = createSingle(CurrencyInfo);

	@viewInfo({ containerName: "Details" })
	Transactions = createCollection(Transactions);

	@viewInfo({ containerName: "Orders" })
	OrderList = createCollection(OrderList);

	@viewInfo({ containerName: "Ship-To Contact" })
	Shipping_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Ship-To Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Packages" })
	Packages = createCollection(Packages);

	@viewInfo({ containerName: "Contents of Selected Package" })
	PackageDetailSplit = createCollection(PackageDetailSplit);

	@viewInfo({ containerName: "Pacejet Options" })
	CarrierData = createSingle(CarrierData);
}

export class SOShipmentHeader extends PXView {
	ShipmentNbr: PXFieldState;
	ShipmentType: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	Operation: PXFieldState;
	ShipDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	DestinationSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "WorkgroupID",
				valueField: "Description",
				dataMember: "_EPCompanyTree_Tree_",
				textField: "Description",
				mode: "single",
				hideRootNode: true
			},
		},
	})
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;

	OwnerID: PXFieldState;
	CurrentWorksheetNbr: PXFieldState;
	ShipmentQty: PXFieldState<PXFieldOptions.Readonly>;
	ControlQty: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipmentWeight: PXFieldState<PXFieldOptions.Readonly>;
	ShipmentVolume: PXFieldState<PXFieldOptions.Readonly>;
	PackageWeight: PXFieldState<PXFieldOptions.Readonly>;
	PackageCount: PXFieldState<PXFieldOptions.Readonly>;
	ShipmentDesc: PXFieldState;
}

export class SOShipment extends PXView {
	BrokerContactID: PXFieldState;

	IntercompanyPOReceiptNbr: PXFieldState;
	ExcludeFromIntercompanyProc: PXFieldState;

	ShipVia: PXFieldState<PXFieldOptions.CommitChanges>;
	ShopForRatesErrorMessage: PXFieldState<PXFieldOptions.Disabled>;
	WillCall: PXFieldState;
	FreightClass: PXFieldState;
	FOBPoint: PXFieldState;
	ShipTermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsOfSale: PXFieldState;
	DHLBillingRef: PXFieldState;
	SkipAddressVerification: PXFieldState;
	DeliveryConfirmation: PXFieldState<PXFieldOptions.CommitChanges>;
	EndorsementService: PXFieldState<PXFieldOptions.CommitChanges>;
	Resedential: PXFieldState<PXFieldOptions.CommitChanges>;
	SaturdayDelivery: PXFieldState<PXFieldOptions.CommitChanges>;
	UseCustomerAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	Insurance: PXFieldState<PXFieldOptions.CommitChanges>;
	GroundCollect: PXFieldState;
	CuryID: PXFieldState;
	CuryFreightCost: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightAmountSource: PXFieldState;
	OverrideFreightAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryFreightAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	UnlimitedPackages: PXFieldState;

	ShipmentWeight: PXFieldState<PXFieldOptions.Readonly>;
	PackageWeight: PXFieldState<PXFieldOptions.Readonly>;

	Installed: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	statusField: "Availability"
})
export class Transactions extends PXView {
	SOShipmentLineSplittingExtension_ShowSplits: PXActionState;
	SelectSO: PXActionState;
	InventorySummary: PXActionState;

	Availability: PXFieldState;
	ShipmentNbr: PXFieldState;
	LineNbr: PXFieldState;
	OrigOrderType: PXFieldState;
	OrigOrderNbr: PXFieldState;
	OrigLineNbr: PXFieldState;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	IsFree: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	AssociatedOrderLineNbr: PXFieldState;
	GiftMessage: PXFieldState;
	ShippedQty: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseShippedQty: PXFieldState;
	OriginalShippedQty: PXFieldState;
	FullOrderQty: PXFieldState;
	FullOpenQty: PXFieldState;
	UnassignedQty: PXFieldState;
	PickedQty: PXFieldState;
	PackedQty: PXFieldState;
	CompleteQtyMin: PXFieldState;

	@columnConfig({ hideViewLink: true, nullText: LSNullText.Split })
	LotSerialNbr: PXFieldState;

	ShipComplete: PXFieldState;
	ExpireDate: PXFieldState;
	ReasonCode: PXFieldState;
	TranDesc: PXFieldState;
	BlanketNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	allowUpdate: false,
})
export class OrderList extends PXView {
	ShipmentNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	OrderType: PXFieldState<PXFieldOptions.Readonly>;

	OrderNbr: PXFieldState<PXFieldOptions.Readonly>;

	ShipmentQty: PXFieldState;

	@columnConfig({	format: "F2" })
	ShipmentWeight: PXFieldState;

	@columnConfig({	format: "F2" })
	ShipmentVolume: PXFieldState;

	InvoiceType: PXFieldState<PXFieldOptions.Readonly>;
	InvoiceNbr: PXFieldState<PXFieldOptions.Readonly>;
	InvtDocType: PXFieldState<PXFieldOptions.Readonly>;
	InvtRefNbr: PXFieldState<PXFieldOptions.Readonly>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoRepaint: ["PackageDetailSplit"],
	initNewRow: true
})
export class Packages extends PXView {
	RecalculatePackages: PXActionState;
	CaptureWeightFromScale: PXActionState;
	Confirmed: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BoxID: PXFieldState<PXFieldOptions.CommitChanges>;

	PackageType: PXFieldState;
	Description: PXFieldState;
	AllowOverrideDimension: PXFieldState;
	Length: PXFieldState<PXFieldOptions.CommitChanges>;
	Width: PXFieldState<PXFieldOptions.CommitChanges>;
	Height: PXFieldState<PXFieldOptions.CommitChanges>;
	LinearUOM: PXFieldState;
	Weight: PXFieldState<PXFieldOptions.CommitChanges>;
	WeightUOM: PXFieldState;
	DeclaredValue: PXFieldState<PXFieldOptions.CommitChanges>;
	COD: PXFieldState<PXFieldOptions.CommitChanges>;
	StampsAddOns: PXFieldState<PXFieldOptions.CommitChanges>;
	TrackNumber: PXFieldState;
	@columnConfig({ type: GridColumnType.HyperLink })
	TrackUrl: PXFieldState;
	ReturnTrackNumber: PXFieldState;
	NonStandardContainer: PXFieldState;
	AdditionalHandling: PXFieldState;
	SSCC: PXFieldState;
	CustomRefNbr1: PXFieldState;
	CustomRefNbr2: PXFieldState;
	ContentType: PXFieldState<PXFieldOptions.CommitChanges>;
	EELPFC: PXFieldState;
	ContentTypeDesc: PXFieldState;
	CertificateNumber: PXFieldState;
	InvoiceNumber: PXFieldState;
	LicenseNumber: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class PackageDetailSplit extends PXView {
	@columnConfig({ hideViewLink: true })
	ShipmentSplitLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	PackedQty: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CarrierData extends PXView {
	AdditionalHandling: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailNotification: PXFieldState;
	HazardousMaterials: PXFieldState;
	PrintReturnLabel: PXFieldState;
	ProBillNbr: PXFieldState;
	DeliveryInstructions: PXFieldState;
	ExternalStatus: PXFieldState;
	PacejetWorkstationID: PXFieldState;
	LiftGate: PXFieldState;
	InsideDelivery: PXFieldState;
	LimitedAccess: PXFieldState;
}
