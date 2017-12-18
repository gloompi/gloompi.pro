import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'

import Links from 'components/Links'
import Header from 'components/Header'
import BlogMain from 'components/BlogMain'
import Footer from 'components/Footer'
import ArticleModal from 'components/ArticleModal'

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
        <Switch>
          <Route exact path="/blog/article/:id" render={({match}) => <ArticleModal match={match}/>} />
          <Route exact path="/blog/:page" render={({match}) => <BlogMain match={match} />} />
        </Switch>
        <Footer />
      </div>
    )
  }
}