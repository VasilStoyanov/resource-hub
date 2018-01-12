import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { getTopics } from '../../actions/topics/getTopics';
import SearchBar2 from '../common/SearchBar2';
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
              <SearchBar2 dataSource={this.props.topics.map(topic => topic.name)} />
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
