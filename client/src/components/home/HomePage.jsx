import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { getTopics } from '../../actions/topics/';
import HomePageMenuForm from './HomePageMenuForm';
import ResourceList from '../resources/ResourceList';

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(getTopics());
  }

  render() {
    return (
      <Grid fluid>
        <Row className="home-page-menu">
          <Col lg={6} lgOffset={6}>
            <HomePageMenuForm {...this.props} />
          </Col>
        </Row>
        <Row className="home-page-resources-list">
          <Col sm={12} md={4}>
            Top Resources
          </Col>
          <Col sm={12} md={7}>
            <ResourceList resources={this.props.resources} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect()(HomePage);
