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
import {loadAllArticles, loadArticleCategories, updateArticle} from 'actions/articlesActions'

import CategorySelect from './WorkCategorySelect'
import Redactor from 'components/Redactor'
import Technologies from './Technologies'
import Loader from 'components/Loader'

class UpdateArticle extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    fail: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    articlesLoading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllArticles: PropTypes.func.isRequired, 
    loadArticleCategories: PropTypes.func.isRequired, 
    match: PropTypes.object.isRequired,
    articles: PropTypes.object.isRequired
  }

  state = {
    html: ''
  }

  componentDidMount = () => {
    const {articles, match, loadAllArticles, articlesLoaded, articlesLoading, loadArticleCategories, loaded} = this.props
    const {id} = match.params
    if(!articlesLoaded && !articlesLoading) loadAllArticles()
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
    const {match, articles, articlesLoaded, categories, loaded, fail} = this.props
    const {html} = this.state
    const {id} = match.params
    if(!articlesLoaded) return <Loader />
    const currentWork = articles.get(id)
    const {
      title,
      category
    } = currentWork
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/blog">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>Update Article</h1>
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
    const {match, updateArticle, loadAllArticles} = this.props
    const {id} = match.params
    const fd = new FormData()

    if(this.category.state.values.length){
      for(let i=0; i < this.category.state.values; i++){
        fd.append('category', this.category.state.values[i])
      }
    }
    if(this.title.input.value.length) fd.append('title', this.title.input.value)
    if(this.img.files.length) fd.append('img', this.img.files[0])
    if(this.state.html.length) fd.append('html', this.state.html)
    updateArticle(id, fd)
  }
}
export default connect(state => ({
  articles: state.articles.entities,
  articlesLoaded: state.articles.loaded,
  articlesLoading: state.articles.loading,
  categories: ObjToImmArr(state.articleCategory.entities),
  loaded: state.articleCategory.loaded,
  fail: state.articleCategory.fail
}), {loadAllArticles, loadArticleCategories, updateArticle})(UpdateArticle)
