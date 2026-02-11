import { createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, PXActionState, GridPreset, GridPagerMode, actionConfig, localizable } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@localizable
export class LocalizableStrings {
	static btn_specifyDatabaseEngine = "Specify Database Engine";
	static btn_add = "Add";
	static btn_addNewColumn = "Add New Column";
	static btn_columnLengthIncrease = "Column Length Increase";
}

@graphInfo({
	graphType: "PX.SM.ProjectScriptMaintenance",
	primaryView: "CustObjects",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU209000 extends AuBaseScreen {

	actionEdit: PXActionState;
	localizableStrings = LocalizableStrings;

	@actionConfig({text: LocalizableStrings.btn_specifyDatabaseEngine})
	actionAddSqlAttribute: PXActionState;

	CustObjects = createCollection(CustObject);

	SqlFilter = createSingle(SqlScriptFilter);

	AddAttributeFilter = createSingle(AddSqlAttributeFilter);

	CustomColumnFilter = createSingle(CreateNewColumnFilter);

	ViewEditCustomTable = createCollection(RowEditCustomColumns);

	CreateSchemaFilter = createSingle(CreateTableSchemaFilter);

	IncreaseColumnFilter = createSingle(IncreaseColumnLengthFilter);
}

@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	autoAdjustColumns: true,
	allowDelete: false
})
export class CustObject extends PXView  {
	@linkCommand("actionEdit")
	@columnConfig({width: 200})	ShortName: PXFieldState;
	@columnConfig({width: 150})	UserFriendlyType: PXFieldState;
	@columnConfig({width: 60})	Priority: PXFieldState;
}

export class SqlScriptFilter extends PXView  {
	SqlName: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState<PXFieldOptions.CommitChanges>;
	SqlContent: PXFieldState;
}

export class AddSqlAttributeFilter extends PXView  {
	SqlAttribute: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CreateNewColumnFilter extends PXView  {
	TableName: PXFieldState;
	FieldName: PXFieldState;
	DataType: PXFieldState<PXFieldOptions.CommitChanges>;
	StringLength: PXFieldState;
	DecimalPrecision: PXFieldState;
	DecimalScale: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	allowDelete: false,
	allowInsert: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	topBarItems: {
		addAction: {
		  	type: "menu-options",
		  	config: {
				text: LocalizableStrings.btn_add,
				options: {
					actionAddNewCustomColumnToExistedTable: {
						text: LocalizableStrings.btn_addNewColumn,
						commandName: "actionAddNewCustomColumnToExistedTable"
			  		},
			  		actionIncreaseColumnLengthToExistedTable: {
						text: LocalizableStrings.btn_columnLengthIncrease,
						commandName: "actionIncreaseColumnLengthToExistedTable"
			  		}
				}
		  	}
		},
		Remove: {
			type: "menu-button",
			config: {
				imageSet: "main",
				imageKey: "RecordDel",
				commandName: "actionDeleteCustomColumnFromExistedTable"
			}
		}
	}
})
export class RowEditCustomColumns extends PXView  {
	addAction: PXActionState;
	actionAddNewCustomColumnToExistedTable: PXActionState;
	actionIncreaseColumnLengthToExistedTable: PXActionState;
	actionDeleteCustomColumnFromExistedTable: PXActionState;

	@columnConfig({width: 200})	FieldName: PXFieldState;
	@columnConfig({width: 200})	ScriptType: PXFieldState;
	@columnConfig({width: 200})	DataType: PXFieldState;
}

export class CreateTableSchemaFilter extends PXView  {
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class IncreaseColumnLengthFilter extends PXView  {
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState<PXFieldOptions.CommitChanges>;
	DataType: PXFieldState<PXFieldOptions.CommitChanges>;
	NewLength: PXFieldState<PXFieldOptions.CommitChanges>;
}
