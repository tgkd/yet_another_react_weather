/* eslint-disable react/jsx-indent */
import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

function getCardBackground(url) {
    return {
        'background-image': `${url} no-repeat`,
    }
}

const WeatherCard = (image, weatherData) => {
    console.log(image)
    return (
        <div className="weather-card" style={getCardBackground(image)}>
            <h2 className="weather-card__name">{weatherData.name}</h2>
            <div className="weather-card__params">
                <span className="weather-card__params-temp">
                    {weatherData.main.temp}
                </span>
                <span className="weather-card__params-humidity">
                    {weatherData.main.humidity}
                </span>
                <span className="weather-card__params-pressure">
                    {weatherData.main.pressure}
                </span>
            </div>
        </div>
    )
}

WeatherCard.propTypes = {
    image: PropTypes.string.isRequired,
    weatherData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        main: PropTypes.shape({
            temp: PropTypes.number.isRequired,
            humidity: PropTypes.number.isRequired,
            pressure: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
}

export default WeatherCard
