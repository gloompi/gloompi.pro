import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import HelloWidget from 'components/HelloWidget'
import './Home.scss'

import videoBg from 'assets/images/night.mp4'

export default class Home extends Component{
  static propTypes = {
  }
  render(){
    return(
      <div class="hello">
        <video src={videoBg} class="video__bg" autoPlay loop />
        <div className="header__bg"></div>
        <HelloWidget />
      </div>
    )
  }
}