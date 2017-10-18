import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

const Loader = ({ size }) => {
    const loaderStyle = { height: `${size}px`, width: `${size}px` }
    return <div style={loaderStyle} className="loader" />
}

Loader.propTypes = {
    size: PropTypes.number,
}

Loader.defaultProps = {
    size: 10,
}

export default Loader
