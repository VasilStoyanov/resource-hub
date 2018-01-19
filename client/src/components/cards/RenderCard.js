import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default ({ id, imageUrl, title, description, href }) => (
    <Link to={href} className="zoom" key={id}>
        <div className="card card-appearance card-appearance-4" style={{ width: '100%' }}>
            <div className="panel panel-default card-round-top">
                <div className="panel-body">
                    <div className="zoom">
                        <Image style={{ width: '100%', height: '170px' }} src={imageUrl} rounded />
                        <span className="overlay" />
                    </div>
                </div>
            </div>
            <div className="card-block" style={{ textAlign: 'center' }}>
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{description}</p>
            </div>
        </div>
    </Link>
);
