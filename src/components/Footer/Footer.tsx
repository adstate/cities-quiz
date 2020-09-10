import React, {useCallback} from "react";
import {nextCity, startGame} from '../../actions'
import {useSelector} from 'react-redux';
import './Footer.css';
import {RootState} from "../../reducers";

interface FooterProps {
    dispatch: React.Dispatch<any>,
    mapService?: any
}

const Footer: React.FC<FooterProps> = ({dispatch}) => {
    const gameStarted = useSelector((state: RootState) => state.gameStarted);
    const currentCity = useSelector((state: RootState) => state.currentCity);
    const currentMarker = useSelector((state: RootState) => state.currentMarker);


    const genNextCity = () => {
        dispatch(nextCity());
    }

    const start = () => {
        dispatch(startGame());
        genNextCity();
    }

    return (
      <div className="footer">
          { gameStarted && <button className="button button_active" disabled={!currentMarker} onClick={genNextCity}>Place</button>}
          { !gameStarted && <button className="button button_active" onClick={start}>Start</button>}
      </div>
    );
}

export default Footer;
