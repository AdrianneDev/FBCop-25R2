export class AppointmentLocation {
	public constructor(
		public latitude: number,
		public longitude: number,
	) {}

	public getString(separator: string = ","): string {
		return `${this.latitude}${separator}${this.longitude}`;
	}
}
