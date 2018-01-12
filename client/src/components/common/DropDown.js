import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';

class DropDown extends Component {
    submit(result) {
        console.log(result);
    }

    render() {
        const options = this.props.options.map(option => {
            console.log(option);
            const { id, name } = option;
            const value = id || name;
        
        return (<option value={value}>{name}</option>);
    });
   
    return (
            <FormGroup>
                <div>
                    <select id="company" className="form-control">
                        <option selected>{this.props.title}</option>
                        {options}
                    </select> 
                </div>
            </FormGroup>
    );
  }
}

export default DropDown;
