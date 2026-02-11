import { Formats } from "./FS300300";
import { SchedulerAssignmentModel, SchedulerEventModel, SchedulerPro, SchedulerResourceModel } from "@bryntum/schedulerpro";
import { AppointmentsDataHandler } from "./data-handlers/appointments-data-handler";
import { AzureMapCustomElement, MapPinClickFunc } from "./azure-map";
import { AppointmentEntity } from "./view-models";
import { AppointmentEmployeeModel, SearchAppointmentModel, SchedulerTrackingHistory } from "./view-models";
import {
	dateFormatInfo,
	formatDate
} from "client-controls";
import { AppointmentLocation } from "./models/map-location";
import { MapColors } from "./models/map-colors";

export class AzureMapController {
	private appointmentsForPins: AppointmentEntity[] = [];
	private appointmentsForRouteSegments: { from: AppointmentEntity; to: AppointmentEntity }[] = [];
	private appointmentsLocations = new Map<AppointmentEntity, AppointmentLocation>();
	private routeSegmentsTo = new Map<AppointmentEntity, any>();
	private selectedResources: SchedulerResourceModel[] = [];
	private selectedResourcesColors = new Map<string | number, string>();
	private devices = new Map<string | number, any>();

	public constructor(
		private map: AzureMapCustomElement,
		private scheduler: SchedulerPro,
		private data: AppointmentsDataHandler,
		private getCurrentAppointment: () => AppointmentEntity,
		private popupFunc: (id, element) => Promise<void>) {
	}

	public async updateMap() {
		if (!this.scheduler) return;

		this.selectedResources = this.scheduler.selectedRows as SchedulerResourceModel[];
		this.map.clearAllPins();

		if (!this.selectedResources?.length && !this.getCurrentAppointment()) return;

		this.clearSelectionColors();
		this.initColors();
		this.selectAppointmentsForPinsAndRoutes();
		await this.fetchAppointmentsLocations();
		await this.fetchRouteSegments();
		this.placePinsAndRoutes();
		this.map.updateView();
	}

	public getColors() : Map<string | number, string> {
		return this.selectedResourcesColors;
	}

	public initColors() {
		this.selectedResourcesColors.clear();
		let colorIndex = 0;
		this.selectedResources.forEach(resource => {
			const color = MapColors.lineColors[colorIndex];
			this.selectedResourcesColors.set(resource.id, color);
			colorIndex = (colorIndex + 1) % MapColors.lineColors.length;
		});
	}

	public clearDevices() {
		this.devices.clear();
		this.map.clearDevices();
	}
	public updateDevices(trackingLines: SchedulerTrackingHistory[]) {
		const employeeDevices = this.devices;
		this.clearDevices();
		trackingLines.forEach(trackingLine => {
			employeeDevices.set(trackingLine.BAccountID.cellText, trackingLine);
		});
	}

	public placeDevices(updateView: boolean) {
		this.devices.forEach((device, key) => {
			const location = new AppointmentLocation(device.Latitude.value, device.Longitude.value);
			const color = this.getColor(device.BAccountID.cellText);
			const executionDate = ` ${formatDate(device.ExecutionDate.value, `${Formats.ShortDate} ${Formats.TimeAxisHour}`, dateFormatInfo())}`;
			this.map.addDevice(location, device.BAccountID.cellText, device.FullName.cellText, executionDate, color);
		});
		if (updateView) {
			this.map.updateView();
		}
	}

	private selectAppointmentsForPinsAndRoutes() {
		if (this.getCurrentAppointment() !== null) {
			this.appointmentsForPins.push(this.getCurrentAppointment());
			return;
		}

		this.selectedResources.forEach(resource => {
			const schedulerAssignments = this.getSortedAssignmentsForResource(resource) ?? [];
			let prevAppointment: AppointmentEntity | null = null;
			schedulerAssignments.forEach(schedulerAssignment => {
				const appointment = this.data.getAssignment(schedulerAssignment.id.toString());
				if (!appointment) return; // not yet persisted apppointment
				this.appointmentsForPins.push(appointment);
				if (prevAppointment != null) {
					this.appointmentsForRouteSegments.push({ from: prevAppointment, to: appointment });
				}
				prevAppointment = appointment;
			});
		});
	}

	private async fetchAppointmentsLocations() {
		const offset = this.map.getMarkerOffset();
		await Promise.all(this.appointmentsForPins.map(async appointment => {
			const location = await this.getAppointmentLocation(appointment);

			for (const [key, location] of this.appointmentsLocations.entries()) {
				if (location.latitude === location.latitude && location.longitude === location.longitude) {
					location.latitude += offset;
					location.longitude += offset;
				}
			}

			this.appointmentsLocations.set(appointment, location);
		}));
	};

