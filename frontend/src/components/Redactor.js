import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Editor} from '@tinymce/tinymce-react'

export default class Redactor extends Component{
  static propTypes = {
    that: PropTypes.object.isRequired
  }
  
  render(){
    return(
      <div style={{width: '100%', marginBottom: 25}} >
        <Editor
          initialValue="" 
          init={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }

  handleEditorChange = (e) => {
    const {that} = this.props
    that.setState({
      html: e.target.getContent()
    })
  }
}