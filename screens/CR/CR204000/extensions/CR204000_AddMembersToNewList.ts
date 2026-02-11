import { CR204000 } from "../CR204000";
import { createSingle, PXView, PXFieldState, PXFieldOptions, gridConfig, createCollection, GridFilterBarVisibility, GridPreset } from "client-controls";

export interface CR204000_AddMembersToNewList extends CR204000 {}
export class CR204000_AddMembersToNewList {
	AddMembersToNewListFilterView = createSingle(AddMembersToNewListFilter);
	AddMembersToNewListFilterUdfView = createCollection(FieldValue);
}

export class AddMembersToNewListFilter extends PXView {
	MailListCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	initNewRow: true,
	allowUpdate: false,
	showFilterBar: GridFilterBarVisibility.False
})
export class FieldValue extends PXView {
	DisplayName: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}
