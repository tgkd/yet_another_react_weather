/* eslint-disable */
import React from 'react'

/* imoprt components */
import WeatherCard from '../WeatherCard/index.jsx'

import './index.styl'
import WeatherApi from 'libs/weatherApi'
import PlacesApi from 'libs/placesApi'

const weatherApi = new WeatherApi()
const placesApi = new PlacesApi()

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherInfo: null,
            locationPhoto: null,
            loading: false,
            error: null,
        }
    }

    getCityWeather = async city => {
        try {
            const weather = await weatherApi.getWeatherByCityName(city)
            this.setState({ weatherInfo: { ...weather.data } })
        } catch (err) {
            if (err.status === 404) {
                this.setState({ error: 'Sry, Location not found', loading: false })
            } else {
                this.setState({ error: 'Something wrong', loading: false })
            }
        }
    }

    getCityPhoto = async city => {
        try {
            const cityPlace = await placesApi.getCityPhoto(city)
            const locationPhoto = URL.createObjectURL(cityPlace.data)
            this.setState({ locationPhoto, loading: false })
        } catch (err) {
            if (err.status === 404) {
                this.setState({ error: 'Sry, Location not found', loading: false })
            } else {
                this.setState({ error: 'Something wrong', loading: false })
            }
        }
    }

    cityInputHandler = e => {
        const key = e.which || e.keyCode
        if (key === 13) {
            this.setState({
                loading: true,
                error: null,
            })
            this.getCityPhoto(e.target.value)
            this.getCityWeather(e.target.value)
            e.target.value = ''
        }
    }

    render() {
        const { weatherInfo, locationPhoto, loading, error } = this.state
        return (
            <div className="app">
                <WeatherCard loading={loading} error={error} image={locationPhoto} weatherData={weatherInfo} />
                <input
                    className="city-input"
                    type="text"
                    onKeyPress={this.cityInputHandler}
                    placeholder="Search Location"
                />
            </div>
        )
    }
}
