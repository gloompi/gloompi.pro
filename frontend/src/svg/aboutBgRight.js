import React from 'react'

export default function AboutBgRight(props) {
  const {color, width, height} = props
  return(
    <div className="about__main-right">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 900.331 1009.986">
        <path fillRule="evenodd" clipRule="evenodd" fill={color} d="M0 155.008L900.33 0l-.004 1009.986H0V155.008z"/>
      </svg>
    </div>
  )
}