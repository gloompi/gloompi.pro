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
import {loadAllWorks, loadCategories, addWork} from 'actions'

import CategorySelect from './WorkCategorySelect'
import Redactor from 'components/Redactor'
import Technologies from './Technologies'

class AddWork extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllWorks: PropTypes.func.isRequired, 
    loadCategories: PropTypes.func.isRequired, 
    addWork: PropTypes.func.isRequired
  }

  state = {
    tech: [],
    html: ''
  }

  componentDidMount = () => {
    const {loadCategories, loaded} = this.props
    if(!loaded) loadCategories()
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
    const {tech, html} = this.state
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/works">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>AddWork</h1>
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
            <input 
              className="add__work-item"
              type="file" 
              name="img"
              ref={img => {this.img = img}}/>
            <div className="tech__wrap">
              <CategorySelect 
                className="add__work-item"
                categories={categories}
                fail={fail}
                loaded={loaded} 
                name="category"
                ref={category => {this.category = category}}/>
              <NavLink to="/throne/works/add-category" style={{
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
            <input 
              className="add__work-item"
              type="file" 
              name="images"
              multiple 
              ref={images => {this.images = images}} />
            <Technologies that={this} tech={tech} />
            <Redactor 
              className="add__work-item"
              name="html"
              that={this} />
            <TextField
              className="add__work-item"
              hintText="Link" 
              name="link"
              ref={link => {this.link = link}}
            />
            <label 
              className="add__work-item"
              style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              <input
                style={colorStyle}
                type="color"
                name="bgColor"
                ref={color => {this.bgColor = color}}
              />
              background-color
            </label>
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
    const {addWork, loadAllWorks} = this.props
    const fd = new FormData()

    for(let i=0; i < this.images.files.length; i++){
      fd.append('images', this.images.files[i])
    }
    fd.append('title', this.title.input.value)
    fd.append('img', this.img.files.length?this.img.files[0]:null)
    fd.append('category', this.category.state.values)
    fd.append('tech', this.state.tech)
    fd.append('html', this.state.html)
    fd.append('link', this.link.input.value)
    fd.append('bgColor', this.bgColor.value)
    addWork(fd)
    loadAllWorks()
  }
}
export default connect(state => ({
  categories: ObjToImmArr(state.workCategories.entities),
  loaded: state.workCategories.loaded,
  fail: state.workCategories.fail
}), {loadAllWorks, loadCategories, addWork})(AddWork)
