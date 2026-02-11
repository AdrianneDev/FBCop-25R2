import { ServiceOrderModel, SuitableEmployeeModel } from "./../view-models";
/* eslint-disable brace-style */
import { AssignmentModel, EventModel, ProjectModel, ResourceTimeRangeModel, ResourceModel, StringHelper, TimeSpan } from "@bryntum/schedulerpro";
import { AppointmentEmployeeModel, DatesFilterModel, SearchAppointmentModel } from "../view-models";
import { PeriodKind } from "../scheduler-types";
import { Captions } from "../FS300300";

class TimePeriod {
	start: Date;
	end: Date;
}

export class AppointmentsDataHandler {
	static minimumIntervalMin = 30; // eslint-disable-line @typescript-eslint/no-magic-numbers
	static minimumExistingIntervalMin = 15; // eslint-disable-line @typescript-eslint/no-magic-numbers
	static dndEventId = "dnd_event";

	static unsuitableClass = "qp-sch-unsuitable-resource";
	static nonRecommendedClass = "qp-sch-non-recommended-resource";
	static defaultClass = "qp-sch-default-resource";

	static vendorClass = "qp-sch-vendor-resource";
	static employeeClass = "qp-sch-employee-resource";

	protected source: AppointmentEmployeeModel[] = [];
	protected sourceBacklog: AppointmentEmployeeModel[] = [];

	protected assignments: AppointmentEmployeeModel[];
	protected assignmentsById: Map<string, AppointmentEmployeeModel>;
	protected timeSlotsRaw: AppointmentEmployeeModel[];
	protected timeSlots: { start: Date; end: Date; resourceId: string }[];
	protected suitableEmployees: Map<string, SuitableEmployeeModel>;
	protected suitableEmployeesDND: Map<string, SuitableEmployeeModel>;

	protected unassignedAppointmentById: Map<string, AppointmentEmployeeModel>;

	protected _resources = new Map<string, ResourceModelExt>();
	public get resources() { return this._resources; }

	protected offWorkTimeRanges: ResourceTimeRangeModel[] = [];
	protected workingHours = new Set<string>();
	protected resourcesToEmptyPeriods = new Map<string, Array<TimePeriod>>();

	protected datesFilter: DatesFilterModel;

	protected generation = 0;
	protected lastTimeSpanId = 1;

	public initializeWith(appointments: AppointmentEmployeeModel[]) {
		// if (this.source.length === 0 && assignments.length === 0) return false;
		this.source = appointments.filter(obj => obj.resourceId !== AppointmentEmployeeModel.unassignedId);
		this.sourceBacklog = appointments.filter(obj => obj.resourceId === AppointmentEmployeeModel.unassignedId);

		return true;
	}

	public mergeDataFrom(appointment: AppointmentEmployeeModel[]) {
		if (appointment.some(obj => obj.resourceId !== AppointmentEmployeeModel.unassignedId)) {
			this.source = this.source.filter(obj => obj.appointmentID !== appointment[0].appointmentID);
			this.source = this.source.concat(appointment);
		}
		else {
			this.sourceBacklog = this.sourceBacklog.filter(obj => obj.appointmentID !== appointment[0].appointmentID);
			this.sourceBacklog = this.sourceBacklog.concat(appointment[0]);
		}
	}

	public setSuitableEmployees(suitableEmployees: SuitableEmployeeModel[], forDragAndDrop = false) {
		const employeesMap = new Map(suitableEmployees.map(obj => [obj.BAccountID.cellText, obj]));
		if (forDragAndDrop) {
			this.suitableEmployeesDND = employeesMap;
		}
		else {
			this.suitableEmployees = employeesMap;
		}
	}

	public getSuitableEmployees(forDragAndDrop = false) {
		return forDragAndDrop ? this.suitableEmployeesDND : this.suitableEmployees;
	}

	public removeAppointment(appointmentID: string) {
		this.source = this.source.filter(obj => obj.appointmentID !== appointmentID);
		this.removeFromUnassigned(appointmentID);
	}

