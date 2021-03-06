import React from 'react';
import { Row, Col } from 'reactstrap';
import Request from '../../../components/Matching/Request'
import Answers from '../../../components/Matching/Answers'

const Matching = (props) => {
    const { id } = props.match.params

    return (
        <Row className="mt-5">
            <Col lg="3" md="12">
                <Request guard={id} />
            </Col>
            <Col lg="9" md="12">
                <Answers guard={id} />
            </Col>
        </Row>
    );
};

export default Matching;
