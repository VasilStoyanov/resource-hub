import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import CreateTopicForm from './CreateTopicForm';

const ResourcesManagementPage = () =>
  (
       <Grid>
          <Row>
              <Col lg={10} lgOffset={1} className='create-topic-from'>
                  <h2>Create new Topic</h2>
                  <CreateTopicForm />
              </Col>
          </Row>
        </Grid>
  );


export default connect()(ResourcesManagementPage);
