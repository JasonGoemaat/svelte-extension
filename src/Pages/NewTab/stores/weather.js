import { readable } from 'svelte/store'
import { location } from './location'

const LOCALSTORAGE_KEY = 'weather-data';

let currentState = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

const saveState = state => {
    currentState = state;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
}

const initialState = currentState ?? {
    usingSaved: false,
    loading: true,
    error: null,
    weatherLocation: null,
    weatherData: null
}

export const weather = readable(initialState, set => {
    console.log('weather created');
    location.subscribe(location => {
        const { coords: { latitude, longitude } } = location;
        if (location && location.coords && location.coords.latitude && location.coords.longitude) {
            const locationUrl = `https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`;
            console.log('locationUrl:', locationUrl);
            fetch(locationUrl)
            .then(x => x.json())
            .then(nearby => {
                console.log('found nearby locations:', nearby);
                const closest = nearby.sort((a, b) => a.distance - b.distance)[0];
                saveState({
                    ...initialState,
                    loading: true,
                    error: null,
                    weatherLocation: closest
                });
                set(currentState);
                const weatherUrl = `https://www.metaweather.com/api/location/${closest.woeid}`;
                return fetch(weatherUrl);
            })
            .then(x => x.json())
            .then(weatherData => {
                console.log('found weatherData:', weatherData);
                saveState({
                    ...initialState,
                    weatherData,
                    usingSaved: false,
                    loading: false,
                    error: null
                });
                set(currentState);
            })
        }
    });
})


/*


### Getting location:

    navigator.geolocation.getCurrentPosition((...args) => console.log('success:', args), (...args) => console.log('error:', args));

You can't stringify the result though... 


Get list of weather stations given lat/long: 

    var url = `https://www.metaweather.com/api/location/search/?lattlong=41.59,-93.74`;
    fetch(url).then(x => x.json()).then(x => window.x = x);

That returns an array of JSON like this:

    {
        "distance": 10329,
        "title": "Des Moines",
        "location_type": "City",
        "woeid": 2391446,
        "latt_long": "41.573711,-93.617653"
    }

We're interested in the 'woeid' for the next call

    var url = `https://www.metaweather.com/api/location/2391446`;
    await fetch(url).then(x => x.json()).then(x => { window.x = x; return x; });

That returns the weather like so, looks like a list of today and 5 days in the future...

    {
    "consolidated_weather": [
        {
        "id": 4579198951751680,
        "weather_state_name": "Light Rain",
        "weather_state_abbr": "lr",
        "wind_direction_compass": "SW",
        "created": "2020-04-22T14:15:04.474475Z",
        "applicable_date": "2020-04-22",
        "min_temp": 10.93,
        "max_temp": 23.6,
        "the_temp": 22.375,
        "wind_speed": 11.703863033951059,
        "wind_direction": 223.33499086401918,
        "air_pressure": 1006.5,
        "humidity": 47,
        "visibility": 14.917568897637794,
        "predictability": 75
        },
        {
        "id": 6587634174394368,
        "weather_state_name": "Heavy Cloud",
        "weather_state_abbr": "hc",
        "wind_direction_compass": "NNE",
        "created": "2020-04-22T14:15:07.164544Z",
        "applicable_date": "2020-04-23",
        "min_temp": 10.025,
        "max_temp": 20.939999999999998,
        "the_temp": 17.69,
        "wind_speed": 5.50950531041385,
        "wind_direction": 12.999999999999993,
        "air_pressure": 1003.5,
        "humidity": 64,
        "visibility": 14.61558249821045,
        "predictability": 71
        },
        {
        "id": 5496457668853760,
        "weather_state_name": "Light Rain",
        "weather_state_abbr": "lr",
        "wind_direction_compass": "ENE",
        "created": "2020-04-22T14:15:10.237370Z",
        "applicable_date": "2020-04-24",
        "min_temp": 7.535,
        "max_temp": 14.2,
        "the_temp": 12.715,
        "wind_speed": 6.5090402970439305,
        "wind_direction": 61.3655911085574,
        "air_pressure": 1009.5,
        "humidity": 77,
        "visibility": 8.282877992523662,
        "predictability": 75
        },
        {
        "id": 4821455156019200,
        "weather_state_name": "Showers",
        "weather_state_abbr": "s",
        "wind_direction_compass": "N",
        "created": "2020-04-22T14:15:13.205123Z",
        "applicable_date": "2020-04-25",
        "min_temp": 5.720000000000001,
        "max_temp": 17.555,
        "the_temp": 14.295,
        "wind_speed": 7.791889995964898,
        "wind_direction": 357.5,
        "air_pressure": 1017,
        "humidity": 56,
        "visibility": 12.857723395371032,
        "predictability": 73
        },
        {
        "id": 5391807032590336,
        "weather_state_name": "Showers",
        "weather_state_abbr": "s",
        "wind_direction_compass": "SSE",
        "created": "2020-04-22T14:15:16.464901Z",
        "applicable_date": "2020-04-26",
        "min_temp": 8.425,
        "max_temp": 18.265,
        "the_temp": 15.375,
        "wind_speed": 5.560073359304329,
        "wind_direction": 157.28497670951103,
        "air_pressure": 1020.5,
        "humidity": 59,
        "visibility": 14.266371888173069,
        "predictability": 73
        },
        {
        "id": 6629488664248320,
        "weather_state_name": "Heavy Rain",
        "weather_state_abbr": "hr",
        "wind_direction_compass": "SSE",
        "created": "2020-04-22T14:15:19.615603Z",
        "applicable_date": "2020-04-27",
        "min_temp": 8.855,
        "max_temp": 21.439999999999998,
        "the_temp": 15.35,
        "wind_speed": 7.053150003976775,
        "wind_direction": 159.5,
        "air_pressure": 1017,
        "humidity": 65,
        "visibility": 9.52996997534399,
        "predictability": 77
        }
    ],
    "time": "2020-04-22T11:44:14.658469-05:00",
    "sun_rise": "2020-04-22T06:23:06.077652-05:00",
    "sun_set": "2020-04-22T20:02:13.674819-05:00",
    "timezone_name": "LMT",
    "parent": {
        "title": "Iowa",
        "location_type": "Region / State / Province",
        "woeid": 2347574,
        "latt_long": "41.938251,-93.389893"
    },
    "sources": [
        {
        "title": "BBC",
        "slug": "bbc",
        "url": "http://www.bbc.co.uk/weather/",
        "crawl_rate": 360
        },
        {
        "title": "Forecast.io",
        "slug": "forecast-io",
        "url": "http://forecast.io/",
        "crawl_rate": 480
        },
        {
        "title": "Met Office",
        "slug": "met-office",
        "url": "http://www.metoffice.gov.uk/",
        "crawl_rate": 180
        },
        {
        "title": "OpenWeatherMap",
        "slug": "openweathermap",
        "url": "http://openweathermap.org/",
        "crawl_rate": 360
        },
        {
        "title": "Weather Underground",
        "slug": "wunderground",
        "url": "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
        "crawl_rate": 720
        },
        {
        "title": "World Weather Online",
        "slug": "world-weather-online",
        "url": "http://www.worldweatheronline.com/",
        "crawl_rate": 360
        }
    ],
    "title": "Des Moines",
    "location_type": "City",
    "woeid": 2391446,
    "latt_long": "41.573711,-93.617653",
    "timezone": "America/Chicago"
    }

    */
