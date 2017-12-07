import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink} from 'react-router-dom'

import './style.scss'
import mainBgDecor from 'decorators/mainBgDecor'

class BlogMain extends Component{
  static propTypes = {
  }
  render(){
    return(
      <div className="blog__main">
        <ul className="blog__category-list">
          <NavLink to="/blog/:category">category</NavLink>
        </ul>
      </div>
    )
  }
}

export default mainBgDecor(BlogMain)