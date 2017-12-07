import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Links from 'components/Links'
import Header from 'components/Header'
import AboutMain from 'components/AboutMain'
import Map from 'components/Map'
import Footer from 'components/Footer'

export default class About extends Component{
  static propTypes = {
  }
  render(){
    return(
      <div>
        <Links/>
        <Header 
          title='Esenzhanov Kubanychbek' 
          description='Frontend developer'
           />
        <AboutMain />
        <Map />
        <Footer />
      </div>
    )
  }
}