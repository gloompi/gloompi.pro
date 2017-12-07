import React from 'react'
import PropTypes from 'prop-types'

import avatar from 'assets/images/avatar.jpg'

//svg
import AboutPicStar from 'svg/aboutPicStar'

export default function AboutMe() {
  return(
    <div className="about__me">
      <div className="about__title">
        <h2>About Me</h2>
        <AboutPicStar width='100' color='#D9DDE6' />
      </div>
      <div className="about__me-pic">
        <img src={avatar} alt=""/>
      </div>
      <h3>Who am I</h3>
      <div className="description">
        <p>
          I'am developer from Kyrgyzstan, 22 years old. 
        </p>
        <p>
          I born in the small village Belovodskoe.
        </p>
        <p>
          I love programming for the ability to create something new.
        </p>
      </div>
    </div>
  )
}