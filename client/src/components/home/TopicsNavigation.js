
import React, { Component } from 'react';
import SideNav from 'react-sidenav';
import TopicNavItem from './TopicNavItem';

class TopicsNavigation extends Component {
    render() {
        const topics = this.props.topics.map(topic => (
            <TopicNavItem topic={topic} />
        ));

        return (
            <div class="row-offcanvas row-offcanvas-left">
                <div id="sidebar" class="sidebar-offcanvas">
                    <div class="col-md-12">
                    <h3>Sidebar (fixed)</h3>
                    <ul class="nav nav-pills nav-stacked">
                        <li class="active"><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                        <li><a href="#">Section</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        );
    }
}


export default TopicsNavigation;
