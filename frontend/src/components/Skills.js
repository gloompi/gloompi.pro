import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import CircleProgress from './CircleProgress'

function Skills({skills}) {
  return(
    <div className="skills__wrap">
      <h3>What can i do for you</h3>
      <p className="description">I am a Frontend developer, but also familiar with BackEnd. Let's watch my skills.</p>
      {skills.map(skillList => {
        const {title, id, skills} = skillList
        return (
          <div key={id}>
            <h4>{title}</h4>
            <ul className="skills__list">
              {skills.map(item => {
                const {title, knowledge} = item
                return (
                  <li 
                    key={title}>
                      <CircleProgress 
                        value={parseInt(knowledge)} 
                        size={130} 
                        thickness={20} 
                        text={title} />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

Skills.propTypes = {
  skills: PropTypes.array.isRequired
}

export default connect(({skills}) => ({skills}), null)(Skills)