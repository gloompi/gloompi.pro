import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Links from 'components/Links'
import Header from 'components/Header'
import BlogMain from 'components/BlogMain'
import Footer from 'components/Footer'

export default class Blog extends Component{
  static propTypes = {
  }
  render(){
    return(
      <div class="blog">
        <Links/>
        <Header 
          title='Blog' 
          description='Articles, that I wrote'
           />
        <BlogMain />
        <Footer />
      </div>
    )
  }
}