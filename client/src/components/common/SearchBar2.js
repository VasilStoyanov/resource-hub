import React, { Component } from 'react';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { AutoComplete } from 'redux-form-material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reduxForm, Field } from 'redux-form';
// import { SearchBarInput } from '../common/SearchBarInput';

class SearchBar extends Component {
    submit(result) {
        console.log('searchREsult ---------------------- >', result);
    }

    render() {
        const { dataSource, handleSubmit } = this.props;
        return (
           <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <MuiThemeProvider>
                <Field
                    name="searchByText"
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

export default reduxForm({ form: 'search-form' })(SearchBar);
