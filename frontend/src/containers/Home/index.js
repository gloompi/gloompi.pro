import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HelloWidget from 'components/HelloWidget'
import './Home.scss'

export default class Home extends Component{
  static propTypes = {
  }
  render(){
    return(
      <div class="hello">
        <div className="header__bg"></div>
        <HelloWidget />
      </div>
    )
  }
}