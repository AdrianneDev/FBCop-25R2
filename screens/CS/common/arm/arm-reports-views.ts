import {
	PXView, PXFieldState, PXFieldOptions, NetType, fieldConfig,
	controlConfig,
	localizable,
	columnConfig,
	INumberEditorControlConfig
} from "client-controls";

@localizable
export class Labels {
	static Year = "Year";
	static Period = "Period";
}

export class RMReport extends PXView  {
	ReportCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	RowSetCode: PXFieldState<PXFieldOptions.CommitChanges>;
	ColumnSetCode: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitSetCode: PXFieldState<PXFieldOptions.CommitChanges>;
	StartUnitCode: PXFieldState;

	SitemapTitle: PXFieldState;
	WorkspaceID: PXFieldState;
	SubcategoryID: PXFieldState;

	PaperKind: PXFieldState;
	Landscape: PXFieldState;

	MarginLeft: PXFieldState;
	MarginLeftType: PXFieldState;
	MarginRight: PXFieldState;
	MarginRightType: PXFieldState;
	MarginTop: PXFieldState;
	MarginTopType: PXFieldState;
	MarginBottom: PXFieldState;
	MarginBottomType: PXFieldState;

	Width: PXFieldState;
	WidthType: PXFieldState;
	Height: PXFieldState;
	HeightType: PXFieldState;

	RequestOrganizationID: PXFieldState;
	RequestUseMasterCalendar: PXFieldState;
	RequestLedgerID: PXFieldState;
	RequestStartAccount: PXFieldState;
	RequestEndAccount: PXFieldState;
	RequestStartSub: PXFieldState;
	RequestEndSub: PXFieldState;
	RequestStartBranch: PXFieldState;
	RequestEndBranch: PXFieldState;

	RequestStartAccountGroup: PXFieldState;
	RequestEndAccountGroup: PXFieldState;
	RequestStartProject: PXFieldState;
	RequestEndProject: PXFieldState;
	RequestStartProjectTask: PXFieldState;
	RequestEndProjectTask: PXFieldState;
	RequestStartInventory: PXFieldState;
	RequestEndInventory: PXFieldState;

	RequestStartPeriod: PXFieldState;
	RequestEndPeriod: PXFieldState;
	RequestAccountClassID: PXFieldState;
	ApplyRestrictionGroups: PXFieldState;
}

export class RMDataSource extends PXView  {
	@columnConfig({ editorType: "qp-drop-down" })
	Expand: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down" })
	AmountType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ editorType: "qp-drop-down" })
	RowDescription: PXFieldState<PXFieldOptions.CommitChanges>;

	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMasterCalendar: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	EndAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	StartSub: PXFieldState<PXFieldOptions.CommitChanges>;
	EndSub: PXFieldState<PXFieldOptions.CommitChanges>;
	StartBranch: PXFieldState<PXFieldOptions.CommitChanges>;
	EndBranch: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	StartAccountGroup: PXFieldState<PXFieldOptions.CommitChanges>;
	EndAccountGroup: PXFieldState<PXFieldOptions.CommitChanges>;
	StartProject: PXFieldState<PXFieldOptions.CommitChanges>;
	EndProject: PXFieldState<PXFieldOptions.CommitChanges>;
	StartProjectTask: PXFieldState<PXFieldOptions.CommitChanges>;
	EndProjectTask: PXFieldState<PXFieldOptions.CommitChanges>;
	StartInventory: PXFieldState<PXFieldOptions.CommitChanges>;
	EndInventory: PXFieldState<PXFieldOptions.CommitChanges>;

	StartPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	EndPeriod: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowNull: true, placeholder: Labels.Year }) StartPeriodYearOffset: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true, placeholder: Labels.Year }) EndPeriodYearOffset: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true, placeholder: Labels.Period }) StartPeriodOffset: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowNull: true, placeholder: Labels.Period }) EndPeriodOffset: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class RMStyle extends PXView  {
	StyleID: PXFieldState;
	FontName: PXFieldState<PXFieldOptions.CommitChanges>;
	TextAlign: PXFieldState<PXFieldOptions.CommitChanges>;
	FontStyle: PXFieldState<PXFieldOptions.CommitChanges>;
	// TODO: Classic UI has a drop down pre-filled with values
	// @fieldConfig({
	// 	controlType: "qp-drop-down",
	// 	controlConfig: {
	// 		allowEdit: true,
	// 		options: [
	// 			{value: 8, text: "8"}, {value: 9, text: "9"}, {value: 10, text: "10"}
	// 		],33
	// 		valueType: NetType.Double
	// 	}
	// })
	@controlConfig<INumberEditorControlConfig>({
		allowNull: true,
		removeTrailingZeros: true
	})
	FontSize: PXFieldState<PXFieldOptions.CommitChanges>;
	FontSizeType: PXFieldState<PXFieldOptions.CommitChanges>;
	ColorRGBA: PXFieldState<PXFieldOptions.CommitChanges>;
	BackColorRGBA: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({
		allowNull: true
	})
	ColorRGB: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({
		allowNull: true
	})
	BackColorRGB: PXFieldState<PXFieldOptions.CommitChanges>;
	Bold: PXFieldState<PXFieldOptions.CommitChanges>;
	Italic: PXFieldState<PXFieldOptions.CommitChanges>;
	Strikeout: PXFieldState<PXFieldOptions.CommitChanges>;
	Underline: PXFieldState<PXFieldOptions.CommitChanges>;
}
