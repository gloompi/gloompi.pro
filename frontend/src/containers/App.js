import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from 'react-router-dom'
import {Provider} from 'react-redux'

import Admin from 'containers/Admin'
import About from 'containers/About'
import Portfolio from 'containers/Portfolio'
import Blog from 'containers/Blog'
import Home from 'containers/Home'
import store from 'store'
import ScrollBar from './ScrollBar';

export default function () {
  return(
    <Router>
      <Provider store={store}>
        <ScrollBar style={{ height: '100vh' }}> 
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/portfolio' component={Portfolio}/>
                <Route exact path='/blog' component={Blog}/>
                <Route path='/throne/' component={Admin}/>
                <Route path="*" render={() => <h1>Page not Fount</h1>}/>
              </Switch>
            </div>
          </MuiThemeProvider>
        </ScrollBar>
      </Provider>
    </Router>
  )
}