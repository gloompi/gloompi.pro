import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {createMarkup} from '../helpers'
import {loadAbout} from 'actions/aboutActions'

import Loader from 'components/Loader'

//svg
import AboutPicStar from 'svg/aboutPicStar'

class AboutMe extends Component {
  static propTypes = {
    about: PropTypes.object.isRequired,
    loadAbout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  }

  componentDidMount = () => {
    const {loading, loaded, loadAbout} = this.props
    if(!loaded && !loading) loadAbout()
  }
  
  render(){
    const {about, loaded} = this.props
    const {title, coverImage, html} = about
    if(!loaded) return <Loader />
    return(
      <div className="about__me">
        <div className="about__title">
          <h2>{title}</h2>
          <AboutPicStar width='100' color='#D9DDE6' />
        </div>
        <div className="about__me-pic">
          <img src={coverImage} alt=""/>
        </div>
        <div className="description" dangerouslySetInnerHTML={createMarkup(html)} />
      </div>
    )
  }
}

export default connect(state => ({
  about: state.about.entities,
  loaded: state.about.loaded,
  loading: state.about.loading
}), {loadAbout})(AboutMe)