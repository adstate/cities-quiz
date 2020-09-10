import City from '../models/city';
import citiesData from '../data/capitalCities.json';
import cityService from "../services/cityService";
import googleMapService, {Coordinates} from "../services/googleMapService";
import {NEXT_CITY, PLACE_MARKER, START_GAME, END_GAME} from '../actions';

interface State {
    capitalCities: City[];
    currentCity: City | null | undefined,
    currentMarker: any,
    currentDistance: number | null,
    score: number;
    citiesPlaced: number;
    gameStarted: boolean;
}

const initialState: State = {
    capitalCities: cityService.parse(citiesData.capitalCities),
    currentCity: null,
    currentMarker: null,
    currentDistance: 0,
    score: 1500,
    citiesPlaced: 0,
    gameStarted: false
}

const calcDistance = (pointA: Coordinates | null , pointB: Coordinates | null) => {
    let distance = null;

    if (pointA && pointB) {
        distance = googleMapService.computeDistanceBetween(pointA, pointB);
    }

    return distance;
}

const rootReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case NEXT_CITY:
            const currentCity = state.capitalCities.shift();

            return {
                ...state,
                currentCity: currentCity,
                currentMarker: null,
                currentDistance: null
            }

        case PLACE_MARKER:
            const distance = calcDistance(state.currentCity as Coordinates, action.payload);
            const score = (distance) ? state.score - distance : state.score;

            return {
                ...state,
                currentMarker: action.payload,
                score: (score < 0) ? 0 : score,
                citiesPlaced: (distance && distance <= 50) ? ++state.citiesPlaced : state.citiesPlaced,
                gameStarted: (score < 0) ? false : true,
                currentDistance: distance
            }

        case START_GAME:
            return {
                ...initialState,
                capitalCities: cityService.parse(citiesData.capitalCities),
                gameStarted: true
            }

        case END_GAME:
            return {
                ...initialState,
                gameStarted: false
            }

        default:
            return state;
    }
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;