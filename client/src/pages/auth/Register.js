import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert, InputGroup, InputGroupAddon, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock, User, PhoneCall } from 'react-feather';

import { registerUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            firstname: 'kabad',
            lastname: 'conde',
            email: 'kaba@ohmygarde.app',
            pasword: 'admin',
            phoneNumber: '0768141623',
            role: 'ROLE_ADMIN'
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
        this.props.registerUser(values.firstname, values.lastname, values.email, values.phoneNumber, values.password);
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
                                            <Col md={6} className="p-5 position-relative">
                                                { /* preloader */}
                                                {this.props.loading && <Loader />}

                                                <div className="mx-auto mb-5">
                                                    <a href="/">
                                                        <img src={logo} alt="" height="24" />
                                                        <h3 className="d-inline align-middle ml-1 text-logo">Oh My Garde</h3>
                                                    </a>
                                                </div>

                                                <h6 className="h5 mb-0 mt-4">Inscription</h6>
                                                <p className="text-muted mt-1 mb-4">Saisissez les informations ci-dessous pour vous inscrire</p>

                                                {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>}

                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                    <AvGroup className="">
                                                        <Label for="firstname">Prénom</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <User className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.firstname}  type="text" name="firstname" id="firstname" placeholder="Michelle" required />
                                                        </InputGroup>

                                                        <AvFeedback>Veuillez saisir votre prénom</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="">
                                                        <Label for="lastname">Nom</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <User className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.lastname}  type="text" name="lastname" id="lastname" placeholder="Condé" required />
                                                        </InputGroup>

                                                        <AvFeedback>Veuillez saisir votre nom de famille</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="">
                                                        <Label for="email">Email</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.email}  type="email" name="email" id="email" placeholder="kaba@coderthemes.com" required />
                                                        </InputGroup>

                                                        <AvFeedback>Veuillez saisir votre addresse mail</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="">
                                                        <Label for="phoneNumber">Numéro de téléphone</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <PhoneCall className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.phoneNumber}  type="text" name="phoneNumber" id="phoneNumber" placeholder="0756234589" required />
                                                        </InputGroup>

                                                        <AvFeedback>Saisissez votre numéro de téléphone</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup className="mb-3">
                                                        <Label for="password">Mot de passe</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput value={this.state.password}  type="password" name="password" id="password" placeholder="*********" required />
                                                        </InputGroup>
                                                        <AvFeedback>Veuillez saisir un mot de passe</AvFeedback>
                                                    </AvGroup>

                                                    <AvGroup check className="mb-4">
                                                        <CustomInput type="checkbox" id="terms" defaultChecked="false" className="pl-1" label="J’accepte les termes et conditions" />
                                                    </AvGroup>

                                                    <FormGroup className="form-group mb-0 text-center">
                                                        <Button color="primary" className="btn-block">Inscrivez-vous</Button>
                                                    </FormGroup>
                                                </AvForm>
                                            </Col>

                                            <Col md={6} className="d-none d-md-inline-block">
                                                <div className="auth-page-sidebar">
                                                    <div className="overlay"></div>
                                                    <div className="auth-user-testimonial">
                                                        <p className="font-size-24 font-weight-bold text-white mb-1">I simply love it!</p>
                                                        <p className="lead">"It's a elegent templete. I love it very much!"</p>
                                                        <p>- Admin User</p>
                                                    </div>
                                                </div>
                                            </Col>
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
