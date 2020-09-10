import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../reducers'
import './Header.css';

const Header: React.FC<any> = ({}) => {
    const score = useSelector((state: RootState) => state.score);
    const citiesPlaced = useSelector((state: RootState) => state.citiesPlaced);
    const currentCity = useSelector((state: RootState) => state.currentCity);
    const currentDistance = useSelector((state: RootState) => state.currentDistance);
    const gameStarted = useSelector((state: RootState) => state.gameStarted);

    if (gameStarted) {
        return (
            <div className="header">
                <div className="button">{score} kilometers left</div>
                <div className="button">{citiesPlaced} cities placed</div>
                { currentCity && score > 0 && Number(currentDistance) === 0 && <div className="current-place">Select the location of {currentCity.capitalCity}</div> }
                { currentCity && Number(currentDistance) > 0 && <div className="current-place">Distance {currentDistance} km</div> }
            </div>
        )
    }

    return (
        <div className="header">
            <div className="button">{score} kilometers left</div>
            <div className="button">{citiesPlaced} cities placed</div>
            {score === 0 && <div className="current-place">You lost all kilometers</div> }
        </div>
    )
}

export default Header;
