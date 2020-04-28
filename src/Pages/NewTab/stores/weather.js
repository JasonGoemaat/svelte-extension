import { writeable } from 'svelte'

const savedState = JSON.parse(localStorage.getItem('weather-state')) || {};
const defaultState = {
    location: { coords: null, loading: true, error: null },
    weather: { loading: true, error: null }
}

export const weather = writeable(initialState);
