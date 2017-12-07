import React from 'react'
import PropTypes from 'prop-types'

//components
import './style.scss'

import AboutMe from '../AboutMe'
import Skills from '../Skills'
import mainBgDecor from 'decorators/mainBgDecor'

function AboutMain() {
  return(
    <section className="about__wrap">
      <div className="about__left">
        <AboutMe />
      </div>
      <div className="about__right">
        <Skills />
      </div>
    </section>
  )
}

export default mainBgDecor(AboutMain, 'about__main', "#F3F0E9", "#F4F5F0")