import React, { Component } from 'react'
import AsyncSelect from 'react-select-async-paginate'
import { fetch } from './Fetch'

export default class UserSelect extends Component {
  state = {
    inputValue: '',
  }

  getOptionLabel = option => {
    return option.first_name + ' ' + option.last_name
  }

  getOptionValue = option => {
    return option.id
  }

  loadOptions = inputValue => {
    return fetch(
      'GET',
      window.Routes.api_v1_users_path({
        q: { first_name_or_last_name_cont: inputValue },
        format: 'json',
      })
    ).then(({ data }) => {
      return { options: data.items }
    })
  }

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '')
    this.setState({ inputValue })
    return inputValue
  }

  componentDidMount() {
    this.loadOptions()
  }

  displayUser() {
    return this.props.value && this.props.value.id
      ? this.props.value
      : { id: '', first_name: '', last_name: '', email: '' }
  }

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          defaultValue={null}
          onChange={this.props.onChange}
          value={this.displayUser()}
        />
      </div>
    )
  }
}
