import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class WorksSelectField extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired, 
    loaded: PropTypes.bool.isRequired, 
    fail: PropTypes.bool.isRequired
  }

  state = {
    values: [],
  };

  handleChange = (event, index, values) => this.setState({values});

  menuItems(values) {
    const {categories, loaded} = this.props
    return categories.map(category => {
      const {id, name} = category
      return <MenuItem
        key={id}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    })
  }

  render() {
    const {values} = this.state
    const {loaded, fail} = this.props
    if(fail) return <p>Not found</p>
    if(!loaded) return <p>Loading...</p>
    return (
      <SelectField
        multiple={true}
        hintText="Select a category"
        value={values}
        onChange={this.handleChange} 
        style={{marginBottom: 25}}
      >
        {this.menuItems(values)}
      </SelectField>
    )
  }
}
