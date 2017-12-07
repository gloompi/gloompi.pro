import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import img from 'assets/images/tower.png'

export default class PortfolioForm extends Component{
  static propTypes = {
  }

  state = {
  }

  render(){
    return(
      <section className="portfolio__form-wrap">
        <form className="portfolio__form" action="" onSubmit={this.sendMessage}>
          <h3>Contact me</h3>
          <input className="form__name" type="text" name="name" placeholder="Name"/>
          <input className="form__email" type="email" name="email" placeholder="Email"/>
          <textarea className="form__text" name="text" placeholder="Message" />
          <div className="form__btns">
            <button className="form__submit">Send</button>
            <button type="reset">Clear</button>
          </div>
        </form>
        <div className="tower__pic-wrap">
          <img className="tower__pic" src={img} />
        </div>
      </section>
    )
  }

  sendMessage = e => {
    e.preventDefault()

    console.log(e)
  }
}