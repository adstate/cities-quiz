import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Map.css';
import {RootState} from "../../reducers";
import {placeMarker} from '../../actions'
import {MapService} from '../../services/googleMapService';


interface MapProps {
    mapService: MapService;
}

const Map: React.FC<MapProps> = ({mapService}) =>  {
    const currentCity = useSelector((state: RootState) => state.currentCity);
    const currentMarker = useSelector((state: RootState) => state.currentMarker);
    const gameStarted = useSelector((state: RootState) => state.gameStarted);

    const dispatch = useDispatch();

    const onSelectPlace = (latLng: google.maps.LatLng) => {
        dispatch(placeMarker({lat: latLng.lat(), long: latLng.lng()}));
    }


    if (currentMarker && currentCity) {
        mapService.showCity(currentCity);
    } else {
        mapService.clearMarkers();
    }

    useEffect(() => {
        mapService.initMap('#map', onSelectPlace);
    }, []);

    if (!gameStarted) {
        return (
            <div id="map" className="citiesMap citiesMap_disabled"></div>
        )
    }

    return (
        <div id="map" className="citiesMap"></div>
    );
}

export default Map;
