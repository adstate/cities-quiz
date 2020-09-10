import React from 'react';
import googleMapService from './services/googleMapService';
import './App.css';

import Header from './components/Header/Header';
import Map from './components/Map/Map';
import Footer from './components/Footer/Footer';
import {useDispatch} from "react-redux";

const calcViewHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

calcViewHeight();
window.onresize = calcViewHeight;

function App() {
  const dispatch = useDispatch();

  return (
      <div className="app__container">
        <Header/>
        <Map mapService={googleMapService} />
        <Footer dispatch={dispatch}/>
      </div>
  );
}

export default App;
