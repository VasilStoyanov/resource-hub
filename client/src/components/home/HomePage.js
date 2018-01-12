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
      <Grid>
        <HomePageMenuForm {...this.props} />
        <Row>
          hi2
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
        topics: state.topicsReducer.topics
    });


export default connect(mapStateToProps)(HomePage);