	public removeAssignment(assignmentID: string) {
		this.source = this.source.filter(obj => obj.assignmentID !== assignmentID);
	}

	public removeFromUnassigned(appointmentID: string) {
		this.sourceBacklog = this.sourceBacklog.filter(obj => obj.appointmentID !== appointmentID);
		this.unassignedAppointmentById.delete(appointmentID);
	}

	public createProjects(datesFilter: DatesFilterModel, currentEntry: SearchAppointmentModel | AppointmentEmployeeModel | ServiceOrderModel, sameGeneration = false) {
		if (!sameGeneration) {
			this.generation ++;
		}

		this.assignments = [...this.source]; // make a copy to be handled by Scheduler control
		this.timeSlotsRaw = this.assignments.filter(obj => obj.appointmentID.length === 0);
		const nonTimeSlotEntries = this.assignments.filter(obj => obj.appointmentID.length > 0);
		this.assignmentsById = new Map(nonTimeSlotEntries.map(obj => [obj.assignmentID, obj]));
		this.unassignedAppointmentById = new Map(this.sourceBacklog.map(obj => [obj.appointmentID, obj]));
		this.datesFilter = datesFilter;

		this.timeSlots = this.timeSlotsRaw
			.map(slot => ({start: new Date(slot.FSTimeSlot__TimeStart.value), end: new Date(slot.FSTimeSlot__TimeEnd.value), resourceId: slot.resourceId}))
			.filter(slot => slot.start < slot.end);

		this._resources = this.getResources(currentEntry);
		this.offWorkTimeRanges = this.getOffWorkTimeRanges(datesFilter);
		this.resourcesToEmptyPeriods = this.getResourcesToEmptyPeriods();
		this.workingHours = this.getWorkingHours();

		const mainProject = new ProjectModel({
			resources: [...this._resources.values()],
			events: this.getEvents(),
			assignments: this.getAssignments(),
			resourceTimeRanges: this.getOffWorkTimeRanges(datesFilter),
			timeRanges: this.getTimeProjectionRange(),
		});

		const [periodStartDate, periodEndDate] = AppointmentsDataHandler.getPeriodStartEndDates(datesFilter);
		const backlogProject = new ProjectModel({
			resources: [new ResourceModelExt({
				id: AppointmentEmployeeModel.unassignedId,
				name: Captions.Unassigned
			})],
			events: [...this.sourceBacklog.values()].map(obj => new EventModel({
				id: obj.appointmentID,
				startDate: obj.dateTimeBegin,
				endDate: this.getAdjustedEventEndTime(obj),
				name: StringHelper.xss`${obj.caption}`,
				cls: getUnassignedAppointmentClass(obj),
			})),
			assignments: [...this.sourceBacklog.values()].map(obj => new AssignmentModel({
				id: obj.assignmentID,
				eventId: obj.appointmentID,
				resourceId: AppointmentEmployeeModel.unassignedId,
			})),
			resourceTimeRanges: [new ResourceTimeRangeModel({
				id: 0,
				resourceId: AppointmentEmployeeModel.unassignedId,
				timeRangeColor: "blue",
				startDate: periodStartDate,
				endDate: periodEndDate
			})],
			timeRanges: this.getTimeProjectionRange(),
		});

		function getUnassignedAppointmentClass(assignment: AppointmentEmployeeModel) {
			if (assignment.isLocked) return "qp-sch-locked";

			const confirmed = assignment.isValidatedByDispatcher || assignment.isConfirmed;
			const cls = `qp-sch-not-assigned ${confirmed ? "" : "qp-sch-not-confirmed"}`;
			return cls;
		}

		return [backlogProject, mainProject];
	}


	public isWorkingTime(start: Date, end: Date) {
		const startHour = new Date(start);
		startHour.setMinutes(0, 0, 0);
		for (let hour = startHour; hour < end; hour.setHours(hour.getHours() + 1)) {
			if (this.workingHours.has(hour.toISOString())) {
				return true;
			}
		}
		return false;
	}

