import React from 'react'
import PropTypes from 'prop-types'

export default function PortfolioBg(props) {
  const {width, height, color} = props
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 2032 360.368">
      <path fillRule="evenodd" clipRule="evenodd" fill={color} d="M2032 360.368V0L1016 173 0 0v360.368"/>
    </svg>
  )
}