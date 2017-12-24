import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Masonry from 'react-masonry-component';

import {loadArticlesPage, loadArticleCategories, loadArticleByCategory} from 'actions/articlesActions'
import {createMarkup, ObjToImmArr} from '../../helpers'

import './style.scss'
import mainBgDecor from 'decorators/mainBgDecor'

import Loader from 'components/Loader'

class BlogMain extends Component{
  static propTypes = {
    articles: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    loadArticlesPage: PropTypes.func.isRequired,
    loadArticleByCategory: PropTypes.func.isRequired,
    loadArticleCategories: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    categoryLoaded: PropTypes.bool.isRequired
  }

  state={
    category: null,
    isOpen: false,
    fixed: false
  }

  componentDidMount = () => {
    const {page} = this.props.match.params
    const {loaded, loading, categoryLoaded, loadArticlesPage, loadArticleCategories} = this.props
    if(!loaded && !loading) loadArticlesPage(page)
    if(!categoryLoaded) loadArticleCategories()

    window.addEventListener('scroll', e => {
      if(window.pageYOffset >= 524){
        if(!this.state.fixed){
          this.setState({
            fixed: true
          })
        }
      }else{
        if(this.state.fixed){
          this.setState({
            fixed: false
          })
        }
      }
    })
  }

  render(){
    const {articles, categories, categoryLoaded, pages} = this.props
    const {category, isOpen, fixed} = this.state
    const {page} = this.props.match.params
    let prevPage = +page - 1?+page - 1:null
    let nextPage = +page + 1 <= pages?+page + 1:null
    const masonryOptions = {}
    if(!categoryLoaded) return <Loader />
    return(
      <div className="blog__main">
        <div className="blog__wrap">
          <a 
            href="" 
            onClick={this.handleOpen}
            className={`open__category-btn ${isOpen?'active':''}`}>
            {this.getIcon()}
          </a>
          <ul 
            ref={list => {this.list = list}}
            className={`blog__category-list ${fixed?'fixed':''} ${isOpen?'active':''}`}>
            <li className="blog__category-item">
              <a 
                href="" 
                onClick={this.categoryClick('All')}
                className="blog__category-link">
                All
              </a>
            </li>
            {categories.map(category => {
              const {name, id} = category
              
              return <li key={id} className="blog__category-item">
                <a 
                  href="" 
                  onClick={this.categoryClick(name)}
                  className="blog__category-link">
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
            {this.getArticles()}
          </Masonry>
        </div>
        <ul className="pagination__list">
          <NavLink
            to={`/blog/${prevPage}`}
            className={`prev__page-btn ${prevPage?'':'hiden'}`}>
            <i className="fa fa-angle-left"></i>
          </NavLink>
          {this.getPaginate()}
          <NavLink 
            to={`/blog/${nextPage}`}
            className={`next__page-btn ${nextPage?'':'hiden'}`}>
            <i className="fa fa-angle-right"></i>
          </NavLink>
        </ul>
      </div>
    )
  }

  getArticles = () =>{
    const {articles, loaded} = this.props
    if(!loaded) return <Loader />
    return articles.map(article => {
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
    })
  }

  getPaginate = () => {
    const {pages} = this.props
    let pagesList = []
    for(let i=1; i<=pages; i++){
      pagesList.push(i)
    }
    return pagesList.map(pageItem => {
      return <li key={pageItem} className="pagination__item">
        <NavLink 
          to={`/blog/${pageItem}`} 
          onClick={this.handleClick(pageItem)}
          activeClassName="active"
          className="pagination__link">
          {pageItem}
        </NavLink>
      </li>
    })
  }

  getIcon = () => {
    if(this.state.isOpen) return <i className="fa fa-angle-left"></i>
    return <i className="fa fa-angle-right"></i>
  }

  categoryClick = (category) => e => {
    e.preventDefault()
    const {loadArticleByCategory, loadArticlesPage} = this.props
    if(category == 'All') {
      loadArticlesPage()
    } else{
      loadArticleByCategory(category)
    }
    this.setState({
      category: category,
      isOpen: false
    })
  }

  handleClick = (page) => e => {
    const {loadArticlesPage, loadArticleByCategory} = this.props
    const {category} = this.state
    if(category) return loadArticleByCategory(category, page)
    loadArticlesPage(page)
  }

  handleOpen = e => {
    e.preventDefault()

    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}

export default connect(state => ({
  articles: ObjToImmArr(state.articles.entities),
  categories: ObjToImmArr(state.articleCategory.entities),
  pages: state.articles.pages,
  categoryLoaded: state.articleCategory.loaded,
  fail: state.articleCategory.fail,
  loaded: state.articles.loaded,
  loading: state.articles.loading
}), {loadArticlesPage, loadArticleCategories, loadArticleByCategory})(mainBgDecor(BlogMain))