export class MapSettings {
	public constructor(
		public apiKey: string,
		public apiUrl: string,
		public markerCollisionOffset: number,
		public EnableGPSTracking: boolean,
		public GPSRefreshTrackingTime: number,
	) { }
}
