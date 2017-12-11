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
import {loadAllWorks, loadCategories, updateWork} from 'actions/worksActions'

import CategorySelect from './WorkCategorySelect'
import Redactor from 'components/Redactor'
import Technologies from './Technologies'
import Loader from 'components/Loader'

class UpdateWork extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired,
    worksLoaded: PropTypes.bool.isRequired,
    worksLoading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllWorks: PropTypes.func.isRequired, 
    loadCategories: PropTypes.func.isRequired, 
    match: PropTypes.object.isRequired,
    works: PropTypes.object.isRequired
  }

  state = {
    tech: [],
    html: ''
  }

  componentDidMount = () => {
    const {works, match, loadAllWorks, worksLoaded, worksLoading, loadCategories, loaded} = this.props
    const {id} = match.params
    if(!worksLoaded && !worksLoading) loadAllWorks()
    if(!loaded) loadCategories()
    const currentWork = works.get(id)
    const {
      tech,
      html
    } = currentWork
    const parsedTech = []
    for(let techItem of tech){
      parsedTech.push(JSON.parse(techItem))
    }
    this.setState({
      tech: parsedTech
    })
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
    const {match, works, worksLoaded, categories, loaded, fail} = this.props
    const {tech, html} = this.state
    const {id} = match.params
    if(!worksLoaded) return <Loader />
    const currentWork = works.get(id)
    const {
      title,
      link,
      bgColor,
      category
    } = currentWork
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/works">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>UpdateWork</h1>
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
              hintText="link"
              defaultValue={link}
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
                defaultValue={bgColor} 
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
    const {match, updateWork, loadAllWorks} = this.props
    const {id} = match.params
    const fd = new FormData()

    if(this.images.files.length){
      for(let i=0; i < this.images.files.length; i++){
        fd.append('images', this.images.files[i])
      }
    }
    if (this.state.tech.length) {
      for(let i=0; i < this.state.tech.length; i++){
        fd.append('tech', JSON.stringify(this.state.tech[i]))
      }
    }
    if(this.category.state.values.length){
      for(let i=0; i < this.category.state.values; i++){
        fd.append('category', this.category.state.values[i])
      }
    }
    if(this.title.input.value.length) fd.append('title', this.title.input.value)
    if(this.img.files.length) fd.append('img', this.img.files[0])
    if(this.state.html.length) fd.append('html', this.state.html)
    if(this.link.input.value.length) fd.append('link', this.link.input.value)
    if(this.bgColor.value.length) fd.append('bgColor', this.bgColor.value)
    updateWork(id, fd)
  }
}
export default connect(state => ({
  works: state.works.entities,
  worksLoaded: state.works.loaded,
  worksLoading: state.works.loading,
  categories: ObjToImmArr(state.workCategories.entities),
  loaded: state.workCategories.loaded,
  fail: state.workCategories.fail
}), {loadAllWorks, loadCategories, updateWork})(UpdateWork)
