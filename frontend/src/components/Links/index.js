import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'

import './Links.scss'

export default class Links extends Component {
  static propTypes = {
  }
  state= {
    isOpen: false
  }

  render(){
    const {isOpen} = this.state

    return(
      <div class="mnu__wrap">
        <div class="mnu__btn-container">
          <a href="" className={`mnu__btn ${isOpen?'active':''}`} onClick={this.toggleOpen}>
            <i className='bar'></i>
            <i className='bar'></i>
            <i className='bar'></i>
          </a>
        </div>
        <nav class={`mnu__list ${isOpen?'active':''}`}>
          <NavLink activeStyle={{color: '#FFEB3B'}} exact class="mnu__link" to='/'>Home</NavLink>
  
          <NavLink activeStyle={{color: '#FFEB3B'}} class="mnu__link" to='/about'>About</NavLink>
  
          <NavLink activeStyle={{color: '#FFEB3B'}} class="mnu__link" to='/portfolio'>Portfolio</NavLink>
          
            <NavLink activeStyle={{color: '#FFEB3B'}} class="mnu__link" to='/blog'>Blog</NavLink>
        </nav>
      </div>
    )
  }

  toggleOpen = e => {
    e.preventDefault()

    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}