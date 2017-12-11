import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {ObjToImmArr} from '../../helpers'
import {deleteArticleCategory, loadArticleCategories, addArticleCategory} from 'actions/articlesActions'

class AddArticleCategory extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    deleteArticleCategory: PropTypes.func.isRequired, 
    loadArticleCategories: PropTypes.func.isRequired, 
    addArticleCategory: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const {loadArticleCategories, loaded} = this.props
    if(!loaded) loadArticleCategories()
  }

  render(){
    const {loaded} = this.props
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
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne/blog/add-article">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>AddCategory</h1>
        <form 
          action="#" 
          onSubmit={this.handleSubmit}>
          <List style={listStyle}>
            <TextField
              className="add__work-item"
              hintText="Name" 
              name="name"
              ref={name => {this.name = name}}
            />
            <RaisedButton 
              type="submit"
              label="Add" 
              primary={true} 
              style={{marginLeft: 'auto'}} />
            <ul className="work__category-list">
              {this.getBody()}
            </ul>
          </List>
        </form>
      </Paper>
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    const {addArticleCategory, loadArticleCategories} = this.props
    const data = {}

    data.name = this.name.input.value
    addArticleCategory(data)
    loadArticleCategories()
    this.name.input.value = ''
  }

  handleDelete = (id) => e => {
    e.preventDefault()
    const {deleteArticleCategory, loadArticleCategories} = this.props
    deleteArticleCategory(id)
    loadArticleCategories()
  }

  getBody = () => {
    const {categories} = this.props
    
    return categories.map(category => {
      const {name, id} = category
      return <li key={id} className="work__category-item">
        <a className="work__category-link">
          {name}
        </a>
        <a 
          href=""
          className="work__category-delete"
          onClick={this.handleDelete(id)}>
          <i className="fa fa-close"></i>
        </a>
      </li>
    })
  }
}
export default connect(state => ({
  categories: ObjToImmArr(state.articleCategory.entities),
  loaded: state.articleCategory.loaded
}), {deleteArticleCategory, loadArticleCategories, addArticleCategory})(AddArticleCategory)
