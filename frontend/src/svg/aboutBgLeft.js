import React from 'react'
import PropTypes from 'prop-types'

export default function AboutBgLeft(props) {
  const {color, width, height} = props
  return(
    <div className="about__main-left">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 900.006 1013.986">
        <path fillRule="evenodd" clipRule="evenodd" fill={color} d="M.01 0l899.997 159.008v854.98H0L.01 0z"/>
      </svg>
    </div>
  )
}