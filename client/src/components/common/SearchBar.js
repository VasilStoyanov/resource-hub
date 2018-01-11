import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { FormGroup, InputGroup, Glyphicon, FormControl } from 'react-bootstrap';
import { GlyphInput } from '../common/GlyphInput';

class SearchBar extends Component {
    submit(result) {
        console.log(result);
    }

    render() {
    return (
        <form className='search-bar-from' >        
            <FormGroup>
                <Field placeholder='Username' name='username' glyph='search' placeRight component={GlyphInput} />
            </FormGroup>
        </form>
    );
  }
}

export default reduxForm({ form: 'search-form' })(SearchBar);
