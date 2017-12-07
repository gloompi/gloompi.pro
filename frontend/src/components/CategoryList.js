import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {ObjToImmArr} from '../helpers'
import {loadCategories} from 'actions'

class CategoryList extends Component{
  static propTypes = {
    categories: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired, 
    fail: PropTypes.bool.isRequired,
    loadCategories: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const {loadCategories, loaded} = this.props
    if(!loaded) loadCategories()
  }

  render(){
    const {categories, loaded, fail} = this.props
    if(fail) return <p>No Categories Available</p>
    if(!loaded) return <p>Loading...</p>
    return(
      <ul className="category__list">
        {categories.map(category => {
          return(
            <li key={category.id} className="category__item">
              <a 
                href="" 
                className="category__link" 
                onClick={this.handleCategory(category.name)}>{category.name}</a>
            </li>
          )
        })}
      </ul>
    )
  }

  handleCategory = type => e => {
    e.preventDefault();
  }
}

export default connect(state => ({
  categories: ObjToImmArr(state.workCategories.entities),
  loaded: state.workCategories.loaded,
  fail: state.workCategories.fail
}), {loadCategories})(CategoryList)