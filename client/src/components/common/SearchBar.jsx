import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

class SearchBar extends Component {
  componentDidUpdate() {
    const { disabled } = this.props;
    if (disabled && this.refs.typeahead) {
      this.refs.typeahead.getInstance().clear();
    }
  }

  render() {
    const {
      input, options, handleChange, minLength, placeholder, disabled,
    } = this.props;

    return (
      <Typeahead
        {...input}
        ref="typeahead"
        labelKey="name"
        minLength={minLength}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        onInputChange={(selected) => {
                        input.onChange(selected);
                        if (handleChange) handleChange(selected);
                    }}
      />
    );
  }
}

export default SearchBar;
