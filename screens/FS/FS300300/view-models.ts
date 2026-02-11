/* eslint-disable brace-style */
import { PXView, PXFieldState, GridCell, readOnly, columnConfig, headerDescription, gridConfig, GridPreset } from "client-controls";
import { PeriodKind } from "./scheduler-types";

export type AppointmentEntity = AppointmentEmployeeModel | SearchAppointmentModel;
export type DraggableEntity = ServiceOrderModel | AppointmentEntity;

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})
export class ServiceOrderModel extends PXView {
	SrvOrdType: GridCell;
	@columnConfig({ allowFastFilter: true }) RefNbr: GridCell;
	@columnConfig({ allowFilter: false }) EstimatedDurationTotal: GridCell;
	@readOnly Priority: GridCell;
	@readOnly Severity: GridCell;
	@columnConfig({ allowFastFilter: true }) DocDesc: GridCell;
	SLAETA: GridCell;
	OrderDate: GridCell;
	@columnConfig({ allowFilter: false }) SOID: GridCell;
	@readOnly Status: GridCell;
	CreatedDateTime: GridCell;
	ServiceContractRefNbr: GridCell;
	ProjectID: GridCell;
	AssignedEmpID: GridCell;
	LocationID: GridCell;
	CustPORefNbr: GridCell;
	WaitingForParts: GridCell;
	ContactID: GridCell;

	BranchCD: GridCell;
	BranchName: GridCell;
	BranchLocationCD: GridCell;
	BranchLocationDescr: GridCell;

	@columnConfig({ allowFastFilter: true }) CustomerAcctCD: GridCell;
	@columnConfig({ allowFastFilter: true }) CustomerAcctName: GridCell;
	CustomerClassID: GridCell;

	AddressLine1: GridCell;
	AddressLine2: GridCell;
	City: GridCell;
	State: GridCell;
	PostalCode: GridCell;
	CountryID: GridCell;
	@columnConfig({ allowFastFilter: true }) FullAddress: GridCell;

	@columnConfig({ allowFastFilter: true }) Phone1: GridCell;
	@columnConfig({ allowFastFilter: true }) Email: GridCell;

	FSSODet__LineNbr: GridCell;
	FSSODet__RefNbr: GridCell;
	@columnConfig({ allowFilter: false }) FSSODet__EstimatedDuration: GridCell;
	@columnConfig({ allowFastFilter: true }) FSSODet__TranDesc: GridCell;
	FSSODet__InventoryID: GridCell;
	FSSODet__SOLineType: GridCell; // SO Line Type
	FSSODet__IsPrepaid: GridCell; // Prepaid Item
	FSSODet__ProjectTaskID: GridCell;
	@columnConfig({ allowFilter: false }) FSSODet__SODetID: GridCell;
	FSSODet__SMEquipmentID: GridCell;
	FSSODet__ComponentID: GridCell;
	FSSODet__EquipmentLineRef: GridCell;
	FSSODet__DiscountSequenceID: GridCell;
	@readOnly FSSODet__Status: GridCell;
	FSSODet__CostCodeID: GridCell;
	FSSODet__CostCodeDescr: GridCell;

	ProblemCD: GridCell;
	@columnConfig({ allowFastFilter: true }) ProblemDescr: GridCell;

	Vendor__BAccountID: GridCell;
	Vendor__AcctName: GridCell;
	Vendor__AcctCD: GridCell;
	FSSOEmployee__Type: GridCell;

	FSGeoZone__GeoZoneCD: GridCell;
	FSGeoZone__Descr: GridCell;
	BranchAlias__BranchCD: GridCell;
	BranchAlias__AcctName: GridCell;

	InventoryItem__InventoryID: GridCell;
	FSServiceSkill__SkillID: GridCell;
	FSSkill__descr: GridCell;
	FSServiceLicenseType__LicenseTypeID: GridCell;
	FSLicenseType__descr: GridCell;

