import {
	PXView,
	PXFieldState,
	PXActionState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { IN204000 } from "../IN204000";

export interface IN204000_Carts extends IN204000 { }
export class IN204000_Carts {
	@viewInfo({ containerName: "Carts" })
	carts = createCollection(INCart);

	@viewInfo({ containerName: "Totes" })
	totes = createCollection(INTote);

	@viewInfo({ containerName: "Assigned Totes" })
	totesInCart = createCollection(INToteCart);
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class INCart extends PXView {
	ViewTotesInCart: PXActionState;

	@columnConfig({ hideViewLink: true })
	CartCD: PXFieldState;

	Descr: PXFieldState;
	AssignedNbrOfTotes: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class INTote extends PXView {
	@columnConfig({ hideViewLink: true })
	ToteCD: PXFieldState;

	Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AssignedCartID: PXFieldState;

	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
})
export class INToteCart extends PXView {
	@columnConfig({ hideViewLink: true })
	ToteCD: PXFieldState;

	Descr: PXFieldState;
	Active: PXFieldState;
}