	public getWorkingHoursSignature() {
		const [start, end] = AppointmentsDataHandler.getPeriodStartEndDates(this.datesFilter);
		const startHour = new Date(start);
		let signature = "";
		startHour.setMinutes(0, 0, 0);
		for (let hour = startHour; hour < end; hour.setHours(hour.getHours() + 1)) {
			if (this.workingHours.has(hour.toISOString())) {
				signature ??= hour.toISOString();
				signature += "1";
			} else if (signature) {
				signature += "0";
			}
		}
		return signature;
	}

	public getAssignment(id: string) {
		const normalizedId = this.getPartialId(id);
		return this.assignmentsById.get(normalizedId);
	}

	public getAssignmentsByAppointmentId(id: string) {
		const normalizedId = this.getPartialId(id);
		// it's not most effecient (O(N) vs O(1)), but that's efficient enough for use in the UI, and it's easier to maintain
		return this.assignments.filter(obj => obj.appointmentID === normalizedId);
	}

	public getAssignmentByAppointmentAndResource(appointmentId: string, resourseId: string) {
		const normalizedId = AppointmentEmployeeModel.getAssignmentId(this.getPartialId(appointmentId), resourseId);
		return this.assignmentsById.get(normalizedId);
	}

	public getUnassignedAppointment(id: string) {
		return this.unassignedAppointmentById?.get(id);
	}

	public getAppointment(id: string) {
		const unassigned = this.getUnassignedAppointment(id);
		if (unassigned) return unassigned;
		return this.getAssignmentsByAppointmentId(id)[0];
	}

	public getAssignmentOrUnassignedAppointment(assignmentId: string, appointmentId: string) {
		return (assignmentId.endsWith(AppointmentEmployeeModel.unassignedId))
			? this.getUnassignedAppointment(appointmentId)
			: this.getAssignment(assignmentId);
	}

	public getGeneration() {
		return this.generation;
	}

	public getFullId(id: string) {
		return `${id}=${this.generation}`;
	}
	public getPartialId(id: string) {
		return id?.indexOf("=") > 0 ? id.substring(0, id.indexOf("=")) : id;
	}

	public findEmptyTimePeriod(resourceId: string, lengthMS: number, rangeFrom: Date, rangeTo: Date) {
		if (resourceId == null) return null;

		const emptyPeriods = this.resourcesToEmptyPeriods.get(resourceId)
			.map(x => ({
				start: normalizeTime(x.start > rangeFrom ? x.start : rangeFrom),
				end: x.end <= rangeTo ? x.end : rangeTo
			}));

		const timePeriod = emptyPeriods?.find(period => period.end.getTime() - period.start.getTime() >= lengthMS);
		return timePeriod?.start;

		function normalizeTime(time: Date) {
			const timeNormalized = new Date(time);
			timeNormalized.setMinutes(Math.ceil(time.getMinutes() / AppointmentsDataHandler.minimumIntervalMin) * AppointmentsDataHandler.minimumIntervalMin, 0, 0);
			return timeNormalized;
		}
	}

	public static getPeriodStartEndDates(datesFilter: DatesFilterModel) {
		const date = new Date(datesFilter.DateSelected.value);
		let start: Date;
		let end: Date;

		switch (datesFilter.PeriodKind.value) {
			case PeriodKind.Day:
				start = date;
				end = new Date(start);
				end.setDate(end.getDate() + 1);
				break;

			case PeriodKind.Week:
				start = getStartOfWeek(date, 1);
				end = new Date(start);
				end.setDate(end.getDate() + 7); // eslint-disable-line @typescript-eslint/no-magic-numbers
				break;

			case PeriodKind.Month:
				start = new Date(date.getFullYear(), date.getMonth(), 1);
				end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
				break;
		}

		start = start?.clearHoursUTC();
		end = end?.clearHoursUTC();

		return [start, end];

		function getStartOfWeek(date: Date, firstDayOfWeek: number) {
			const day = date.clearHoursUTC().getDay();
			const diff = ((day < firstDayOfWeek) ? 7 : 0) + day - firstDayOfWeek; // eslint-disable-line @typescript-eslint/no-magic-numbers
			const startOfWeek = new Date(date);
			startOfWeek.setDate(date.getDate() - diff);
			return startOfWeek;
		}
	}