	private _scheduled: boolean = false;
	get caption() { return this.orderId; }
	get orderId() { return this.RefNbr.cellText.match(/^\d/) ? `${this.SrvOrdType.cellText} ${this.RefNbr.cellText}` : this.RefNbr.cellText; }
	get srvOrdType() { return this.SrvOrdType.cellText; }
	get refNbr() { return this.RefNbr.cellText; }
	get serviceId() { return `${this.orderId}-${this.FSSODet__LineNbr.cellText}`; }
	get isScheduled() { return this.FSSODet__Status?.value === "SC" || this._scheduled; }
	set isScheduled(value: boolean) { this._scheduled = value; }
}

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})

export class SearchAppointmentModel extends PXView {
	SrvOrdType: GridCell;
	@columnConfig({ allowFastFilter: true }) RefNbr: GridCell;
	@columnConfig({ allowFilter: false }) AppointmentID: GridCell;
	@readOnly Status: GridCell;
	ScheduledDateTimeBegin: GridCell;
	ScheduledDateTimeEnd: GridCell;
	@columnConfig({ allowFilter: false }) EstimatedDurationTotal: GridCell;
	@columnConfig({ allowFastFilter: true }) DocDesc: GridCell;
	Confirmed: GridCell;
	ValidatedByDispatcher: GridCell;
	@columnConfig({ allowFilter: false }) StaffCntr: GridCell;
	CreatedDateTime: GridCell;
	@columnConfig({ allowFilter: false }) @readOnly Locked: GridCell;
	@columnConfig({ allowFilter: false }) MapLatitude: GridCell;
	@columnConfig({ allowFilter: false }) MapLongitude: GridCell;

	@columnConfig({ allowFilter: false }) BandColor: GridCell;

	BranchAlias__BranchCD: GridCell;
	BranchAlias__AcctName: GridCell;

	SchedulerServiceOrder__AssignedEmpID: GridCell;
	@readOnly SchedulerServiceOrder__Status: GridCell;
	SchedulerServiceOrder__RefNbr: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerServiceOrder__SOID: GridCell;
	SchedulerServiceOrder__custPORefNbr: PXFieldState;
	SchedulerServiceOrder__LocationID: PXFieldState;
	@readOnly SchedulerServiceOrder__Priority: GridCell;
	@readOnly SchedulerServiceOrder__Severity: GridCell;
	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__DocDesc: GridCell;
	SchedulerServiceOrder__SLAETA: GridCell;
	SchedulerServiceOrder__OrderDate: GridCell;

	SchedulerServiceOrder__BranchCD: GridCell;
	SchedulerServiceOrder__BranchName: GridCell;
	SchedulerServiceOrder__BranchLocationCD: GridCell;
	SchedulerServiceOrder__BranchLocationDescr: GridCell;

	SchedulerServiceOrder__ServiceContractRefNbr: GridCell;

	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__CustomerAcctCD: GridCell;
	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__CustomerAcctName: GridCell;
	SchedulerServiceOrder__CustomerClassID: GridCell;

	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__AddressLine1: GridCell;
	SchedulerServiceOrder__AddressLine2: GridCell;
	SchedulerServiceOrder__City: GridCell;
	SchedulerServiceOrder__State: GridCell;
	SchedulerServiceOrder__PostalCode: GridCell;
	SchedulerServiceOrder__CountryID: GridCell;
	SchedulerServiceOrder__FullAddress: GridCell;
	SchedulerServiceOrder__ContactID: GridCell;

	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__Phone1: GridCell;
	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__Email: GridCell;

	SchedulerServiceOrder__ProblemCD: GridCell;
	@columnConfig({ allowFastFilter: true }) SchedulerServiceOrder__ProblemDescr: GridCell;
	SchedulerServiceOrder__RoomID: GridCell;
	SchedulerServiceOrder__ProjectID: GridCell;

	Vendor__AcctCD: GridCell;
	Vendor__AcctName: GridCell;
	Vendor__Type: GridCell;
	EPEmployee__DepartmentID: GridCell;

	FSAppointmentDet__SMEquipmentID: GridCell;
	InventoryItem__InventoryID: GridCell;

	FSGeoZone__GeoZoneCD: GridCell;
	FSGeoZone__Descr: GridCell;
	FSServiceSkill__SkillID: GridCell;
	FSSkill__descr: GridCell;
	FSServiceLicenseType__LicenseTypeID: GridCell;
	FSLicenseType__descr: GridCell;

