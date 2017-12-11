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
import {loadAllSkills, loadSkillCategories, addSkill} from 'actions/skillsActions'

import CategorySelect from './WorkCategorySelect'
import Redactor from 'components/Redactor'
import Technologies from './Technologies'

class AddSkill extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllSkills: PropTypes.func.isRequired, 
    loadSkillCategories: PropTypes.func.isRequired, 
    addSkill: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const {loadSkillCategories, loaded} = this.props
    if(!loaded) loadSkillCategories()
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
    const {categories, loaded, fail} = this.props
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/skills">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>AddSkill</h1>
        <form 
          encType="multipart/form-data"
          action="#" 
          onSubmit={this.handleSubmit}>
          <List style={listStyle}>
            <TextField
              className="add__work-item"
              hintText="Title" 
              name="title"
              ref={title => {this.title = title}}
            />
            <TextField
              className="add__work-item"
              hintText="Knowledge" 
              name="knowledge"
              ref={knowledge => {this.knowledge = knowledge}}
            />
            <div className="tech__wrap">
              <CategorySelect 
                className="add__work-item"
                categories={categories}
                fail={fail}
                loaded={loaded} 
                name="category"
                ref={category => {this.category = category}}/>
              <NavLink to="/throne/skills/add-category" style={{
                position: 'absolute',
                left: '100%',
                top: 0,
              }}>
                <IconButton
                  className="add__tech-btn" 
                  iconStyle={{color: '#F44336'}}
                  iconClassName="fa fa-plus"
                />
              </NavLink>
            </div>
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
    const {addSkill, loadAllSkills, categories} = this.props
    const category = categories.filter(item => {
      return item.name == this.category.state.values[0]
    })
    const fd = new FormData()

    fd.append('parent', category[0].id)
    fd.append('title', this.title.input.value)
    fd.append('knowledge', this.knowledge.input.value)
    addSkill(fd)
  }
}
export default connect(state => ({
  categories: ObjToImmArr(state.skills.categories),
  loaded: state.skills.categoryLoaded,
  fail: state.skills.fail,
}), {loadAllSkills, loadSkillCategories, addSkill})(AddSkill)