	public hasWorkingCalendarSet() {
		return this.timeSlots.length > 0;
	}

	public hasData() {
		return this.source.length > 0 || this.sourceBacklog.length > 0;
	}

	public static getEmployeeIconClass(staffType: string | undefined) {
		if (staffType === "VE") return AppointmentsDataHandler.vendorClass;
		if (staffType === "EP") return AppointmentsDataHandler.employeeClass;
		return "";
	}

	public static getEmployeeClass(resource: SuitableEmployeeModel | undefined) {
		if (!resource) {
			return "";
		}

		if (resource.IsNonRecommended?.value) return AppointmentsDataHandler.nonRecommendedClass;
		if (resource.IsUnsuitable?.value) return AppointmentsDataHandler.unsuitableClass;
		if (resource.IsDefault?.value) return AppointmentsDataHandler.defaultClass;
		return "";
	}

	protected getResources(currentEntity: SearchAppointmentModel | AppointmentEmployeeModel | ServiceOrderModel) {
		const defaultEmployees = getEmployeesFrom(this.suitableEmployees, e => e.IsDefault?.value === true);
		const unsuitableEmployees = getEmployeesFrom(this.suitableEmployees, e => e.IsUnsuitable?.value === true);
		const nonRecomendedEmployees = getEmployeesFrom(this.suitableEmployees, e => e.IsNonRecommended?.value === true);

		const resources = new Map(this.timeSlotsRaw.map(assignment => {
			const employee = this.suitableEmployees.get(assignment.resourceId);
			const resourceModel = new ResourceModelExt({
				id: assignment.resourceId,
				name: StringHelper.xss`${assignment.AcctName.cellText}`,
				cls: !!currentEntity && AppointmentsDataHandler.getEmployeeClass(employee),
				iconCls: AppointmentsDataHandler.getEmployeeIconClass(assignment.Type.value),
			});
			resourceModel.label = (employee && currentEntity) ? employee.Label.value : "";
			return [assignment.resourceId, resourceModel];
		}));

		const currentAppointmentId = (currentEntity as SearchAppointmentModel | AppointmentEmployeeModel)?.appointmentID;
		const initiallySorted = new Map([...resources.entries()].sort(getDefaultSortingProc()));
		const assignmentsFound = this.getAssignmentsByAppointmentId(currentAppointmentId);
		const resourcesInCurrent = new Set<string>(assignmentsFound.map(obj => obj.resourceId));

		if (assignmentsFound.length === 0) {
			const sortedResources = new Map([...resources.entries()].sort(getSortingProc()));
			return sortedResources;
		}
		else
		{
			const initiallySortedArray = [...initiallySorted.entries()];
			const anchorAssignment = this.getAssignment(currentAppointmentId) ?? assignmentsFound[0];
			const anchorAssignmentEntry = initiallySortedArray.find(entry => entry[0] === anchorAssignment.resourceId);
			const anchorAssignmentPos = initiallySortedArray.indexOf(anchorAssignmentEntry);
			const beforeAssignmentPart = initiallySortedArray.slice(0, anchorAssignmentPos);
			const afterAssignmentPart = initiallySortedArray.slice(anchorAssignmentPos + 1);

			const sortedBefore = beforeAssignmentPart.sort(getSortingProc(true));
			const sortedAfter = afterAssignmentPart.sort(getSortingProc());
			const sorted = new Map([...sortedBefore, anchorAssignmentEntry, ...sortedAfter]);
			return sorted;
		}

		function getEmployeesFrom(employees: Map<string, SuitableEmployeeModel>, filter: (employee: SuitableEmployeeModel) => boolean) {
			return !currentEntity ? new Set<string>() : new Set([...employees.values()]
				.filter(employee => filter(employee))
				.map(employee => employee.BAccountID.cellText));
		}

		function getSortingProc(reverse = false) {
			const iter = reverse ? -1 : 1;
			return (a, b) => {
				const aInCurrent = resourcesInCurrent.has(a[0]);
				const bInCurrent = resourcesInCurrent.has(b[0]);
				if (aInCurrent !== bInCurrent) return aInCurrent ? -iter : iter;

				const aUnsuitable = unsuitableEmployees.has(a[0]);
				const bUnsuitable = unsuitableEmployees.has(b[0]);
				if (aUnsuitable !== bUnsuitable) return aUnsuitable ? iter : -iter;

				const aNonRecomended = nonRecomendedEmployees.has(a[0]);
				const bNonRecomended = nonRecomendedEmployees.has(b[0]);
				if (aNonRecomended !== bNonRecomended) return aNonRecomended ? iter : -iter;

				const aDefault = defaultEmployees.has(a[0]);
				const bDefault = defaultEmployees.has(b[0]);
				if (aDefault !== bDefault) return aDefault ? -iter : iter;

				const aIsVendor = a[1]?.iconCls === AppointmentsDataHandler.vendorClass;
				const bIsVendor = b[1]?.iconCls === AppointmentsDataHandler.vendorClass;
				if (aIsVendor !== bIsVendor) return aIsVendor ? 1 : -1;

				return a[1].originalData.name.localeCompare(b[1].originalData.name) * iter;
			};
		}

		function getDefaultSortingProc() {
			return (a, b) => {
				const aIsVendor = a[1]?.iconCls === AppointmentsDataHandler.vendorClass;
				const bIsVendor = b[1]?.iconCls === AppointmentsDataHandler.vendorClass;
				if (aIsVendor !== bIsVendor) return aIsVendor ? 1 : -1;

				return a[1].originalData.name.localeCompare(b[1].originalData.name);
			};
		}
	}

