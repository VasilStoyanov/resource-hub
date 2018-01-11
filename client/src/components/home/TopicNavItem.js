
import React, { Component } from 'react';
import { Nav, NavText } from 'react-sidenav';

class TopicNavItem extends Component {
    render() {
        const { name } = this.props.topic;
        return (
                <Nav id='sales'>
                    <NavText> {name} </NavText>
                </Nav>
        );
    }
}


export default TopicNavItem;
