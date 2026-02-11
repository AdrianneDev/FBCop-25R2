import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	createCollection,
	gridConfig,
	GridPreset,
	linkCommand,
	PXActionState,
	GridPagerMode,
	columnConfig,
	GridColumnShowHideMode,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	handleEvent,
	GridColumnGeneration,
	CellCssHandlerArgs
} from "client-controls";

export abstract class DuplicatesBase {
	@viewInfo({ containerName: "Records for Merging" })
	DuplicatesForMerging = createCollection(CRDuplicateRecordForMerging);

	@viewInfo({ containerName: "Records for Association" })
	DuplicatesForLinking = createCollection(CRDuplicateRecordForLinking);

	@handleEvent(CustomEventType.RowSelected, { view: "DuplicatesForMerging" })
	onDuplicateForMergingSelected(args: RowSelectedHandlerArgs<PXViewCollection<CRDuplicateRecordForMerging>>) {
		const model = args.viewModel;

		if (model?.DuplicateMerge) {
			model.DuplicateMerge.enabled = !!args.viewModel.activeRow?.CanBeMerged?.value;
		}
	}

	@handleEvent(CustomEventType.RowSelected, { view: "DuplicatesForLinking" })
	onDuplicateForLinkingSelected(args: RowSelectedHandlerArgs<PXViewCollection<CRDuplicateRecordForLinking>>) {
		const model = args.viewModel;

		if (model?.DuplicateAttach) {
			model.DuplicateAttach.enabled = !!args.viewModel.activeRow;
		}
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "DuplicatesForMerging", allColumns: true })
	public handleDuplicatesForMergingCss(args: CellCssHandlerArgs) {
		const fieldName = args?.selector?.columnId.split("__").pop();

		if (fieldName && args.selector.cellValue != null) {
			const value = this.GetValueToCompare(fieldName, args);
			if (value != null) {
				return this.highlightDiff(value, args.selector.cellValue);
			}
		}

		return undefined;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "DuplicatesForLinking", allColumns: true })
	public handleDuplicatesForLinkingCss(args: CellCssHandlerArgs) {
		const fieldName = args?.selector?.columnId.split("__").pop();

		if (fieldName != null && args.selector?.cellValue != null) {
			const value = this.GetValueToCompare(fieldName, args);
			if (value != null) {
				return this.highlightDiff(value, args.selector.cellValue);
			}
		}

		return undefined;
	}

	abstract GetValueToCompare(fieldName: string, args: CellCssHandlerArgs);

	public highlightDiff(value1: string | {id: string; text: string}, value2: string | {id: string; text: string}) {
		value1 = (typeof value1 === "string") ? value1 : value1?.id;
		value2 = (typeof value2 === "string") ? value2 : value2?.id;

		if (String(value1).trim() === String(value2).trim()) {
			return "green20";
		}

		return undefined;
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowInsert: false,
	allowDelete: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	generateColumns: GridColumnGeneration.AppendDynamic
})
export class CRDuplicateRecordForMerging extends PXView {
	DuplicateMerge: PXActionState;

	ViewMergingDuplicate: PXActionState;
	ViewMergingDuplicateRefContact: PXActionState;
	ViewMergingDuplicateBAccount: PXActionState;

	@linkCommand("ViewMergingDuplicateBAccount")
	DuplicateContact__BAccountID: PXFieldState;
	BAccountR__Type: PXFieldState<PXFieldOptions.Hidden>;
	Phone1: PXFieldState;
	DuplicateContact__EMail: PXFieldState;
	DuplicateContact__WebSite: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__Phone2: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__Phone3: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__Department: PXFieldState<PXFieldOptions.Hidden>;
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;
	Address__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__ContactID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastIncomingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastOutgoingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	CanBeMerged: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	generateColumns: GridColumnGeneration.AppendDynamic
})
export class CRDuplicateRecordForLinking extends PXView {
	DuplicateAttach: PXActionState;

	ViewLinkingDuplicate: PXActionState;
	ViewLinkingDuplicateRefContact: PXActionState;
	ViewLinkingDuplicateBAccount: PXActionState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	DuplicateContact__ContactType: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	@linkCommand("ViewLinkingDuplicate")
	DuplicateContact__DisplayName: PXFieldState;

	@linkCommand("ViewLinkingDuplicateBAccount")
	DuplicateContact__BAccountID: PXFieldState;
	BAccountR__AcctName: PXFieldState;
	Phone1: PXFieldState;
	DuplicateContact__EMail: PXFieldState;
	DuplicateContact__OwnerID: PXFieldState;

	DuplicateContactID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__WebSite: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	Address__State: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState<PXFieldOptions.Hidden>;
	Address__CountryID: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__Department: PXFieldState<PXFieldOptions.Hidden>;
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;
	Address__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__FirstName: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__LastName: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastIncomingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	CRActivityStatistics__LastOutgoingActivityDate: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__ContactID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;

	BAccountR__Type: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__Phone2: PXFieldState<PXFieldOptions.Hidden>;
}
