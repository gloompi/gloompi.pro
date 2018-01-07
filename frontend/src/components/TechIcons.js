import React from 'react'
import PropTypes from 'prop-types'

export default function TechIcon(props) {
  const {tech} = props
  
  if(tech == 'node') return <i className='fab fa-node' />

  if(tech == 'html5') return <i className='fab fa-html5' />

  if(tech == 'css3') return <i className='fab fa-css3' />

  if(tech == 'sass') return <i className='fab fa-sass' />

  if(tech == 'less') return <i className='fab fa-less' />

  if(tech == 'python')return <i className='fab fa-python' />

  if(tech == 'js') return <i className='fab fa-js' />

  if(tech == 'angular') return <i className='fab fa-angular' />

  if(tech == 'wp') return <i className='fab fa-wordpress' />

  if(tech == 'adaptive') return <i className='fas fa-mobile-alt' />

  if(tech == 'react') return <i className='fab fa-react' />

  if(tech == 'ember') return <i className='fab fa-ember' />

  if(tech == 'gulp') return <i className='fab fa-gulp' />

  if(tech == 'git') return <i className='fab fa-git' />

  if(tech == 'apple') return <i className='fab fa-apple' />

  if(tech == 'android') return <i className='fab fa-android' />

  return tech
}