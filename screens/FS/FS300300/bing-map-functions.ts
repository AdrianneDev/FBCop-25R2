import "bingmaps";
import { AppointmentLocation } from "./models/map-location";
import { MapColors } from "./models/map-colors";
import { MapSettings } from "./models/map-settings";
import { Tools } from "client-controls";

const controlUrl = "//www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded";
/* eslint-disable */
// Justification: this is old code already in repository, it will be decomissioned anyway.
const ready = new Promise(resolve => window["bingMapsLoaded"] = resolve);
/* eslint-enable */
const scriptTag: HTMLScriptElement = document.createElement("script");

scriptTag.async = true;
scriptTag.defer = true;
scriptTag.src = controlUrl;

document.head.appendChild(scriptTag);

export class BingMapElement {
	protected hotspotWidth: number;
	protected mapSettings: MapSettings;
	protected container: HTMLElement;
	protected popupTargetElement: HTMLElement;
	protected map: Microsoft.Maps.Map;
	protected location: Microsoft.Maps.Location | string;
	protected viewChangeHandler: Microsoft.Maps.IHandlerId;
	protected pins = new Map<string, Microsoft.Maps.Location>();
	protected lastLineColorIndex = -1;
	protected locationCache = new Map<string, AppointmentLocation>();
	protected routesCache = new Map<string, any>();

	constructor(container: HTMLElement, popupTargetElement: HTMLElement, hotspotWidth: number, mapSettings: MapSettings) {
		this.container = container;
		this.popupTargetElement = popupTargetElement;
		this.hotspotWidth = hotspotWidth;
		this.mapSettings = mapSettings;
	};

	public async initialize() {
		return ready.then(() => {
			this.map = new Microsoft.Maps.Map(this.container as HTMLElement, {
				credentials: this.mapSettings.apiKey,
				mapTypeId: Microsoft.Maps.MapTypeId.road,
				navigationBarMode: Microsoft.Maps.NavigationBarMode.compact,
				customMapStyle: {
					elements: {
						// area: { fillColor: '#b5db81' },
						// water: { fillColor: '#a3ccff' },
						tollRoad: { fillColor: "#50a964f4", strokeColor: "#50a964f4" },
						arterialRoad: { fillColor: "#ffffff", strokeColor: "#ffffff" },
						road: { fillColor: "#50fed89d", strokeColor: "#50eab671" },
						street: { fillColor: "#ffffff", strokeColor: "#ffffff" },
					},
					settings: {
						// landColor: '#dfdfdf'
					},
					version: ""
				}
			});

			this.location = this.map.getCenter();

			this.viewChangeHandler = Microsoft.Maps.Events.addHandler(this.map, "viewchange", e => {
				this.location = this.map.getCenter();
			});
		});
	}

	public detached() {
		if (this.viewChangeHandler) {
			Microsoft.Maps.Events.removeHandler(this.viewChangeHandler);
		}

		if (this.map) {
			this.map.dispose();
			this.map = null;
		}
	}

	public addPin(location: AppointmentLocation, resourceID: string | number, id: string, title: string, pinNumber: string, onClick: (id, element) => Promise<void>) {
		const msLocation = new Microsoft.Maps.Location(location.latitude, location.longitude);
		if (this.pins.has(id)) return;

		this.pins.set(id, msLocation);
		const pin = new Microsoft.Maps.Pushpin(msLocation, {
			title: title,
			text: pinNumber,
			color: MapColors.baseColor,
			// TODO: change text color
		});
		this.map.entities.push(pin);
		Microsoft.Maps.Events.addHandler(pin, "click", () => {
			const point = this.map.tryLocationToPixel(msLocation, Microsoft.Maps.PixelReference.control) as Microsoft.Maps.Point;
			if (point == null) return;
			this.popupTargetElement.style.top = `${point.y - this.hotspotWidth / 2}px`;
			this.popupTargetElement.style.left = `${point.x - this.hotspotWidth / 2}px`;
			setTimeout(() => {
				onClick?.(id, this.popupTargetElement);
			}, 1);
		});
	}

	public addDevice(location: AppointmentLocation,
		resourceId: string | number,
		title: string,
		description: string,
		color: string) {
		// just dummy method to be alligned with Azure part
	}

	public addRouteSegment(segment: any, resourceId: string | number, nextColor: boolean) { // TODO: make it typed
		const coordinates = segment?.routePath?.line?.coordinates as Array<Array<number>>;
		if (!coordinates) return;

		if (nextColor) {
			this.lastLineColorIndex = (this.lastLineColorIndex + 1) % MapColors.lineColors.length;
		}
		const color = MapColors.lineColors[this.lastLineColorIndex];
		const locations = coordinates.map(coord => new Microsoft.Maps.Location(coord[0], coord[1]));
		const line = new Microsoft.Maps.Polyline(locations, { strokeColor: color, strokeThickness: 3 });
		this.map.entities.push(line);
	}

	public clearAllPins() {
		if (!this.map) return;
		this.map.entities.clear();
		this.pins.clear();
		this.lastLineColorIndex = -1;
	}
	public clearDevices() {
		// just dummy method to be alligned with Azure part
	}

	public setColor(color: string) {
		// just dummy method to be alligned with Azure part
	}

	public updateView() {
		if (this.pins.size === 0) return;
		this.map.setView({ bounds: Microsoft.Maps.LocationRect.fromLocations([...this.pins.values()]), padding: 20 });
	}

	public async getLocationByAddress(id: string, address: string): Promise<AppointmentLocation> {
		if (this.locationCache.has(address)) {
			return this.locationCache.get(address);
		}

		const request = `Locations/${encodeURIComponent(address)}?`;
		const resource = await this.fetchBingData(request);

		const coordinates = resource?.point?.coordinates;
		if (!coordinates) return null;

		const location = new AppointmentLocation(coordinates[0], coordinates[1]);
		this.locationCache.set(address, location);
		return location;
	}

	public async getRouteBetweenLocations(fromPoint: AppointmentLocation, toPoint: AppointmentLocation) {
		const cacheKey = `${fromPoint.getString()}:${toPoint.getString()}`;
		if (this.routesCache.has(cacheKey)) {
			return this.routesCache.get(cacheKey);
		}

		const wp0 = `&wp.0=${fromPoint.getString()}`;
		const wp1 = `&wp.1=${toPoint.getString()}`;

		// TODO: handle Driving/Walking and mi/km
		const request = `Routes/Driving?ra=routePath${wp0}${wp1}&du=mi&`;
		const route = await this.fetchBingData(request);
		if (!route) return null;

		this.routesCache.set(cacheKey, route);
		return route;
	}

	protected async fetchBingData(request: string) {
		const windowName = `bingmaps_callback_${Tools.newGuid().replace(/\-/gi, "_")}`;
		const url = `${this.mapSettings.apiUrl}/${request}key=${this.mapSettings.apiKey}&jsonp=${windowName}`;
		const ready = new Promise(resolve => window[windowName] = resolve);
		const scriptTag: HTMLScriptElement = document.createElement("script");
		scriptTag.setAttribute("type", "text/javascript");
		scriptTag.setAttribute("src", url);
		document.body.appendChild(scriptTag);

		const resource = await ready.then((response) =>
			(response as any)?.resourceSets?.[0]?.resources?.[0]);

		document.body.removeChild(scriptTag);
		return resource;
	}
}
