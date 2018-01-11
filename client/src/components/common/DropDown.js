import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton } from 'react-bootstrap';

class DropDown extends Component {
    submit(result) {
        console.log(result);
    }

    render() {
    const { menuItems, title } = this.props;
        
    return (
        <ButtonToolbar>
			<DropdownButton
				bsSize="large"
				title={title}
				id="dropdown-size-large"
			>
            {menuItems}
        </DropdownButton>
		</ButtonToolbar>
    );
  }
}

export default DropDown;
