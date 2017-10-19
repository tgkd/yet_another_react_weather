/* eslint-disable */
import axios from 'axios'
import keys from './config'

export default class WeatherApi {
    constructor() {
        this.weatherPath = '/data/2.5/weather'
        this.api = axios.create({
            baseURL: keys.PROXY_URL,
            timeout: 10000,
            withCredentials: false,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
    }

    async getWeatherByCityName(city) {
        return await this.api.request({
            method: 'get',
            url: '/http://api.openweathermap.org/data/2.5/weather',
            params: {
                q: city,
                units: 'metric',
                APPID: keys.WEATHER_API_KEY,
            }
        })
    }
}
