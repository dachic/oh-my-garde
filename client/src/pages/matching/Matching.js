import React from 'react';
import {Container,Row,Col} from 'reactstrap';
import Request from '../../components/Matching/Request'
import Answers from '../../components/Matching/Answers'

const Matching = (props) => {
    const guard = 1

    return (
        <Container>
            <Row className="mt-5">
                <Col lg="4" md="12">
                    <Request guard={guard}/>
                </Col>
                <Col lg="8" md="12">
                    <Answers guard={guard}/>
                </Col>
            </Row>
        </Container>
    );
};

export default Matching;
