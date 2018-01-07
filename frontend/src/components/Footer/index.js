import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import './Footer.scss'
import Socials from 'components/Socials'

export default function Footer() {
  return(
    <footer class="footer">
      <div className="footer__top">
        <div className="footer__left">The most valuable thing in life is time</div>
        <div className="footer__middle">
          <ul className="footer__mnu-list">
            <NavLink exact class="footer__mnu-link" to='/'>Home</NavLink>
    
            <NavLink class="footer__mnu-link" to='/about'>About</NavLink>
    
            <NavLink class="footer__mnu-link" to='/portfolio'>Portfolio</NavLink>
          
            <NavLink class="footer__mnu-link" to='/blog/1'>Blog</NavLink>
          </ul>
          <Socials />
        </div>
        <div className="footer__right">
          <p>
            <span><i class="fab fa-skype"></i></span>gloompi
          </p>
          <p>
            <a href="mailto: gloompi@gmail.com">
              <span><i class="far fa-envelope"></i></span>gloompi@gmail.com
            </a>
          </p>
          <p>
            <a href="tel: +813270018916">
              <span><i class="fas fa-phone"></i></span>+8-132-7001-8916
            </a>
          </p>
          <p><span><i class="fas fa-map-marker-alt"></i></span>Yangzhou city, China</p>
        </div>
      </div>
      <div className="footer__bottom">
        &copy; Esenzhanov Kubanychbek | Created with love &#10084; 2017
      </div>
    </footer>
  )
}