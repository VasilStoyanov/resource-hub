import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import getTopics from '../../actions/topics/getTopics';
import SearchBar from '../common/SearchBar';

class HomePage extends Component {
  componentDidMount() {
      this.props.dispatch(getTopics());
  }

  render() {
    return (
      <Grid>
        <Row>
            <SearchBar />
        </Row>
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
