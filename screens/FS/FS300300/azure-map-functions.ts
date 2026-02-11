import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";
import { AppointmentLocation } from "./models/map-location";
import { MapColors } from "./models/map-colors";
import { MapSettings } from "./models/map-settings";

const AzureMapTextYOffset = 1.2;
const AcumaticaHQLatitude = 47.63870741219774;
const AcumaticaHQLongitude = -122.19699411607687;

export class AzureMapElement {
	protected hotspotWidth: number;
	protected mapSettings: MapSettings;
	protected container: HTMLElement;
	protected popupTargetElement: HTMLElement;
	protected map: atlas.Map;
	protected dataSources = new Map<string | number, atlas.source.DataSource>();
	protected locations = new Map<string, atlas.data.Position>();
	protected deviceLocations = new Map<string | number, atlas.data.Position>();
	protected deviceMarkers: atlas.HtmlMarker[] = [];
	protected routesCache = new Map<string, any>();
	protected locationCache = new Map<string, AppointmentLocation>();
	protected currentColor = MapColors.baseColor;
	protected deviceMarkerTemplate = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1" y="1" width="34" height="34" rx="17" fill="{color}"/>
		<rect x="1" y="1" width="34" height="34" rx="17" stroke="{secondaryColor}" stroke-width="2"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 14.5C14.5 16.433 16.067 18 18 18C19.933 18 21.5 16.433 21.5 14.5C21.5 12.567 19.933 11 18 11C16.067 11 14.5 12.567 14.5 14.5ZM25 23.25C25 23.25 23.3375 19.75 18 19.75C12.6625 19.75 11 23.25 11 23.25V25H25V23.25Z" fill="{secondaryColor}"/>
		</svg>`;


	constructor(container: HTMLElement, popupTargetElement: HTMLElement, hotspotWidth: number, mapSettings: MapSettings) {
		this.container = container;
		this.popupTargetElement = popupTargetElement;
		this.hotspotWidth = hotspotWidth;
		this.mapSettings = mapSettings;
	};

	public initialize() {
		this.map = new atlas.Map(this.container as HTMLElement, {
			authOptions: {
				authType: atlas.AuthenticationType.subscriptionKey,
				subscriptionKey: this.mapSettings.apiKey
			},
			center: [AcumaticaHQLongitude, AcumaticaHQLatitude],
			zoom: 12,
			style: "road",
			showFeedbackLink: false,
		});

		const map = this.map;
		this.map.events.add("ready", function () {
			map.controls.add(new atlas.control.StyleControl(), {
				position: atlas.ControlPosition.TopRight
			});

			map.controls.add(new atlas.control.ZoomControl(), {
				position: atlas.ControlPosition.TopRight
			});
		});
	}

	public detached() {
		if (this.map) {
			this.map.dispose();
			this.map = null;
		}
	}

	public addPin(location: AppointmentLocation,
		resourceId: string | number,
		appointmentId: string,
		title: string,
		pinNumber: string,
		onClick: (id, element) => Promise<void>) {
		if (this.locations.has(appointmentId)) return;

		const position = new atlas.data.Position(location.longitude, location.latitude);
		this.locations.set(appointmentId, position);

		const dataSource = this.getSource(resourceId);

		dataSource.add(new atlas.data.Feature(new atlas.data.Point(position), {
			title: title,
			text: pinNumber,
		}));

		const pin = new atlas.HtmlMarker({
			id: `appointment-${appointmentId}`,
			position: position,
			title: title,
			text: pinNumber,
			color: this.currentColor,
			secondaryColor: MapColors.fillColor,
		});

		this.map.markers.add(pin);
		const mapContainer = this.container;
		this.map.events.add("click", pin, (e) => {
			const element = pin.getElement();
			const elementRect = element.getBoundingClientRect();
			const containerRect = mapContainer.getBoundingClientRect();
			const height = elementRect.bottom - elementRect.top;
			const top = elementRect.top - containerRect.top + height / 2;
			const left = elementRect.left - containerRect.left;
			this.popupTargetElement.style.top = `${top - this.hotspotWidth / 2}px`;
			this.popupTargetElement.style.left = `${left - this.hotspotWidth / 2}px`;
			setTimeout(() => {
				onClick?.(appointmentId, this.popupTargetElement);
			}, 1);
		});
	}

	public clearDevices() {
		this.deviceLocations.clear();
		this.map.markers.remove(this.deviceMarkers);
		this.deviceMarkers = [];
	}

	public addDevice(location: AppointmentLocation,
		resourceId: string | number,
		title: string,
		description: string,
		color: string) {
		const popupContent = !description || description === ""
			? `<div style="padding:10px"><b>${title}</b></div>`
			: `<div style="padding:10px"><b>${title}</b><br/>${description}</div>`;

		const position = new atlas.data.Position(location.longitude, location.latitude);
		this.deviceLocations.set(resourceId, position);
		const marker = new atlas.HtmlMarker({
			id: `device-${resourceId}`,
			position: position,
			title: title,
			color: color,
			secondaryColor: MapColors.fillColor,
			htmlContent: this.deviceMarkerTemplate,
			popup: new atlas.Popup({
				content: popupContent,
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				pixelOffset: [0, -30],
			})
		});
		this.deviceMarkers.push(marker);
		this.map.markers.add(marker);
		this.map.events.add("click", marker, () => {
			marker.togglePopup();
		});
	}

	public clearAllPins() {
		if (!this.map) return;
		this.map.markers.getMarkers().forEach(marker => marker.getOptions().popup?.close());
		this.map.markers.clear();
		this.dataSources.forEach((source, key) => {
			source.clear();
		});
		this.locations.clear();
		this.deviceLocations.clear();
		this.deviceMarkers = [];
	}

	public setColor(color: string) {
		this.currentColor = color;
	}

	public addRouteSegment(segment: any, resourceId: string | number, nextColor: boolean) {
		const dataSource = this.getSource(resourceId);
		dataSource.add(new atlas.data.Feature(new atlas.data.LineString(segment)));
	}

	public updateView() {
		if (this.locations.size === 0 && this.deviceLocations.size === 0) return;
		const locations = this.locations;
		const deviceLocations = this.deviceLocations;
		const map = this.map;
		this.map.events.add("ready", function () {
			if (locations.size === 1 && deviceLocations.size === 0) {
				map.setCamera({
					center: locations.entries().next().value[1],
					zoom: 18,
				});
			}
			else if (locations.size === 0 && deviceLocations.size === 1) {
				map.setCamera({
					center: deviceLocations.entries().next().value[1],
					zoom: 18,
				});
			}
			else  if (locations.size > 1 || deviceLocations.size > 1) {
				map.setCamera({
					bounds: atlas.data.BoundingBox.fromPositions([...locations.values(), ...deviceLocations.values()]),
					padding: 60,
				});
			}
		});
	}

	public async getLocationByAddress(id: string, address: string): Promise<AppointmentLocation> {
		if (this.locationCache.has(id)) {
			return this.locationCache.get(id);
		}
		const offset = this.mapSettings.markerCollisionOffset;
		const request = `search/address/json?api-version=1.0&query=${encodeURIComponent(address)}`;
		const response = await this.fetchAzureData(request);
		const coordinates = response?.results[0]?.position;
		if (!coordinates) return null;

		const location = new AppointmentLocation(coordinates.lat, coordinates.lon);
		for (const [key, location] of this.locationCache.entries()) {
			if (location.latitude === location.latitude && location.longitude === location.longitude) {
				location.latitude += offset;
				location.longitude += offset;
			}
		}
		this.locationCache.set(id, location);
		return location;
	}

	public async getRouteBetweenLocations(fromPoint: AppointmentLocation, toPoint: AppointmentLocation) {
		const query = `${fromPoint.getString()}:${toPoint.getString()}`;
		if (this.routesCache.has(query)) {
			return this.routesCache.get(query);
		}

		const request = `route/directions/json?api-version=1.0&query=${query}`;
		const response = await this.fetchAzureData(request);
		const route = response?.routes[0];
		if (!route) return null;

		let routeCoordinates = [];
		route.legs.forEach((leg) => {
			const legCoordinates = leg.points.map((point) => [point.longitude, point.latitude]);
			routeCoordinates = routeCoordinates.concat(legCoordinates);
		});
		this.routesCache.set(query, routeCoordinates);
		return routeCoordinates;
	}

	protected async fetchAzureData(request: string) {
		const url = `${this.mapSettings.apiUrl}/${request}`;
		return await fetch(url, {
			headers: {
				"Subscription-Key": this.mapSettings.apiKey
			}
		}).then((response) => response.json());
	}

	private getSource(resourceId: string | number): atlas.source.DataSource {
		const layerColor = this.currentColor;

		if (this.dataSources.has(resourceId)) {
			const lineLayer = this.map.layers.getLayerById(`${resourceId}_line`) as atlas.layer.LineLayer;
			if (lineLayer) {
				lineLayer.setOptions({
					strokeColor: layerColor,
				});
			}
			return this.dataSources.get(resourceId);
		}

		const dataSource = new atlas.source.DataSource(`${resourceId}`, {
			cluster: false,
		});

		const map = this.map;

		this.map.events.add("ready", function () {
			map.sources.add(dataSource);

			map.layers.add(new atlas.layer.LineLayer(dataSource, `${resourceId}_line`, {
				strokeColor: layerColor,
				strokeWidth: 4,
				strokeDashArray: [1, 1],
				lineJoin: "round",
				lineCap: "square",
			}), "labels");

			map.layers.add(new atlas.layer.SymbolLayer(dataSource, `${resourceId}_symbol`, {
				iconOptions: {
					image: ["get", "icon"],
					allowOverlap: true,
					ignorePlacement: true,
					optional: true,
				},
				textOptions: {
					textField: ["get", "title"],
					offset: [0, AzureMapTextYOffset],
					haloWidth: 1,
					haloColor: MapColors.textOutlineColor,
				},
				filter: ["any", ["==", ["geometry-type"], "Point"], ["==", ["geometry-type"], "MultiPoint"]] //Only render Point or MultiPoints in this layer.
			}));
		});

		this.dataSources.set(resourceId, dataSource);

		return dataSource;
	}
}
