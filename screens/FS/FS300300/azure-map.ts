import { bindable, bindingMode, inlineView } from "aurelia-framework";
import { AppointmentEntity, InitDataModel} from "./view-models";
import { AzureMapElement } from "./azure-map-functions";
import { BingMapElement } from "./bing-map-functions";
import { AppointmentLocation } from "./models/map-location";
import "azure-maps-control/dist/atlas.min.css";
import { MapSettings } from "./models/map-settings";

export type MapPinClickFunc = (eventId: string, eventElement: HTMLElement) => void;
const HotspotWidth = 20;
const AzureMapsApiUrl = "https://atlas.microsoft.com";
const BingMapsApiUrl = "https://dev.virtualearth.net/REST/v1";
const MarkerCollisionOffset = 0.00002;

/* eslint-disable */
// Justification: this is intentional, we need this for aurelia framework.
@inlineView('<template><div ref="container" css="width: ${width}; height: ${height};">' +
	'</div><div style="width: ${hotspotWidth}px; height: ${hotspotWidth}px; position: absolute; top: 0px; inset-inline-start: 0px; margin-top: 38px; opacity: 0%;" ref="popupTargetElement"></div></template>')
/* eslint-enable */
export class AzureMapCustomElement {
	@bindable height = "600px";
	@bindable width = "400px";

	protected hotspotWidth = HotspotWidth;
	protected container: HTMLElement;
	protected mapElement: AzureMapElement | BingMapElement;
	protected popupTargetElement: HTMLElement;
	protected isAzureMaps: boolean | undefined;

	public async initialize(initData: InitDataModel) {
		if (this.isAzureMaps === undefined) {
			this.isAzureMaps = await this.isAzure(initData.MapAPIKey.value);
		}
		if (this.isAzureMaps) {
			const mapSettings = new MapSettings(initData.MapAPIKey.value, AzureMapsApiUrl, MarkerCollisionOffset, initData.EnableGPSTracking.value, initData.GPSRefreshTrackingTime.value);
			this.mapElement = new AzureMapElement(this.container, this.popupTargetElement, this.hotspotWidth, mapSettings);
		}
		else {
			const mapSettings = new MapSettings(initData.MapAPIKey.value, BingMapsApiUrl, MarkerCollisionOffset, initData.EnableGPSTracking.value, initData.GPSRefreshTrackingTime.value);
			this.mapElement = new BingMapElement(this.container, this.popupTargetElement, this.hotspotWidth, mapSettings);
		}
		this.mapElement.initialize();
	}

	public getMarkerOffset(): number {
		return MarkerCollisionOffset;
	}
	public detached() {
		this.mapElement?.detached();
	}

	public addPin(location: AppointmentLocation, resourceId: string | number, id: string, title: string, pinNumber: string, onClick: (id, element) => Promise<void>) {
		this.mapElement?.addPin(location, resourceId, id, title, pinNumber, onClick);
	}

	public addDevice(location: AppointmentLocation,	resourceId: string | number, title: string,	description: string, color: string) {
		this.mapElement?.addDevice(location, resourceId, title, description, color);
	}
	public setColor(color: string) {
		this.mapElement?.setColor(color);
	}

	public addRouteSegment(segment: any, resourceId: string | number, nextColor: boolean) {
		this.mapElement?.addRouteSegment(segment, resourceId, nextColor);
	}

	public clearAllPins() {
		this.mapElement?.clearAllPins();
	}

	public clearDevices() {
		this.mapElement?.clearDevices();
	}

	public updateView() {
		this.mapElement?.updateView();
	}

	public async getLocationForAppointment(appointment: AppointmentEntity): Promise<AppointmentLocation> {
		return await this.mapElement?.getLocationByAddress(appointment.appointmentID, appointment.fullAddress);
	}

	public async getRouteBetweenLocations(fromPoint: AppointmentLocation, toPoint: AppointmentLocation) {
		return await this.mapElement?.getRouteBetweenLocations(fromPoint, toPoint);
	}

	private async isAzure(apiKey: string): Promise<boolean> {
		const url = `${AzureMapsApiUrl}/map/attribution?api-version=2.1&tilesetId=microsoft.core.vector&zoom=1&bounds=-180,-85,180,85`;
		return await fetch(url, {
			headers: {
				"Subscription-Key": apiKey
			}
		}).then((response) => response.ok );
	}
}