	get assignmentID() { return `${this.AppointmentID?.cellText}_unassigned`; }
	get appointmentID() { return this.AppointmentID?.cellText; }
	get isLocked() { return this.Locked?.value === true; }
	get dateTimeBegin() { return new Date(this.ScheduledDateTimeBegin?.value); }
	get dateTimeEnd() { return new Date(this.ScheduledDateTimeEnd?.value); }
	get staffCntr() { return this.StaffCntr?.value; }
	get isConfirmed() { return this.Confirmed?.value; }
	get isValidatedByDispatcher() { return this.ValidatedByDispatcher?.value; }
	get caption() { return this.RefNbr.cellText.match(/^\d/) ? `${this.SrvOrdType.cellText} ${this.RefNbr.cellText}` : this.RefNbr.cellText; }
	get srvOrdType() { return this.SrvOrdType.cellText; }
	get refNbr() { return this.RefNbr.cellText; }
	get bandColor() { return this.BandColor?.value; }
	get latitude() { return this.MapLatitude?.value; }
	get longitude() { return this.MapLongitude?.value; }

	get fullAddress() {
		let address = this.SchedulerServiceOrder__AddressLine1?.cellText?.trim() ?? "";
		const addressLine2 = this.SchedulerServiceOrder__AddressLine2?.cellText?.trim();
		if (addressLine2?.length > 0) {
			address += ` ${ addressLine2}`.trim();
		}
		const addressState = this.SchedulerServiceOrder__State ? `${this.SchedulerServiceOrder__State}, ` : "";

		address += `, ${addressState} ${this.SchedulerServiceOrder__City.cellText} ${this.SchedulerServiceOrder__PostalCode.cellText}, ${this.SchedulerServiceOrder__CountryID.cellText}`;
		return address;
	}
	// TODO: Add other fields
}


@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
})

export class AppointmentEmployeeModel extends PXView {
	static unassignedId = "unassigned";

	@columnConfig({ allowFastFilter: true  }) BAccountID: GridCell;
	@columnConfig({ allowFastFilter: true  }) AcctCD: GridCell;
	@columnConfig({ allowFastFilter: true  }) AcctName: GridCell;
	Type: GridCell;
	EPEmployee__DepartmentID: GridCell;

	BranchAlias__BranchCD: GridCell;
	BranchAlias__AcctName: GridCell;
	BranchLocationCD: GridCell;
	BranchLocationDescr: GridCell;

	@columnConfig({ allowFilter: false }) FSTimeSlot__EmployeeID: GridCell;
	@columnConfig({ allowFilter: false }) FSTimeSlot__TimeStart: GridCell;
	@columnConfig({ allowFilter: false }) FSTimeSlot__TimeEnd: GridCell;

	SchedulerAppointment__SrvOrdType: GridCell;
	SchedulerAppointment__RefNbr: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerAppointment__AppointmentID: GridCell;
	SchedulerAppointment__ScheduledDateTimeBegin: GridCell;
	SchedulerAppointment__ScheduledDateTimeEnd: GridCell;
	@readOnly SchedulerAppointment__Status: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerAppointment__MapLatitude: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerAppointment__MapLongitude: GridCell;
	SchedulerAppointment__Confirmed: GridCell;
	SchedulerAppointment__ValidatedByDispatcher: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerAppointment__StaffCntr: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerAppointment__Locked: GridCell;
	SchedulerAppointment__CreatedDateTime: GridCell;
	SchedulerAppointment__DocDesc: GridCell;

	@columnConfig({ allowFilter: false }) SchedulerAppointment__BandColor: GridCell;

	SchedulerAppointmentEmployee__IsFilteredOut: GridCell;

	@readOnly SchedulerServiceOrder__Status: GridCell;
	SchedulerServiceOrder__RefNbr: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerServiceOrder__SOID: GridCell;
	@columnConfig({ allowFilter: false }) SchedulerServiceOrder__EstimatedDurationTotal: GridCell;
	@readOnly SchedulerServiceOrder__Priority: GridCell;
	@readOnly SchedulerServiceOrder__Severity: GridCell;
	SchedulerServiceOrder__DocDesc: GridCell;
	SchedulerServiceOrder__SLAETA: GridCell;
	SchedulerServiceOrder__OrderDate: GridCell;
	SchedulerServiceOrder__AssignedEmpID: GridCell;

