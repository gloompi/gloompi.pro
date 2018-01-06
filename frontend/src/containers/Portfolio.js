import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Links from 'components/Links'
import Header from 'components/Header'
import PortfolioMain from 'components/PortfolioMain'
import Footer from 'components/Footer'

export default class Portfolio extends Component{
  static propTypes = {
  }
  render(){
    return(
      <div class="portfolio">
        <Links/>
        <Header 
          title='Esenzhanov Kubanychbek' 
          description='Frontend developer'
           />
        <PortfolioMain />
        <Footer />
      </div>
    )
  }
}