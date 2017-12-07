import React from 'react'
import PropTypes from 'prop-types'

export default function AboutPicStar(props) {
  const {width, height, color} = props
  return(
    <div className="about__pic-svg">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 103.03 124.03">
        <circle fill={color} cx="5.182" cy="60.182" r="5.182"/>
        <circle fill={color} cx="50.182" cy="5.182" r="5.182"/>
        <circle fill={color} cx="31.182" cy="121.182" r="2.848"/>
        <circle fill={color} cx="65.182" cy="55.182" r="2.848"/>
        <circle fill={color} cx="100.182" cy="49.182" r="2.848"/>
        <circle fill={color} cx="94.182" cy="104.182" r="2.848"/>
        <path fill="none" stroke={color} strokeWidth=".75" strokeMiterlimit="10" d="M50.183 5.182l-45 55 26 61z"/>
        <path fill="none" stroke={color} strokeWidth=".75" strokeMiterlimit="10" d="M100.183 49.182l-50-44-45 55 89 44.43zM65.183 55.182l-34 66"/>
      </svg>
    </div>
  )
}