import {
	columnConfig,
	controlConfig,
	createCollection,
	createSingle,
	graphInfo,
	gridConfig,
	handleEvent,
	linkCommand,
	localizable,
	treeConfig,
	CustomEventType,
	GridPreset,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXPageLoadBehavior,
	PXScreen,
	PXView,
	QpSplitterCustomElement,
	QpToolBarCustomElement,
	ScreenUpdateParams,
	ServerCommand
} from "client-controls";

import { bindable } from "aurelia-framework";

import { MenuButton } from "client-controls/controls/compound/tool-bar/qp-tool-bar";
import { MenuSeparator } from "client-controls/controls/compound/tool-bar/qp-tool-bar-items";
import { IMultiUploaderConfig } from "client-controls/controls/simple/uploader/qp-multi-upload";
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
}

@graphInfo({
	graphType: "PX.Objects.PM.ProjectFiles.FileEntryForms.ProjectFilesEntry",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues
})
export class PM509000 extends PXScreen {
	Filter = createSingle(Filter);

	CheckoutComment = createSingle(CheckoutComment);

	EntityToLinkFilter = createSingle(EntityToLinkFilter);

	CreateNewTagInPlaceFilter = createSingle(CreateNewTagInPlaceFilter);

	EntitiesToLink = createCollection(EntitiesToLink);

	Project = createSingle(Project);

