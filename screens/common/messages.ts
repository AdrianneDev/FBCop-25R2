import {
	localizable,
} from "client-controls";

@localizable
export class Messages {
	static Up = "Up";
	static Down = "Down";
	static Left = "Left";
	static Right = "Right";
	static Insert = "Insert";
	static InsertFrom = "Insert From...";
	static Delete = "Delete";
	static DeleteRow = "Delete Row";
	static ShowAll = "Show All";
	static Move = "Move";
	static Add = "Add";
	static AddRow = "Add Row";

	static UOM = "Uom";
	static QTY = "Qty";

	static None = "None";
	static Template = "Template";

	static Mailing_Caption = "Mailing";
	static Printing_Caption = "Printing";
	static Regional_Caption = "Regional";
	static Sorting_Caption = "Sorting";
	static Filtering_Caption = "Filtering";
	static SaveTemplate = "Save Template";
	static EditTemplate = "Edit Template";
}

@localizable
export class NullTextValues {
	static New = "<NEW>";
	static Unassigned = "<UNASSIGNED>";
	static Zero = "0.0";
	static All = "All";
	static MultipleProjects = "<Multiple Projects>";
}
