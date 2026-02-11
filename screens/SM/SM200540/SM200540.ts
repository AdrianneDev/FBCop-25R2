import { createCollection, createSingle, graphInfo, viewInfo, IGridColumn, handleEvent,
		 CustomEventType, RowSelectedHandlerArgs, PXViewCollection} from "client-controls";
import {
	LangFilter,
	LocalizationRecord,
	LocalizationRecord2,
	LocalizationRecord3,
	LocalizationRecord4,
	LocalizationResourceByScreen,
} from "./views";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({ graphType: "PX.SM.TranslationMaint", primaryView: "LanguageFilter" })
export class SM200540 extends PXScreenWithSiteMapSupport {
	@viewInfo({ containerName: "Target Locale" })
	LanguageFilter = createSingle(LangFilter);
	@viewInfo({ containerName: "Default Values" })
	DeltaResourcesDistinct = createCollection(LocalizationRecord);
	@viewInfo({ containerName: "Key-Specific Values" })
	ExceptionalResources = createCollection(LocalizationRecord2);
	@viewInfo({ containerName: "Default Values" })
	DeltaResourcesDistinctObsolete = createCollection(LocalizationRecord3);
	@viewInfo({ containerName: "Key-Specific Values" })
	ExceptionalResourcesObsolete = createCollection(LocalizationRecord4);
	@viewInfo({ containerName: "Usage Details" })
	UsageDetails = createCollection(LocalizationResourceByScreen);

	onFilterColumns(col: IGridColumn) {
		if (col.generated) {
			col.state.multiLine = true;
		}
		return true;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "DeltaResourcesDistinct" })
	onDeltaResourcesDistinctSelected(args: RowSelectedHandlerArgs<PXViewCollection<LocalizationRecord>>) {
		const model = args.viewModel;
		model.viewUsageDetails.enabled = args.viewModel.activeRow != null;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "ExceptionalResources" })
	onExceptionalResourcesSelected(args: RowSelectedHandlerArgs<PXViewCollection<LocalizationRecord2>>) {
		const model = args.viewModel;
		model.viewExceptionalUsageDetails.enabled = args.viewModel.activeRow != null;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "DeltaResourcesDistinctObsolete" })
	onDeltaResourcesDistinctObsoleteSelected(args: RowSelectedHandlerArgs<PXViewCollection<LocalizationRecord3>>) {
		const model = args.viewModel;
		model.viewUsageObsoleteDetails.enabled = args.viewModel.activeRow != null;
		model.deleteObsoleteStrings.enabled = args.viewModel.activeRow != null;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "ExceptionalResourcesObsolete" })
	onExceptionalResourcesObsoleteSelected(args: RowSelectedHandlerArgs<PXViewCollection<LocalizationRecord4>>) {
		const model = args.viewModel;
		model.viewExceptionalUsageObsoleteDetails.enabled = args.viewModel.activeRow != null;
	}
}
