import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Switch, Route, Link, NavLink} from 'react-router-dom'
import {Provider} from 'react-redux'
import history from '../history'

import Admin from 'containers/Admin'
import About from 'containers/About'
import Portfolio from 'containers/Portfolio'
import Blog from 'containers/Blog'
import Home from 'containers/Home'
import store from 'store'
import ScrollBar from './ScrollBar';
import ScrollToTopRoute from 'decorators/ScrollToTopRoute'
import videoBg from 'assets/images/night.mp4'
import Loader from 'components/Loader'

export default class App extends Component {
  componentDidMount = () => {
    window.addEventListener('load', () => {
      document.getElementById('loader').className = ''
    })
  }
  
  render(){
    return(
      <Router history={history}>
        <Provider store={store}>
          <MuiThemeProvider>
            <div>
              <div className="video__bg-wrap">
                <video src={videoBg} class="video__bg" autoPlay loop />
              </div>
              <ScrollToTopRoute>
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/portfolio' component={Portfolio}/>
                  <Route path='/blog' component={Blog}/>
                  <Route path='/throne' component={Admin}/>
                  <Route path="*" render={() => <h1>Page not Fount</h1>}/>
                </Switch>
              </ScrollToTopRoute>
            </div>
          </MuiThemeProvider>
        </Provider>
      </Router>
    )
  }

  scrollToTop = e => {
    window.scrollTo(0, 0)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
  }
}