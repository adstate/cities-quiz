export const NEXT_CITY = 'NEXT_CITY';
export const PLACE_MARKER = 'PLACE_MARKER';
export const ADJUST_SCORE = 'ADJUST_SCORE';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';

export const nextCity = () => ({
    type: NEXT_CITY
});

export const placeMarker = (coordinates: {lat: number, long: number}) => ({
    type: PLACE_MARKER,
    payload: coordinates
});

export const adjustScore = (distance: number) => ({
    type: ADJUST_SCORE,
    payload: distance
});

export const startGame = () => ({
    type: START_GAME
});

export const endGame = () => ({
   type: END_GAME
});