	protected getAdjustedEventEndTime(appointment: AppointmentEmployeeModel) {
		const minEndDate = new Date(appointment.dateTimeBegin.getTime() + AppointmentsDataHandler.minimumExistingIntervalMin * 60 * 1000); // eslint-disable-line @typescript-eslint/no-magic-numbers
		const endTime = (appointment.dateTimeEnd >= minEndDate) ? appointment.dateTimeEnd : minEndDate;
		return endTime;
	}

	protected getEvents() {
		const singleAssignmentsById = new Map([...this.assignmentsById.values()].map(obj => [obj.appointmentID, obj]));
		const events = [...singleAssignmentsById.values()].map(obj => new EventModel({
			id: `${this.getFullId(obj.appointmentID)}`,
			startDate: obj.dateTimeBegin,
			endDate: this.getAdjustedEventEndTime(obj),
			name: StringHelper.xss`${obj.caption}`,
			cls: `${getAppointmentClass(obj)}`,
			resizable: !obj?.SchedulerAppointment__Locked.value,
			draggable: !obj?.SchedulerAppointment__Locked.value,
		}));
		const dndEventModel = new EventModel({
			id: AppointmentsDataHandler.dndEventId,
			startDate: new Date(),
			endDate: new Date(),
			name: `DND`,
		});
		events.push(dndEventModel);
		return events;

		function getAppointmentClass(assignment: AppointmentEmployeeModel) {
			if (assignment.SchedulerAppointmentEmployee__IsFilteredOut?.value) {
				return "qp-sch-filtered-out";
			}
			if (assignment.isLocked) {
				return "qp-sch-locked";
			}
			if (!assignment.isValidatedByDispatcher && !assignment.isConfirmed) {
				return "qp-sch-not-confirmed";
			}
			return "b-sch-event";
		}
	}

	protected getAssignments() {
		const assignments = [...this.assignmentsById.values()].map(obj => new AssignmentModel({
			id: `${this.getFullId(obj.assignmentID)}`,
			eventId: `${this.getFullId(obj.appointmentID)}`,
			resourceId: obj.resourceId,
		}));
		return assignments;
	}

