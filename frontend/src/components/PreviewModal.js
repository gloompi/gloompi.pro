import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {createMarkup} from '../helpers'

import TechIcons from 'components/TechIcons'
import ScrollBar from 'containers/ScrollBar'
import LeftScrollBar from 'containers/LeftScrollBar'

class PreviewModal extends Component{
  static propTypes = {
    currentWork: PropTypes.any,
    works: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
  }
  state = {
    onTech: false
  }
  render(){
    const {currentWork, works, isOpen, close, next, prev} = this.props
    const {onTech} = this.state
    if(!currentWork) return null
    const {title, img, images, tech, html, bgColor, link} = works.get(currentWork)
    const style = {
      backgroundColor: bgColor
    }
    return(
      <div className={`preview__modal${isOpen?'-show':''}`}>
        <div style={style} className="preview__modal-left">
          <LeftScrollBar style={{ maxHeight: '100vh' }}>
            <div className="preview__modal-btns">
              <button onClick = {() => close()}>
                &times;
              </button>
              <button style={next?{display: 'block'}:{display: 'none'}} onClick = {() => next()}>
                <i className="fa fa-angle-right"></i>
              </button>
              <button style={prev?{display: 'block'}:{display: 'none'}} onClick = {() => prev()}>
                <i className="fa fa-angle-left"></i>
              </button>
            </div>
            <div className="preview__pics-wrap">
              {images.map(image => {
                return <img key={image} src={image} />
              })}
            </div>
          </LeftScrollBar>
        </div>
        <div className="preview__modal-right">
          <h2 className="preview__title">{title}</h2>
          <ul 
            className="technologies__list"
            onMouseEnter = {() => this.setState({onTech: true})} 
            onMouseLeave = {() => this.setState({onTech: false})}
          >
            {tech.map(techItem => {
              if(!techItem) return null
              const {key, label} = JSON.parse(techItem)
              return <li 
                      key={key} 
                      className="technologies__item" >
                <TechIcons tech = {label} />
                <span className={`tech__text ${onTech?'active':null}`}>{label}</span>
              </li>
            })}
          </ul>
          <div className="preview__html">
            <div dangerouslySetInnerHTML={createMarkup(html)} />
          </div>
          <a className="view__website-link" href={link} target="_blank">View Website</a>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  works: state.works.entities
}), null)(PreviewModal)