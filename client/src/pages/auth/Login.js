import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert, InputGroup, InputGroupAddon } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock } from 'react-feather';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo_horizontal.svg';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        document.body.classList.add('authentication-bg');
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.loginUser(values.username, values.password, this.props.history);
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
                            <Col xl={10}>
                                <Card className="">
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col md={6} className="p-5 position-relative">
                                                { /* preloader */}
                                                {this.props.loading && <Loader />}

                                                <div className="mx-auto mb-5">
                                                    <a href="/">
                                                        <img src={logo} alt="" height="37" />
                                                    </a>
                                                </div>

                                                <h6 className="h5 mb-0 mt-4">Connexion</h6>
                                                <p className="text-muted mt-1 mb-4">Veuillez saisir votre adresse e-mail et votre mot de passe pour accéder à votre espace personnel</p>


                                                {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>}

                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                    <AvGroup className="">
                                                        <Label for="username">Adresse e-mail</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="text" name="username" id="username" placeholder="Adresse e-mail" value={this.state.username} required />
                                                        </InputGroup>

                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>


                                                    <AvGroup className="mb-3">
                                                        <Label for="password">Mot de passe</Label>
                                                        <Link to="/account/forget-password" className="float-right text-muted text-unline-dashed ml-1">Mot de passe oublié ?</Link>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="password" name="password" id="password" placeholder="Mot de passe" value={this.state.password} required />
                                                        </InputGroup>
                                                        <AvFeedback>Saisissez un mot de passe</AvFeedback>
                                                    </AvGroup>

                                                    <FormGroup className="form-group mb-0 text-center">
                                                        <Button color="primary" className="btn-block">Me connecter</Button>
                                                    </FormGroup>
                                                </AvForm>
                                            </Col>

                                            <Col md={6} className="d-none d-md-inline-block">
                                                <div className="auth-page-sidebar">

                                                    <div className="auth-user-testimonial">
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>


                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col className="col-12 text-center">
                                <p className="text-muted">Vous n'avez pas encore de compte ? <Link to="/account/register" className="text-primary font-weight-bold ml-1">Inscrivez-vous</Link></p>
                            </Col>
                        </Row>

                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
