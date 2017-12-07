import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';

export default class About extends Component{
  static propTypes = {
  }
  render(){
    const style = {
      minHeight: '95vh',
      width: '95%',
      margin: '0 auto',
      padding: 25
    };
    return(
      <Paper style={style} zDepth={1} >
        <h1 style={{textAlign: 'center', color: '#009688'}}>About</h1>
      </Paper>
    )
  }
}