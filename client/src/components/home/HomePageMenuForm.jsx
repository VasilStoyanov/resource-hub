import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { reduxForm } from 'redux-form';
import { validate } from '../../utilities/validators/validationSchemas/searchValidatior';
import { searchResources } from '../../actions/resources/';
import SelectTopicInput from './SelectTopicInput';
import SelectThematicInput from './SelectThematicInput';
import UserInput from './UserInput';

class HomePageMenuForm extends Component {
  submit(result) {
    const { selectedTopic, selectedThematic } = this.props;
    const errors = validate(result);

    if (Object.keys(errors).length > 0) {
      const keys = Object.keys(errors);
      keys.forEach((key) => {
        toast(errors[key], { className: 'red-toast' });
      });
      return;
    }

    this.props.dispatch(searchResources(selectedTopic, selectedThematic, result.userInput));
  }

  render() {
    const {
      topics,
      handleSubmit,
      selectedTopic,
      dispatch,
      filteredResourcesNames,
      resourcesNames,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <SelectTopicInput topics={topics} dispatch={dispatch} />
        <SelectThematicInput selectedTopic={selectedTopic} dispatch={dispatch} />
        <UserInput
          filteredResourcesNames={filteredResourcesNames}
          resourcesNames={resourcesNames}
          dispatch={dispatch}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topicsReducer.topics,
  selectedTopic: state.topicsReducer.selectedTopic,
  filteredResourcesNames: state.topicsReducer.selectedThematic.filteredResources,
  resourcesNames: state.topicsReducer.selectedThematic.resources,
});


export default connect(mapStateToProps)(reduxForm({ form: 'home-page-menu-form' })(HomePageMenuForm));