	public static getFileTypeIcon(fileType) {
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

	CheckOutFileByTag: PXActionState;
	CheckInFileByTag: PXActionState;
	DownloadFileByTag: PXActionState;
	DownloadFilesByTagZip: PXActionState;
	DownloadAllFiles: PXActionState;
	DownloadCheckedFiles: PXActionState;
	DeleteCheckedFiles: PXActionState;
	EditFileByTag: PXActionState;
	LinkFileToDocumentByTag: PXActionState;
	OpenLinkedEntityByTag: PXActionState;
	OpenLinkedEntityFromIDByTag: PXActionState;
	SetActiveFileByTag: PXActionState;
	UploadFileRevisionByTag: PXActionState;
	UploadLinkedFilesByTag: PXActionState;
	CreateNewTagInPlace: PXActionState;

	ProjectTags = createCollection(ProjectTags);

	LinkedFilesByTag = createCollection(LinkedFilesByTag);

	ActiveLinkedFileByTag = createSingle(ActiveLinkedFileByTag);

	ActiveFileVersionsByTag = createCollection(ActiveFileVersionsByTag);

	ActiveFileLinkedEntitiesByTag = createCollection(ActiveFileLinkedEntitiesByTag);

	FeedFilter = createSingle(FeedFilter);

	@bindable previewSplitterByTag!: QpSplitterCustomElement;

	@bindable detailsToolBarByTag!: QpToolBarCustomElement;

	multiUploadConfig = {
		id: "btnUploadFilesByTag_upld2_FileUpldr",
		graph: "PX.Objects.PM.ProjectFiles.FileEntryForms.ProjectFilesEntry",
		view: "LinkedFilesByTag",
		action: "UploadLinkedFilesByTag",
		autoRepaint: true
	} as IMultiUploaderConfig;

	private detailsToolBarConfigByTag: any = {
		id: "detailsToolBarConfigByTag",
		items: {
			downloadFileByTag: {
				config: {
					id: "downloadFileByTag",
					text: Messages.Download,
					commandName: "DownloadFileByTag",
				}
			},
			uploadFileRevisionByTag: {
				config: {
					id: "uploadFileRevisionByTag",
					text: Messages.UploadNewVersion,
					commandName: "UploadActiveFileRevisionByTag",
					hidden: true,
				}
			},
			editFileByTag: {
				config: {
					id: "EditFileByTag",
					text: Messages.ShowDetails,
					commandName: "EditActiveFileByTag",
				}
			},
			checkOutFileByTag: {
				config: {
					id: "checkOutFileByTag",
					text: Messages.CheckOut,
					commandName: "CheckOutActiveFileByTag",
					hidden: true,
				}
			},
			checkInFileByTag: {
				config: {
					id: "checkInFileByTag",
					text: Messages.UndoCheckOut,
					commandName: "CheckInActiveFileByTag",
					hidden: true,
				}
			},
			linkFileToEntityByTag: {
				config: {
					id: "linkFileToEntityByTag",
					text: Messages.LinkFileToDocument,
					commandName: "LinkActiveFileToEntityByTag",
					hidden: true,
				}
			},
			unlinkFileFromEntityByTag: {
				config: {
					id: "unlinkFileFromEntityByTag",
					text: Messages.RemoveLink,
					commandName: "UnlinkActiveFileFromEntityByTag",
					hidden: true,
				}
			},
			deleteFileByTag: {
				config: {
					id: "deleteFileByTag",
					text: Messages.Delete,
					commandName: "DeleteActiveFileByTag",
					hidden: true,
				}
			},
		}
	};

	@handleEvent(CustomEventType.RowSelected, { view: "ActiveLinkedFileByTag" })
	onActiveLinkedFileByTagRowSelected() {
		if (this.ActiveLinkedFileByTag) {
			this.setupDetailsToolBarByTag(this.ActiveLinkedFileByTag);
			generatePdfPreview(
				this.baseApiClient,
				this.ActiveLinkedFileByTag.FileType.value,
				this.Filter.ActiveFileIDByTag.value,
				this.Filter.ActiveFileVersionByTag.value);
		}
	}

	async attached() {
		await super.attached();
		this.setFilterPlaceholders();

		if (!this.FeedFilter.IsHeaderShown.value) {
			const collapseElement = document.querySelector("#mainWorkspace_collapser") as HTMLElement;
			collapseElement.style.display = "none";
		}
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

	protected getFileMenuByTag(item: LinkedFilesByTag) {
		const createMenuButton = (id: string, text: string, icon: string) =>
			new MenuButton(id, { text, images: { normal: icon } });

		const commands = [
			createMenuButton("DownloadFileFromIDByTag", Messages.Download, "svg:main@download"),
			...(item.CreateNewVersionEnabled.value
				? [createMenuButton("UploadFileRevisionByTag", Messages.UploadNewVersion, "svg:main@upload")]
				: []),
			new MenuSeparator("DetailsSeparatorByTag"),
			createMenuButton("EditFileByTag", Messages.ShowDetails, "svg:main@external"),
			...(item.CheckOutEnabled.value
				? [createMenuButton("CheckOutFileByTag", Messages.CheckOut, "svg:main@checkOut")]
				: []),
			...(item.CheckInEnabled.value
				? [createMenuButton("CheckInFileByTag", Messages.UndoCheckOut, "svg:main@checkIn")]
				: []),
			...(item.LinkToEntityEnabled.value || item.UnlinkFromEntityEnabled.value
				? [new MenuSeparator("LinkSeparatorByTag")]
				: []),
			...(item.LinkToEntityEnabled.value
				? [createMenuButton("LinkFileToEntityByTag", Messages.LinkFileToDocument, "svg:main@link")]
				: []),
			...(item.UnlinkFromEntityEnabled.value
				? [createMenuButton("UnlinkFileFromEntityByTag", Messages.RemoveLink, "svg:main@unlink")]
				: []),
			...(item.DeleteFileEnabled.value
				? [
					new MenuSeparator("DeleteSeparatorByTag"),
					createMenuButton("DeleteFileByTag", Messages.Delete, "svg:main@delete")]
				: [])
		];

		return {
			options: commands,
			images: { normal: "svg:main@dots" },
			hideOpener: true,
			tabIndex: -1
		};
	}

	protected async handleFileMenuCommandByTag(file: LinkedFilesByTag, event: CustomEvent) {
		const command = this.createMenuCommandByTag(file, event);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async setActiveFileByTag(file: LinkedFilesByTag, event: CustomEvent) {
		const target = event.target as HTMLElement;
		if (target.tagName === "IMG") {
			return;
		}

		this.previewSplitterByTag.splitterState = "normal";
		const command = new ServerCommand("SetActiveFileByTag", [file.FileID.value, file.LastRevisionID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async setActiveVersionByTag(version: ActiveFileVersionsByTag, event: CustomEvent) {
		const command = new ServerCommand("SetActiveVersionByTag", [version.FileRevisionID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async navigateToEntityByTag(entity: ActiveFileLinkedEntitiesByTag, event: CustomEvent) {
		const command = new ServerCommand("OpenLinkedEntityFromIDByTag", [entity.LinkedDocumentNoteID.value]);
		await this.screenService.executeCommand(command, new ScreenUpdateParams({ blockPage: false, views: null }));
	}

	protected async toggleFeedFilter() {
		await this.screenService.executeCommand("ToggleFeedFilter");
	}

	protected async filterFeedByDate() {
		await this.screenService.executeCommand("FilterFeedByDate");
	}

	private setupDetailsToolBarByTag(linkedFile: ActiveLinkedFileByTag) {
		const items = this.detailsToolBarConfigByTag.items;
		items.uploadFileRevisionByTag.config.hidden = !linkedFile?.CreateNewVersionEnabled?.value;
		items.checkOutFileByTag.config.hidden = !linkedFile?.CheckOutEnabled?.value;
		items.checkInFileByTag.config.hidden = !linkedFile?.CheckInEnabled?.value;
		items.linkFileToEntityByTag.config.hidden = !linkedFile?.LinkToEntityEnabled?.value;
		items.unlinkFileFromEntityByTag.config.hidden = !linkedFile?.UnlinkFromEntityEnabled?.value;
		items.deleteFileByTag.config.hidden = !linkedFile?.DeleteFileEnabled?.value;
		this.detailsToolBarByTag.setupViewModel();
	}

	private createMenuCommandByTag(file: LinkedFilesByTag, event: CustomEvent) {
		return event.detail.id === "UnlinkFileFromEntityByTag"
			? new ServerCommand(event.detail.id, [file.LinkedDocumentNoteID.value, file.FileID.value])
			: new ServerCommand(event.detail.id, [file.FileID.value]);
	}
}

export class Filter extends PXView {
	@controlConfig({
		allowEdit: true,
		editCommand: "GoToProject"
	})
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ActiveFileIDByTag: PXFieldState<PXFieldOptions.Disabled>;
	ActiveFileVersionByTag: PXFieldState<PXFieldOptions.Disabled>;
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
	idField: ["TagID"],
	valueField: "TagID",
	textField: "TagCD",
	autoRepaint: ["LinkedFilesByTag"],
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
	onSelect: "ProjectTagSelected"
})
export class ProjectTags extends PXView {
	TagID: PXFieldState;
	TagCD: PXFieldState;
}

export class LinkedFilesByTag extends PXView {
	FileID: PXFieldState;

	Name: PXFieldState;

	IsChecked: PXFieldState<PXFieldOptions.CommitChanges>;

	ShortName: PXFieldState<PXFieldOptions.Disabled>;

	Tags: PXFieldState<PXFieldOptions.Disabled>;

	ImageUrl: PXFieldState;

	FileType: PXFieldState;

	UploadFileRevisionNoData__CreatedByID_Creator_DisplayName: PXFieldState;

	UploadFileRevisionNoData__CreatedDateTime: PXFieldState;

	UploadFileRevisionNoData__ReadableSize: PXFieldState;

	LastRevisionID: PXFieldState;

	ReadableFileInfo: PXFieldState;
	Version: PXFieldState<PXFieldOptions.Disabled>;
	CreationDate: PXFieldState<PXFieldOptions.Disabled>;

	LinkedDocumentType: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNumber: PXFieldState<PXFieldOptions.Disabled>;

	CreateNewVersionEnabled: PXFieldState;
	DeleteFileEnabled: PXFieldState;
	CheckOutEnabled: PXFieldState;
	CheckInEnabled: PXFieldState;
	LinkToEntityEnabled: PXFieldState;
	UnlinkFromEntityEnabled: PXFieldState;

	public get fileTypeIcon() {
		return PM509000.getFileTypeIcon(this.FileType?.value);
	}
}

export class ActiveLinkedFileByTag extends PXView {
	Initialized: PXFieldState;
	ShortName: PXFieldState;
	ImageUrl: PXFieldState;
	FileType: PXFieldState;
	Version: PXFieldState<PXFieldOptions.Disabled>;

	CreateNewVersionEnabled: PXFieldState;
	DeleteFileEnabled: PXFieldState;
	CheckOutEnabled: PXFieldState;
	CheckInEnabled: PXFieldState;
	LinkToEntityEnabled: PXFieldState;
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
		return PM509000.getFileTypeIcon(this.FileType?.value);
	}

	public get nameAndVersion() {
		return `${this.ShortName?.value} [${this.Version?.value}]`;
	}
}

export class ActiveFileVersionsByTag extends PXView {
	FullVersion: PXFieldState<PXFieldOptions.Disabled>;

	ReadableSize: PXFieldState<PXFieldOptions.Disabled>;

	CreationDate: PXFieldState<PXFieldOptions.Disabled>;

	CreatedByID: PXFieldState<PXFieldOptions.Disabled>;

	FileRevisionID: PXFieldState<PXFieldOptions.Disabled>;
}

export class ActiveFileLinkedEntitiesByTag extends PXView {
	LinkedDocumentType: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	LinkedDocumentNumber: PXFieldState<PXFieldOptions.Disabled>;
}

export class FeedFilter extends PXView {
	IsShown: PXFieldState;
	LinkType: PXFieldState<PXFieldOptions.CommitChanges>;
	LinkedDocumentNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	FileName: PXFieldState<PXFieldOptions.CommitChanges>;
	Tag: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowMyFilesOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	IsHeaderShown: PXFieldState;
}
