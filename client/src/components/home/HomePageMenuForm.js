import React, { Component } from 'react';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AutoComplete } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import { getTopics } from '../../actions/topics/';
import SearchBar from '../common/SearchBar';
import DropDown from '../common/DropDown';

class HomePageMenuForm extends Component {
  componentDidMount() {
      this.props.dispatch(getTopics());
  }

  render() {
      console.log(this.props.topics);
    return (
        <Row className='home-page-menu'>
           <form>
            <Col md={4} className='topics-drop-down-block'>
                    <Field name='selectedTopic' options={this.props.topics} component={DropDown} />
                </Col>
                <Col md={4} className='thematic-drop-down-block'>
                    <Field options={this.props.topics} component={DropDown} />
                </Col>
                <Col md={4} >
                    <MuiThemeProvider>
                    <Field
                        name='searchResult'
                        component={AutoComplete}
                        floatingLabelText='Search Subtopic'
                        filter={MUIAutoComplete.fuzzyFilter}
                        dataSource={this.props.topics.map(topic => topic.name)}
                        onBlur={() => {}}
                    />
                    </MuiThemeProvider>
                </Col>
           </form>
        </Row>
    );
  }
}

export default reduxForm({ form: 'home-page-menu-form' })(HomePageMenuForm);