	private async getAppointmentLocation(appointment: AppointmentEntity) {
		const latitude = appointment.latitude;
		const longitude = appointment.longitude;
		if (latitude != null && longitude != null) {
			return new AppointmentLocation(latitude, longitude);
		}
		return await this.map.getLocationForAppointment(appointment);
	}

	private async fetchRouteSegments() {
		await Promise.all(this.appointmentsForRouteSegments.map(async locations => {
			const fromLocation = this.appointmentsLocations.get(locations.from);
			const toLocation = this.appointmentsLocations.get(locations.to);
			if (fromLocation == null || toLocation == null) return;
			const segment = await this.map.getRouteBetweenLocations(fromLocation, toLocation); // eslint-disable-line @typescript-eslint/no-invalid-this
			this.routeSegmentsTo.set(locations.to, segment);
		}));
	};

	private placePinsAndRoutes() {
		if (this.getCurrentAppointment() !== null) {
			const appointment = this.getCurrentAppointment();
			let resourceId = "";
			if (appointment instanceof AppointmentEmployeeModel) {
				const appt = appointment as AppointmentEmployeeModel;
				resourceId = appt.AcctCD.cellText;
			}
			else if (appointment instanceof SearchAppointmentModel) {
				const appt = appointment as SearchAppointmentModel;
				resourceId = appt.Vendor__AcctCD.cellText;
			}
			this.map.setColor(MapColors.baseColor);
			this.placePinsAndRoutesForApointments([appointment], resourceId);
			return;
		}

		this.selectedResources.forEach(resource => {
			const color = this.getColor(resource.id);
			const icon = document.getElementById(`resource-icon-${resource.id}`);
			if (icon) {
				icon.style.color = color;
			}
			this.map.setColor(color);
			const schedulerAssignments = this.getSortedAssignmentsForResource(resource) ?? [];
			const appointments = schedulerAssignments.map(x => this.data.getAssignment(x.id.toString())) as AppointmentEntity[];
			this.placePinsAndRoutesForApointments(appointments, resource.id);
		});
	}

	private clearSelectionColors() {
		const icons = document.querySelectorAll<HTMLElement>("[id*='resource-icon-']");
		icons.forEach(icon => {
			icon.style.color = "";
		});
		this.selectedResourcesColors.clear();
	}

	private getColor(resourceId: string | number) : string {
		if (this.selectedResourcesColors.has(resourceId)) {
			return this.selectedResourcesColors.get(resourceId);
		}

		return MapColors.baseColor;
	}

	private placePinsAndRoutesForApointments(appointments: AppointmentEntity[], resourceId: string | number) {
		let appointmentNumber = 1;
		appointments.forEach(appointment => {
			if (appointment == null) return; // we can have a projected appointment that doesn't have a real appointment yet
			const location = this.appointmentsLocations.get(appointment);
			if (!location) return;
			const segment = this.routeSegmentsTo.get(appointment);
			const pinText = `${formatDate(appointment.dateTimeBegin, Formats.TimeAxisHour, dateFormatInfo())} - ${formatDate(appointment.dateTimeEnd, Formats.TimeAxisHour, dateFormatInfo())}`;
			this.map.addPin(location, resourceId, appointment.appointmentID, pinText, appointmentNumber.toString(), this.popupFunc);
			if (segment != null) {
				this.map.addRouteSegment(segment, resourceId, appointmentNumber === 2); // first segment of the route
			}
			appointmentNumber++;
		});
	}

	private getSortedAssignmentsForResource(resource: SchedulerResourceModel) {
		const scheduler = this.scheduler;
		const data = this.data;
		const [viewPortDay, nextDay] = getViewPortDates();
		if (viewPortDay == null) return null;

		return this.scheduler.assignmentStore.getAssignmentsForResource(resource)
			?.filter(x => viewPortDay <= getDate(x) && getDate(x) <= nextDay)
			?.sort((a, b) => getDate(a).getTime() - getDate(b).getTime());

		function getViewPortDates() {
			if (!scheduler.visibleDateRange) return [null, null];

			const { startDate, endDate } = scheduler.visibleDateRange;
			let useStartDate = startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth();
			if (!useStartDate) {
				const aMinuteBeforeStartDate = new Date(startDate);
				aMinuteBeforeStartDate.setMinutes(aMinuteBeforeStartDate.getMinutes() - 1);
				useStartDate = !data.isWorkingTime(aMinuteBeforeStartDate, startDate);
			}
			const viewPortDay = new Date(startDate);
			viewPortDay.setDate(startDate.getDate() + (useStartDate ? 0 : 1));
			viewPortDay.setHours(0, 0, 0, 0);
			const nextDay = new Date(viewPortDay);
			nextDay.setDate(nextDay.getDate() + 1);
			return [viewPortDay, nextDay];
		}

		function getDate(assignment: SchedulerAssignmentModel) {
			return ((assignment.event as SchedulerEventModel).startDate as Date);
		}
	}
}
