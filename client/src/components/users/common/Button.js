import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <input
            type="submit"
            name={this.props.name}
            className={this.props.className}
            value={this.props.value} 
            />
            );
    }
}

export default Button;
