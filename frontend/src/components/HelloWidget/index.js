import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import Socials from 'components/Socials'
import './HelloWidget.scss'
import avatar from 'assets/images/avatar.jpg'

export default function HelloWidget() {
  return(
    <div class="hello__widget-wrap">
      <div className="hello__widget-container">
        <div className="hello__widget-pic">
          <img src={avatar} alt="" className="hello__widget-img"/>
        </div>
        <h2 className="hello__widget-title">Esenzhanov Kubanychbek</h2>
        <div class="hello__widget-description">Full-Stack Web Developer</div>
        <Socials />
        <HelloMenu />
      </div>
    </div>
  )
}

const HelloMenu = () => {
  return (
    <nav class="hello__nav-mnu">
      <NavLink exact class="hello__nav-item" to='/portfolio'>Portfolio</NavLink>
      <NavLink exact class="hello__nav-item" to='/about'>About Me</NavLink>
      <NavLink exact class="hello__nav-item" to='/blog/1'>Blog</NavLink>
    </nav>
  )
}