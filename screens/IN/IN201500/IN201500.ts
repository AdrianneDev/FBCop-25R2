import {
	PXScreen,
	PXView,
	PXFieldState,

	createSingle,

	graphInfo,
	viewInfo,
	headerDescription,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INAvailabilitySchemeMaint",
	primaryView: "Schemes",
})
export class IN201500 extends PXScreen {
	@viewInfo({ containerName: "Availability Scheme" })
	Schemes = createSingle(INAvailabilityScheme);
}

export class INAvailabilityScheme extends PXView {
	AvailabilitySchemeID: PXFieldState;

	@headerDescription
	Description: PXFieldState;

	InclQtyINIssues: PXFieldState;
	InclQtySOPrepared: PXFieldState;
	InclQtySOBooked: PXFieldState;
	InclQtySOShipped: PXFieldState;
	InclQtySOShipping: PXFieldState;
	InclQtyINAssemblyDemand: PXFieldState;
	InclQtySOBackOrdered: PXFieldState;
	InclQtyFSSrvOrdPrepared: PXFieldState;
	InclQtyFSSrvOrdBooked: PXFieldState;
	InclQtyProductionDemandPrepared: PXFieldState;
	InclQtyProductionDemand: PXFieldState;
	InclQtyProductionAllocated: PXFieldState;
	InclQtyFSSrvOrdAllocated: PXFieldState;
	InclQtyINReceipts: PXFieldState;
	InclQtyInTransit: PXFieldState;
	InclQtyPOReceipts: PXFieldState;
	InclQtyPOPrepared: PXFieldState;
	InclQtyPOOrders: PXFieldState;
	InclQtyFixedSOPO: PXFieldState;
	InclQtyINAssemblySupply: PXFieldState;
	InclQtySOReverse: PXFieldState;
	InclQtyProductionSupplyPrepared: PXFieldState;
	InclQtyProductionSupply: PXFieldState;
}
