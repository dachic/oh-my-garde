import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert, InputGroup, InputGroupAddon, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Mail, Lock, User, PhoneCall } from 'react-feather';

import { registerUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo_horizontal.svg';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phoneNumber: '',
            role: ''
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
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.registerUser(values.firstname, values.lastname, values.email, values.phoneNumber, values.password, values.role);
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

    /**
     * Redirect to confirm
     */
    renderRedirectToConfirm = () => {
        return <Redirect to='/account/confirm' />;
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {Object.keys(this.props.user || {}).length > 0 && this.renderRedirectToConfirm()}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages mt-5 mb-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={10}>
                                <Card className="">
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col md={12} className="p-5 position-relative">
                                                { /* preloader */}
                                                {this.props.loading && <Loader />}

                                                <div className="mx-auto mb-5">
                                                    <a href="/">
                                                        <img src={logo} alt="" height="37" />
                                                    </a>
                                                </div>

                                                <h6 className="h5 mb-0 mt-4">Inscription</h6>
                                                <p className="text-muted mt-1 mb-4">Si vous n'avez pas de compte, veuillez compléter les informations demandées ci-dessous pour vous inscrire</p>

                                                {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>}
                                                
                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                    <Row>
                                                        <Col md={6}>
                                                            <AvGroup className="">
                                                                <Label for="firstname">Prénom</Label>
                                                                <InputGroup>
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <span className="input-group-text">
                                                                            <User className="icon-dual" />
                                                                        </span>
                                                                    </InputGroupAddon>
                                                                    <AvInput value={this.state.firstname} type="text" name="firstname" id="firstname" placeholder="Michelle" required />
                                                                </InputGroup>

                                                                <AvFeedback>Veuillez saisir votre prénom</AvFeedback>
                                                            </AvGroup>
                                                        </Col>

                                                        <Col md={6}>
                                                            <AvGroup className="">
                                                                <Label for="lastname">Nom</Label>
                                                                <InputGroup>
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <span className="input-group-text">
                                                                            <User className="icon-dual" />
                                                                        </span>
                                                                    </InputGroupAddon>
                                                                    <AvInput value={this.state.lastname} type="text" name="lastname" id="lastname" placeholder="Condé" required />
                                                                </InputGroup>

                                                                <AvFeedback>Veuillez saisir votre nom de famille</AvFeedback>
                                                            </AvGroup>
                                                        </Col>
                                                    </Row>

                                                    <AvGroup className="">
                                                        <Label for="email">E-mail</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.email} type="email" name="email" id="email" placeholder="adrien@ohmygarde.app" required />
                                                        </InputGroup>

                                                        <AvFeedback>Veuillez saisir votre addresse e-mail</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="mb-3">
                                                        <Label for="password">Mot de passe</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.password} type="password" name="password" id="password" placeholder="*********" required />
                                                        </InputGroup>
                                                        <AvFeedback>Veuillez saisir un mot de passe</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="">
                                                        <Label for="phoneNumber">Numéro de téléphone</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <PhoneCall className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.phoneNumber} type="text" name="phoneNumber" id="phoneNumber" placeholder="0756234589" required />
                                                        </InputGroup>

                                                        <AvFeedback>Saisissez votre numéro de téléphone</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="mb-3">
                                                        <FormGroup>
                                                            <Label for="roleUser">Rôle</Label>
                                                            <AvRadioGroup name="role" required errorMessage="Choisissez un rôle">
                                                                <AvRadio label="Chef d'un hôpital" value="ROLE_PHARMACY" />
                                                                <AvRadio label="Interne" value="ROLE_INTERN" />
                                                            </AvRadioGroup>
                                                        </FormGroup>

                                                        <AvFeedback>Veuillez choisir un rôle</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup check className="mb-4">
                                                        <CustomInput type="checkbox" id="terms" defaultChecked="false" className="pl-1" label="J’accepte les termes et conditions d'utilisation de la plateforme" />
                                                    </AvGroup>

                                                    <FormGroup className="form-group mb-0 text-center">
                                                        <Button color="primary" className="btn-block">M'inscrire</Button>
                                                    </FormGroup>
                                                </AvForm>
                                            </Col>

                                            {/* <Col md={6} className="d-none d-md-inline-block">
                                                <div className="auth-page-sidebar">
                                                    <div className="overlay"></div>
                                                    <div className="auth-user-testimonial">
                                                    </div>
                                                </div>
                                            </Col> */}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-1">
                            <Col className="col-12 text-center">
                                <p className="text-muted">Vous avez déjà un compte ? <Link to="/account/login" className="text-primary font-weight-bold ml-1">Connectez-vous</Link></p>
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

export default connect(mapStateToProps, { registerUser })(Register);
