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
import {loadAllArticles, loadArticleCategories, addArticle} from 'actions/articlesActions'

import CategorySelect from './WorkCategorySelect'
import Redactor from 'components/Redactor'

class AddArticle extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllArticles: PropTypes.func.isRequired, 
    loadArticleCategories: PropTypes.func.isRequired, 
    addArticle: PropTypes.func.isRequired
  }

  state = {
    html: ''
  }

  componentDidMount = () => {
    const {loadArticleCategories, loaded} = this.props
    if(!loaded) loadArticleCategories()
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
    const {html} = this.state
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/blog">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>AddArticle</h1>
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
              <NavLink to="/throne/blog/add-article-category" style={{
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
            <Redactor 
              className="add__work-item"
              name="html"
              that={this} />
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
    const {addArticle, loadAllArticles} = this.props
    const fd = new FormData()
    for(let i=0; i < this.category.state.values.length; i++){
      fd.append('category', this.category.state.values[i])
    }
    fd.append('title', this.title.input.value)
    fd.append('img', this.img.files.length?this.img.files[0]:null)
    fd.append('html', this.state.html)
    addArticle(fd)
  }
}
export default connect(state => ({
  categories: ObjToImmArr(state.articleCategory.entities),
  loaded: state.articleCategory.loaded,
  fail: state.articleCategory.fail
}), {loadAllArticles, loadArticleCategories, addArticle})(AddArticle)
