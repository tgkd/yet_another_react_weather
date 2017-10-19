/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import config from 'libs/config'
import './index.styl'

const Loader = ({ size }) => {
    const loaderStyle = { height: `${size}px`, width: `${size}px` }
    return (
        <div className="overlay">
            <div className="loader" style={loaderStyle}>
                <img src={config.LOADER_IMG_URL} alt="loader" />
            </div>
        </div>
    )
}

Loader.propTypes = {
    size: PropTypes.number,
}

Loader.defaultProps = {
    size: 64,
}

export default Loader
