import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Masonry from 'react-masonry-component';

import {loadAllArticles, loadArticleCategories} from 'actions/articlesActions'
import {createMarkup, ObjToImmArr} from '../../helpers'

import './style.scss'
import mainBgDecor from 'decorators/mainBgDecor'

import Loader from 'components/Loader'

class BlogMain extends Component{
  static propTypes = {
    articles: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    loadAllArticles: PropTypes.func.isRequired,
    loadArticleCategories: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    categoryLoaded: PropTypes.bool.isRequired
  }

  componentDidMount = () => {
    const {loaded, loading, categoryLoaded, loadAllArticles, loadArticleCategories} = this.props
    if(!loaded && !loading) loadAllArticles()
    if(!categoryLoaded) loadArticleCategories()
  }

  render(){
    const {articles, categories, loaded} = this.props
    const masonryOptions = {}
    if(!loaded) return <Loader />
    return(
      <div className="blog__main">
        <ul className="blog__category-list">
          {categories.map(category => {
            const {name, id} = category
            return <li key={id} className="blog__category-item">
              <a href="" className="blog__category-link">
                {name}
              </a>
            </li>
          })}
        </ul>
        <Masonry
          className={'blog__article-list'}
          elementType={'ul'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {articles.map(article => {
            const {id, title, createdAt, coverImage, html} = article
            const endPoint = createdAt.indexOf('T')
            return <li key={id} className="blog__article-item">
              <h3 className="article__title">{title}</h3>
              <div className="date">{createdAt.slice(0, endPoint)}</div>
              <img className="article__image" src={coverImage} alt="cover image"/>
              <div className="article__html">
                <div dangerouslySetInnerHTML={createMarkup(html.slice(0, 350))} />
                <span>...</span>
              </div>
              <NavLink className="read__more-btn" to={`/blog/article/${id}`}>Read More</NavLink>
            </li>
          })}
        </Masonry>
      </div>
    )
  }
}

export default connect(state => ({
  articles: ObjToImmArr(state.articles.entities),
  categories: ObjToImmArr(state.articleCategory.entities),
  categoryLoaded: state.articleCategory.loaded,
  fail: state.articleCategory.fail,
  loaded: state.articles.loaded,
  loading: state.articles.loading
}), {loadAllArticles, loadArticleCategories})(mainBgDecor(BlogMain))