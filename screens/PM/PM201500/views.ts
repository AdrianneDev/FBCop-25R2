import {
	columnConfig,
	fieldConfig,
	gridConfig,
	treeConfig,
	GridColumnType,
	GridFastFilterVisibility,
	GridFilterBarVisibility,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign
} from "client-controls";

export class SelectedFolders extends PXView {}

@treeConfig({
	idField: ["TagID"],
	valueField: "TagID",
	textField: "TagCD",
	autoRepaint: [ "CurrentTag", "Members" ],
	dynamic: true,
	hideRootNode: true,
	mode: "single",
	modifiable: false,
	openedLayers: 1,
	selectFirstNode: true,
	singleClickSelect: true,
	syncPosition: true,
	hideToolbarSearch: true,
	keepPosition: true,
	topBarItems: {
		AddTag: {
			config: {
				images: { normal: "main@AddNew" }
			}
		},
		DeleteTag: {
			config: {
				images: { normal: "main@Remove" }
			}
		}
	}
})
export class Folders extends PXView {
	AddTag: PXActionState;
	DeleteTag: PXActionState;

	TagID: PXFieldState;
	TagCD: PXFieldState;
}

export class CurrentTag extends PXView {
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				dataMember: "ParentFolders",
				idField: "TagID",
				textField: "TagCD",
				mode: "single",
				hideRootNode: true,
				openedLayers: 1,
				singleClickSelect: true,
				topBarItems: {}
			}
		}
	})
	ParentTagID: PXFieldState<PXFieldOptions.CommitChanges>;
	TagCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ParentFolders extends PXView {
	TagID: PXFieldState;
	TagCD: PXFieldState;
	ParentTagID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: {
		exportToExcel: { hidden: true }
	},
	allowDelete: false,
	allowInsert: false,
	syncPosition: true
})
export class Members extends PXView {
	@columnConfig({ width: 230 })
	RoleName: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		width: 70
	})
	Guest: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ width: 300 })
	RoleDescr: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({
		allowNull: false,
		allowResize: false,
		textAlign: TextAlign.Left,
		width: 120
	})
	RoleRight: PXFieldState<PXFieldOptions.CommitChanges>;
}