	protected getOffWorkTimeRanges(datesFilter: DatesFilterModel) {
		const [periodStartDate, periodEndDate] = AppointmentsDataHandler.getPeriodStartEndDates(datesFilter);
		const resourceIdToTimeRange = new Map<string, Array<({start: Date; end: Date})>>();
		this.resources.forEach(resource => {
			if (!resourceIdToTimeRange.has(resource.id.toString())) {
				resourceIdToTimeRange.set(resource.id.toString(), []);
			}
		});

		const offWorkTimeRanges: ResourceTimeRangeModel[] = [];
		const timeSlots = this.timeSlots;
		prepareWorkTimeRanges(this.assignments);
		computeInversedTimeRanges(this);

		return offWorkTimeRanges;

		function prepareWorkTimeRanges(assignments: AppointmentEmployeeModel[]) {
			timeSlots.forEach(obj => {
				//TODO: we don't really need to compare with the period range here --
				// -- it's just that we need to filter out incorrect results provided by the server
				if (obj.end.getTime() < periodStartDate.getTime()) return;
				if (obj.start.getTime() > periodEndDate.getTime()) return;

				const timeRanges = resourceIdToTimeRange.get(obj.resourceId);
				timeRanges.push({start: obj.start, end: obj.end});
			});
		}

		function computeInversedTimeRanges(self: AppointmentsDataHandler) {
			resourceIdToTimeRange.forEach((timeRanges, resourceId) => {
				let curTime =  periodStartDate;
				timeRanges.sort((a, b) => a.start.getTime() - b.start.getTime());
				timeRanges.forEach(range => {
					addTimeSpan(resourceId, curTime, range.start);
					curTime = range.end;
				});
				addTimeSpan(resourceId, curTime, periodEndDate);
			});

			function addTimeSpan(resourceId: string, startDate: Date, endDate: Date) {
				if (startDate >= endDate) return;

				offWorkTimeRanges.push(new ResourceTimeRangeModel({
					id: self.lastTimeSpanId,
					resourceId: resourceId,
					timeRangeColor: "blue",
					startDate: startDate,
					endDate: endDate,
				}));
				self.lastTimeSpanId ++;
			}
		}
	}

	protected getTimeProjectionRange() {
		return [new TimeSpan({ id: 1, cls: "qp-sch-time-projection" })];
	}

