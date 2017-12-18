import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import CircleProgress from './CircleProgress'
import {loadPopulatedSkills} from 'actions/skillsActions'
import {ObjToImmArr} from '../helpers'

import Loader from 'components/Loader'

class Skills extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    loadPopulatedSkills: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const {loadPopulatedSkills, loaded} = this.props
    if(!loaded) loadPopulatedSkills()
  }

  render(){
    const {loaded, skills} = this.props
    if(!loaded) return <Loader />
    return(
      <div className="skills__wrap">
        <h3>What can i do for you</h3>
        <p className="description">I am a Frontend developer, but also familiar with BackEnd. Let's look at my skills.</p>
        {skills.map(skillList => {
          const {name, id, children} = skillList
          return (
            <div key={id}>
              <h4>{name}</h4>
              <ul className="skills__list">
                {children.map(item => {
                  const {id, title, knowledge} = item
                  return (
                    <li 
                      key={id}>
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
}

export default connect(state => ({
  skills: ObjToImmArr(state.skills.populated),
  loaded: state.skills.populateLoaded
}), {loadPopulatedSkills})(Skills)