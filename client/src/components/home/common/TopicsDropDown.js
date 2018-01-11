import React, { Component } from 'react';
import TopicMenuItem from './TopicMenuItem';
import DropDown from '../../common/DropDown';

class TopicsDropDown extends Component {
    submit(result) {
        console.log(result);
    }

    render() {
        const menuItems = this.props.topics.map(topic => {
                    const { id, name } = topic;
                    return (<TopicMenuItem key={id} id={id} name={name} />);
        });
        
    return (
        <DropDown menuItems={menuItems} title='Topics' />
    );
  }
}

export default TopicsDropDown;
