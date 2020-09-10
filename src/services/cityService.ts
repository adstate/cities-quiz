import data from '../data/capitalCities.json';
import {useDispatch, useSelector} from 'react-redux';

interface CityData {
    capitalCity: string,
    lat: string,
    long: string
}

const cityService = {
    parse(data: CityData[]) {
        return data.map((city: CityData) => ({
            capitalCity: city.capitalCity,
            lat: Number(city.lat),
            long: Number(city.long)
        }));
    }
}

export default cityService;
