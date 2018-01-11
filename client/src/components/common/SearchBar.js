import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { SearchBarInput } from '../common/SearchBarInput';

class SearchBar extends Component {
    submit(result) {
        console.log(result);
    }

    render() {
        const { handleSubmit } = this.props;
        
    return (
        <form className='search-bar-from' onSubmit={handleSubmit(this.submit.bind(this))} >        
            <Field name='searchString' component={SearchBarInput} />
        </form>
    );
  }
}

export default reduxForm({ form: 'search-form' })(SearchBar);
