import React from 'react';
import { Field } from 'redux-form';
import { Col } from 'react-bootstrap';
import { selectTopic } from '../../actions/topics/';
import SearchBar from '../common/SearchBar';

export default ({ topics, dispatch }) => (
  <Col md={4}>
    <Field
      name="selectedTopic"
      placeholder="Select topic..."
      options={topics.map(n => n.name)}
      component={SearchBar}
      handleChange={(query) => {
                const topic = topics.find(n => n.name === query);
                dispatch(selectTopic(topic));
            }}
    />
  </Col>
);

