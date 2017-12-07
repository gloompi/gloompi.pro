import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton';

import Chip from 'components/Chip'

export default class Technologies extends Component {
  static propTypes = {
    that: PropTypes.object.isRequired,
    tech: PropTypes.array.isRequired
  }
  render(){
    const {that, tech} = this.props
    return(
      <div className="tech__wrap">
        <TextField
          className="add__work-item"
          hintText="Technologies" 
          name="tech"
          ref={inputItem => {this.inputItem = inputItem}}
        />
        <IconButton
          className="add__tech-btn" 
          onClick={this.handleClick.bind(that, tech)}
          style={{
            position: 'absolute',
            left: '100%',
            top: 0,
          }}
          iconStyle={{color: '#F44336'}}
          iconClassName="fa fa-plus" />
        <Chip that={that} items={tech} />
      </div>
    )
  }

  handleClick = (tech) => {
    const inputItem = this.inputItem
    const value = inputItem.input.value
    const technology = {key: Date.now() + value, label: value}
    tech.push(technology)
    this.setState({
      tech: tech
    })
    inputItem.input.value = ""
  }
}