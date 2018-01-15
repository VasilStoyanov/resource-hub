import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTopics } from '../../actions/topics/';
import HomePageMenuForm from './HomePageMenuForm';

class HomePage extends Component {
  componentDidMount() {
      this.props.dispatch(getTopics());
  }

  render() {
    return (
      <Grid fluid>
        <Row className='home-page-menu'>
          <Col lg={6} lgOffset={6}>
            <HomePageMenuForm {...this.props} />
          </Col>
        </Row>
        <Row>
          hi2
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
        topics: state.topicsReducer.topics,
        selectedTopic: state.topicsReducer.selectedTopic,
        filteredResources: state.resourcesReducer.filteredResources
    });


export default connect(mapStateToProps)(HomePage);
