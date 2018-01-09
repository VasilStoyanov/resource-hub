import React from 'react';
import { FormGroup, Row, Col, Button } from 'react-bootstrap';

export const AuthButton = ({ value }) => (
    <FormGroup controlId='auth-submit-btn'>
        <Row>
            <Col sm={6} smOffset={3}>
            <Button type='submit' bsClass='form-control btn btn-register'>
                {value}
            </Button>
            </Col>
        </Row>
    </FormGroup>
    );
