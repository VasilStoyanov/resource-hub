import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Grid, Row, Col } from 'react-bootstrap';
import CreateTopicForm from './CreateTopicForm';

class ResourcesManagementPage extends Component {
  render() {
    return (
        <CreateTopicForm />
    );
  }
}

export default connect()(ResourcesManagementPage);
