import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress';

export default function CircleProgress(props) {
  const {value, size, thickness, text} = props
  return(
    <div className="skill__circle-wrap">
      <CircularProgress
        className="skill__circle"
        mode="determinate"
        value={value}
        size={size}
        thickness={thickness}
        color="#1056d1"
      />
      <CircularProgress
        className="skill__circle-shadow"
        mode="determinate"
        style={{position: 'absolute'}}
        value={100}
        size={size}
        thickness={thickness}
        color="#DFDCD5"
      />
      <span className="skill__circle-text">{text}</span>
    </div>
  )
}

CircleProgress.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}