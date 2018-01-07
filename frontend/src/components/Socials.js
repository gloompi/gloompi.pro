import React from 'react'
import PropTypes from 'prop-types'

export default function Socials() {
  return(
    <div>
      <ul className="social__list">
        <li className="social__item">
          <a href="https://vk.com/gloompi" target="_blank" className="social__link">
            <i className="fab fa-vk"></i>
          </a>
        </li>
        <li className="social__item">
          <a href="https://github.com/gloompi" target="_blank" className="social__link">
            <i className="fab fa-github-alt"></i>
          </a>
        </li>
        <li className="social__item">
          <a href="https://www.linkedin.com/in/gloompi/" target="_blank" className="social__link">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}