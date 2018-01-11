import React from 'react';
import { FormGroup, FormControl, Glyphicon, InputGroup, Button } from 'react-bootstrap';

export const SearchBarInput = ({ input, type }) => (
    <FormGroup controlId='search-bar-form-group'>
        <InputGroup>
            <FormControl {...input} placeholder='Search...' type={type || 'text'} /> 
                <InputGroup.Addon>
                    <Glyphicon glyph='search' />
                </InputGroup.Addon>
        </InputGroup> 
    </FormGroup> 
);
