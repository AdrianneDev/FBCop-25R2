import {
	PXView,
	PXFieldState,

	createSingle,

	viewInfo,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { IN101000 } from "../IN101000";

export interface IN101000_GS1Setup extends IN101000 { }
@featureInstalled(FeaturesSet.AdvancedFulfillment)
export class IN101000_GS1Setup {
	@viewInfo({ containerName: "GS1 Units" })
	gs1setup = createSingle(gs1setup);
}

export class gs1setup extends PXView {
	Kilogram: PXFieldState;
	Pound: PXFieldState;
	Ounce: PXFieldState;
	TroyOunce: PXFieldState;

	KilogramPerSqrMetre: PXFieldState;

	Metre: PXFieldState;
	Inch: PXFieldState;
	Foot: PXFieldState;
	Yard: PXFieldState;

	SqrMetre: PXFieldState;
	SqrInch: PXFieldState;
	SqrFoot: PXFieldState;
	SqrYard: PXFieldState;

	CubicMetre: PXFieldState;
	CubicInch: PXFieldState;
	CubicFoot: PXFieldState;
	CubicYard: PXFieldState;

	Litre: PXFieldState;
	Quart: PXFieldState;
	GallonUS: PXFieldState;
}
