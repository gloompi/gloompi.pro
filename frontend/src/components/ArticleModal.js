import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {loadArticle} from 'actions/articlesActions'
import {createMarkup} from '../helpers'

import mainBgDecor from 'decorators/mainBgDecor'

import Loader from 'components/Loader'

class ArticleModal extends Component{
  static propTypes = {
    articles: PropTypes.object.isRequired,
    loadArticle: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  componentDidMount = () => {
    const {loaded, loadArticle} = this.props
    const {id} = this.props.match.params
    console.log(id)
    if(!loaded) loadArticle(id)
  }

  render(){
    const {articles, loaded} = this.props
    const {id} = this.props.match.params
    if(!loaded) return <Loader />
    const article = articles.get(id)
    const {title, createdAt, coverImage, html} = article
    const endPoint = createdAt.indexOf('T')
    return(
      <div className="blog__main article">
        <h3 className="article__title">{title}</h3>
        <div className="date">{createdAt.slice(0, endPoint)}</div>
        <img className="article__image" src={coverImage} alt="cover image"/>
        <div className="article__html">
          <div dangerouslySetInnerHTML={createMarkup(html)} />
        </div>
        <div id="disqus_thread"></div>
      </div>
    )
  }
}

export default connect(state => ({
  articles: state.articles.entities,
  loaded: state.articles.articleLoaded,
}), {loadArticle})(mainBgDecor(ArticleModal))