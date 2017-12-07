import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'

import './style.scss'

import {AppBar} from 'components/AdminComponents'
import {Menu} from 'components/AdminComponents'
import {AboutPage} from 'components/AdminComponents'
import {BlogPage} from 'components/AdminComponents'
import {WorksPage} from 'components/AdminComponents'
import {AddWorkPage} from 'components/AdminComponents'
import {UpdateWorkPage} from 'components/AdminComponents'
import {AddCategoryPage} from 'components/AdminComponents'

export default class Admin extends Component{
  static propTypes = {
  }
  state = {
    isOpen: false
  }
  render(){
    const {isOpen} = this.state
    return(
      <div>
        <AppBar that={this} isOpen={isOpen} />
        <Menu that={this} isOpen={isOpen} />
        <Switch>
          <Route exact path="/throne/about" component={AboutPage} />
          <Route exact path="/throne/works" component={WorksPage}/>
          <Route exact path="/throne/blog" component={BlogPage}/>
          <Route exact path="/throne/works/add-work" component={AddWorkPage}/>
          <Route exact path="/throne/works/add-category" component={AddCategoryPage}/>
          <Route exact path="/throne/works/:id" render={({match}) => <UpdateWorkPage match={match}/>} />
        </Switch>
      </div>
    )
  }
}