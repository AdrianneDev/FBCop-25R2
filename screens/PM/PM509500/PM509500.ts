import {
	columnConfig,
	createCollection,
	createSingle,
	graphInfo,
	gridConfig,
	linkCommand,
	localizable,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXPageLoadBehavior,
	PXScreen,
	PXView,
	PXActionState,
	QpSplitterCustomElement,
	QpToolBarCustomElement,
	handleEvent,
	CustomEventType,
	ScreenUpdateParams, ServerCommand, treeConfig, controlConfig
} from "client-controls";
import { bindable } from "aurelia-framework";
import { MenuButton } from "client-controls/controls/compound/tool-bar/qp-tool-bar";
import { MenuSeparator } from "client-controls/controls/compound/tool-bar/qp-tool-bar-items";
import { generatePdfPreview } from "../common/utils";

@localizable
class Messages {
	static EntityFilter = "Document Nbr.";
	static FileNameFilter = "File Name";
	static TagFilter = "Tag";
	static Download = "Download";
	static UploadNewVersion = "Upload New Version";
	static ShowDetails = "Show Details";
	static CheckOut = "Check Out";
	static UndoCheckOut = "Undo Check Out";
	static LinkFileToDocument = "Link File to Document";
	static RemoveLink = "Remove Link";
	static Delete = "Delete";
	static UploadFiles = "Upload Files";
}

