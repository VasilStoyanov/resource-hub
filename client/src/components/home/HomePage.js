import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import getTopics from '../../actions/topics/getTopics';
import TopicsNavigation from './TopicsNavigation';

class HomePage extends Component {
  componentDidMount() {
      this.props.dispatch(getTopics());
  }

  render() {
    return (
      <div>Home page</div>
    );
  }
}

const mapStateToProps = state => ({
        topics: state.topicsReducer.topics
    });


export default connect(mapStateToProps)(HomePage);
