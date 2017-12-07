import React from 'react';
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip';

export default class ChipArray extends React.Component {
  constructor(props) {
    super(props)
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 256
      },
    }
  }

  static propTypes = {
    that: PropTypes.object.isRequired, 
    items: PropTypes.array.isRequired
  }

  handleRequestDelete = (key) => {
    const {that, items} = this.props
    const chipToDelete = items.map((chip) => chip.key).indexOf(key);
    items.splice(chipToDelete, 1);
    that.setState({tech: items});
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.props.items.map(this.renderChip, this)}
      </div>
    );
  }
}