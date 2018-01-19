import React from 'react';
import { Field } from 'redux-form';
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
                            handleChange={result => dispatch(userInputChange({
                                resources: resourcesNames,
                                userInput: result,
                                topCount: 10
                            }))}
                        />
                        <InputGroup.Button>
                                <Button className="btn-secondary" type="submit">                           
                                        <Glyphicon glyph='search' />
                                </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
    );
    
