import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Typeahead } from 'react-bootstrap-typeahead'; 

class SearchBar extends Component {
    render() {
        const { input, options, handleChange, minLength, handleInputChange, placeholder } = this.props;

        return (
            <Typeahead
                    {...input}
                    onInputChange={handleInputChange}
                    onChange={handleChange}            
                    labelKey="name"
                    minLength={minLength}
                    options={options}
                    placeholder={placeholder}
            />
        );
  }
}

export default reduxForm({ form: 'search-form' })(SearchBar);
