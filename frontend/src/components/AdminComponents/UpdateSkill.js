import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import {NavLink} from 'react-router-dom'
import IconButton from 'material-ui/IconButton';

import {ObjToImmArr} from '../../helpers'
import {loadAllSkills, loadSkillCategories, updateSkill} from 'actions/skillsActions'

import CategorySelect from './WorkCategorySelect'
import Redactor from 'components/Redactor'
import Technologies from './Technologies'
import Loader from 'components/Loader'

class UpdateSkill extends Component{
  static propTypes = {
    //connect
    categoryLoaded: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllSkills: PropTypes.func.isRequired, 
    loadSkillCategories: PropTypes.func.isRequired, 
    updateSkill: PropTypes.func.isRequired, 
    match: PropTypes.object.isRequired,
    skills: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    const {skills, match, loadAllSkills, loaded, loading, loadSkillCategories, categoryLoaded} = this.props
    const {id} = match.params
    if(!loaded && !loading) loadAllSkills()
    if(!categoryLoaded) loadSkillCategories()
  }

  render(){
    const style = {
      minHeight: '95vh',
      width: '95%',
      margin: '0 auto',
      padding: 25
    }
    const listStyle = {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }
    const colorStyle = {
      width: 50,
      height: 25,
      marginRight: 15
    }
    const {match, skills, loaded, categories, categoryLoaded, fail} = this.props
    const {id} = match.params
    if(!loaded) return <Loader />
    const currentSkill = skills.get(id)
    const {
      title,
      knowledge
    } = currentSkill
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/skills">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>Update-Skill</h1>
        <form 
          encType="multipart/form-data"
          action="#" 
          onSubmit={this.handleSubmit}>
          <List style={listStyle}>
            <TextField
              className="add__work-item"
              hintText="Title" 
              defaultValue={title}
              name="title"
              ref={title => {this.title = title}}
            />
            <TextField
              className="add__work-item"
              hintText="Knowledge" 
              defaultValue={knowledge}
              name="knowledge"
              ref={knowledge => {this.knowledge = knowledge}}
            />
            <RaisedButton 
              type="submit"
              label="Add" 
              primary={true} 
              style={{marginLeft: 'auto'}} />
          </List>
        </form>
      </Paper>
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    const {match, updateSkill, loadAllSkills} = this.props
    const {id} = match.params
    const fd = new FormData()
    
    if(this.title.input.value.length) fd.append('title', this.title.input.value)
    if(this.knowledge.input.value.length) fd.append('knowledge', this.knowledge.input.value)
    updateSkill(id, fd)
  }
}
export default connect(state => ({
  skills: state.skills.entities,
  loaded: state.skills.loaded,
  loading: state.skills.loading,
  categories: ObjToImmArr(state.skills.categories),
  categoryLoaded: state.skills.categoryLoaded,
  fail: state.skills.fail
}), {loadAllSkills, loadSkillCategories, updateSkill})(UpdateSkill)
