import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ScrollBar extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { top: 0 };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
  }

  handleUpdate(values) {
    const { top } = values;
    this.setState({ top });
  }

  renderView({ style, ...props }) {
    const { top } = this.state;
    const {rightSide} = this.props;
    const viewStyle = {
    };
    return (
      <div
        className="box"
        style={{ ...style, ...viewStyle }}
        {...props}/>
    );
  }

  renderTrack({style, ...props}) {
    const { top } = this.state;
    const {rightSide = false} = this.props;
    const trackStyle = {
      width: 6,
      bottom: 2,
      right: 2,
      top: 2,
      borderRadius: 3,
      backgroundColor: '#212121'
    };
    return (
      <div
        className="truck"
        style={{ ...style, ...trackStyle }}
        {...props}/>
    );
  }

  renderThumb({ style, ...props }) {
    const { top } = this.state;
    const thumbStyle = {
      backgroundColor: '#1056d1',
      borderRadius: 15
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}/>
    );
  }

  render() {
    return (
      <Scrollbars
        renderView={this.renderView}
        renderTrackVertical={this.renderTrack}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        onUpdate={this.handleUpdate}
        {...this.props}/>
    );
  }
}