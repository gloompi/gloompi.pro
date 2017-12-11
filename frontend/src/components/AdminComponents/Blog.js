import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import {NavLink} from 'react-router-dom'

import {loadAllArticles, deleteArticle} from 'actions/articlesActions'
import {ObjToImmArr} from '../../helpers'

import Loader from 'components/Loader'

class Blog extends Component{
  static propTypes = {
    articles: PropTypes.array.isRequired, 
    loaded: PropTypes.bool.isRequired, 
    loading: PropTypes.bool.isRequired, 
    loadAllArticles: PropTypes.func.isRequired, 
    deleteArticle: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const {loaded, loading, loadAllArticles} = this.props
    if(!loaded && !loading) loadAllArticles()
  }

  render(){
    const {loaded, articles} = this.props
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
        <h1 style={{textAlign: 'center', color: '#009688'}}>Blog</h1>
        <List>
          {this.getBody()}
        </List>
        <NavLink to="/throne/blog/add-article">
          <FloatingActionButton style={addBtnStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </NavLink>
      </Paper>
    )
  }

  handleDelete = (id) => e => {
    e.preventDefault()
    const {deleteWork, loadAllWorks} = this.props
    deleteWork(id)
    loadAllWorks()
  }
  
  getBody = () => {
    const {articles, loaded} = this.props

    return articles.map(article => {
      const {title, id} = article
      return <ListItem key={id} style={{width: '100%'}}>
        <NavLink 
          style={{color: '#263238', position: 'relative', width: '100%', minWidth: 250}} 
          to={`/throne/blog/${id}`}>
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
  articles: ObjToImmArr(state.articles.entities),
  loaded: state.articles.loaded,
  loading: state.articles.loading
}), {loadAllArticles, deleteArticle})(Blog)