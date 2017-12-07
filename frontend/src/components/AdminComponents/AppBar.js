import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default function AppBarItem({that, isOpen}) {
const icon = isOpen
  ? <IconButton><NavigationClose/></IconButton>:null
  return(
    <AppBar
      title="Admin Panel"
      iconElementLeft={icon}
      onLeftIconButtonTouchTap={handleClick.bind(that, isOpen)}
    />
  )
}

AppBarItem.propTypes = {
  that: PropTypes.object.isRequired, 
  isOpen: PropTypes.bool.isRequired
}

function handleClick(isOpen) {
  this.setState({
    isOpen: !this.state.isOpen
  })
}