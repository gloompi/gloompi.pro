import React from 'react'
import PropTypes from 'prop-types'

import './Map.scss'
import Contacts from 'components/Contacts'

export default function Map() {
  return(
    <div class="map__wrap">
      <div className="map"></div>
      <Contacts />
    </div>
  )
}