import City from "../models/city";

export interface Coordinates {
    lat: number,
    long: number
}

export interface MapService {
    map: google.maps.Map | null;
    markers: google.maps.Marker[];
    initMap: (selector: string, onPlace: (latLang: google.maps.LatLng) => void) => void;
    placeMarker: (latLng: google.maps.LatLng, title?: string) => void;
    clearMarkers: () => void;
    showCity: (city: City) => void;
    computeDistanceBetween: (markerA: Coordinates, markerB: Coordinates) => number;
}

const googleMapService: MapService = {
    map: null,
    markers: [],

    initMap(selector: string, onPlace) {
        const mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(47.3686498, 8.5391825),
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"},{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"saturation":"-47"},{"gamma":"0.00"},{"weight":"0.72"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"saturation":"17"},{"gamma":"6.34"}]},{"featureType":"landscape","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#3a6a7d"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"saturation":"-50"},{"lightness":"-22"},{"gamma":"0.94"},{"weight":"0.58"},{"hue":"#00e3ff"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
        } as google.maps.MapOptions;

        const mapElement: Element | null = document.querySelector(selector);

        if (!mapElement) {
            return;
        }

        this.map = new google.maps.Map(mapElement, mapOptions);

        this.map.addListener('click', (e: any) => {
            this.placeMarker(e.latLng);

            if (this.markers.length === 1) {
                onPlace(e.latLng);
            }
        });
    },

    placeMarker(latLng: google.maps.LatLng, title: string = '') {
        if (!this.map || this.markers.length >= 2) {
            return;
        }

        const marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: title,
            label: title
        });

        this.markers.push(marker);
    },

    showCity(city: City) {
        this.placeMarker(new google.maps.LatLng(city.lat, city.long), city.capitalCity);
    },

    computeDistanceBetween(markerA, markerB) {
        const latLngA = new google.maps.LatLng(markerA.lat, markerA.long);
        const latLngB = new google.maps.LatLng(markerB.lat, markerB.long);

        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000);
    },

    clearMarkers() {
        this.markers.forEach(m => m.setMap(null));
        this.markers = [];
    }
};

export default googleMapService;