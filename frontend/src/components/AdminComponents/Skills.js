import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import {NavLink} from 'react-router-dom'

import {loadAllSkills, deleteSkill} from 'actions/skillsActions'
import {ObjToImmArr} from '../../helpers'

import Loader from 'components/Loader'

class Skills extends Component{
  static propTypes = {
    skills: PropTypes.array.isRequired, 
    loaded: PropTypes.bool.isRequired, 
    loading: PropTypes.bool.isRequired, 
    loadAllSkills: PropTypes.func.isRequired, 
    deleteSkill: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const {loaded, loading, loadAllSkills} = this.props
    if(!loaded && !loading) loadAllSkills()
  }

  render(){
    const {loaded, skills} = this.props
    const style = {
      minHeight: '95vh',
      width: '95%',
      margin: '0 auto',
      padding: 25
    }
    const addBtnStyle = {
      position: 'fixed',
      right: 80,
      bottom: 20
    }
    if(!loaded) return <Loader />
    return (
      <Paper className="container" style={style} zDepth={1} >
        <h1 style={{textAlign: 'center', color: '#009688'}}>Skills</h1>
        <List>
          {this.getBody()}
        </List>
        <NavLink to="/throne/skills/add-skill">
          <FloatingActionButton style={addBtnStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </NavLink>
      </Paper>
    )
  }

  handleDelete = (id) => e => {
    e.preventDefault()
    const {deleteSkill, loadAllSkills} = this.props
    deleteSkill(id)
    loadAllSkills()
  }
  
  getBody = () => {
    const {skills, loaded} = this.props

    return skills.map(skill => {
      const {title, id} = skill
      return <ListItem key={id} style={{width: '100%'}}>
        <NavLink 
          style={{color: '#263238', position: 'relative', width: '100%', minWidth: 250}} 
          to={`/throne/skills/${id}`}>
          {title}
          <i
            className="work__category-delete"
            onClick={this.handleDelete(id)}>
            <i className="fa fa-close"></i>
          </i>
        </NavLink>
      </ListItem>
    })
  }
}

export default connect(state => ({
  skills: ObjToImmArr(state.skills.entities),
  loaded: state.skills.loaded,
  loading: state.skills.loading
}), {loadAllSkills, deleteSkill})(Skills)