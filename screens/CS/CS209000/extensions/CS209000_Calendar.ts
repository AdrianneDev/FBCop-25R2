import { CS209000 } from "../CS209000";
import {
	PXFieldState,
	PXView,
	createSingle,
	controlConfig,
	PXFieldOptions,
	IDatetimeEditControlConfig,
} from "client-controls";

export interface CS209000_Calendar extends CS209000 {}
export class CS209000_Calendar {
	CalendarDetails = createSingle(CalendarDetails);
}

export class CalendarDetails extends PXView {
	SunWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;
	MonWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;
	TueWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;
	WedWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;
	ThuWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;
	FriWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;
	SatWorkDay: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SunStartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	MonStartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	TueStartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	WedStartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ThuStartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	FriStartTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SatStartTime: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SunEndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	MonEndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	TueEndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	WedEndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ThuEndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	FriEndTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SatEndTime: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SunWorkTime: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	MonWorkTime: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	TueWorkTime: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	WedWorkTime: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ThuWorkTime: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	FriWorkTime: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SatWorkTime: PXFieldState;

	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SunUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	MonUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	TueUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	WedUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ThuUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	FriUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	SatUnpaidTime: PXFieldState<PXFieldOptions.CommitChanges>;

	SunGoodsMoves: PXFieldState;
	MonGoodsMoves: PXFieldState;
	TueGoodsMoves: PXFieldState;
	WedGoodsMoves: PXFieldState;
	ThuGoodsMoves: PXFieldState;
	FriGoodsMoves: PXFieldState;
	SatGoodsMoves: PXFieldState;
}
