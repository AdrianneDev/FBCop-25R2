import { localizable} from "client-controls";
import { AM215580 } from "./AM215580";
import { EventModel } from "@bryntum/schedulerpro";

@localizable
export class Formats {
	static TimeAxisDay = "ddd, MMMM D, YYYY";
	static TimeAxisHour = "H:mm";
	static WeekdayOnly = "ddd";
	static H1DateRangeSameMonthP1 = "MMMM D";
	static H1DateRangeSameMonthP2 = "D, YYYY";
	static H1DateRangeDiffMonthP1 = "MMMM D";
	static H1DateRangeDiffMonthP2 = "MMMM D, YYYY";
	static H2DateRangeSameMonthP1 = "MMM D";
	static H2DateRangeSameMonthP2 = "D";
	static H2DateRangeDiffMonthP1 = "MMM D";
	static H2DateRangeDiffMonthP2 = "MMM D";
	static MonthAndYear = "MMMM, YYYY";
}

@localizable
export class Labels {
	static Hours = "Hours";
	static Days = "Days";
	static Weeks = "Weeks";
	static ViewEvent = "View...";
	static ScheduleOrder = "Schedule";
	static FirmOrder = "Firm";
	static UndoFirmOrder = "Undo Firm";
	static Save = "Save";
	static FirmAll = "Firm All";
	static UndoFirmAll = "Undo Firm All";
	static ScheduleAll = "Schedule All";
	static OrdersAndOpers = "Orders & Operations";
	static OpersAndMatls = "Operations & Materials";
	static DisplayMatlRemaining = "Display Remaining Materials";
}

@localizable
export class Messages {
	static ErrorLoadingData = "An error occurred while loading data from the server.";
}

export const nameof = (name: Extract<keyof AM215580, string>): string => name;

export interface EventRenderData { eventId: string; eventRecord: EventModel; wrapperStyle: any; style: any; height: number; width: number; cls: any }
