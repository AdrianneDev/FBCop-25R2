import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, PXPageLoadBehavior, ControlParameter } from "client-controls";
import { EntityEndpoint, SelectedEntityEndpoint, EntityDescription, EntityActionDescription, EntityFieldDescription, EntityActionParameterDescription, EntityDescriptionInsertModel, EntityEndpointInsertModel, ActionDescriptionInsertModel, PopulateFilter, PopulatingField, EntityTreeNode } from "./views";

const Parameters = [new ControlParameter("Key", "EntityTree", "Key")];

@graphInfo({ graphType: "PX.Api.ContractBased.UI.EntityConfigurationMaint", primaryView: "Endpoint", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord })
export class SM207060 extends PXScreen {
	InsertNew: PXActionState;
	DeleteNode: PXActionState;
	PopulateFields: PXActionState;
	ExtendEntity: PXActionState;
	ValidateEntity: PXActionState;
	PopulateParameters: PXActionState;
	validateAction: PXActionState;
	SelectAll: PXActionState;
	ClearAll: PXActionState;
	EnablePopulate: PXActionState;

	Endpoint = createSingle(EntityEndpoint);
	EntityTree = createCollection(EntityTreeNode);
	@viewInfo({ containerName: "Endpoint Properties", parameters: Parameters })
	SelectedEndpoint = createSingle(SelectedEntityEndpoint);
	@viewInfo({ containerName: "Entity Properties", parameters: Parameters })
	SelectedEntity = createSingle(EntityDescription);
	@viewInfo({ containerName: "Action Properties", parameters: Parameters })
	SelectedAction = createSingle(EntityActionDescription);
	@viewInfo({ containerName: "Fields", parameters: Parameters })
	Fields = createCollection(EntityFieldDescription);
	@viewInfo({ containerName: "Parameters", parameters: Parameters })
	Parameters = createCollection(EntityActionParameterDescription);
	@viewInfo({ containerName: "Create Entity" })
	CreateEntityView = createSingle(EntityDescriptionInsertModel);
	@viewInfo({ containerName: "Extend Current Endpoint" })
	ExtendEndpointView = createSingle(EntityEndpointInsertModel);
	@viewInfo({ containerName: "Create Action" })
	CreateActionView = createSingle(ActionDescriptionInsertModel);
	@viewInfo({ containerName: "Populate Fields" })
	PopulateFilterView = createSingle(PopulateFilter);
	@viewInfo({ containerName: "Populate Fields" })
	PopulatingFields = createCollection(PopulatingField);
}
