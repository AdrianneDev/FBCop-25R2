import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, treeConfig } from "client-controls";
import { PM301500 } from "../PM301500";

export interface PM301500_TreeView extends PM301500 { }
export class PM301500_TreeView {
    TreeView = createCollection(NavigationTreeViewNode);

	currentNavigation: string;

    @handleEvent(CustomEventType.RowSelected, { view: "TreeView" })
    onNavidationSelected(args: RowSelectedHandlerArgs<PXViewCollection<NavigationTreeViewNode>>) {
        const activeRow = args.viewModel.activeRow;
        if (activeRow == null) {
            return;
        }

        this.currentNavigation = activeRow.Navigation.value;
    }}

@treeConfig({
    parentIdField: "ParentKey",
    idField: "Key",
    textField: "Name",
    modifiable: false,
    mode: "single",
    singleClickSelect: true,
    hideToolbarSearch: true,
    hideRootNode: false,
    selectFirstNode: true,
    syncPosition: false
})
export class NavigationTreeViewNode extends PXView  {
    Key: PXFieldState;
    ParentKey: PXFieldState;
    Name: PXFieldState;
    Navigation: PXFieldState;
}