@graphInfo({
	graphType: "PX.Objects.PM.ProjectFiles.FileEntryForms.ProjectEntitiesEntry",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class PM509500 extends PXScreen {
	Filter = createSingle(Filter);

	CheckoutComment = createSingle(CheckoutComment);

	EntityToLinkFilter = createSingle(EntityToLinkFilter);

	CreateNewTagInPlaceFilter = createSingle(CreateNewTagInPlaceFilter);

	EntitiesToLink = createCollection(EntitiesToLink);

	Project = createSingle(Project);
	public static getFileTypeIcon(fileType: string) {
		switch (fileType) {
			case "word":
				return { normal: "svg:file_types@word" };
			case "excel":
				return { normal: "svg:file_types@excel" };
			case "pdf":
				return { normal: "svg:file_types@pdf" };
			case "video":
				return { normal: "svg:file_types@video" };
			case "archive":
				return { normal: "svg:file_types@archive" };
			case "autocad":
				return { normal: "svg:file_types@dwg" };
			default:
				return { normal: "svg:file_types@file" };
		}
	}

	CheckOutFileByEntity: PXActionState;
	CheckInFileByEntity: PXActionState;
	DownloadFileByEntity: PXActionState;
	DownloadFilesByEntityZip: PXActionState;
	EditFileByEntity: PXActionState;
	LinkFileToDocumentByEntity: PXActionState;
	OpenLinkedEntityByEntity: PXActionState;
	OpenLinkedEntityFromIDByEntity: PXActionState;
	SetActiveFileByEntity: PXActionState;
	UploadFileRevisionByEntity: PXActionState;
	UploadLinkedFilesByEntity: PXActionState;
	CreateNewTagInPlace: PXActionState;

	ProjectLinkTypes = createCollection(ProjectLinkTypes);

	LinkedFilesByEntity = createCollection(LinkedFilesByEntity);

	ActiveLinkedFileByEntity = createSingle(ActiveLinkedFileByEntity);

	ActiveFileVersionsByEntity = createCollection(ActiveFileVersionsByEntity);

	ActiveFileLinkedEntitiesByEntity = createCollection(ActiveFileLinkedEntitiesByEntity);

	FeedFilter = createSingle(FeedFilter);

	@bindable previewSplitterByEntity!: QpSplitterCustomElement;

	@bindable detailsToolBarByEntity!: QpToolBarCustomElement;

	private detailsToolBarConfigByEntity: any = {
		id: "detailsToolBarConfigByEntity",
		items: {
			downloadFileByEntity: {
				config: {
					id: "downloadFileByEntity",
					text: Messages.Download,
					commandName: "DownloadFileByEntity",
				}
			},
			uploadFileRevisionByEntity: {
				config: {
					id: "uploadFileRevisionByEntity",
					text: Messages.UploadNewVersion,
					commandName: "UploadActiveFileRevisionByEntity",
				}
			},
			editFileByEntity: {
				config: {
					id: "EditFileByEntity",
					text: Messages.ShowDetails,
					commandName: "EditActiveFileByEntity",
				}
			},
			checkOutFileByEntity: {
				config: {
					id: "checkOutFileByEntity",
					text: Messages.CheckOut,
					commandName: "CheckOutActiveFileByEntity",
					hidden: true,
				}
			},
			checkInFileByEntity: {
				config: {
					id: "checkInFileByEntity",
					text: Messages.UndoCheckOut,
					commandName: "CheckInActiveFileByEntity",
					hidden: true,
				}
			},
			linkFileToEntityByEntity: {
				config: {
					id: "linkFileToEntityByEntity",
					text: Messages.LinkFileToDocument,
					commandName: "LinkActiveFileToEntityByEntity",
				}
			},
			unlinkFileFromEntityByEntity: {
				config: {
					id: "unlinkFileFromEntityByEntity",
					text: Messages.RemoveLink,
					commandName: "UnlinkActiveFileFromEntityByEntity",
				}
			},
			deleteFileByEntity: {
				config: {
					id: "deleteFileByEntity",
					text: Messages.Delete,
					commandName: "DeleteActiveFileByEntity",
				}
			},
		}
	};

	@handleEvent(CustomEventType.RowSelected, { view: "ActiveLinkedFileByEntity" })
	onActiveLinkedFileByEntityRowSelected() {
		if (this.ActiveLinkedFileByEntity) {
			this.setupDetailsToolBarByEntity(this.ActiveLinkedFileByEntity);
			generatePdfPreview(
				this.baseApiClient,
				this.ActiveLinkedFileByEntity.FileType.value,
				this.Filter.ActiveFileIDByEntity.value,
				this.Filter.ActiveFileVersionByEntity.value);
		}
	}

	async attached() {
		await super.attached();
		this.setFilterPlaceholders();
	}

	setFilterPlaceholders() {
		this.setFilterPlaceholder(".custom-feed-filter .entity-filter input.qp-text-editor", Messages.EntityFilter);
		this.setFilterPlaceholder(".custom-feed-filter .tag-filter input.qp-text-editor", Messages.TagFilter);
		const fileNameFilterInput = document.querySelector(".custom-feed-filter .file-name-filter input.qp-text-editor") as HTMLInputElement;
		fileNameFilterInput.placeholder = Messages.FileNameFilter;
	}

	setFilterPlaceholder(selector: string, placeholder: string) {
		const inputElement = document.querySelector(selector) as HTMLInputElement;
		inputElement.placeholder = placeholder;
		inputElement.addEventListener("focusout", (e) => {
			setTimeout(() => {
				const input = document.querySelector(selector) as HTMLInputElement;
				input.placeholder = placeholder;
			}, 0);
		});
	}

	protected getFileMenuByEntity(file: LinkedFilesByEntity) {
		const createMenuButton = (id: string, text: string, icon: string) =>
			new MenuButton(id, { text, images: { normal: icon } });

		const commands = file.FileID.value ?
			[
				createMenuButton("DownloadFileFromIDByEntity", Messages.Download, "svg:main@download"),
				createMenuButton("UploadFileRevisionByEntity", Messages.UploadNewVersion, "svg:main@upload"),
				new MenuSeparator("DetailsSeparatorByEntity"),
				createMenuButton("UploadLinkedFileByEntity", Messages.UploadFiles, "svg:main@upload"),
				new MenuSeparator("UploadFilesSeparatorByEntity"),
				createMenuButton("EditFileByEntity", Messages.ShowDetails, "svg:main@external"),
				...(file.CheckOutEnabled.value ? [createMenuButton("CheckOutFileByEntity", Messages.CheckOut, "svg:main@checkOut")] : []),
				...(file.CheckInEnabled.value ? [createMenuButton("CheckInFileByEntity", Messages.UndoCheckOut, "svg:main@checkIn")] : []),
				new MenuSeparator("LinkSeparatorByEntity"),
				createMenuButton("LinkFileToEntityByEntity", Messages.LinkFileToDocument, "svg:main@link"),
				...(file.UnlinkFromEntityEnabled.value ? [createMenuButton("UnlinkFileFromEntityByEntity", Messages.RemoveLink, "svg:main@unlink")] : []),
				new MenuSeparator("DeleteSeparatorByEntity"),
				createMenuButton("DeleteFileByEntity", Messages.Delete, "svg:main@delete")
			] :
			[
				createMenuButton("UploadLinkedFileByEntity", Messages.UploadFiles, "svg:main@upload"),
			];

		return {
			options: commands,
			images: { normal: "svg:main@dots" },
			hideOpener: true,
			tabIndex: -1
		};
	}

	protected async handleFileMenuCommandByEntity(file: LinkedFilesByEntity, event: CustomEvent) {
		const command = this.createMenuCommandByEntity(file, event);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async setActiveFileByEntity(file: LinkedFilesByEntity, event: CustomEvent) {
		if (!file.FileID.value) {
			return;
		}

		const target = event.target as HTMLElement;
		if (target.tagName === "IMG") {
			return;
		}

		this.previewSplitterByEntity.splitterState = "normal";
		const command = new ServerCommand("SetActiveFileByEntity", [
			file.FileID.value,
			file.LinkedDocumentNoteID.value,
			file.LastRevisionID.value
		]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async setActiveVersionByEntity(version: ActiveFileVersionsByEntity, event: CustomEvent) {
		const command = new ServerCommand("SetActiveVersionByEntity", [version.FileRevisionID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async openLinkedEntityByEntity(file: LinkedFilesByEntity, event: CustomEvent) {
		const command = new ServerCommand("OpenLinkedEntityFromIDByEntity", [file.LinkedDocumentNoteID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async uploadLinkedFileByEntity(file: LinkedFilesByEntity, event: CustomEvent) {
		const command = new ServerCommand("UploadLinkedFileByEntity", [file.LinkedDocumentNoteID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async navigateToEntityByEntity(entity: ActiveFileLinkedEntitiesByEntity, event: CustomEvent) {
		const command = new ServerCommand("OpenLinkedEntityFromIDByEntity", [entity.LinkedDocumentNoteID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async toggleFeedFilter() {
		await this.screenService.executeCommand("ToggleFeedFilter");
	}

	private createMenuCommandByEntity(file: LinkedFilesByEntity, event: CustomEvent) {
		switch (event.detail.id) {
			case "UploadLinkedFileByEntity":
				return new ServerCommand(event.detail.id, [file.LinkedDocumentNoteID.value]);
			case "UnlinkFileFromEntityByEntity":
				return new ServerCommand(event.detail.id, [file.LinkedDocumentNoteID.value, file.FileID.value]);
			default:
				return new ServerCommand(event.detail.id, [file.FileID.value]);
		}
	}

	private setupDetailsToolBarByEntity(linkedFile: ActiveLinkedFileByEntity) {
		const items = this.detailsToolBarConfigByEntity.items;
		items.checkOutFileByEntity.config.hidden = !linkedFile?.CheckOutEnabled?.value;
		items.checkInFileByEntity.config.hidden = !linkedFile?.CheckInEnabled?.value;
		items.unlinkFileFromEntityByEntity.config.hidden = !linkedFile?.UnlinkFromEntityEnabled?.value;
		this.detailsToolBarByEntity.setupViewModel();
	}
}

export class Filter extends PXView {
	@controlConfig({
		allowEdit: true,
		editCommand: "GoToProject"
	})
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveFileIDByEntity: PXFieldState<PXFieldOptions.Disabled>;
	ActiveFileVersionByEntity: PXFieldState<PXFieldOptions.Disabled>;
	ActiveEntityIDByEntity: PXFieldState<PXFieldOptions.Disabled>;
}

export class CheckoutComment extends PXView {
	Comment: PXFieldState;
}

export class EntityToLinkFilter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Hidden>;
	LinkType: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CreateNewTagInPlaceFilter extends PXView {
	TagName: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentTagID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccessTagID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false
})
export class EntitiesToLink extends PXView {
	@columnConfig({ width: 40 })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 200 })
	LinkedDocumentType: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ width: 200 })
	@linkCommand("NavigateToEntityToLink")
	LinkedDocumentNumber: PXFieldState<PXFieldOptions.Disabled>;
}

export class Project extends PXView {
	Status: PXFieldState<PXFieldOptions.Disabled>;
	OwnerID: PXFieldState<PXFieldOptions.Disabled>;
	StartDate: PXFieldState<PXFieldOptions.Disabled>;
}
@treeConfig({
	idField: ["TypeID"],
	valueField: "TypeID",
	textField: "TypeName",
	autoRepaint: ["LinkedFilesByEntity"],
	dynamic: true,
	hideToolbarSearch: true,
	hideRootNode: true,
	mode: "single",
	modifiable: false,
	openedLayers: 1,
	selectFirstNode: true,
	singleClickSelect: true,
	syncPosition: true,
	topBarItems: {},
	onSelect: "LinkTypeSelected"
})
export class ProjectLinkTypes extends PXView {
	TypeID: PXFieldState;
	TypeName: PXFieldState;
}

export class LinkedFilesByEntity extends PXView {
	FileID: PXFieldState;

	Name: PXFieldState;

	ShortName: PXFieldState<PXFieldOptions.Disabled>;

	Tags: PXFieldState<PXFieldOptions.Disabled>;

	ImageUrl: PXFieldState;

	FileType: PXFieldState;

	UploadFileRevisionNoData__CreatedByID: PXFieldState;

	UploadFileRevisionNoData__CreatedDateTime: PXFieldState;

	UploadFileRevisionNoData__ReadableSize: PXFieldState;

	LastRevisionID: PXFieldState;

	ReadableFileInfo: PXFieldState;
	Version: PXFieldState<PXFieldOptions.Disabled>;
	CreationDate: PXFieldState<PXFieldOptions.Disabled>;

	LinkedDocumentType: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNumber: PXFieldState<PXFieldOptions.Disabled>;

	CheckOutEnabled: PXFieldState;
	CheckInEnabled: PXFieldState;
	UnlinkFromEntityEnabled: PXFieldState;

	public get fileTypeIcon() {
		return PM509500.getFileTypeIcon(this.FileType?.value);
	}
}

export class ActiveLinkedFileByEntity extends PXView {
	Initialized: PXFieldState;
	ShortName: PXFieldState;
	ImageUrl: PXFieldState;
	FileType: PXFieldState;
	Version: PXFieldState<PXFieldOptions.Disabled>;

	CheckOutEnabled: PXFieldState;
	CheckInEnabled: PXFieldState;
	UnlinkFromEntityEnabled: PXFieldState;

	@controlConfig({
		enterKeyAddsNewLine: true,
		rows: 12,
		selectOnFocus: false
	})
	NoteText: PXFieldState<PXFieldOptions.Multiline>;

	@controlConfig({
		multiSelect: true,
		valueSeparator: ";"
	})
	Tags: PXFieldState<PXFieldOptions.CommitChanges>;

	CheckedOutBy: PXFieldState<PXFieldOptions.Disabled>;
	CheckedOutComment: PXFieldState<PXFieldOptions.Disabled>;

	public get fileTypeIcon() {
		return PM509500.getFileTypeIcon(this.FileType?.value);
	}

	public get nameAndVersion() {
		return `${this.ShortName?.value} [${this.Version?.value}]`;
	}
}

export class ActiveFileVersionsByEntity extends PXView {
	FullVersion: PXFieldState<PXFieldOptions.Disabled>;

	ReadableSize: PXFieldState<PXFieldOptions.Disabled>;

	CreationDate: PXFieldState<PXFieldOptions.Disabled>;

	CreatedByID: PXFieldState<PXFieldOptions.Disabled>;

	FileRevisionID: PXFieldState<PXFieldOptions.Disabled>;
}

export class ActiveFileLinkedEntitiesByEntity extends PXView {
	LinkedDocumentType: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNumber: PXFieldState<PXFieldOptions.Disabled>;
}

export class FeedFilter extends PXView {
	IsShown: PXFieldState;
	LinkedDocumentNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	FileName: PXFieldState<PXFieldOptions.CommitChanges>;
	Tag: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowMyFilesOnly: PXFieldState<PXFieldOptions.CommitChanges>;
}
