/* eslint-disable */
import axios from 'axios'
import keys from './config'

export default class WeatherApi {
    constructor() {
        this.placesPath = '/maps/api/place/'
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com',
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
        const photoRef = placeInfo.results[0].photos[0].photo_reference
        return await this.api.request({
            method: 'get',
            url: `${this.placesPath}photo`,
            params: {
                maxheight: 400,
                photoreference: photoRef,
                key: keys.PLACES_API_KEY,
            }
        })
    }

    async getPlace(city) {
        return await this.api.request({
            method: 'get',
            url: `${this.placesPath}place/textsearch/json`,
            params: {
                query: city,
                key: keys.PLACES_API_KEY,
            }
        })
    }
}

/* ?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY */