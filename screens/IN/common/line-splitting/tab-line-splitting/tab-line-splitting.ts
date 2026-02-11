import {
	PXActionState,

	createCollection,
	createSingle,

	viewInfo,
} from "client-controls";

export abstract class LineSplittingTabBase {
	// since the C# LineSplittingExtension provides dynamically named views and actions,
	// it is not possible to make the current class to contain proper elements,
	// however you can use the following commented code as a template for the descendants.
	// Even thou the current class is empty, we still need it to properly apply the html part

	// LineSplittingExtension_GenerateNumbers: PXActionState;

	// @viewInfo({ containerName: "Line Details Header" })
	// LineSplittingExtension_LotSerOptions = createSingle(LineSplittingLotSerOptions);

	// @viewInfo({ containerName: "Line Details" })
	// splits = createCollection(LineSplittingDetails);
}