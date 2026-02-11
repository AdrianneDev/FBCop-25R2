import {
	graphInfo,
	PXScreen,
	PXView,
	PXFieldState,
	createSingle,
	PXActionState,
	PXFieldOptions,
	createCollection,
	gridConfig,
	GridPreset,
	columnConfig,
	controlConfig,
	viewInfo,
	ViewQueryParameter,
	GridAutoGrowMode,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	showInformer,
	addTextToClipboard,
	Messages as SysMessages
} from "client-controls";

@graphInfo({ graphType: "PX.SM.WikiFileMaintenance", primaryView: "Files", bpEventsIndicator: false })
export class SM202510 extends PXScreen {
	@viewInfo({ parameters: [ new ViewQueryParameter("name", "fileID") ] })
	Files = createSingle(Files);
	PrimaryArticle = createSingle(PrimaryArticle);
	CurrentFile = createSingle(CurrentFile);
	CheckoutComment = createSingle(CheckoutComment);

	Revisions = createCollection(Revisions);
	PagesWithFile = createCollection(PagesWithFile);
	EntitiesRecords = createCollection(EntitiesRecords);
	WikiAccessRightsRecs = createCollection(WikiAccessRightsRecs);

	@handleEvent(CustomEventType.RowSelected, {view: "Revisions"})
	onRevisionSelected(args: RowSelectedHandlerArgs<PXViewCollection<Revisions>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.viewRevision.enabled = !!row;
	}
	@handleEvent(CustomEventType.RowSelected, {view: "PagesWithFile"})
	onPagesWithFileSelected(args: RowSelectedHandlerArgs<PXViewCollection<PagesWithFile>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.openArticle.enabled = !!row;
	}

	@handleEvent(CustomEventType.RowSelected, {view: "EntitiesRecords"})
	onEntitiesRecordSelected(args: RowSelectedHandlerArgs<PXViewCollection<EntitiesRecords>>) {
		const model = args.viewModel;
		const row = args.viewModel.activeRow;

		model.viewEntity.enabled = !!row;
	}

	onCopyExternalLinkClick = (): void => {
		addTextToClipboard(this.Files.ExternalLink.value ?? "");
		showInformer(SysMessages.LinkCopiedClipboard, "info");
	};

	onCopyWikiLinkClick = (): void => {
		addTextToClipboard(this.Files.WikiLink.value ?? "");
		showInformer(SysMessages.LinkCopiedClipboard, "info");
	};
}

export class Files extends PXView {
	FileID: PXFieldState<PXFieldOptions.Disabled>;
	IsHidden: PXFieldState;
	CheckedOutBy: PXFieldState;
	CheckedOutComment: PXFieldState;
	ExternalLink: PXFieldState;
	WikiLink: PXFieldState;
	@controlConfig({
		multiSelect: true,
		valueSeparator: ";"
	})
	Tags: PXFieldState;
}

@gridConfig({preset: GridPreset.Details, adjustPageSize: true, allowInsert: false})
export class Revisions extends PXView {
	viewRevision: PXActionState;

	FileRevisionID: PXFieldState;
	CreatedByID_Creator_Username: PXFieldState;
	@columnConfig({format: "g"}) CreatedDateTime: PXFieldState;
	ReadableSize: PXFieldState;
	Comment: PXFieldState;
	OriginalName: PXFieldState;
}

export class PrimaryArticle extends PXView {
	Title: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({preset: GridPreset.ReadOnly, adjustPageSize: true, syncPosition: true})
export class PagesWithFile extends PXView {
	openArticle: PXActionState;

	@columnConfig({ width: 500 })
	WikiPage__Name: PXFieldState;
	@columnConfig({ width: 100 })
	Language: PXFieldState;
	@columnConfig({ width: 150 })
	PageRevisionID: PXFieldState;
	@columnConfig({ width: 500 })
	WikiPage__Title: PXFieldState;
}

@gridConfig({preset: GridPreset.ReadOnly, adjustPageSize: true, syncPosition: true})
export class EntitiesRecords extends PXView {
	viewEntity: PXActionState;

	@columnConfig({ width: 300 })
	EntityName: PXFieldState;
	@columnConfig({ width: 600 })
	EntityRowValues: PXFieldState;
}

export class CurrentFile extends PXView {
	IsPublic: PXFieldState<PXFieldOptions.CommitChanges>;
	IsAccessRightsFromEntities: PXFieldState<PXFieldOptions.CommitChanges>;
	SelectedWikiID: PXFieldState<PXFieldOptions.CommitChanges>;
	SelectedPageID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimaryScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	Synchronizable: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceType: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceUri: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceLogin: PXFieldState;
	@controlConfig({ type: 2 })
	SourcePassword: PXFieldState;
	SshCertificateName: PXFieldState;
	SourceIsFolder: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceMask: PXFieldState;
	SourceNamingFormat: PXFieldState;
	SourceLastImportDate: PXFieldState;
	LastExportDate: PXFieldState;
	AccessRights: PXFieldState;
}

@gridConfig({ preset: GridPreset.Attributes, allowUpdate: false })
export class WikiAccessRightsRecs extends PXView {
	RoleName: PXFieldState;
	AccessRights: PXFieldState;
}

export class CheckoutComment extends PXView {
	Comment: PXFieldState;
}