	SchedulerServiceOrder__CustomerAcctCD: GridCell;
	SchedulerServiceOrder__CustomerAcctName: GridCell;
	SchedulerServiceOrder__CustomerClassID: GridCell;
	SchedulerServiceOrder__custPORefNbr: PXFieldState;

	SchedulerServiceOrder__AddressLine1: GridCell;
	SchedulerServiceOrder__AddressLine2: GridCell;
	SchedulerServiceOrder__City: GridCell;
	SchedulerServiceOrder__State: GridCell;
	SchedulerServiceOrder__PostalCode: GridCell;
	SchedulerServiceOrder__CountryID: GridCell;
	SchedulerServiceOrder__ContactID: GridCell;
	SchedulerServiceOrder__LocationID: PXFieldState;
	@columnConfig({ visible: false }) SchedulerServiceOrder__FullAddress: GridCell;

	SchedulerServiceOrder__Phone1: GridCell;
	SchedulerServiceOrder__Email: GridCell;

	SchedulerServiceOrder__ProblemCD: GridCell;
	SchedulerServiceOrder__ProblemDescr: GridCell;

	SchedulerServiceOrder__BranchCD: GridCell;
	SchedulerServiceOrder__BranchName: GridCell;
	SchedulerServiceOrder__BranchLocationCD: GridCell;
	SchedulerServiceOrder__BranchLocationDescr: GridCell;

	SchedulerServiceOrder__ServiceContractRefNbr: GridCell;

	SchedulerServiceOrder__ProjectID: GridCell;
	SchedulerServiceOrder__RoomID: GridCell;

	SchedulerEmployeeInventoryItem__inventoryID: GridCell;
	InventoryItem__InventoryID: GridCell;

	FSServiceSkill__skillID: GridCell;
	FSSkill__descr: GridCell;
	FSServiceLicenseType__licenseTypeID: GridCell;
	FSLicenseType__descr: GridCell;
	SchedulerEmployeeLicenseType__LicenseTypeID: GridCell;
	SchedulerEmployeeLicenseType__descr: GridCell;
	SchedulerEmployeeSkill__skillID: GridCell;
	SchedulerEmployeeSkill__descr: GridCell;

	FSGeoZone__GeoZoneCD: GridCell;
	FSGeoZone__Descr: GridCell;
	SchedulerEmployeeGeoZone__geoZoneCD: GridCell;
	SchedulerEmployeeGeoZone__descr: GridCell;
	FSSODet__SMEquipmentID: GridCell;

	static getAssignmentId(appointmentId: string, employeeId: string) {
		return `${appointmentId}_${employeeId}`;
	}

	get assignmentID() { return `${this.SchedulerAppointment__AppointmentID?.cellText}_${this.resourceId}`; }
	get appointmentID() { return this.SchedulerAppointment__AppointmentID?.cellText; }
	get resourceId() { return (this.BAccountID?.cellText?.length > 0) ? this.BAccountID?.cellText : AppointmentEmployeeModel.unassignedId; }
	get isLocked() { return this.SchedulerAppointment__Locked?.value === true; }
	get dateTimeBegin() { return new Date(this.SchedulerAppointment__ScheduledDateTimeBegin?.value); }
	get dateTimeEnd() { return new Date(this.SchedulerAppointment__ScheduledDateTimeEnd?.value); }
	get staffCntr() { return this.SchedulerAppointment__StaffCntr?.value; }
	get isConfirmed() { return this.SchedulerAppointment__Confirmed?.value; }
	get isValidatedByDispatcher() { return this.SchedulerAppointment__ValidatedByDispatcher?.value; }
	get srvOrdType() { return this.SchedulerAppointment__SrvOrdType.cellText; }
	get refNbr() { return this.SchedulerAppointment__RefNbr.cellText; }
	get caption() { return this.SchedulerAppointment__RefNbr.cellText.match(/^\d/)
		? `${this.SchedulerAppointment__SrvOrdType.cellText} ${this.SchedulerAppointment__RefNbr.cellText}` : this.SchedulerAppointment__RefNbr.cellText; }
	get isFilteredOut() { return !!this.SchedulerAppointmentEmployee__IsFilteredOut.value; }

