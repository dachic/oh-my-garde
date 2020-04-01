import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, } from 'reactstrap';

import { isUserAuthenticated } from '../../helpers/authUtils';
import logo from '../../assets/images/logo.png';

class Confirm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
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

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="text-center">
                                    <CardBody className="p-4">
                                        <div className="mx-auto mb-5">
                                            <a href="/">
                                                <img src={logo} alt="" height="24" />
                                                <h3 className="d-inline align-middle ml-1 text-logo">Oh My Garde</h3>
                                            </a>
                                        </div>

                                        <h6 className="h5 mb-0 mt-4">Validation de votre compte</h6>
                                        <p className="text-muted mt-3 mb-3">Votre compte a été crée avec succès. Un mail a été envoyé à l'administrateur de l'application. Vous recevrez un mail dès qu'il aura validé votre compte.</p>
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
