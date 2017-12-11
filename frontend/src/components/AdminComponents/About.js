import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import {NavLink} from 'react-router-dom'
import IconButton from 'material-ui/IconButton';

import {loadAbout, updateAbout} from 'actions/aboutActions'

import Redactor from 'components/Redactor'
import Loader from 'components/Loader'

class About extends Component{
  static propTypes = {
    //connect
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    loadAbout: PropTypes.func.isRequired, 
    about: PropTypes.object.isRequired
  }

  state = {
    html: ''
  }

  componentDidMount = () => {
    const {about, loadAbout, loaded, loading} = this.props
    if(!loaded && !loading) loadAbout()
  }

  render(){
    const style = {
      minHeight: '95vh',
      width: '95%',
      margin: '0 auto',
      padding: 25
    }
    const listStyle = {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }
    const colorStyle = {
      width: 50,
      height: 25,
      marginRight: 15
    }
    const {about, loaded} = this.props
    const {html} = this.state
    if(!loaded) return <Loader />
    const {
      title,
      coverImage,
      currentHtml = html
    } = about
    return(
      <Paper className="container" style={style} zDepth={1} >
        <NavLink to="/throne">
          <RaisedButton label="Back" style={{margin: 12}} />
        </NavLink>
        <h1 style={{color: '#009688', textAlign: 'center'}}>About</h1>
        <form 
          encType="multipart/form-data"
          action="#" 
          onSubmit={this.handleSubmit}>
          <List style={listStyle}>
            <TextField
              className="add__work-item"
              hintText="Title" 
              defaultValue={title}
              name="title"
              ref={title => {this.title = title}}
            />
            <input 
              className="add__work-item"
              type="file" 
              name="img"
              ref={img => {this.img = img}}/>
            <Redactor 
              className="add__work-item"
              name="html"
              that={this} />
            <RaisedButton 
              type="submit"
              label="Add" 
              primary={true} 
              style={{marginLeft: 'auto'}} />
          </List>
        </form>
      </Paper>
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    const {updateAbout, loadAbout} = this.props
    const fd = new FormData()

    if(this.title.input.value.length) fd.append('title', this.title.input.value)
    if(this.img.files.length) fd.append('img', this.img.files[0])
    if(this.state.html.length) fd.append('html', this.state.html)
    updateAbout(fd)
  }
}
export default connect(state => ({
  about: state.about.entities,
  loaded: state.about.loaded,
  loading: state.about.loading,
}), {loadAbout, updateAbout})(About)