	get fullAddress() {
		let address = this.SchedulerServiceOrder__AddressLine1?.cellText?.trim() ?? "";
		const addressLine2 = this.SchedulerServiceOrder__AddressLine2?.cellText?.trim();
		if (addressLine2?.length > 0) {
			address += ` ${ addressLine2}`.trim();
		}
		const addressState = this.SchedulerServiceOrder__State ? `${this.SchedulerServiceOrder__State}, ` : "";

		address += `, ${addressState} ${this.SchedulerServiceOrder__City.cellText} ${this.SchedulerServiceOrder__PostalCode.cellText}, ${this.SchedulerServiceOrder__CountryID.cellText}`;
		return address;
	}

	get bandColor() { return this.SchedulerAppointment__BandColor?.value; }
	get latitude() { return this.SchedulerAppointment__MapLatitude?.value; }
	get longitude() { return this.SchedulerAppointment__MapLongitude?.value; }
}


export class DatesFilterModel extends PXView {
	DateSelected: PXFieldState;
	DateBegin: PXFieldState;
	DateEnd: PXFieldState;
	FilterBusinessHours: PXFieldState;
	PeriodKind: PXFieldState;

	get filterBusinessHoursValue() {
		return this.FilterBusinessHours?.value ?? true;
	}

	get periodKindValue() {
		return this.PeriodKind?.value ?? PeriodKind.Day;
	}
}


export class SelectedAppointmentModel extends PXView {
	@readOnly Confirmed: PXFieldState;
	@readOnly ValidatedByDispatcher: PXFieldState;
	@readOnly SrvOrdType: PXFieldState;
	@readOnly RefNbr: PXFieldState;
	@readOnly AppointmentID: PXFieldState;
	@readOnly Status: PXFieldState;
	@readOnly BranchCD: PXFieldState;
	@readOnly ScheduledDateTimeBegin: PXFieldState;
	@readOnly ScheduledDateTimeEnd: PXFieldState;
	@readOnly EstimatedDurationTotal: PXFieldState;
	@readOnly DocDesc: PXFieldState;
	@readOnly LongDescr: PXFieldState;
	@readOnly StaffCntr: PXFieldState;
	@readOnly Locked: PXFieldState;

	get isLocked() { return this.Locked?.value === true; }
	get canConfirm() { return !this.isLocked && this.Confirmed?.value === false; }
	get canUnconfirm() { return !this.isLocked && this.Confirmed?.value === true; }
	get canValidate() { return !this.isLocked && this.ValidatedByDispatcher?.value === false; }
	get canInvalidate() { return !this.isLocked && this.ValidatedByDispatcher?.value === true; }
}

export class SelectedSOModel extends PXView {
	@readOnly RefNbr: PXFieldState;
	@readOnly Status: PXFieldState;
	@readOnly DocDesc: PXFieldState;
	@readOnly Priority: PXFieldState;
	@readOnly Severity: PXFieldState;
	@readOnly SLAETA: PXFieldState;
	@readOnly OrderDate: PXFieldState;
	@readOnly SourceType: PXFieldState;
	@readOnly WaitingForParts: PXFieldState;
	@readOnly @headerDescription ProjectID: PXFieldState;
	@readOnly @headerDescription ServiceContractRefNbr: PXFieldState;
	@readOnly @headerDescription CustomerID: PXFieldState;
	@readOnly @headerDescription ContactID: PXFieldState;
	@readOnly @headerDescription CustPORefNbr: PXFieldState;
	@readOnly @headerDescription LocationID: PXFieldState;

	@readOnly CustomerAcctCD: PXFieldState;
	@readOnly CustomerAcctName: PXFieldState;
	@readOnly CustomerClassID: PXFieldState;

	@readOnly ContactDisplayName: PXFieldState;
	@readOnly Phone1: PXFieldState;
	@readOnly Email: PXFieldState;

	@readOnly AddressLine1: PXFieldState;
	@readOnly AddressLine2: PXFieldState;
	@readOnly City: PXFieldState;
	@readOnly State: PXFieldState;
	@readOnly PostalCode: PXFieldState;
	@readOnly CountryID: PXFieldState;
	@readOnly FullAddress: PXFieldState;

