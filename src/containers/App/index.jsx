/* eslint-disable */
import React from 'react'

/* imoprt components */
import WeatherCard from 'components/WeatherCard'
import Loader from 'components/Loader'

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
            this.setState({ error: err.message })
        }
    }

    getCityPhoto = async city => {
        try {
            const cityPlace = await placesApi.getCityPhoto(city)
            const locationPhoto = URL.createObjectURL(cityPlace.data)
            this.setState({ locationPhoto })
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    cityInputHandler = e => {
        const key = e.which || e.keyCode
        if (key === 13) {
            this.setState({
                loading: true,
            })
            this.getCityPhoto(e.target.value)
            this.getCityWeather(e.target.value)
        }
    }

    render() {
        console.log(Loader)
        const { weatherInfo, locationPhoto, loading } = this.state
        const weatherCard =
            locationPhoto && weatherInfo ? (
                <WeatherCard image={locationPhoto} weatherData={weatherInfo} />
            ) : null
        const content = loading ? <Loader /> : weatherCard

        return (
            <div className="app">
                <input type="text" onKeyPress={this.cityInputHandler} />
            </div>
        )
    }
}
