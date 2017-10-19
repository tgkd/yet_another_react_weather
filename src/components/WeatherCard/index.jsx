/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import Loader from '../Loader/index.jsx'
import config from 'libs/config'

import './index.styl'

function getCardDataBlock(weatherData) {
    return (
        <section className="weather-card__data">
            {weatherData && (
                <div className="data">
                    <div className="data__temp">
                        <span className="value">{parseInt(weatherData.main.temp, 10)}&deg;</span>
                        <span>{weatherData.weather[0].main}</span>
                    </div>
                    <div className="hr" />
                    <div className="data__city">
                        <span className="value">
                            {weatherData.name}, {weatherData.sys.country}
                        </span>
                    </div>
                </div>
            )}
        </section>
    )
}

const WeatherCard = ({ loading, image, weatherData }) => {
    const dataIsReady = image && weatherData
    const cardDataBlock = getCardDataBlock(weatherData)
    const bkgImage = {
        backgroundImage: `url('${image || config.DEFAULT_IMG_URL}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    return (
        <div className="weather-card">
            <div className="weather-card__photo" style={bkgImage}>
                {loading && <Loader />}
            </div>
            {cardDataBlock}
        </div>
    )
}

WeatherCard.propTypes = {
    loading: PropTypes.bool.isRequired,
    image: PropTypes.string,
    weatherData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        main: PropTypes.shape({
            temp: PropTypes.number.isRequired,
            humidity: PropTypes.number.isRequired,
            pressure: PropTypes.number.isRequired,
        }).isRequired,
    }),
}

WeatherCard.defaultProps = {
    image: null,
    weatherData: null,
}

export default WeatherCard
