/* eslint-disable */
import axios from 'axios'
import config from './config'

export default class WeatherApi {
    constructor() {
        this.placesPath = '/maps/api/place/'
        this.api = axios.create({
            baseURL: config.PROXY_URL,
            timeout: 10000,
            withCredentials: false,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
    }

    async getCityPhoto(city) {
        const placeInfo = await this.getPlace(city)
        if (placeInfo.status !== 200) {
            return new Error('google place not found')
        }
        const photos = placeInfo.data.results[0].photos
        if (!photos.length) {
            return new Error('photos not found')
        }
        const photoRef = photos[0].photo_reference
        return await this.api.request({
            method: 'get',
            url: `/https://maps.googleapis.com/maps/api/place/photo`,
            params: {
                maxheight: 400,
                photoreference: photoRef,
                key: config.PLACES_API_KEY,
            },
            responseType: 'blob',
        })
    }

    async getPlace(city) {
        return await this.api.request({
            method: 'get',
            url: `/https://maps.googleapis.com/maps/api/place/textsearch/json`,
            params: {
                query: city,
                key: config.PLACES_API_KEY,
            }
        })
    }
}
