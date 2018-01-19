import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';

class Pages extends Component {
    onClick(pageNumber, event) {
        event.preventDefault();
        if (pageNumber > this.props.pagesCount || pageNumber < 0) {
            return;
        }

        const { dispatch, switchPage } = this.props; 
        dispatch(switchPage(pageNumber));
    }

    createPageItems({ pagesCount, pageNumber, delta }) {
        const items = [];
        const left = pageNumber <= delta ? 1 : pageNumber - delta;
        const right = pageNumber + delta + 1 >= pagesCount ? pagesCount - 2 : pageNumber + delta;
        let key = 0;

        items.push(
            <Pagination.Item 
                key={key++}
                active={pageNumber === 0}  
                onClick={this.onClick.bind(this, 0)}
            >
                {1}
            </Pagination.Item>
        );

        if (right > 6) {
            items.push(<Pagination.Ellipsis key={key++} onClick={this.onClick.bind(this, pageNumber - 3)} />);
        }

        for (let i = left; i <= right; i++) {
                items.push(
                    <Pagination.Item
                        key={key++} 
                        active={pageNumber === i} 
                        onClick={this.onClick.bind(this, i)}
                    >
                        {i + 1}
                    </Pagination.Item>
                );
        }

        if (right < pagesCount - 2) {
            items.push(<Pagination.Ellipsis key={key++} onClick={this.onClick.bind(this, pageNumber + 4)} />);
        }

        items.push(
                <Pagination.Item 
                    key={key++} 
                    onClick={this.onClick.bind(this, pagesCount - 1)}
                >
                    {pagesCount}
                </Pagination.Item>
            );
        

        return items;
    }

    render() {
        const { pagesCount, pageNumber } = this.props;
        const items = this.createPageItems(this.props);

        return (
            <Pagination>
                <Pagination.First onClick={this.onClick.bind(this, 0)} />
                <Pagination.Prev onClick={this.onClick.bind(this, pageNumber - 1)} />
                    {items}
                <Pagination.Next onClick={this.onClick.bind(this, pageNumber + 1)} />
                <Pagination.Last onClick={this.onClick.bind(this, pagesCount)} />
            </Pagination>
        );
    }
}

export default connect()(Pages);
