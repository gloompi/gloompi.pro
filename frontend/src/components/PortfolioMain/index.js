import React, { Component } from 'react'
import PropTypes from 'prop-types'
import scrollToComponent from 'react-scroll-to-component';
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import Masonry from 'react-masonry-component';

import {loadAllWorks} from 'actions'
import {filtratedItems} from 'selectors'
import {ObjToImmArr} from '../../helpers'
import Loader from 'components/Loader'

import './style.scss'
import PortfolioBg from 'svg/portfolioBg'
import ArrowDown from 'svg/arrowDown'
import PortfolioHeaderText from 'svg/portfolioHeaderText'
import WorkItem from 'components/WorkItem'
import CategoryList from 'components/CategoryList'
import PreviewModal from 'components/PreviewModal'

class PortfolioMain extends Component{
  static propTypes = {
    works: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    loadAllWorks: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const{loading, loaded, loadAllWorks} = this.props
    if(!loaded && !loading) loadAllWorks()
  }
  

  state = {
    currentWorkId: '',
    modalIsOpen: false,
    availableNextButton: true,
    availablePrevButton: true
  }

  render(){
    const {works, loaded, loading} = this.props
    const {currentWorkId, modalIsOpen, availableNextButton, availablePrevButton} = this.state
    const masonryOptions = {}
    return(
      <main className="portfolio__main">
        <div className="portfolio__top-wrap">
          <button 
            className="arrow__down" 
            onClick={() => scrollToComponent(this.main, { offset: -200, align: 'middle', duration: 500, ease:'inQuad'})}>
            <ArrowDown color="rgba(255, 255, 255, .7)" width="25" />
          </button>
          <PortfolioBg width='100%' color='rgba(0, 0, 0, .5)' />
          <PortfolioHeaderText width="500" color="#3B3F4B" />
          <h2 className="portfolio__title">My Works</h2>
        </div>
        <div 
          className="portfolio__content" 
          ref={(section) => { this.main = section; }}>
          <CategoryList />
          <Masonry
              className={'works__list'}
              elementType={'ul'}
              options={masonryOptions}
              disableImagesLoaded={false}
              updateOnEachImageLoad={false}
          >
            {this.getWorks()}
          </Masonry>
          <PreviewModal 
            currentWork = {currentWorkId} 
            works={works} 
            isOpen={modalIsOpen} 
            close={this.handleClose} 
            next={availableNextButton?this.handleNext:null} 
            prev={availablePrevButton?this.handlePrev:null} />
        </div>
      </main>
    )
  }

  getWorks = () => {
    const {works} = this.props

    if(works.length <= 0) return <h2 className="no-comment"> No works yet </h2>
    return works.map(work => {
      return <li 
      key={work.id}
      className="work__item" >
        <WorkItem 
          work={work} 
          clickedWork={this.handleClick} />
      </li>
    })
  }

  handlePrev = () => {
    const {works} = this.props
    for(let i = 0; i < works.length; i++){
      if(works[i - 1]){
        if(works[i].id == this.state.currentWorkId){
          this.setState({
            currentWorkId: works[i - 1].id,
          })
        }
      }
    }
  }

  handleNext = () => {
    const {works} = this.props
    for(let i = 0; i < works.length; i++){
      if(works[i + 1]){
        if(works[i].id == this.state.currentWorkId){
          this.setState({
            currentWorkId: works[i + 1].id,
          })
        }
      }
    }
  }

  handleClose = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  handleClick = id => {
    this.setState({
      currentWorkId: id,
      modalIsOpen: true
    })
  }
}

export default connect((state) => {
  return {
    works: filtratedItems(state),
    loaded: state.works.loaded,
    loading: state.works.loading
  }
}, {loadAllWorks})(PortfolioMain)