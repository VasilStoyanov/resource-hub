import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import CreateTopicForm from './CreateTopicForm';

const ResourcesManagementPage = () =>
  (
    <Grid>
      <Row>
        <Col lg={10} lgOffset={1} className="basic-card create-topic-from">
          <div className="basic-heading">
            <h3>Create new Topic</h3>
          </div>
          <CreateTopicForm />
        </Col>
      </Row>
    </Grid>
  );


export default connect()(ResourcesManagementPage);
