import React from 'react'
import PropTypes from 'prop-types'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh'
}

export default function Loader() {
  return(
    <div style={style}>
      <img src='/assets/img/loader.gif' alt="Loader"/>
    </div>
  )
}