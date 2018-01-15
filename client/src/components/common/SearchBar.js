import React, { Component } from 'react';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AutoComplete } from 'redux-form-material-ui';
import { reduxForm, Field } from 'redux-form';

class SearchBar extends Component {
    submit(result) {
        console.log('searchREsult ---------------------- >', result);
    }

    render() {
        const { dataSource, handleSubmit } = this.props;
        return (
           <form className='search-bar-form' onSubmit={handleSubmit(this.submit.bind(this))}>
                <MuiThemeProvider>
                <Field
                    name='searchByText'
                    component={AutoComplete}
                    floatingLabelText='Search Subtopic'
                    // openOnFocus
                    filter={MUIAutoComplete.fuzzyFilter}
                    dataSource={dataSource}
                    onBlur={() => {}}
                />
                </MuiThemeProvider>
           </form>
        );
  }
}

export default reduxForm({ form: 'search-form' })(SearchBar);
