import React from 'react'
import PropTypes from 'prop-types'

//components
import './Header.scss'
import Socials from 'components/Socials'

//svg
import AboutStart from 'svg/aboutStar'
import avatar from 'assets/images/avatar.jpg'

export default function Header(props) {
  const{title, description} = props
  return(
    <header class="header">
      <div className="header__bg" />
      <Socials />
      <div className="header__wrap">
        <AboutStart 
          color='rgba(255, 255, 255, .2)' 
          borderColor='rgba(255, 255, 255, .1)' 
          width="500" />
        <div className="header__pic">
          <img src={avatar} alt="" className="header__img"/>
        </div>
        <div className="header__info">
          <div className="info__name"><h2>{title}</h2></div>
          <div className="info__descr"><span>{description}</span></div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired
}