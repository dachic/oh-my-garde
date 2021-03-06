import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, } from 'reactstrap';

import { isUserAuthenticated } from '../../helpers/authUtils';
import logo from '../../assets/images/logo_horizontal.svg';

class Confirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        document.body.classList.add('authentication-bg');
    }

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {(!isAuthTokenValid) && <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="text-center">
                                    <CardBody className="p-4">
                                        <div className="mx-auto mb-5">
                                            <a href="/">
                                                <img src={logo} alt="" height="37" />
                                            </a>
                                        </div>

                                        <h6 className="h5 mb-0 mt-4">Validation en cours</h6>
                                        <p className="text-muted mt-3 mb-3">Votre compte a été crée avec succès. L'administrateur de l'application a été prévenu de votre inscription. Vous recevrez un mail de confirmation dès que votre compte aura été validé.</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col className="text-center">
                                <p className="text-muted">Revenir à la page de <Link to="/account/login" className="text-primary font-weight-bold ml-1">Connexion</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}

export default connect()(Confirm);
