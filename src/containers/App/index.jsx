/* eslint-disable */
import React from 'react'
import './index.styl'
import WeatherApi from 'libs/weatherApi'
import PlacesApi from 'libs/placesApi'

const weatherApi = new WeatherApi()
const placesApi = new PlacesApi()

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherInfo: {},
            locationInfo: {},
            loading: false,
            error: null,
        }
    }

    getCityWeather = async (city) => {
        const weather = await weatherApi.getWeatherByCityName(city)
        if (weather && weather.status === 200) {
            this.setState({ weatherInfo: { ...weather.data } })
        } else {
            this.setState({ error: weather.message })
        }
    }

    getCityPhoto = async (city) => {
        const cityPlace = await placesApi.getCityPhoto(city)
        if (cityPlace && cityPlace.cod === 200) {
            this.setState({ weatherInfo: { ...cityPlace } })
        } else {
            this.setState({ error: cityPlace.message })
        }
    }

    cityInputHandler = (e) => {
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
        return (
            <div className="app">
                <input type="text" onKeyPress={this.cityInputHandler}/>
            </div>
        )
    }
}
