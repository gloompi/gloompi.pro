import React from 'react'
import PropTypes from 'prop-types'

export default function WorkItem({work, clickedWork}) {
  const {img, id, title, category} = work
  const style = {width: '100%', height: '100%', backgroundImage: `url(${img})`}
  return (
    <div
      className="work__link" 
      style={style} 
      onClick = {() => clickedWork(id)}>
      <h3 className="work__title">{title}</h3>
    </div>
  )
}

WorkItem.propTypes = {
  work: PropTypes.any, 
  clickedWork: PropTypes.any
}