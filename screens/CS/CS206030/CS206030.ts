import {
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	viewInfo,
	createSingle,
	localizable,
	ServerCommand,
	PXFieldOptions,
	ScreenUpdateParams,
	handleEvent,
	CustomEventType,
	CallbackCompletedHandlerArgs,
	PXActionState,
	treeConfig,
	ValueChangedHandlerArgs,
	columnConfig,
} from "client-controls";

import { RMDataSource } from "../common/arm/arm-reports-views";
import { ArmScreen, RMParameters } from "../common/arm/arm-base";

@localizable
export class Labels {
	static InsertHeader = "Insert Header";
	static InsertColumn = "Insert Column";
	static DeleteHeader = "Delete Header";
	static DeleteColumn = "Delete Column";
	static Copy = "Copy";
	static Paste = "Paste";
	static CopyFormatting = "Copy";
	static PasteFormatting = "Paste";
	static CopyColumnFormatting = "Copy Column Formatting";
	static CopyCellFormatting = "Copy Cell Formatting";
	static PasteColumnFormatting = "Paste Column Formatting";
	static PasteCellFormatting = "Paste Cell Formatting";
}

@graphInfo({ graphType: "PX.CS.RMUnitSetMaint", primaryView: "UnitSet" })
export class CS206030 extends ArmScreen {
	ChangeUnitCode: PXActionState;
	First: PXActionState;
	Next: PXActionState;
	Previous: PXActionState;
	Last: PXActionState;

	UnitSet = createSingle(RMUnitSet);

	topBarConfig =  {
		id: "topBarItemsConfigID",
		items: {
			ts_First: { config: { hidden: true, } },
			ts_Next: { config: { hidden: true, } },
			ts_Previous: { config: { hidden: true, } },
			ts_Last: { config: { hidden: true, } },
			ts_CopyPaste: { config: { hidden: true, } },  // can't  use CanClipboardCopyPaste() as the buttons were hidden in ASPX but accessible via API
			"ts_CopyPaste@CopyDocument": { config: { hidden: true, } },
			"ts_CopyPaste@PasteDocument": { config: { hidden: true, } },
			"ts_CopyPaste@SaveTemplate": { config: { hidden: true, } },
		}
	};

	@viewInfo({syncAlways: true})
	Parameter = createSingle(ParamFilter);

	@viewInfo({syncAlways: true})
	NewUnitSetPanel = createSingle(RMNewUnitSetPanel);

	// NewRowSetPanel = createSingle(RMNewRowSetPanel);

	@viewInfo({ containerName: "Units" })
	ItemsWORoot = createCollection(RMUnit);

	@viewInfo({syncAlways: true})
	CurrentUnit = createSingle(RMUnit);

	@viewInfo({syncAlways: true}) // this is somehow not enough, platform still sends "retrieveMode: 1" for CurrentRowDataSource
	CurrentDataSource = createSingle(RMDataSource);

	async attached() {
		await super.attached();

		const dc = this.screenService.getDataComponent("ScreenToolbar");
		if (dc?.appendComponentData) {
			dc.appendComponentData(this.topBarConfig);
		}

		if (!this.UnitSet.UnitSetCode?.value?.id) {
			await this.screenService.update(new ServerCommand("insert"), new ScreenUpdateParams({ blockPage: false }));
		}
	}

	@handleEvent(CustomEventType.CallbackCompleted)
	async onActionCompleted(args: CallbackCompletedHandlerArgs<any>) {
		// TODO: update the state of Left/Right actions
	}

	// Preventing a confirmation message to show up
	@handleEvent(CustomEventType.ValueChanged, { view: "CurrentUnit", field: "UnitCode" })
	async onUnitCodeChange(args: ValueChangedHandlerArgs) {
		await this.screenService.update(nameof("ChangeUnitCode"), new ScreenUpdateParams({ blockPage: false}));
	}
}

export class RMUnitSet extends PXView {
	UnitSetCode: PXFieldState;
	Description: PXFieldState;
	Type: PXFieldState;
}

export class ParamFilter extends PXView {
	NewUnitSetCode: PXFieldState;
	Description: PXFieldState;
}

@treeConfig({
	dynamic: true,
	// hideRootNode: true,
	idField: "UnitCode",
	textField: "CodeAndDescription",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	keepPosition: true,
	// hideToolbarSearch: true,
	openedLayers: 5,
})
export class RMUnit extends PXView {
	InsertUnit: PXActionState;
	DeleteUnit: PXActionState;
	Left: PXActionState;
	Right: PXActionState;

	UnitCode: PXFieldState;
	CodeAndDescription: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: {
			parameters: RMParameters,
		},
	})
	Formula: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class RMNewUnitSetPanel extends PXView {
	UnitSetCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}

export const nameof = (name: Extract<keyof CS206030, string>): string => name;
