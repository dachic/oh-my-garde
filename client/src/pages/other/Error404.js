import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap';

import imgNotFound from '../../assets/images/not-found.png';


class Error404 extends Component {

    componentDidMount() {
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        document.body.classList.remove('authentication-bg');
    }

    render() {
        return (
            <React.Fragment>
                <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={4} lg={5}>
                                <div className="text-center">
                                    <div>
                                        <img src={imgNotFound} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-center">
                                <h3 className="mt-3">Nous n'avons pas pu créer les liens</h3>
                                <p className="text-muted mb-5">Cette page est introuvable <br /> Vous avez peut-être mal saisi l’adresse ou la page a peut-être été déplacée.</p>

                                <Link to="/" className="btn btn-lg btn-primary mt-4">Revenir à la page d'accueil</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Error404;