	protected getResourcesToEmptyPeriods() {
		const resourcesToEmptyPeriods = new Map<string, Array<TimePeriod>>();

		const mapAssignmentRanges = getResourceToTimeRanges([...this.assignmentsById.values()],
			(obj) => ({resourceId: obj.resourceId, start: obj.dateTimeBegin, end: obj.dateTimeEnd}));
		const mapOffWorkRanges = getResourceToTimeRanges(this.offWorkTimeRanges,
			(obj) => ({resourceId: obj.resourceId, start: obj.startDate, end: obj.endDate}));
		const resources = [...mapOffWorkRanges.keys()];

		resources.forEach(resourceId => {
			const assignmentRanges = mapAssignmentRanges.get(resourceId) ?? [];
			const offWorkRanges = mapOffWorkRanges.get(resourceId) ?? [];
			const freeSlots = findFreeSlots(offWorkRanges, assignmentRanges);
			resourcesToEmptyPeriods.set(resourceId, freeSlots);
		});

		return resourcesToEmptyPeriods;

		function getResourceToTimeRanges(source: Array<any>, getRange: (obj) => ({resourceId: string; start: Date; end: Date})) {
			const mapRanges = new Map<string, Array<TimePeriod>>();

			source.forEach(obj => {
				const range = getRange(obj);
				if (!mapRanges.has(range.resourceId)) {
					mapRanges.set(range.resourceId, new Array<TimePeriod>());
				}
				mapRanges.get(range.resourceId).push({start: range.start, end: range.end});
			});
			const resources = [...mapRanges.keys()];
			resources.forEach(resourceId => {
				const sorted = mapRanges.get(resourceId).sort((a, b) => a.start.getTime() - b.start.getTime());
				const merged: TimePeriod[] = [];
				sorted.forEach(period => {
					const last = merged.length > 0 ? merged[merged.length - 1] : null;
					if (merged.length === 0 || last.end < period.start) {
						merged.push(period);
					} else if (last.end < period.end) {
						last.end = period.end;
					}
				});

				mapRanges.set(resourceId, merged);
			});
			return mapRanges;
		}

		function findFreeSlots(offWorkPeriods: TimePeriod[], appointments: TimePeriod[]): TimePeriod[] {
			enum TimePointType {
				OffWorkStart = 0,
				OffWorkEnd = 1,
				AppointmentStart = 2,
				AppointmentEnd = 3,
			}
			interface TimePoint {
				time: Date;
				type: TimePointType;
			}

			const timePoints: TimePoint[] = [];
			offWorkPeriods.forEach(period => {
				timePoints.push({ time: period.start, type: TimePointType.OffWorkStart });
				timePoints.push({ time: period.end, type: TimePointType.OffWorkEnd });
			});
			appointments.forEach(period => {
				timePoints.push({ time: period.start, type: TimePointType.AppointmentStart });
				timePoints.push({ time: period.end, type: TimePointType.AppointmentEnd });
			});
			timePoints.sort((a, b) => a.time.getTime() - b.time.getTime() || a.type - b.type);

			let inWorkTime = false;
			let inAppointment = false;
			let possibleStart: Date = null;
			const freeSlots: TimePeriod[] = [];
			timePoints.forEach(point => {
				switch (point.type) {
					case TimePointType.OffWorkEnd:
						if (!inAppointment) {
							possibleStart = point.time;
						}
						inWorkTime = true;
						break;

					case TimePointType.OffWorkStart:
						if (inWorkTime && !inAppointment && possibleStart != null && possibleStart.getTime() !== point.time.getTime()) {
							freeSlots.push({start: new Date(possibleStart), end: new Date(point.time)});
						}
						inWorkTime = false;
						break;

					case TimePointType.AppointmentStart:
						if (inWorkTime && possibleStart != null && possibleStart.getTime() !== point.time.getTime()) {
							freeSlots.push({start: new Date(possibleStart), end: new Date(point.time)});
						}
						possibleStart = null;
						inAppointment = true;
						break;

					case TimePointType.AppointmentEnd:
						if (inWorkTime) {
							possibleStart = point.time;
						}
						inAppointment = false;
						break;
				}
			});

			return freeSlots;
		}
	}

	protected getWorkingHours() {
		const [periodStartDate, periodEndDate] = AppointmentsDataHandler.getPeriodStartEndDates(this.datesFilter);
		const workingHoursSet = new Set<string>();
		addTimeSlotsToWorkingHours(workingHoursSet, this.timeSlots);
		addTimeSlotsToWorkingHours(workingHoursSet, [...this.assignmentsById.values()]
			.map(obj => ({start: obj.dateTimeBegin, end: obj.dateTimeEnd}))
		);
		addTimeSlotsToWorkingHours(workingHoursSet, [...this.sourceBacklog.values()]
			.map(obj => ({start: obj.dateTimeBegin, end: obj.dateTimeEnd}))
		);
		return workingHoursSet;

		function addTimeSlotsToWorkingHours(workingHoursSet: Set<string>, timeSlots: {start: Date; end: Date}[]) {
			timeSlots.sort((a, b) => a.start.getTime() - b.start.getTime());
			let currentHour: Date = null;

			for (const slot of timeSlots) {
				const maxStart = slot.start > periodStartDate ? slot.start : periodStartDate;
				const minEnd = slot.end < periodEndDate ? slot.end : periodEndDate;
				if (currentHour == null || maxStart > currentHour) {
					currentHour = new Date(maxStart);
					currentHour.setHours(currentHour.getHours(), 0, 0, 0);
				}

				while (currentHour < minEnd) {
					const hourText = currentHour.toISOString();
					if (!workingHoursSet.has(hourText)) {
						workingHoursSet.add(hourText);
					}
					currentHour.setHours(currentHour.getHours() + 1);
				}
			}
		}
	}
}

export class ResourceModelExt extends ResourceModel {
	public label: string;
}
