import { readable } from 'svelte/store'

const LOCALSTORAGE_KEY = 'location-coords';

const savedCoords = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

const initialState = savedCoords ? {
    usingSaved: true,
    loading: true,
    error: null,
    coords: savedCoords
} : {
    usingSaved: false,
    loading: true,
    error: null,
    coords: null
}

console.log('savedCoords:', savedCoords);
console.log('initialState', initialState);

export const location = readable(initialState, set => {
    setTimeout(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('location.js position:', position);
            const coords = { 
                timestamp: position.timestamp,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed
            };
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(coords));
            console.log('coords:', coords);
            set({ usingSaved: false, loading: false, error: null, coords });
        }, error => {
            console.error('location.js error:', error);
            set({ ...initialState, error, loading: false });
        })
    }, 2000); // for development, put in a 2 second delay
})
