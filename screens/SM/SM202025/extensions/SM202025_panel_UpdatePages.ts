import { SM202025 } from "../SM202025";
import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	fieldConfig
} from "client-controls";


export interface SM202025_panel_UpdatePages extends SM202025 { }
export class SM202025_panel_UpdatePages {
	fltArticlesProps = createSingle(WikiPageUpdatableProps);
}

export class WikiPageUpdatableProps extends PXView {
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			tabIndex: -3,
			treeConfig: {
				idField: "PageID",
				dataMember: "Folders",
				textField: "Title",
				iconField: "Icon",
				mode: "single",
				hideRootNode: true
			}
		}
	})
	ParentUID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({controlConfig: { tabIndex: -5 }})
	TagID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({controlConfig: { rows: 3 }})
	Keywords: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	Hold: PXFieldState<PXFieldOptions.CommitChanges>;
	Versioned: PXFieldState<PXFieldOptions.CommitChanges>;
}