	EstimatedDurationTotal: PXFieldState;
	CreatedDateTime: PXFieldState;

	@readOnly @headerDescription BranchCD: PXFieldState;
	@readOnly @headerDescription BranchName: PXFieldState;
	@readOnly @headerDescription BranchLocationCD: PXFieldState;
	@readOnly @headerDescription BranchLocationDescr: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class EmployeeModel extends PXView {
	@readOnly AcctCD: GridCell;
	@readOnly AcctName: GridCell;
	@readOnly Contact__Phone1: GridCell;
	@readOnly DepartmentID: GridCell;
	@readOnly Type: GridCell;
}

@gridConfig({ preset: GridPreset.Details })
export class SuitableEmployeeModel extends PXView {
	@readOnly BAccountID: GridCell;
	@readOnly IsDefault: GridCell;
	@readOnly IsUnsuitable: GridCell;
	@readOnly IsNonRecommended: GridCell;
	@readOnly Label: GridCell;
	@readOnly Type: GridCell;
}

@gridConfig({ preset: GridPreset.Details })
export class SchedulerTrackingHistory extends PXView {
	@readOnly BAccountID: GridCell;
	@readOnly FullName: GridCell;
	@readOnly ExecutionDate: GridCell;
	@readOnly Latitude: GridCell;
	@readOnly Longitude: GridCell;
	@readOnly Altitude: GridCell;
	@readOnly TrackLocation: GridCell;
	@readOnly Interval: GridCell;
}

export class AppointmentFilterModel extends PXView {
	AppointmentID: PXFieldState; // Appointment ID for popup
	SearchAppointmentID: PXFieldState; // Current appointment ID
	AssignableAppointmentID: PXFieldState; // For testing assignability
	AssignableSOID: PXFieldState; // For testing assignability
	AssignableSODetID: PXFieldState; // For testing assignability
}

export class DevicesFilterModel extends PXView {
	SelectedEmployeeIDs: PXFieldState;
}

export class SOFilterModel extends PXView {
	SOID: PXFieldState;
}

export class LastUpdatedAppointmentFilterModel extends PXView {
	AppointmentID: PXFieldState;
}

export class SetupModel extends PXView {
	AppResizePrecision: PXFieldState;
}

export class InitDataModel extends PXView {
	MapAPIKey: PXFieldState;
	EnableGPSTracking: PXFieldState;
	GPSRefreshTrackingTime: PXFieldState;
}

export class MainAppointmentFilterModel extends PXView {
	OnHold: PXFieldState;
	OpenEditor: PXFieldState;
	ResetFilters: PXFieldState;

	SrvOrdType: PXFieldState;
	SORefNbr: PXFieldState;
	RefNbr: PXFieldState;
	SOID: PXFieldState;
	SODetID: PXFieldState;
	@readOnly Status: PXFieldState;
	Description: PXFieldState;
	CustomerID: PXFieldState;
	LocationID: PXFieldState;
	ContactID: PXFieldState;
	BranchLocationID: PXFieldState;
	ScheduledDateTimeBegin_Date: PXFieldState;
	ScheduledDateTimeBegin_Time: PXFieldState;
	Duration: PXFieldState;
	LongDescr: PXFieldState;
	Resources: PXFieldState;
	ProjectID: PXFieldState;

	InitialRefNbr: PXFieldState;
	InitialSORefNbr: PXFieldState;
	InitialCustomerID: PXFieldState;
}

export class UpdatedAppointmentModel extends PXView {
	AppointmentID: PXFieldState;
	NewBegin: PXFieldState;
	NewEnd: PXFieldState;
	NewResourceID: PXFieldState;
	OldResourceID: PXFieldState;
	Confirmed: PXFieldState;
	ValidatedByDispatcher: PXFieldState;
}

export class RoomModel extends PXView {
	RoomID: PXFieldState;
}

const varExtractor = new RegExp("return (.*);");
export function getVariableName<TResult>(name: () => TResult) {
	const m = varExtractor.exec(`${name}`);
	return m[1];
}
