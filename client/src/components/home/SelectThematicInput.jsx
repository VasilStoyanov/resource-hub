import React from 'react';
import { Field } from 'redux-form';
import { Col } from 'react-bootstrap';
import { selectThematic } from '../../actions/thematics/';
import { getResourcesNames } from '../../actions/resources/';
import SearchBar from '../common/SearchBar';

export default ({ selectedTopic, dispatch }) => (
  <Col md={4}>
    <Field
      name="selectedThematic"
      placeholder="Select thematic..."
      options={selectedTopic.thematics}
      component={SearchBar}
      disabled={selectedTopic.thematics && selectedTopic.thematics.length === 0}
      handleChange={(query) => {
                const thematic = selectedTopic.thematics.find(n => n.name === query);
                dispatch(selectThematic(thematic));

                if (thematic) {
                    dispatch(getResourcesNames(selectedTopic.id, thematic.id));
                }
            }}
    />
  </Col>
);

