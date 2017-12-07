import React from 'react'
import PropTypes from 'prop-types'

export default function Socials() {
  return(
    <div>
      <ul className="social__list">
        <li className="social__item">
          <a href="" className="social__link">
            <i className="fa fa-vk"></i>
          </a>
        </li>
        <li className="social__item">
          <a href="" className="social__link">
            <i className="fa fa-github"></i>
          </a>
        </li>
        <li className="social__item">
          <a href="" className="social__link">
            <i className="fa fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}