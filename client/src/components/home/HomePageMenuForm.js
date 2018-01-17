import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { debounce } from 'throttle-debounce'; 
import { Col, InputGroup, Button, Glyphicon } from 'react-bootstrap';
import { selectTopic } from '../../actions/topics/';
import { searchResources, getResourcesNames, userInputChange } from '../../actions/resources';
import SearchBar from '../common/SearchBar';

class HomePageMenuForm extends Component {
    handleTopicSelect(query) {
        if (!query) {
            return;
        }
        this.props.dispatch(selectTopic(query[0]));
    }

    handleThematicSelect(query) {
        const thematicId = query[0] ? query[0].id : undefined;
        const selectedTopicId = this.props.selectedTopic.id;

        this.props.dispatch(getResourcesNames(selectedTopicId, thematicId));
    }

    submit(result) {
        const { userInput, selectedTopic, selectedThematic } = result;
        this.props.dispatch(searchResources(selectedTopic, selectedThematic, userInput));
    }

    handleSearchBarInputChange(result) {
        debounce(1000, this.props.dispatch(userInputChange(result)));
    }

    render() {
        const { handleSubmit, selectedTopic, filteredResourcesNames } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <Col md={4} className='topics-search-block'>
                    <Field
                        name='selectedTopic' 
                        placeholder='Select topic...'
                        handleChange={this.handleTopicSelect.bind(this)}
                        options={this.props.topics} 
                        component={SearchBar}
                    />
                </Col>
                <Col md={4} className='thematic-search-block'>
                    <Field 
                        name='selectedThematic' 
                        placeholder='Select thematic...'
                        handleChange={this.handleThematicSelect.bind(this)} 
                        options={selectedTopic.thematics} 
                        component={SearchBar}
                    />
                </Col>
                <Col md={4} >
                    <InputGroup>
                        <Field
                            name='userInput'
                            placeholder='Search...'
                            minLength={3}
                            handleInputChange={this.handleSearchBarInputChange.bind(this)}
                            options={filteredResourcesNames.map(n => n.name)}
                            component={SearchBar}
                        />
                        <InputGroup.Button>
                                <Button className="btn-secondary" type="submit">                           
                                        <Glyphicon glyph='search' />
                                </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
            </form>
        );
  }
}

const mapStateToProps = state => ({
    topics: state.topicsReducer.topics,
    selectedTopic: state.topicsReducer.selectedTopic,
    filteredResourcesNames: state.resourcesReducer.filteredResourcesNames
});

export default connect(mapStateToProps)(
        reduxForm({ form: 'home-page-menu-form' })(HomePageMenuForm));
