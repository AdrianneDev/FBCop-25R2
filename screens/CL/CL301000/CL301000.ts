import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
} from "client-controls";
import {
	LienWaiverSetup,
	ComplianceAttributeFilter,
	ComplianceAttribute,
	CSAttributeGroup
} from "./views";

@graphInfo({
	graphType: "PX.Objects.CN.Compliance.CL.Graphs.ComplianceDocumentSetupMaint",
	primaryView: "LienWaiverSetup",
})
export class CL301000 extends PXScreen {

	LienWaiverSetup = createSingle(LienWaiverSetup);
	@viewInfo({ containerName: "Attribute Group" })
	Filter = createSingle(ComplianceAttributeFilter);
	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(ComplianceAttribute, {
		columnsConfig: [
			{ field: "Files", visible: false },
			{ field: "Notes", visible: false },
		]
	});
	@viewInfo({ containerName: "Attributes" })
	MappingCommon = createCollection(CSAttributeGroup);
}
