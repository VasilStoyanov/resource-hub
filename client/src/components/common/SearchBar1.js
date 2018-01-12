import React, { Component } from 'react';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { AutoComplete } from 'redux-form-material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reduxForm, Field } from 'redux-form';
import { searchResources } from '../../actions/resources/search';

class SearchBar2 extends Component {
    submit(input) {
        console.log(input.resourceName);
        
        this.props.dispatch(searchResources(input.resourceName));
    }

    render() {
        const { dataSource, handleSubmit } = this.props;
        return (
           <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <MuiThemeProvider>
                    <Field
                        name="resourceName"
                        label="Search Suggestions"
                        component={AutoComplete}
                        floatingLabelText="Search By Suggestions"
                        openOnFocus
                        filter={MUIAutoComplete.fuzzyFilter}
                        dataSource={dataSource} //array list of suggestions
                        onChange={this.handleSearchByTextChange} //handle the onChange event by handleSearchByTextChange func
                        onBlur={() => {}}
                    />
                </MuiThemeProvider>
           </form>
        );
  }
}

export default reduxForm({ form: 'search-form' })(SearchBar2);
