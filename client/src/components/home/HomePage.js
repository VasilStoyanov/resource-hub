import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import getTopics from '../../actions/topics/getTopics';
import SearchBar from '../common/SearchBar';
import TopicsDropDown from './common/TopicsDropDown';

class HomePage extends Component {
  componentDidMount() {
      this.props.dispatch(getTopics());
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={3}>
            <TopicsDropDown topics={this.props.topics} />
          </Col>
            <Col md={3}>
              <SearchBar />
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
        topics: state.topicsReducer.topics
    });


export default connect(mapStateToProps)(HomePage);
