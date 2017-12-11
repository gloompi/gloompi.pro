import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider';
import {Menu, MenuItem} from 'material-ui/Menu';
import {NavLink} from 'react-router-dom'

export default function MenuBar({that, isOpen}) {
  const style = {
    position: 'fixed',
    left: `${isOpen?0:'-300px'}`,
    top: 0,
    width: 200,
    height: '100vh',
    paddingTop: 60,
    backgroundColor: '#0097A7',
    transition: '.3s'
  }
  const itemStyle = {color: '#fff'}
  return(
    <Menu desktop={true} style={style}>
      <NavLink to="/throne/about">
        <MenuItem 
          onClick={handleClose.bind(that, isOpen)}
          style={itemStyle} 
          primaryText="About" />
      </NavLink>
      <NavLink to="/throne/works">
        <MenuItem 
          onClick={handleClose.bind(that, isOpen)}
          style={itemStyle} 
          primaryText="Works" />
      </NavLink>
      <NavLink to="/throne/blog">
        <MenuItem 
          onClick={handleClose.bind(that, isOpen)}
          style={itemStyle} 
          primaryText="Blog" />
      </NavLink>
      <NavLink to="/throne/skills">
        <MenuItem 
          onClick={handleClose.bind(that, isOpen)}
          style={itemStyle} 
          primaryText="Skills" />
      </NavLink>
      <Divider />
      <NavLink to="/">
        <MenuItem style={itemStyle} primaryText="Home Page" />
      </NavLink>
    </Menu>
  )
}

MenuBar.propTypes = {
  that: PropTypes.object.isRequired, 
  isOpen: PropTypes.bool.isRequired
}

function handleClose(isOpen) {
  this.setState({
    isOpen: false
  })
}