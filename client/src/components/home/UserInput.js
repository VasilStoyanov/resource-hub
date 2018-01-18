import React from 'react';
import { Field } from 'redux-form';
import { debounce } from 'throttle-debounce'; 
import { Col, InputGroup, Button, Glyphicon } from 'react-bootstrap';
import { userInputChange } from '../../actions/resources/';
import SearchBar from '../common/SearchBar';

export default ({ filteredResourcesNames, resourcesNames, dispatch }) => (
    <Col md={4} >
                    <InputGroup>
                        <Field
                            name='userInput'
                            placeholder='Search...'
                            minLength={3}
                            options={filteredResourcesNames.map(n => n.name)}
                            component={SearchBar}
                            disabled={resourcesNames && resourcesNames.length === 0}
                            handleInputChange={result => debounce(1000, dispatch(userInputChange(result.name)))}
                        />
                        <InputGroup.Button>
                                <Button className="btn-secondary" type="submit">                           
                                        <Glyphicon glyph='search' />
                                </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
    );
    
